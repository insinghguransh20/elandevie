import useAnimate from '../hooks/useAnimate.js';

export default function ProgrammePage() {
  useAnimate();
  return (
    <section className="sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="lbl anim-up">Our Programmes & Offerings</div>
        <h2 className="sec-h anim-up d1">Thoughtfully built to create <em>confident communicators</em></h2>
        <p className="sec-p anim-up d2">Focused on building confidence, communication, and global awareness among students.</p>
        <div className="prog-grid">
          {[{e:'🎤',t:'Public Speaking Workshops',d:'Stage presence, speech delivery, and confidence building. Students learn to command attention and speak with clarity.',tag:'Core'},{e:'🌍',t:'Awareness Sessions',d:'Discussions on global and social issues to encourage critical thinking and globally informed perspectives.',tag:'Core'},{e:'🧠',t:'Activities & Debates',d:'Engaging exercises, group discussions, and debates to enhance articulation and the ability to think on your feet.',tag:'Interactive'},{e:'🎓',t:'Expert-Led Sessions',d:'Workshops by professionals from global leadership environments providing practical, real-world insights.',tag:'Premium'},{e:'📦',t:'Digital Learning Kits',d:'Curated kits including speech templates, global topic sheets, practice exercises, and exclusive recorded resources.',tag:'All Students'},{e:'🏆',t:'Showcase Events',d:'Opportunities to present to live audiences, receive mentor feedback, and celebrate growth as communicators.',tag:'Events'}].map((c,i)=>(
            <div key={c.t} className={`prog-card anim-up d${i%3+1}`}>
              <div className="prog-e">{c.e}</div><h3>{c.t}</h3><p>{c.d}</p>
              <span className="prog-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
