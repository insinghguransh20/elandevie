import { useState, useEffect, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

    :root {
      --mint:       #A8F0C6;
      --mint2:      #7DE8AE;
      --mint3:      #52D98F;
      --mint-dark:  #1E9959;
      --mint-deep:  #0D6B3A;
      --mint-light: #C8F8DC;
      --mint-pale:  #E4FFF0;
      --forest:     #063B1E;
      --forest2:    #0A5229;
      --pink:       #FF4D8F;
      --pink2:      #FF7AAD;
      --pink-light: #FFD6E7;
      --dark:       #041A0D;
      --ink:        #0A2B14;
      --gray:       #2E6B48;
      --muted:      #4D8C66;
      --white:      #F0FFF5;
      --border:     rgba(30,153,89,0.25);
      --border2:    rgba(255,77,143,0.25);
      --card-bg:    rgba(255,255,255,0.55);
      --card-bg2:   rgba(255,255,255,0.35);
    }

    html { scroll-behavior:smooth; }
    body {
      font-family:'DM Sans',sans-serif;
      background: var(--mint);
      color: var(--ink);
      min-height: 100vh;
      overflow-x: hidden;
    }
    h1,h2,h3,h4 { font-family:'Fraunces',serif; }
    button { cursor:pointer; font-family:'DM Sans',sans-serif; }
    input,textarea,select { font-family:'DM Sans',sans-serif; }
    a { color:inherit; text-decoration:none; }

    /* ── BACKGROUND TEXTURE BLOBS ── */
    body::before {
      content:'';
      position:fixed; inset:0; pointer-events:none; z-index:0;
      background:
        radial-gradient(ellipse 700px 500px at 10% 15%, rgba(255,255,255,0.5) 0%, transparent 70%),
        radial-gradient(ellipse 500px 600px at 90% 80%, rgba(82,217,143,0.35) 0%, transparent 65%),
        radial-gradient(ellipse 400px 400px at 50% 50%, rgba(255,77,143,0.08) 0%, transparent 60%);
      animation: bgShift 18s ease-in-out infinite alternate;
    }
    @keyframes bgShift {
      0%   { opacity:1; }
      50%  { opacity:0.85; }
      100% { opacity:1; }
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp   { from{opacity:0;transform:translateY(44px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeLeft { from{opacity:0;transform:translateX(-50px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeRight{ from{opacity:0;transform:translateX(50px)}  to{opacity:1;transform:translateX(0)} }
    @keyframes popIn    { from{opacity:0;transform:scale(0.82)}       to{opacity:1;transform:scale(1)} }
    @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
    @keyframes bounce   { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(8px)} }
    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

    .anim-up    { opacity:0; }
    .anim-left  { opacity:0; }
    .anim-right { opacity:0; }
    .anim-pop   { opacity:0; }
    .anim-up.go    { animation:fadeUp    0.75s cubic-bezier(.16,1,.3,1) forwards; }
    .anim-left.go  { animation:fadeLeft  0.75s cubic-bezier(.16,1,.3,1) forwards; }
    .anim-right.go { animation:fadeRight 0.75s cubic-bezier(.16,1,.3,1) forwards; }
    .anim-pop.go   { animation:popIn     0.65s cubic-bezier(.16,1,.3,1) forwards; }
    .d0{animation-delay:0s!important} .d1{animation-delay:.12s!important} .d2{animation-delay:.24s!important}
    .d3{animation-delay:.36s!important} .d4{animation-delay:.48s!important} .d5{animation-delay:.6s!important}

    /* ── NAV ── */
    .nav {
      position:fixed; top:0; left:0; right:0; z-index:200;
      padding:0 5%;
      background: rgba(168,240,198,0.88);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(30,153,89,0.2);
    }
    .nav-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; height:64px; }
    .nav-logo  { display:flex; align-items:center; gap:10px; cursor:pointer; }
    .logo-mark {
      width:38px; height:38px; border-radius:50%;
      background:var(--forest2); color:var(--mint-pale);
      display:flex; align-items:center; justify-content:center;
      font-family:'Fraunces',serif; font-size:16px; font-weight:900;
      box-shadow: 0 4px 16px rgba(6,59,30,0.3);
    }
    .logo-text { font-family:'Fraunces',serif; font-size:18px; font-weight:700; color:var(--forest); }
    .logo-text span { color:var(--pink); font-style:italic; }
    .nav-links { display:flex; align-items:center; gap:2px; }
    .nav-btn   { padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500; color:var(--forest2); background:none; border:none; transition:all .2s; }
    .nav-btn:hover,.nav-btn.on { background:rgba(6,59,30,0.1); color:var(--forest); }
    .nav-cta {
      background:var(--forest2); color:var(--mint-pale);
      padding:9px 20px; border-radius:20px;
      font-size:13px; font-weight:700; border:none;
      box-shadow:0 4px 14px rgba(6,59,30,0.25); transition:all .25s;
    }
    .nav-cta:hover { background:var(--forest); transform:translateY(-2px); box-shadow:0 8px 24px rgba(6,59,30,0.3); }
    .burger { display:none; flex-direction:column; gap:5px; background:none; border:none; padding:4px; }
    .burger span { width:22px; height:2px; background:var(--forest); border-radius:2px; transition:all .3s; display:block; }
    .m-menu {
      display:none; position:fixed; top:64px; left:0; right:0; z-index:199;
      background:rgba(168,240,198,0.97); backdrop-filter:blur(20px);
      border-bottom:1px solid var(--border); padding:20px 5% 28px; flex-direction:column; gap:6px;
    }
    .m-menu.open { display:flex; }
    .m-menu .nav-btn { font-size:15px; padding:12px 16px; }
    .m-menu .nav-cta { margin-top:8px; text-align:center; padding:14px; font-size:15px; }

    /* ── HERO ── */
    .hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; }
    .hero-spline { position:absolute; inset:0; z-index:1; }
    .hero-spline spline-viewer { width:100%; height:100%; border:none; display:block; }
    .hero-veil {
      position:absolute; inset:0; z-index:2;
      background: linear-gradient(110deg,
        rgba(168,240,198,0.93) 0%,
        rgba(168,240,198,0.78) 45%,
        rgba(168,240,198,0.15) 100%);
    }
    .hero-content { position:relative; z-index:3; padding:130px 5% 90px; max-width:1200px; margin:0 auto; width:100%; }
    .hero-pill {
      display:inline-flex; align-items:center; gap:8px;
      border:1.5px solid rgba(6,59,30,0.2); background:rgba(6,59,30,0.08);
      padding:7px 16px; border-radius:20px;
      font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase;
      color:var(--forest2); margin-bottom:28px;
    }
    .pill-dot { width:6px; height:6px; background:var(--forest2); border-radius:50%; animation:pulse 2s infinite; }
    .hero h1 {
      font-size:clamp(38px,7.5vw,90px); font-weight:900; line-height:1.0;
      color:var(--forest); margin-bottom:24px; max-width:680px;
    }
    .hero h1 .h-pink { color:var(--pink); font-style:italic; display:block; }
    .hero h1 .h-dark { color:var(--forest); }
    .hero-sub { font-size:clamp(14px,1.8vw,18px); line-height:1.8; color:var(--gray); max-width:460px; margin-bottom:44px; font-weight:400; }
    .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
    .btn-dark {
      background:var(--forest2); color:var(--mint-pale);
      padding:14px 32px; border-radius:28px;
      font-size:15px; font-weight:700; border:none; transition:all .25s;
      box-shadow:0 6px 24px rgba(6,59,30,0.3);
    }
    .btn-dark:hover { background:var(--forest); transform:translateY(-3px); box-shadow:0 12px 32px rgba(6,59,30,0.4); }
    .btn-pink {
      background:var(--pink); color:white;
      padding:14px 28px; border-radius:28px;
      font-size:15px; font-weight:700; border:none; transition:all .25s;
      box-shadow:0 6px 20px rgba(255,77,143,0.3);
    }
    .btn-pink:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(255,77,143,0.4); }
    .hero-arrow { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); z-index:3; }
    .scroll-chev { display:block; width:22px; height:22px; border-right:2.5px solid var(--forest2); border-bottom:2.5px solid var(--forest2); transform:rotate(45deg); margin:0 auto; animation:bounce 1.8s infinite; }

    /* ── DECORATIVE RING (desktop hero) ── */
    .hero-ring {
      position:absolute; right:6%; top:50%; transform:translateY(-50%);
      width:420px; height:420px; z-index:3;
      display:flex; align-items:center; justify-content:center;
      pointer-events:none;
    }
    .ring-outer {
      position:absolute; inset:0; border-radius:50%;
      border:1.5px dashed rgba(6,59,30,0.2);
      animation:spinSlow 30s linear infinite;
    }
    .ring-inner {
      position:absolute; inset:40px; border-radius:50%;
      border:1px solid rgba(255,77,143,0.25);
      animation:spinSlow 20s linear infinite reverse;
    }
    @media(max-width:900px){ .hero-ring{display:none} }

    /* ── STATS ── */
    .stats-bar {
      background:var(--forest2); padding:36px 5%;
      border-top:1px solid rgba(255,255,255,0.1);
    }
    .stats-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
    .stat-item { text-align:center; padding:12px 16px; border-right:1px solid rgba(255,255,255,0.12); }
    .stat-item:last-child { border-right:none; }
    .stat-n {
      font-family:'Fraunces',serif; font-size:clamp(28px,4vw,50px); font-weight:900;
      color:var(--mint); line-height:1; display:block; margin-bottom:6px;
      background:linear-gradient(90deg,var(--mint),#fff,var(--mint));
      background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text; animation:shimmer 4s linear infinite;
    }
    .stat-l { font-size:12px; color:rgba(168,240,198,0.7); font-weight:400; }

    /* ── SECTION ── */
    .sec { padding:100px 5%; position:relative; z-index:1; }
    .sec-inner { max-width:1200px; margin:0 auto; }
    .lbl { font-size:11px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:var(--pink); margin-bottom:14px; }
    .sec-h { font-size:clamp(28px,4vw,52px); line-height:1.1; color:var(--forest); margin-bottom:18px; }
    .sec-h em { color:var(--mint-deep); font-style:italic; }
    .sec-h span { color:var(--pink); }
    .sec-p { font-size:15px; line-height:1.8; color:var(--muted); max-width:560px; font-weight:400; }

    /* glass card */
    .glass { background:rgba(255,255,255,0.55); backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,0.7); }
    .glass-dark { background:rgba(6,59,30,0.07); backdrop-filter:blur(10px); border:1px solid rgba(6,59,30,0.12); }

    /* ── VISION ── */
    .vis-sec { background:var(--forest2); }
    .vis-sec .lbl { color:var(--mint2); }
    .vis-sec .sec-h { color:var(--mint-pale); }
    .vis-sec .sec-h em { color:var(--mint); }
    .vis-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
    .vis-quote {
      font-family:'Fraunces',serif; font-size:clamp(17px,2.2vw,27px); font-style:italic;
      line-height:1.55; color:var(--mint-pale);
      border-left:3px solid var(--mint2); padding-left:24px; margin-bottom:28px;
    }
    .vis-body { font-size:15px; line-height:1.85; color:rgba(168,240,198,0.75); font-weight:300; }
    .vis-body p+p { margin-top:14px; }
    .vis-pillars { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .vpill {
      background:rgba(255,255,255,0.07); border:1px solid rgba(168,240,198,0.2);
      border-radius:14px; padding:20px; transition:all .3s;
    }
    .vpill:hover { background:rgba(255,255,255,0.12); transform:translateY(-4px); }
    .vpill-e { font-size:22px; margin-bottom:10px; }
    .vpill h4 { font-size:14px; font-weight:700; color:var(--mint); margin-bottom:6px; }
    .vpill p { font-size:13px; color:rgba(168,240,198,0.65); line-height:1.55; font-weight:300; }

    /* ── PROGRAMME ── */
    .prog-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; margin-top:52px; }
    .prog-card {
      background:rgba(255,255,255,0.6); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.8); border-radius:18px; padding:28px 24px;
      transition:all .35s; position:relative; overflow:hidden;
    }
    .prog-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:3px;
      background:linear-gradient(90deg, var(--mint-dark), var(--pink));
      transform:scaleX(0); transform-origin:left; transition:transform .35s;
    }
    .prog-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(6,59,30,0.15); background:rgba(255,255,255,0.75); }
    .prog-card:hover::before { transform:scaleX(1); }
    .prog-e { width:50px; height:50px; border-radius:12px; background:rgba(6,59,30,0.08); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:18px; }
    .prog-card h3 { font-size:17px; font-weight:700; color:var(--forest); margin-bottom:10px; }
    .prog-card p { font-size:13px; line-height:1.7; color:var(--muted); font-weight:400; }
    .prog-tag { display:inline-block; margin-top:14px; background:var(--pink-light); color:var(--pink); border:1px solid var(--border2); font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:4px 10px; border-radius:6px; }

    /* ── HOW IT WORKS ── */
    .hiw-bg { background:var(--mint-light); }
    .hiw-steps { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-top:64px; position:relative; }
    .hiw-steps::before { content:''; position:absolute; top:28px; left:10%; right:10%; height:2px; background:linear-gradient(to right,var(--mint-dark),var(--pink)); opacity:.3; }
    .hiw-step { text-align:center; padding:0 8px; position:relative; z-index:1; }
    .hiw-n {
      width:58px; height:58px; border-radius:50%;
      background:var(--forest2); color:var(--mint-pale);
      font-family:'Fraunces',serif; font-size:22px; font-weight:900;
      display:flex; align-items:center; justify-content:center;
      margin:0 auto 18px; box-shadow:0 6px 20px rgba(6,59,30,0.25);
    }
    .hiw-step h3 { font-size:13px; font-weight:700; color:var(--forest); margin-bottom:6px; }
    .hiw-step p { font-size:12px; line-height:1.55; color:var(--muted); font-weight:400; }
    .hiw-cta { text-align:center; margin-top:56px; }

    /* ── FOUNDERS ── */
    .founders-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:22px; margin-top:52px; }
    .fc {
      background:rgba(255,255,255,0.6); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.8); border-radius:18px; overflow:hidden;
      transition:all .3s;
    }
    .fc:hover { transform:translateY(-5px); box-shadow:0 20px 48px rgba(6,59,30,0.15); background:rgba(255,255,255,0.8); }
    .fc-banner { height:80px; background:linear-gradient(135deg,var(--forest2),var(--mint-dark)); position:relative; overflow:hidden; }
    .fc-banner::after { content:''; position:absolute; right:-20px; top:-20px; width:100px; height:100px; border-radius:50%; background:rgba(168,240,198,0.2); }
    .fc-body { padding:0 22px 26px; }
    .fc-avatar { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg,var(--pink),var(--mint-dark)); border:3px solid white; margin-top:-32px; display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-size:22px; font-weight:900; color:white; margin-bottom:12px; }
    .fc h3 { font-size:17px; font-weight:700; color:var(--forest); margin-bottom:4px; }
    .fc-role { font-size:11px; color:var(--pink); font-weight:700; letter-spacing:.5px; text-transform:uppercase; margin-bottom:10px; }
    .fc-bio { font-size:13px; line-height:1.65; color:var(--muted); font-weight:400; }

    /* ── EVENTS ── */
    .events-list { display:grid; gap:14px; margin-top:52px; }
    .ev {
      background:rgba(255,255,255,0.6); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.8); border-radius:14px; padding:22px 26px;
      display:grid; grid-template-columns:auto 1fr auto;
      gap:22px; align-items:center; transition:all .25s;
    }
    .ev:hover { background:rgba(255,255,255,0.8); transform:translateX(6px); box-shadow:0 8px 28px rgba(6,59,30,0.12); }
    .ev-date { text-align:center; background:var(--forest2); color:var(--mint-pale); border-radius:10px; padding:10px 14px; min-width:56px; }
    .ev-mo { font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; opacity:.8; }
    .ev-dy { font-family:'Fraunces',serif; font-size:28px; font-weight:900; line-height:1; }
    .ev-info h3 { font-size:15px; font-weight:700; color:var(--forest); margin-bottom:5px; }
    .ev-meta { font-size:12px; color:var(--muted); display:flex; gap:14px; flex-wrap:wrap; }
    .ev-badge { background:var(--pink-light); color:var(--pink); border:1px solid var(--border2); font-size:11px; font-weight:700; padding:5px 12px; border-radius:14px; white-space:nowrap; }

    /* ── CONTACT ── */
    .con-grid { display:grid; grid-template-columns:1fr 1.6fr; gap:64px; align-items:start; }
    .con-info h2 { font-size:clamp(26px,4vw,46px); line-height:1.12; margin-bottom:18px; }
    .con-sub { font-size:15px; line-height:1.75; color:var(--muted); margin-bottom:36px; font-weight:400; }
    .cdet { display:flex; align-items:flex-start; gap:14px; margin-bottom:20px; }
    .cdet-ico { width:40px; height:40px; border-radius:10px; background:rgba(6,59,30,0.08); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
    .cdet h4 { font-size:13px; font-weight:700; color:var(--forest); margin-bottom:2px; }
    .cdet p { font-size:13px; color:var(--muted); }
    .con-form { background:rgba(255,255,255,0.7); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.85); border-radius:22px; padding:36px 32px; }
    .con-form h3 { font-size:22px; margin-bottom:26px; color:var(--forest); }
    .frow { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .fg { margin-bottom:18px; }
    .fl { display:block; font-size:11px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:var(--forest2); margin-bottom:7px; }
    .fi {
      width:100%; padding:11px 14px;
      background:rgba(255,255,255,0.7); border:1.5px solid rgba(6,59,30,0.15);
      border-radius:9px; color:var(--ink); font-size:14px; outline:none; transition:border-color .2s;
    }
    .fi:focus { border-color:var(--mint-dark); background:rgba(255,255,255,0.9); }
    .fi::placeholder { color:rgba(46,107,72,0.45); }
    textarea.fi { min-height:110px; resize:vertical; }
    select.fi { appearance:none; cursor:pointer; }
    .fsub { width:100%; padding:14px; background:var(--forest2); color:var(--mint-pale); border:none; border-radius:12px; font-size:15px; font-weight:700; transition:all .25s; margin-top:4px; box-shadow:0 4px 18px rgba(6,59,30,0.25); }
    .fsub:hover:not(:disabled) { background:var(--forest); transform:translateY(-2px); box-shadow:0 8px 28px rgba(6,59,30,0.35); }
    .fsub:disabled { opacity:.6; cursor:not-allowed; }
    .ok { margin-top:14px; padding:14px 18px; border-radius:9px; background:rgba(6,59,30,0.08); border:1px solid var(--border); color:var(--forest2); font-size:14px; font-weight:600; text-align:center; }
    .err { color:var(--pink); font-size:13px; margin-top:10px; }
    .subs { margin-top:32px; }
    .subs h4 { font-size:15px; color:var(--forest); margin-bottom:14px; }
    .sub-i { background:rgba(255,255,255,0.55); border-radius:9px; border-left:3px solid var(--mint-dark); padding:12px 16px; margin-bottom:10px; }
    .sub-h { display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; flex-wrap:wrap; gap:6px; }
    .sub-nm { font-weight:700; color:var(--forest); font-size:13px; }
    .sub-tm { font-size:11px; color:var(--muted); }
    .sub-tp { display:inline-block; background:var(--pink-light); color:var(--pink); font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px; margin-bottom:5px; }
    .sub-mg { font-size:12px; color:var(--muted); line-height:1.5; }

    /* ── FOOTER ── */
    .footer { background:var(--forest); padding:60px 5% 28px; border-top:1px solid rgba(168,240,198,0.15); }
    .footer-inner { max-width:1200px; margin:0 auto; }
    .fg-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:44px; margin-bottom:44px; }
    .fb { font-family:'Fraunces',serif; font-size:19px; font-weight:700; color:var(--mint-pale); margin-bottom:10px; }
    .ft { font-size:13px; line-height:1.75; color:rgba(168,240,198,0.6); max-width:230px; font-weight:300; }
    .fc-col h4 { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--mint2); margin-bottom:16px; }
    .fc-col ul { list-style:none; }
    .fc-col li { margin-bottom:10px; }
    .fc-col a { font-size:13px; color:rgba(168,240,198,0.55); transition:color .2s; cursor:pointer; }
    .fc-col a:hover { color:var(--mint-pale); }
    .f-div { border:none; border-top:1px solid rgba(168,240,198,0.12); margin-bottom:22px; }
    .f-bot { display:flex; justify-content:space-between; align-items:center; font-size:12px; color:rgba(168,240,198,0.45); flex-wrap:wrap; gap:10px; }
    .f-mint { color:var(--mint2); font-family:'Fraunces',serif; font-style:italic; }

    /* ── MOBILE ── */
    @media(max-width:900px){
      .nav-links{display:none} .burger{display:flex}
      .stats-inner{grid-template-columns:repeat(2,1fr)}
      .stat-item:nth-child(2){border-right:none}
      .stat-item{border-bottom:1px solid rgba(255,255,255,0.1);padding:14px}
      .stat-item:last-child,.stat-item:nth-child(3){border-bottom:none}
      .vis-grid{grid-template-columns:1fr;gap:44px}
      .hiw-steps{grid-template-columns:1fr 1fr;gap:24px}
      .hiw-steps::before{display:none}
      .con-grid{grid-template-columns:1fr;gap:44px}
      .frow{grid-template-columns:1fr}
      .fg-grid{grid-template-columns:1fr 1fr;gap:28px}
      .ev{grid-template-columns:auto 1fr}
      .ev>:last-child{grid-column:span 2;text-align:left}
    }
    @media(max-width:560px){
      .sec{padding:70px 4%} .hero-content{padding:100px 4% 70px}
      .hero h1{font-size:clamp(32px,10vw,52px)}
      .vis-pillars,.prog-grid,.founders-grid{grid-template-columns:1fr}
      .hiw-steps{grid-template-columns:1fr}
      .fg-grid{grid-template-columns:1fr;gap:24px}
      .hero-btns{flex-direction:column;align-items:flex-start}
    }
  `}</style>
);

function useAnimate(pk) {
  useEffect(() => {
    const t = setTimeout(() => {
      const els = document.querySelectorAll('.anim-up,.anim-left,.anim-right,.anim-pop');
      if (!els.length) return;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('go'); obs.unobserve(e.target); } });
      }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
      els.forEach(el => { if (!el.classList.contains('go')) obs.observe(el); });
      return () => obs.disconnect();
    }, 60);
    return () => clearTimeout(t);
  }, [pk]);
}

function SplineBg() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    document.head.appendChild(s);
    const inject = () => {
      if (customElements.get('spline-viewer')) {
        const v = document.createElement('spline-viewer');
        v.setAttribute('url','https://prod.spline.design/V483NHVbC6o5HSZ1/scene.splinecode');
        v.style.cssText = 'width:100%;height:100%;border:none;display:block;';
        el.appendChild(v);
      } else { setTimeout(inject, 200); }
    };
    s.onload = inject;
    return () => { try { document.head.removeChild(s); } catch{} };
  }, []);
  return <div ref={ref} className="hero-spline" />;
}

const NAV = ["Vision","Programme","How It Works","Founders","Events","Contact"];

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => { setPage("Home"); setOpen(false); }}>
            <div className="logo-mark">É</div>
            <div className="logo-text">Élan <span>de Vie</span></div>
          </div>
          <div className="nav-links">
            {NAV.map(n => <button key={n} className={`nav-btn${page===n?" on":""}`} onClick={() => setPage(n)}>{n}</button>)}
            <button className="nav-cta" onClick={() => setPage("Contact")}>Register Now</button>
          </div>
          <button className="burger" onClick={() => setOpen(o=>!o)} aria-label="Menu">
            <span style={open?{transform:"rotate(45deg) translate(5px,5px)"}:{}} />
            <span style={open?{opacity:0}:{}} />
            <span style={open?{transform:"rotate(-45deg) translate(5px,-5px)"}:{}} />
          </button>
        </div>
      </nav>
      <div className={`m-menu${open?" open":""}`}>
        {NAV.map(n => <button key={n} className={`nav-btn${page===n?" on":""}`} onClick={() => { setPage(n); setOpen(false); }}>{n}</button>)}
        <button className="nav-cta" onClick={() => { setPage("Contact"); setOpen(false); }}>Register Now</button>
      </div>
    </>
  );
}

function HomePage({ setPage, pk }) {
  useAnimate(pk);
  return (
    <>
      <section className="hero">
        <SplineBg />
        <div className="hero-veil" />
        <div className="hero-ring">
          <div className="ring-outer" />
          <div className="ring-inner" />
        </div>
        <div className="hero-content">
          <div className="hero-pill anim-up d0"><span className="pill-dot" /> Youth Leadership & Communication</div>
          <h1 className="anim-up d1">
            Fostering <span className="h-dark">Confidence,</span>
            <span className="h-pink">Igniting Awareness</span>
          </h1>
          <p className="hero-sub anim-up d2">Empowering students to become confident speakers and socially aware leaders through transformative, interactive learning experiences.</p>
          <div className="hero-btns anim-up d3">
            <button className="btn-dark" onClick={() => setPage("Programme")}>Explore Programmes →</button>
            <button className="btn-pink" onClick={() => setPage("How It Works")}>How It Works</button>
          </div>
        </div>
        <div className="hero-arrow"><span className="scroll-chev" /></div>
      </section>

      <div className="stats-bar">
        <div className="stats-inner">
          {[["5+","Programmes"],["100%","Interactive"],["🌍","Global Mentors"],["∞","Potential Unlocked"]].map(([n,l],i)=>(
            <div key={l} className={`stat-item anim-up d${i}`}><span className="stat-n">{n}</span><div className="stat-l">{l}</div></div>
          ))}
        </div>
      </div>

      <section className="sec">
        <div className="sec-inner">
          <div style={{textAlign:"center",maxWidth:680,margin:"0 auto 52px"}}>
            <div className="lbl anim-up d0">What We Offer</div>
            <h2 className="sec-h anim-up d1">Programmes designed to <em>transform</em> how students communicate</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
            {[{e:"🎤",t:"Public Speaking",d:"Stage presence, delivery & confidence."},{e:"🌐",t:"Awareness Sessions",d:"Global issues & critical thinking."},{e:"🧠",t:"Debates & Activities",d:"Articulation and spontaneity."},{e:"🎓",t:"Expert Workshops",d:"Real-world insights from global pros."}].map((c,i)=>(
              <div key={c.t} className={`anim-pop d${i+1}`} style={{background:"rgba(255,255,255,0.55)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.8)",borderRadius:14,padding:"22px 18px",transition:"all .3s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 36px rgba(6,59,30,0.12)";e.currentTarget.style.background="rgba(255,255,255,0.8)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.background="rgba(255,255,255,0.55)";}}>
                <div style={{fontSize:28,marginBottom:10}}>{c.e}</div>
                <h3 style={{fontSize:15,fontWeight:700,color:"var(--forest)",marginBottom:7}}>{c.t}</h3>
                <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.65}}>{c.d}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:40}}>
            <button className="btn-dark anim-up d4" onClick={() => setPage("Programme")}>View All Programmes →</button>
          </div>
        </div>
      </section>
    </>
  );
}

function VisionPage({ pk }) {
  useAnimate(pk);
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
            {[{e:"💬",t:"Voice",d:"Every student deserves to be heard and equipped to speak confidently."},{e:"🌱",t:"Growth",d:"Continuous development through structured programmes and mentorship."},{e:"🔭",t:"Awareness",d:"Global issues build empathy and critical thinking."},{e:"🤝",t:"Community",d:"A supportive network of peers, mentors, and change-makers."}].map(p=>(
              <div key={p.t} className="vpill"><div className="vpill-e">{p.e}</div><h4>{p.t}</h4><p>{p.d}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgrammePage({ pk }) {
  useAnimate(pk);
  return (
    <section className="sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="lbl anim-up">Our Programmes & Offerings</div>
        <h2 className="sec-h anim-up d1">Thoughtfully built to create <em>confident communicators</em></h2>
        <p className="sec-p anim-up d2">Focused on building confidence, communication, and global awareness among students.</p>
        <div className="prog-grid">
          {[{e:"🎤",t:"Public Speaking Workshops",d:"Stage presence, speech delivery, and confidence building. Students learn to command attention and speak with clarity.",tag:"Core"},{e:"🌍",t:"Awareness Sessions",d:"Discussions on global and social issues to encourage critical thinking and globally informed perspectives.",tag:"Core"},{e:"🧠",t:"Activities & Debates",d:"Engaging exercises, group discussions, and debates to enhance articulation and the ability to think on your feet.",tag:"Interactive"},{e:"🎓",t:"Expert-Led Sessions",d:"Workshops by professionals from global leadership environments providing practical, real-world insights.",tag:"Premium"},{e:"📦",t:"Digital Learning Kits",d:"Curated kits including speech templates, global topic sheets, practice exercises, and exclusive recorded resources.",tag:"All Students"},{e:"🏆",t:"Showcase Events",d:"Opportunities to present to live audiences, receive mentor feedback, and celebrate growth as communicators.",tag:"Events"}].map((c,i)=>(
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

function HowPage({ setPage, pk }) {
  useAnimate(pk);
  return (
    <section className="sec hiw-bg" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>
          <div className="lbl anim-up">How It Works</div>
          <h2 className="sec-h anim-up d1">Your journey to becoming a <em>confident leader</em></h2>
          <p className="sec-p anim-up d2" style={{margin:"0 auto"}}>A structured approach ensuring every student experiences meaningful, lasting growth.</p>
        </div>
        <div className="hiw-steps">
          {[{n:1,t:"Register",d:"Fill out our short form to begin your journey."},{n:2,t:"Trial or Enrol",d:"Attend a paid trial or enrol directly into the programme."},{n:3,t:"Join the Community",d:"Attend your first workshop and meet peers and mentors."},{n:4,t:"Participate & Practice",d:"Engage in activities, debates, and speaking exercises."},{n:5,t:"Grow Confidently",d:"Develop skills, a global mindset, and confidence to lead."}].map((s,i)=>(
            <div key={s.n} className={`hiw-step anim-up d${i}`}>
              <div className="hiw-n">{s.n}</div><h3>{s.t}</h3><p>{s.d}</p>
            </div>
          ))}
        </div>
        <div className="hiw-cta anim-up d4">
          <button className="btn-dark" onClick={() => setPage("Contact")}>Register Now — It's Easy! →</button>
        </div>
      </div>
    </section>
  );
}

function FoundersPage({ pk }) {
  useAnimate(pk);
  return (
    <section className="sec" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="lbl anim-up">Meet the Founders</div>
        <h2 className="sec-h anim-up d1">The people behind <span>Élan de Vie</span></h2>
        <p className="sec-p anim-up d2">Passionate educators, communicators, and change-makers dedicated to empowering the next generation.</p>
        <div className="founders-grid">
          {[{init:"A",name:"Founder One",role:"Co-Founder & Director",bio:"A passionate advocate for youth empowerment with extensive experience in education, public speaking, and leadership development."},{init:"B",name:"Founder Two",role:"Co-Founder & Programme Lead",bio:"With a background in global affairs, they design programmes connecting students to the world's most pressing conversations."},{init:"C",name:"Founder Three",role:"Co-Founder & Mentor Lead",bio:"A skilled communicator with expertise in confidence coaching, workshop facilitation, and connecting students with global professionals."}].map((f,i)=>(
            <div key={f.name} className={`fc anim-pop d${i+1}`}>
              <div className="fc-banner" />
              <div className="fc-body">
                <div className="fc-avatar">{f.init}</div>
                <h3>{f.name}</h3><div className="fc-role">{f.role}</div><p className="fc-bio">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsPage({ setPage, pk }) {
  useAnimate(pk);
  const evs=[{month:"JUN",day:14,title:"Public Speaking Bootcamp — Intro Workshop",type:"Workshop",time:"10:00 AM – 1:00 PM",badge:"Open"},{month:"JUN",day:28,title:"Awareness Session: Youth & Climate Action",type:"Awareness",time:"4:00 PM – 6:00 PM",badge:"Open"},{month:"JUL",day:5,title:"Activities & Debate Night",type:"Interactive",time:"5:00 PM – 7:30 PM",badge:"Upcoming"},{month:"JUL",day:19,title:"Expert Session: Lessons from Global Leadership",type:"Expert",time:"3:00 PM – 5:00 PM",badge:"Upcoming"},{month:"AUG",day:2,title:"Student Showcase — End of Season Presentations",type:"Showcase",time:"2:00 PM – 5:00 PM",badge:"Save Date"}];
  return (
    <section className="sec hiw-bg" style={{paddingTop:120}}>
      <div className="sec-inner">
        <div className="lbl anim-up">Events & Workshops</div>
        <h2 className="sec-h anim-up d1">Upcoming <em>experiences</em> to join</h2>
        <p className="sec-p anim-up d2">Live sessions, workshops, and showcases to accelerate your growth.</p>
        <div className="events-list">
          {evs.map((e,i)=>(
            <div key={e.title} className={`ev anim-left d${i%3}`}>
              <div className="ev-date"><div className="ev-mo">{e.month}</div><div className="ev-dy">{e.day}</div></div>
              <div className="ev-info"><h3>{e.title}</h3><div className="ev-meta"><span>🕐 {e.time}</span><span>📌 {e.type}</span></div></div>
              <div style={{display:"flex",flexDirection:"column",gap:10,alignItems:"flex-end"}}>
                <span className="ev-badge">{e.badge}</span>
                <button style={{background:"var(--pink)",color:"white",border:"none",padding:"7px 16px",borderRadius:14,fontSize:12,fontWeight:700,cursor:"pointer"}} onClick={()=>setPage("Contact")}>Register</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage({ pk }) {
  useAnimate(pk);
  const [form,setForm]=useState({name:"",email:"",phone:"",topic:"",message:""});
  const [status,setStatus]=useState("idle");
  const [subs,setSubs]=useState([]);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("edv_contacts");if(r)setSubs(JSON.parse(r.value));}catch{}})();},[]);
  async function submit(){
    if(!form.name||!form.email||!form.message){setStatus("error");return;}
    setStatus("loading");
    const entry={...form,id:Date.now(),time:new Date().toLocaleString()};
    const updated=[...subs,entry];
    try{await window.storage.set("edv_contacts",JSON.stringify(updated));setSubs(updated);setForm({name:"",email:"",phone:"",topic:"",message:""});setStatus("success");setTimeout(()=>setStatus("idle"),4000);}catch{setStatus("error");}
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
            {[{e:"📧",t:"Email Us",d:"hello@elandevie.com"},{e:"📱",t:"WhatsApp",d:"Available for quick queries"},{e:"🌍",t:"Online Sessions",d:"Available globally via Zoom"},{e:"📅",t:"Response Time",d:"Within 24–48 business hours"}].map((d,i)=>(
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
                <div className="fg"><label className="fl">Full Name *</label><input className="fi" placeholder="Your name" value={form.name} onChange={up("name")} /></div>
                <div className="fg"><label className="fl">Email *</label><input className="fi" type="email" placeholder="you@email.com" value={form.email} onChange={up("email")} /></div>
              </div>
              <div className="frow">
                <div className="fg"><label className="fl">Phone / WhatsApp</label><input className="fi" placeholder="+91 00000 00000" value={form.phone} onChange={up("phone")} /></div>
                <div className="fg"><label className="fl">Interested In</label>
                  <select className="fi" value={form.topic} onChange={up("topic")}>
                    <option value="">Select a topic</option>
                    {["Joining a Programme","Public Speaking Workshop","Expert-Led Sessions","School / Group Partnership","Upcoming Events","General Enquiry"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg"><label className="fl">Message *</label><textarea className="fi" placeholder="Tell us about yourself..." value={form.message} onChange={up("message")} /></div>
              <button className="fsub" onClick={submit} disabled={status==="loading"}>{status==="loading"?"Sending...":"Send Message →"}</button>
              {status==="success"&&<div className="ok">✅ Message received! We'll respond within 24–48 hours.</div>}
              {status==="error"&&<div className="err">⚠ Please fill in Name, Email, and Message.</div>}
            </div>
            {subs.length>0&&(
              <div className="subs anim-up d3">
                <h4>Recent Messages ({subs.length})</h4>
                {[...subs].reverse().map(s=>(
                  <div key={s.id} className="sub-i">
                    <div className="sub-h"><span className="sub-nm">{s.name} <span style={{fontWeight:400,fontSize:11,color:"var(--muted)"}}>— {s.email}</span></span><span className="sub-tm">{s.time}</span></div>
                    {s.topic&&<div><span className="sub-tp">{s.topic}</span></div>}
                    <p className="sub-mg">{s.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="fg-grid">
          <div><div className="fb">Élan de Vie</div><p className="ft">Fostering confidence and igniting awareness in the next generation of leaders and communicators.</p></div>
          <div className="fc-col"><h4>Explore</h4><ul>{["Vision","Programme","How It Works","Events"].map(p=><li key={p}><a onClick={()=>setPage(p)}>{p}</a></li>)}</ul></div>
          <div className="fc-col"><h4>Connect</h4><ul>{["Contact","Founders"].map(p=><li key={p}><a onClick={()=>setPage(p)}>{p}</a></li>)}<li><a>Instagram</a></li><li><a>LinkedIn</a></li></ul></div>
          <div className="fc-col"><h4>Programmes</h4><ul>{["Public Speaking","Awareness Sessions","Debates","Expert Sessions","Learning Kits"].map(p=><li key={p}><a onClick={()=>setPage("Programme")}>{p}</a></li>)}</ul></div>
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

export default function App() {
  const [page, setPage] = useState("Home");
  const go = p => { setPage(p); setTimeout(() => window.scrollTo({top:0,behavior:"smooth"}), 10); };
  const pages = {
    Home: <HomePage setPage={go} pk={page} />,
    Vision: <VisionPage pk={page} />,
    Programme: <ProgrammePage pk={page} />,
    "How It Works": <HowPage setPage={go} pk={page} />,
    Founders: <FoundersPage pk={page} />,
    Events: <EventsPage setPage={go} pk={page} />,
    Contact: <ContactPage pk={page} />,
  };
  return (
    <>
      <G />
      <Navbar page={page} setPage={go} />
      <main style={{position:"relative",zIndex:1}}>{pages[page]}</main>
      <Footer setPage={go} />
    </>
  );
}
