import { useState, useEffect, useMemo } from 'react';
import { getProducts, patchStock } from '../services';

export default function Cashier() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [saleMessage, setSaleMessage] = useState(null);
  const [saleError, setSaleError] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const fetchProducts = () => {
    setLoading(true);
    setFetchError(null);
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setFetchError('Failed to load products. Please try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered product list — derived, not separate state
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.barcode && p.barcode.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  // Cart totals
  const { subtotal, tax, grandTotal } = useMemo(() => {
    const sub = cartItems.reduce(
      (acc, item) => acc + Number(item.product.price) * item.quantity,
      0
    );
    const t = sub * 0.06;
    return { subtotal: sub, tax: t, grandTotal: sub + t };
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stockQuantity) return prev;
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const incrementQty = (productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        if (item.quantity >= item.product.stockQuantity) return item;
        return { ...item, quantity: item.quantity + 1 };
      })
    );
  };

  const decrementQty = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    setSaleMessage(null);
    setSaleError(null);
  };

  const completeSale = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);
    setSaleMessage(null);
    setSaleError(null);
    try {
      await Promise.all(
        cartItems.map((item) => patchStock(item.product.id, item.quantity))
      );
      
      setInvoiceDetails({
        items: [...cartItems],
        subtotal,
        tax,
        grandTotal,
        date: new Date().toLocaleString()
      });
      setShowInvoice(true);

      setCartItems([]);
      fetchProducts();
      setSaleMessage('Sale completed!');
    } catch {
      setSaleError('Checkout failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="flex flex-1 gap-4 overflow-hidden">
      {/* ── Left Panel: Product Browser ── */}
      <div className="flex flex-col flex-1 min-w-0 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Products</h2>
          <input
            type="text"
            placeholder="Search by name or barcode…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}

          {!loading && fetchError && (
            <div className="text-red-600 bg-red-50 rounded p-3 text-sm">{fetchError}</div>
          )}

          {!loading && !fetchError && filteredProducts.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-8">No products found.</p>
          )}

          {!loading && !fetchError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProducts.map((product) => {
                const outOfStock = product.stockQuantity === 0;
                return (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 flex flex-col gap-2 transition-opacity ${
                      outOfStock ? 'opacity-50' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-semibold text-gray-800 text-sm leading-tight">
                        {product.name}
                      </span>
                      {product.category && (
                        <span className="text-xs bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 whitespace-nowrap">
                          {product.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-green-700">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <span
                        className={`text-xs ${
                          outOfStock ? 'text-red-500 font-medium' : 'text-gray-500'
                        }`}
                      >
                        Stock: {product.stockQuantity}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={outOfStock}
                      className="mt-auto w-full text-sm bg-blue-600 text-white rounded py-1.5 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Right Panel: Cart / Order Summary ── */}
      <div className="flex flex-col w-80 bg-white rounded-lg shadow overflow-hidden flex-shrink-0">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Cart</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-8">Cart is empty</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li key={item.product.id} className="border rounded-md p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-800 leading-tight flex-1 mr-1">
                      {item.product.name}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 text-lg leading-none flex-shrink-0"
                      title="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => decrementQty(item.product.id)}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementQty(item.product.id)}
                        disabled={item.quantity >= item.product.stockQuantity}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      ${Number(item.product.price).toFixed(2)} ea
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Order Summary & Actions */}
        <div className="border-t p-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax (6%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-800 border-t pt-2">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          {saleMessage && (
            <p className="text-green-600 text-sm text-center font-medium">{saleMessage}</p>
          )}
          {saleError && (
            <p className="text-red-600 text-sm text-center">{saleError}</p>
          )}

          <button
            onClick={completeSale}
            disabled={cartItems.length === 0 || checkingOut}
            className="w-full bg-green-600 text-white rounded-md py-2 font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {checkingOut ? 'Processing…' : 'Complete Sale'}
          </button>
          <button
            onClick={clearCart}
            className="w-full border border-gray-300 text-gray-600 rounded-md py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* ── Invoice Modal ── */}
      {showInvoice && invoiceDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div id="printable-invoice" className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Supermarket POS</h2>
              <p className="text-gray-600 text-sm">Sale Receipt</p>
              <p className="text-gray-500 text-xs mt-1">{invoiceDetails.date}</p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-3 my-3">
              {invoiceDetails.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-1">
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${invoiceDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (6%)</span>
                <span>${invoiceDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${invoiceDetails.grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3 no-print">
              <button 
                onClick={handlePrint}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
              >
                Print as PDF
              </button>
              <button 
                onClick={() => setShowInvoice(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
