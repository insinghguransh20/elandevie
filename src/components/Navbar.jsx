import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV = ["Vision","Programme","How It Works","Founders","Events","Join Us","Contact"];

function routeForLabel(label) {
  if (label === 'Vision') return '/vision';
  if (label === 'Programme') return '/programme';
  if (label === 'How It Works') return '/how';
  if (label === 'Founders') return '/founders';
  if (label === 'Events') return '/events';
  if (label === 'Join Us') return '/join';
  if (label === 'Contact') return '/contact';
  return '/';
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => { navigate('/'); setOpen(false); }}>
            <div className="logo-mark"><img src="/image-removebg-preview (1).png" alt="Élan de Vie" /></div>
            
          </div>
          <div className="nav-links">
            {NAV.map(n => {
              const path = routeForLabel(n);
              return (
                <button key={n} className={`nav-btn${activePath === path ? ' on' : ''}`} onClick={() => navigate(path)}>{n}</button>
              );
            })}
            <button className="nav-cta" onClick={() => { navigate('/contact'); setOpen(false); }}>Register Now</button>
          </div>
          <button className="burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span style={open ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
          </button>
        </div>
      </nav>
      <div className={`m-menu${open ? ' open' : ''}`}>
        {NAV.map(n => {
          const path = routeForLabel(n);
          return (
            <button key={n} className={`nav-btn${activePath === path ? ' on' : ''}`} onClick={() => { navigate(path); setOpen(false); }}>{n}</button>
          );
        })}
        <button className="nav-cta" onClick={() => { navigate('/contact'); setOpen(false); }}>Register Now</button>
      </div>
    </>
  );
}
