import useAnimate from '../hooks/useAnimate.js';

export default function VisionPage() {
  useAnimate();
  return (
    <section className="sec vis-sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="vis-grid">
          <div>
            <div className="lbl anim-up d0">Our Vision</div>
            <h2 className="sec-h anim-up d1">Where <em>silence</em> is no<br/>longer the default</h2>
            <blockquote className="vis-quote anim-up d2">"We are shaping a generation that would not wait to be invited to the conversation — they will lead it."</blockquote>
            <div className="vis-body anim-up d3">
              <p>At Élan de Vie, we believe every voice, no matter how young or unheard, holds the power to challenge injustice, question norms, and ignite change.</p>
              <p>Our vision is to cultivate individuals who don't just speak well, but speak with purpose — bridging awareness and action through public speaking rooted in empathy, knowledge, and global consciousness.</p>
              <p>Through our programmes, platforms, and people, we are shaping a generation that leads the conversation.</p>
            </div>
          </div>
          <div className="vis-pillars anim-right d2">
            {[{e:'💬',t:'Voice',d:'Every student deserves to be heard and equipped to speak confidently.'},{e:'🌱',t:'Growth',d:'Continuous development through structured programmes and mentorship.'},{e:'🔭',t:'Awareness',d:'Global issues build empathy and critical thinking.'},{e:'🤝',t:'Community',d:'A supportive network of peers, mentors, and change-makers.'}].map(p=>(
              <div key={p.t} className="vpill"><div className="vpill-e">{p.e}</div><h4>{p.t}</h4><p>{p.d}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
