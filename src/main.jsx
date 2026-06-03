import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';
import { useEffect } from 'react';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    const t = setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 10);
    return () => clearTimeout(t);
  }, [location.pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
