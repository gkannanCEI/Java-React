-- Seed dummy product (idempotent: inserts only if no product with this barcode exists)
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at)
SELECT 'DEMO-001', 'Sample Product', 'General', 9.99, 100, NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE barcode = 'DEMO-001'
);

-- 30 South Indian items
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-001', 'Sona Masoori Rice 5kg', 'Grains', 12.99, 50, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-001');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-002', 'Ponni Boiled Rice 5kg', 'Grains', 14.99, 40, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-002');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-003', 'Idli Rice 5kg', 'Grains', 11.99, 60, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-003');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-004', 'Toor Dal 1kg', 'Lentils', 3.99, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-004');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-005', 'Urad Dal 1kg', 'Lentils', 4.49, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-005');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-006', 'Chana Dal 1kg', 'Lentils', 3.49, 80, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-006');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-007', 'Moong Dal 1kg', 'Lentils', 4.99, 80, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-007');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-008', 'Tamarind 500g', 'Spices', 2.99, 120, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-008');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-009', 'Mustard Seeds 200g', 'Spices', 1.99, 150, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-009');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-010', 'Cumin Seeds 200g', 'Spices', 2.49, 150, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-010');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-011', 'Fenugreek Seeds 200g', 'Spices', 1.89, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-011');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-012', 'Curry Leaves Bunch', 'Vegetables', 0.99, 50, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-012');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-013', 'Asafoetida (Hing) 50g', 'Spices', 3.49, 80, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-013');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-014', 'Turmeric Powder 200g', 'Spices', 2.29, 200, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-014');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-015', 'Sambar Powder 200g', 'Spices', 3.99, 120, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-015');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-016', 'Rasam Powder 200g', 'Spices', 3.99, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-016');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-017', 'Idli Podi 200g', 'Spices', 4.49, 80, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-017');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-018', 'Filter Coffee Powder 250g', 'Beverages', 5.99, 150, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-018');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-019', 'Ghee 500ml', 'Dairy', 8.99, 60, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-019');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-020', 'Gingelly Oil (Sesame Oil) 1L', 'Oils', 10.99, 40, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-020');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-021', 'Coconut Oil 1L', 'Oils', 9.99, 45, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-021');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-022', 'Jaggery 500g', 'Sweets', 2.99, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-022');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-023', 'Dry Red Chillies 200g', 'Spices', 2.49, 120, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-023');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-024', 'Coriander Seeds 200g', 'Spices', 1.99, 150, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-024');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-025', 'Appalam (Papad) 200g', 'Snacks', 2.99, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-025');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-026', 'Coconut Fresh 1 pc', 'Produce', 1.99, 80, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-026');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-027', 'Cardamom 50g', 'Spices', 5.99, 50, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-027');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-028', 'Idli/Dosa Batter 1kg', 'Packaged Foods', 4.99, 30, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-028');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-029', 'Cashew Nuts 200g', 'Nuts', 7.99, 60, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-029');
INSERT INTO products (barcode, name, category, price, stock_quantity, created_at) SELECT 'SI-030', 'Curry Masala 200g', 'Spices', 3.49, 100, NOW() WHERE NOT EXISTS (SELECT 1 FROM products WHERE barcode = 'SI-030');
