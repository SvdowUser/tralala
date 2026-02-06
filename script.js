:root{
  --bg0:#050a16;
  --bg1:#071125;
  --card: rgba(20, 60, 140, 0.16);
  --card2: rgba(18, 44, 110, 0.22);
  --stroke: rgba(120, 190, 255, 0.18);
  --text: rgba(230, 245, 255, 0.92);
  --muted: rgba(210, 235, 255, 0.62);
  --blue: #52b8ff;
  --blue2:#1e7dff;
  --glow: rgba(82,184,255,.35);
  --glow2: rgba(30,125,255,.25);
  --shadow: rgba(0,0,0,.35);
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji";
  color:var(--text);
  background: radial-gradient(1200px 800px at 50% 15%, rgba(82,184,255,0.18), transparent 60%),
              radial-gradient(900px 600px at 70% 30%, rgba(30,125,255,0.14), transparent 55%),
              linear-gradient(180deg, var(--bg0), var(--bg1));
  overflow-x:hidden;
}

/* background stars */
.bg{
  position:fixed;
  inset:0;
  pointer-events:none;
  opacity:.75;
  background:
    radial-gradient(1px 1px at 20% 30%, rgba(180,230,255,.35) 40%, transparent 60%),
    radial-gradient(1px 1px at 70% 40%, rgba(180,230,255,.30) 40%, transparent 60%),
    radial-gradient(1px 1px at 40% 80%, rgba(180,230,255,.25) 40%, transparent 60%),
    radial-gradient(1px 1px at 85% 75%, rgba(180,230,255,.22) 40%, transparent 60%),
    radial-gradient(1px 1px at 55% 60%, rgba(180,230,255,.20) 40%, transparent 60%);
  filter: drop-shadow(0 0 12px rgba(82,184,255,.10));
}

/* Topbar */
.topbar{
  position:sticky;
  top:0;
  z-index:50;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:16px 18px;
  background: rgba(5,10,22,.55);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(120,190,255,.10);
}

.brand{
  display:flex; gap:10px; align-items:center;
  text-decoration:none;
  color:var(--text);
}

.brand-logo{
  width:34px; height:34px;
  object-fit:contain;
  filter: drop-shadow(0 0 10px rgba(82,184,255,.20));
}
.brand-text{
  font-weight:800;
  letter-spacing:.06em;
  font-size:14px;
  opacity:.92;
}
#logoText{ display:none; } /* will be enabled if logo missing */

.menu-btn{
  width:44px; height:44px;
  display:grid;
  place-items:center;
  gap:5px;
  background: transparent;
  border: 1px solid rgba(120,190,255,.16);
  border-radius:12px;
  cursor:pointer;
  box-shadow: 0 14px 35px rgba(0,0,0,.22);
}
.menu-btn span{
  display:block;
  width:18px; height:2px;
  background: rgba(230,245,255,.8);
  border-radius:999px;
}
.menu{
  position:absolute;
  right:18px;
  top:64px;
  display:none;
  flex-direction:column;
  min-width:180px;
  padding:10px;
  border-radius:14px;
  background: rgba(8,18,40,.78);
  border:1px solid rgba(120,190,255,.16);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 60px rgba(0,0,0,.35);
}
.menu a{
  padding:10px 12px;
  border-radius:10px;
  color: rgba(230,245,255,.88);
  text-decoration:none;
  font-weight:600;
}
.menu a:hover{
  background: rgba(82,184,255,.10);
  border: 1px solid rgba(82,184,255,.14);
}

/* Wrap */
.wrap{
  width:min(1100px, 92vw);
  margin:0 auto;
  padding: 22px 0 60px;
}

/* Audio toggle */
.audio-toggle{
  position:fixed;
  left:18px;
  bottom:18px;
  width:52px; height:52px;
  border-radius:16px;
  border:1px solid rgba(120,190,255,.18);
  background: rgba(8,18,40,.72);
  backdrop-filter: blur(14px);
  color: rgba(230,245,255,.88);
  display:grid;
  place-items:center;
  cursor:pointer;
  box-shadow: 0 18px 60px rgba(0,0,0,.35);
}
.audio-toggle.on{
  box-shadow: 0 0 0 1px rgba(82,184,255,.22), 0 0 32px rgba(82,184,255,.22), 0 18px 60px rgba(0,0,0,.35);
}

/* Hero */
.hero{
  display:grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 26px;
  align-items:center;
  padding: 34px 0 10px;
}

.pill{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 14px;
  border-radius:999px;
  border:1px solid rgba(82,184,255,.18);
  background: rgba(82,184,255,.08);
  font-weight:700;
  letter-spacing:.08em;
  font-size:12px;
  color: rgba(230,245,255,.8);
  box-shadow: 0 0 30px rgba(82,184,255,.10);
}

.title{
  margin:18px 0 8px;
  font-size: clamp(40px, 6vw, 74px);
  line-height:1.02;
  letter-spacing:.02em;
}
.title-glow{
  text-shadow:
    0 0 18px rgba(82,184,255,.22),
    0 0 42px rgba(30,125,255,.16);
}

.subtitle{
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 15px;
}

.cta-row{ display:flex; gap:12px; flex-wrap:wrap; }

.btn{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  padding: 12px 16px;
  border-radius:14px;
  text-decoration:none;
  color: rgba(230,245,255,.9);
  border:1px solid rgba(120,190,255,.18);
  background: rgba(8,18,40,.38);
  backdrop-filter: blur(10px);
  font-weight:800;
  letter-spacing:.04em;
  cursor:pointer;
  transition: transform .12s ease, box-shadow .2s ease, background .2s ease;
}
.btn:hover{ transform: translateY(-1px); }
.btn.primary{
  background: linear-gradient(180deg, rgba(82,184,255,.30), rgba(30,125,255,.14));
  box-shadow: 0 0 0 1px rgba(82,184,255,.18), 0 0 26px rgba(82,184,255,.16);
}
.btn.ghost{
  background: rgba(8,18,40,.46);
}
.btn.small{
  padding: 10px 12px;
  border-radius: 12px;
}

.portal{
  position:relative;
  width: min(360px, 72vw);
  aspect-ratio: 1/1;
  margin-left:auto;
  border-radius: 999px;
  background:
    radial-gradient(circle at 50% 50%, rgba(82,184,255,.22), transparent 56%),
    radial-gradient(circle at 50% 50%, rgba(30,125,255,.14), transparent 70%);
  border: 1px solid rgba(120,190,255,.14);
  box-shadow: 0 0 70px rgba(82,184,255,.12);
  display:grid;
  place-items:center;
  overflow:hidden;
}
.portal::before{
  content:"";
  position:absolute;
  inset:-20%;
  background: radial-gradient(circle at 50% 40%, rgba(82,184,255,.14), transparent 55%);
  filter: blur(8px);
}

.hero-img{
  width: 68%;
  height:auto;
  opacity:0;
  transform: translateY(6px) scale(.98);
  filter: drop-shadow(0 18px 55px rgba(0,0,0,.45));
  transition: opacity .35s ease, transform .35s ease;
}
.hero-img.loaded{
  opacity:1;
  transform: translateY(0) scale(1);
}

/* Sections */
.section{
  margin-top: 34px;
  padding: 26px 0 10px;
  position:relative;
}
.section::before{
  content:"";
  position:absolute;
  left:0; right:0;
  top:-10px;
  height:1px;
  background: linear-gradient(90deg, transparent, rgba(82,184,255,.18), transparent);
}
.section-head{
  margin-bottom: 16px;
}
.section-title{
  margin:0;
  font-size: clamp(26px, 3.2vw, 40px);
  letter-spacing:.08em;
  text-shadow: 0 0 18px rgba(82,184,255,.18);
}
.section-sub{
  margin:8px 0 0;
  color: var(--muted);
  font-size: 14px;
}

/* Token grid */
.grid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.card{
  padding: 16px 16px 14px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(20,60,140,.18), rgba(8,18,40,.30));
  border: 1px solid rgba(120,190,255,.16);
  box-shadow: 0 22px 70px rgba(0,0,0,.22);
}
.card-top{ display:flex; align-items:center; gap:10px; }
.icon{
  width:38px; height:38px;
  border-radius: 12px;
  display:grid;
  place-items:center;
  border: 1px solid rgba(82,184,255,.18);
  background: rgba(82,184,255,.08);
  color: rgba(230,245,255,.82);
  box-shadow: 0 0 26px rgba(82,184,255,.10);
}
.icon svg{ width:20px; height:20px; color: rgba(230,245,255,.8); }
.label{ font-weight:800; color: rgba(230,245,255,.80); letter-spacing:.02em; font-size:13px; }
.value{ margin-top:10px; font-weight:900; font-size: 22px; letter-spacing:.02em; }
.muted{ color: var(--muted); font-size: 12px; margin-top:6px; }

/* Contract */
.contract{
  margin-top: 14px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(8,18,40,.42);
  border: 1px solid rgba(120,190,255,.16);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}
.contract-title{
  font-size: 12px;
  letter-spacing:.12em;
  color: rgba(230,245,255,.72);
  font-weight:800;
}
.contract-box{
  margin-top:8px;
  padding: 12px 12px;
  border-radius: 14px;
  background: rgba(82,184,255,.08);
  border: 1px solid rgba(82,184,255,.14);
  color: rgba(230,245,255,.88);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 12px;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 68vw;
}

/* Steps */
.steps{
  display:grid;
  gap: 12px;
}
.step{
  display:flex;
  align-items:center;
  gap: 12px;
  padding: 14px 14px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(20,60,140,.16), rgba(8,18,40,.28));
  border: 1px solid rgba(120,190,255,.16);
  box-shadow: 0 22px 70px rgba(0,0,0,.18);
}
.step-ic{
  width:40px; height:40px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  border: 1px solid rgba(82,184,255,.18);
  background: rgba(82,184,255,.08);
  box-shadow: 0 0 26px rgba(82,184,255,.10);
}
.step-ic svg{ width:20px; height:20px; color: rgba(230,245,255,.86); }
.step-text{ flex:1; }
.step-title{ font-weight:900; letter-spacing:.02em; }
.step-sub{ margin-top:4px; color: var(--muted); font-size: 12px; }
.step-n{
  font-weight:900;
  letter-spacing:.10em;
  color: rgba(230,245,255,.42);
}

/* Join */
.join-grid{
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.join-card{
  display:flex;
  align-items:center;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  text-decoration:none;
  color: rgba(230,245,255,.9);
  background: rgba(8,18,40,.40);
  border: 1px solid rgba(120,190,255,.16);
  box-shadow: 0 22px 70px rgba(0,0,0,.18);
}
.join-card:hover{
  border-color: rgba(82,184,255,.22);
  box-shadow: 0 0 0 1px rgba(82,184,255,.12), 0 22px 70px rgba(0,0,0,.20);
}
.join-ic{
  width:44px; height:44px;
  border-radius: 14px;
  display:grid;
  place-items:center;
  background: rgba(82,184,255,.08);
  border: 1px solid rgba(82,184,255,.16);
  font-weight:1000;
  letter-spacing:.06em;
  color: rgba(230,245,255,.86);
}
.join-ic svg{ width:20px; height:20px; color: rgba(230,245,255,.86); }
.join-title{ font-weight:900; }
.join-sub{ margin-top:4px; color: var(--muted); font-size: 12px; }

/* Gallery */
.gallery{
  display:grid;
  grid-template-columns: 52px 1fr 52px;
  align-items:center;
  gap: 12px;
}
.gal-btn{
  width:52px; height:52px;
  border-radius:16px;
  border:1px solid rgba(120,190,255,.16);
  background: rgba(8,18,40,.50);
  color: rgba(230,245,255,.88);
  font-size: 22px;
  cursor:pointer;
  backdrop-filter: blur(12px);
}
.gal-frame{
  border-radius: 22px;
  overflow:hidden;
  border:1px solid rgba(120,190,255,.16);
  background: linear-gradient(180deg, rgba(20,60,140,.14), rgba(8,18,40,.24));
  box-shadow: 0 22px 70px rgba(0,0,0,.18);
  position:relative;
  min-height: 240px;
  display:grid;
  place-items:center;
}
.gal-frame img{
  width:100%;
  height: 340px;
  object-fit: cover;
  display:block;
  opacity: .92;
}
.gal-cap{
  position:absolute;
  left:14px;
  right:14px;
  bottom:12px;
  padding:10px 12px;
  border-radius: 14px;
  background: rgba(5,10,22,.55);
  border: 1px solid rgba(120,190,255,.16);
  color: rgba(230,245,255,.86);
  font-weight:700;
  font-size: 12px;
  backdrop-filter: blur(12px);
}

/* Buy */
.buy-row{ display:flex; gap:12px; flex-wrap:wrap; margin-top: 10px; }

.footer{
  padding: 30px 0 10px;
  text-align:center;
}
.small-note{ font-size:12px; }

/* Responsive */
@media (max-width: 920px){
  .hero{ grid-template-columns: 1fr; }
  .portal{ margin: 16px auto 0; }
  .grid{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px){
  .wrap{ width: 92vw; }
  .grid{ grid-template-columns: 1fr; }
  .join-grid{ grid-template-columns: 1fr; }
  .gallery{ grid-template-columns: 44px 1fr 44px; }
  .gal-btn{ width:44px; height:44px; border-radius:14px; }
  .gal-frame img{ height: 260px; }
  .contract-box{ max-width: 78vw; }
}
