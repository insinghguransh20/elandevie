import { useNavigate } from 'react-router-dom';

const NAV = ["Vision","Programme","How It Works","Events","Contact","Founders"];

function routeForLabel(label) {
  if (label === 'Vision') return '/vision';
  if (label === 'Programme') return '/programme';
  if (label === 'How It Works') return '/how';
  if (label === 'Events') return '/events';
  if (label === 'Contact') return '/contact';
  if (label === 'Founders') return '/founders';
  return '/';
}

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="fg-grid">
          <div><div className="fb">Élan de Vie</div><p className="ft">Fostering confidence and igniting awareness in the next generation of leaders and communicators.</p></div>
          <div className="fc-col"><h4>Explore</h4><ul>{["Vision","Programme","How It Works","Events"].map(p=><li key={p}><a onClick={() => navigate(routeForLabel(p))}>{p}</a></li>)}</ul></div>
          <div className="fc-col"><h4>Connect</h4><ul>{["Contact","Founders"].map(p=><li key={p}><a onClick={() => navigate(routeForLabel(p))}>{p}</a></li>)}<li><a>Instagram</a></li><li><a>LinkedIn</a></li></ul></div>
          <div className="fc-col"><h4>Programmes</h4><ul>{["Public Speaking","Awareness Sessions","Debates","Expert Sessions","Learning Kits"].map(p=><li key={p}><a onClick={() => navigate('/programme')}>{p}</a></li>)}</ul></div>
        </div>
        <hr className="f-div" />
        <div className="f-bot">
          <span>© 2025 <span className="f-mint">Élan de Vie</span>. All rights reserved.</span>
          <span>Fostering Confidence · Igniting Awareness</span>
        </div>
      </div>
    </footer>
  );
}
