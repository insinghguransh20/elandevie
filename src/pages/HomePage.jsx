import { useNavigate } from 'react-router-dom';
import useAnimate from '../hooks/useAnimate.js';

export default function HomePage() {
  const navigate = useNavigate();
  useAnimate();
  return (
    <>
      <section className="hero">
        <div className="hero-veil" />
        <div className="hero-content">
          <div className="hero-pill anim-up d0"><span className="pill-dot" /> Youth Leadership & Communication</div>
          <h1 className="anim-up d1">
            Fostering <span className="h-dark">Confidence,</span>
            <span className="h-pink">Igniting Awareness</span>
          </h1>
          <p className="hero-sub anim-up d2">Empowering students to become confident speakers and socially aware leaders through transformative, interactive learning experiences.</p>
          <div className="hero-btns anim-up d3">
            <button className="btn-dark" onClick={() => navigate('/programme')}>Explore Programmes →</button>
            <button className="btn-pink" onClick={() => navigate('/how')}>How It Works</button>
          </div>
        </div>
        <div className="hero-arrow anim-left d1"><span className="scroll-chev" /></div>
      </section>

      <div className="stats-bar">
        <div className="stats-inner">
          {[['5+','Programmes'],['100%','Interactive'],['🌐','Global Mentors'],['∞','Potential Unlocked']].map(([n,l],i)=>(
            <div key={l} className={`stat-item anim-up d${i}`}><span className="stat-n">{n}</span><div className="stat-l">{l}</div></div>
          ))}
        </div>
      </div>

      <section className="sec">
        <div className="sec-inner">
          <div style={{textAlign:'center',maxWidth:680,margin:'0 auto 52px'}}>
            <div className="lbl anim-up d0">What We Offer</div>
            <h2 className="sec-h anim-up d1">Programmes designed to <em>transform</em> how students communicate</h2>
          </div>
          <div className="features-grid">
            {[{e:'🎤',t:'Public Speaking',d:'Stage presence, delivery & confidence.'},{e:'🌐',t:'Awareness Sessions',d:'Global issues & critical thinking.'},{e:'🧠',t:'Debates & Activities',d:'Articulation and spontaneity.'},{e:'🎓',t:'Expert Workshops',d:'Real-world insights from global pros.'}].map((c,i)=>(
              <div key={c.t} className={`feature-card anim-pop d${i+1}`}>
                <div className="feature-emoji">{c.e}</div>
                <h3 className="feature-title">{c.t}</h3>
                <p className="feature-desc">{c.d}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <button className="btn-dark anim-up d4" onClick={() => navigate('/programme')}>View All Programmes →</button>
          </div>
        </div>
      </section>
    </>
  );
}
