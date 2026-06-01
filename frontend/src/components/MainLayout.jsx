import React from 'react';
import Navigation from './Navigation';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation />
      <main className="flex-grow p-4 flex flex-col">
        {children}
      </main>
    </div>
  );
}
