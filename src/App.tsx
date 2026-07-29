<<<<<<< HEAD
import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}
=======
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { WishlistPage } from './pages/WishlistPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <div className="noise-overlay" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
>>>>>>> 933d20fd5f09f415a696081fd6156af0a96643af
