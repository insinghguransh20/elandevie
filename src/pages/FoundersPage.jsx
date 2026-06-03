import React from 'react';
import useAnimate from '../hooks/useAnimate.js';
export default function FoundersPage() {
  useAnimate();
  return (
    <section className="sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="lbl anim-up">Meet the Founders</div>
        <h2 className="sec-h anim-up d1">The people behind <span>Élan de Vie</span></h2>
        <p className="sec-p anim-up d2">Passionate educators, communicators, and change-makers dedicated to empowering the next generation.</p>
        <div className="founders-grid">
          {[{init:'L',name:'Lavanya Vig',role:'CEO and Founder',img:'/lavanya.jpeg',bio:`A passionate and driven
individual with a deep interest in
leadership, communication, and
creative expression. As a
basketball player,
Bharatanatyam dancer, and
active participant in MUNs and
debates, I have consistently
sought opportunities to grow and
challenge myself. As the founder
of Élan de Vie, I aim to create a
space where students build
confidence, find their voice, and
engage meaningfully with global
issues through dynamic and
impactful experiences.`},{init:'B',name:'Nisaa Midha',role:'COO & Co-Founder',img:'/nissa.jpg',bio:'Élan de Vie is more than just an idea to me, it’s something we have been building with real purpose and passion since 2024. I’ve always believed that everyone has the ability to create change, and that belief is what inspired me to start this. I want this to be a space where ideas grow, creativity feels natural, and people feel heard. This is something I’m building with intention, hoping it creates a genuine impact. Élan de Vie is a part of me, and I hope it becomes a part of your journey too.'}].map((f,i)=>(
            <div key={f.name} className={`fc anim-pop d${i+1}`}>
              <div className="fc-photo-card">
                {f.img && <img src={f.img} alt={f.name} className="fc-photo" />}
                <div className="fc-overlay">
                  <h3>{f.name}</h3>
                  <div className="fc-role">{f.role}</div>
                </div>
                <div className="fc-bio-overlay">
                  <p className="fc-bio">{f.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
