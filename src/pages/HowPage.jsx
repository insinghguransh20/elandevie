import { useNavigate } from 'react-router-dom';
import useAnimate from '../hooks/useAnimate.js';

export default function HowPage() {
  const navigate = useNavigate();
  useAnimate();
  return (
    <section className="sec hiw-bg" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div style={{textAlign:'center',maxWidth:600,margin:'0 auto'}}>
          <div className="lbl anim-up">How It Works</div>
          <h2 className="sec-h anim-up d1">Your journey to becoming a <em>confident leader</em></h2>
          <p className="sec-p anim-up d2" style={{margin:'0 auto'}}>A structured approach ensuring every student experiences meaningful, lasting growth.</p>
        </div>
        <div className="hiw-steps">
          {[{n:1,t:'Register',d:'Fill out our short form to begin your journey.'},{n:2,t:'Trial or Enrol',d:'Attend a paid trial or enrol directly into the programme.'},{n:3,t:'Join the Community',d:'Attend your first workshop and meet peers and mentors.'},{n:4,t:'Participate & Practice',d:'Engage in activities, debates, and speaking exercises.'},{n:5,t:'Grow Confidently',d:'Develop skills, a global mindset, and confidence to lead.'}].map((s,i)=>(
            <div key={s.n} className={`hiw-step anim-up d${i}`}>
              <div className="hiw-n">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="hiw-cta anim-up d4">
          <button className="btn-dark" onClick={() => navigate('/contact')}>Register Now — It's Easy! →</button>
        </div>
      </div>
    </section>
  );
}
