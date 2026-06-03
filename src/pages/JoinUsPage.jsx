import useAnimate from '../hooks/useAnimate.js';

export default function JoinUsPage() {
  useAnimate();
  
  return (
    <section className="sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div style={{textAlign:'center',maxWidth:800,margin:'0 auto'}}>
          <div className="lbl anim-up d0">Be Part of Our Community</div>
          <h2 className="sec-h anim-up d1">Join the Team and <em>Unlock</em> Your Potential</h2>
          <p className="con-sub anim-up d2" style={{marginBottom:60}}>Become part of a growing community of confident speakers, leaders, and change-makers. Fill out the form below to join our next programme or event.</p>
          
          <div className="anim-up d3" style={{display:'flex',justifyContent:'center',gap:16,flexWrap:'wrap'}}>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeTvsOgn09EkHmZb98P62QNuE9-bbS9wnnMXZdPGsW153spXA/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-dark"
              style={{cursor:'pointer',textDecoration:'none',display:'inline-block'}}
            >
              Join Now via Google Form →
            </a>
            <a 
              href="mailto:elandevie26@gmail.com?subject=Interested%20in%20Joining%20Elan%20de%20Vie"
              className="btn-pink"
              style={{cursor:'pointer',textDecoration:'none',display:'inline-block'}}
            >
              Email Us
            </a>
          </div>

          <div style={{marginTop:80}}>
            <h3 style={{fontSize:24,fontWeight:700,color:'var(--forest)',marginBottom:32}}>What Awaits You</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:20}}>
              {[
                {icon:'🎤',title:'Public Speaking Skills',desc:'Master presentation & confidence'},
                {icon:'🌟',title:'Leadership Training',desc:'Develop leadership qualities'},
                {icon:'🌐',title:'Global Community',desc:'Connect with like-minded peers'},
                {icon:'📚',title:'Expert Mentorship',desc:'Learn from industry experts'},
                {icon:'🏆',title:'Certificates',desc:'Recognized credentials'},
                {icon:'🚀',title:'Career Growth',desc:'Advance your personal brand'}
              ].map((item,i)=>(
                <div key={item.title} className={`anim-pop d${i}`} style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.8)',borderRadius:14,padding:'24px 18px',transition:'all .3s'}}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(24,59,130,0.12)';e.currentTarget.style.background='rgba(255,255,255,0.8)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='';e.currentTarget.style.background='rgba(255,255,255,0.55)';}}>
                  <div style={{fontSize:32,marginBottom:12}}>{item.icon}</div>
                  <h4 style={{fontSize:14,fontWeight:700,color:'var(--forest)',marginBottom:8}}>{item.title}</h4>
                  <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.55}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginTop:80,padding:'32px',background:'rgba(255,255,255,0.5)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.8)',borderRadius:18}}>
            <h3 style={{fontSize:18,fontWeight:700,color:'var(--forest)',marginBottom:14}}>Have Questions?</h3>
            <p style={{fontSize:14,color:'var(--mint-dark)',lineHeight:1.7,marginBottom:16}}>Contact us at <strong>elandevie26@gmail.com</strong> or reach out via WhatsApp for more information about our programmes.</p>
            <p style={{fontSize:13,color:'var(--muted)'}}>We typically respond within 24–48 business hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
