import { useEffect, useState } from 'react';
import useAnimate from '../hooks/useAnimate.js';

export default function ContactPage() {
  useAnimate();
  const [form,setForm]=useState({name:'',email:'',phone:'',topic:'',message:''});
  const [status,setStatus]=useState('idle');
  const [subs,setSubs]=useState([]);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get('edv_contacts');if(r)setSubs(JSON.parse(r.value));}catch{}})();},[]);
  async function submit(){
    if(!form.name||!form.email||!form.message){setStatus('error');return;}
    setStatus('loading');
    const entry={...form,id:Date.now(),time:new Date().toLocaleString()};
    const updated=[...subs,entry];
    try{await window.storage.set('edv_contacts',JSON.stringify(updated));setSubs(updated);setForm({name:'',email:'',phone:'',topic:'',message:''});setStatus('success');setTimeout(()=>setStatus('idle'),4000);}catch{setStatus('error');}
  }
  const up=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  return (
    <section className="sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="con-grid">
          <div>
            <div className="lbl anim-up">Contact Us</div>
            <h2 className="sec-h anim-up d1">Let's start your <em>journey</em> together</h2>
            <p className="con-sub anim-up d2">Whether you're a student, parent, or school — we'd love to hear from you.</p>
            {[{e:'📧',t:'Email Us',d:'elandevie26@gmail.com'},{e:'📱',t:'WhatsApp',d:'+91 95995 82660 ,+91 98993 01022 ' },{e:'🌍',t:'Online Sessions',d:'Available globally via Zoom'},{e:'📅',t:'Response Time',d:'Within 24–48 business hours'}].map((d,i)=>(
              <div key={d.t} className={`cdet anim-up d${i+2}`}>
                <div className="cdet-ico">{d.e}</div>
                <div><h4>{d.t}</h4><p>{d.d}</p></div>
              </div>
            ))}
          </div>
          <div>
            <div className="con-form anim-right d1">
              <h3>Send us a message</h3>
              <div className="frow">
                <div className="fg"><label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={up('name')} /></div>
                <div className="fg"><label className="fl">Email *</label><input className="fi" type="email" placeholder="you@email.com" value={form.email} onChange={up('email')} /></div>
              </div>
              <div className="frow">
                <div className="fg"><label className="fl">Phone / WhatsApp</label><input className="fi" placeholder="+91 00000 00000" value={form.phone} onChange={up('phone')} /></div>
                <div className="fg"><label className="fl">Interested In</label>
                  <select className="fi" value={form.topic} onChange={up('topic')}>
                    <option value="">Select a topic</option>
                    {['Joining a Programme','Public Speaking Workshop','Expert-Led Sessions','School / Group Partnership','Upcoming Events','General Enquiry'].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg"><label className="fl">Message *</label><textarea className="fi" placeholder="Tell us about yourself..." value={form.message} onChange={up('message')} /></div>
              <button className="fsub" onClick={submit} disabled={status==='loading'}>{status==='loading'?'Sending...':'Send Message →'}</button>
              {status==='success'&&<div className="ok">✅ Message received! We'll respond within 24–48 hours.</div>}
              {status==='error'&&<div className="err">⚠ Please fill in Name, Email, and Message.</div>}
            </div>
            {subs.length>0&&(
              <div className="subs anim-up d3">
                <h4>Recent Messages ({subs.length})</h4>
                {[...subs].reverse().map(s=>(
                  <div key={s.id} className="sub-i">
                    <div className="sub-h"><span className="sub-nm">{s.name} <span style={{fontWeight:400,fontSize:11,color:'var(--muted)'}}>— {s.email}</span></span><span className="sub-tm">{s.time}</span></div>
                    {s.topic&&<div><span className="sub-tp">{s.topic}</span></div>}
                    <p className="sub-mg">{s.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{textAlign:'center', marginTop:32}} className="anim-up d3">
          <p style={{fontSize:14, color:'var(--mint-dark)', marginBottom:12}}>Interested in joining our programmes? Fill the short form to apply as a student.</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeyQ1PikQ-a0dVaFzk02yWkxPnwT6LAoEvJmJxfDyEAo4nchA/viewform?pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink"
            style={{textDecoration:'none'}}
          >
            Click on the Button to Google Form →
          </a>
        </div>
      </div>
    </section>
  );
}
