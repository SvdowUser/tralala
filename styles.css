:root{
  --bg1:#040712;
  --bg2:#061627;
  --text:#eaf2ff;
  --muted:rgba(234,242,255,.65);
  --line:rgba(234,242,255,.10);

  --teal:#45d3ff;
  --blue:#2a7bff;
  --glow: rgba(69,211,255,.35);

  --radius:20px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color:var(--text);
  background:
    radial-gradient(1200px 600px at 50% -10%, rgba(69,211,255,.20), transparent 55%),
    radial-gradient(900px 600px at 20% 20%, rgba(42,123,255,.18), transparent 60%),
    linear-gradient(180deg, var(--bg1), var(--bg2));
  overflow-x:hidden;
}

/* Stars */
body:before{
  content:"";
  position:fixed; inset:0;
  background-image:
    radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.35) 45%, transparent 46%),
    radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,.25) 45%, transparent 46%),
    radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,.20) 45%, transparent 46%),
    radial-gradient(2px 2px at 40% 80%, rgba(255,255,255,.22) 45%, transparent 46%);
  background-size: 600px 600px;
  pointer-events:none;
  opacity:.6;
  filter: blur(.2px);
}

.wrap{max-width:1100px;margin:0 auto;padding:18px 18px 70px}

.topbar{
  position:sticky; top:0; z-index:50;
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 16px;
  background: rgba(4,7,18,.55);
  backdrop-filter: blur(12px);
  border-bottom:1px solid var(--line);
}

.brand{display:flex;align-items:center;gap:12px}
.brand__logo{
  width:44px;height:44px; border-radius:14px; object-fit:cover;
  border:1px solid var(--line);
  box-shadow: 0 0 30px rgba(69,211,255,.12);
}
.brand__name{font-weight:900;letter-spacing:.6px}
.brand__tag{font-size:12px;color:var(--muted)}

.topbar__right{display:flex;gap:10px}
.iconbtn{
  width:42px;height:42px;
  border-radius:14px;
  border:1px solid var(--line);
  background: rgba(255,255,255,.04);
  color:var(--text);
  cursor:pointer;
}
.iconbtn:hover{transform:translateY(-1px)}
.iconbtn:active{transform:translateY(0px)}

.sheet{
  position:fixed; top:64px; right:14px;
  width:220px;
  background: rgba(6,22,39,.88);
  border:1px solid var(--line);
  border-radius:18px;
  padding:10px;
  display:none;
  z-index:60;
}
.sheet.show{display:block}
.sheet__link{
  display:block;
  padding:10px 12px;
  border-radius:14px;
  color:var(--text);
  text-decoration:none;
}
.sheet__link:hover{background: rgba(255,255,255,.06)}

.hero{padding:44px 0 18px}
.hero__center{display:flex;flex-direction:column;align-items:center;text-align:center}

.portal{
  position:relative;
  width:min(520px, 92vw);
  height: 420px;
  display:flex;align-items:center;justify-content:center;
  margin-bottom:10px;
}
.portal__glow{
  position:absolute; inset:60px 70px;
  background: radial-gradient(circle at 50% 50%, rgba(69,211,255,.40), transparent 70%);
  filter: blur(2px);
  opacity:1;
}
.portal__ring{
  position:absolute;
  width: 340px; height: 340px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 50% 50%, rgba(69,211,255,.18), transparent 60%),
    radial-gradient(circle at 50% 50%, transparent 48%, rgba(69,211,255,.35) 52%, transparent 70%);
  box-shadow:
    0 0 70px rgba(69,211,255,.22),
    inset 0 0 40px rgba(42,123,255,.18);
  border: 1px solid rgba(69,211,255,.16);
  animation: ringPulse 2.6s ease-in-out infinite;
}

@keyframes ringPulse{
  0%,100%{transform:scale(1); filter:blur(.0px)}
  50%{transform:scale(1.02); filter:blur(.2px)}
}

/* Floating character */
.character{
  width:min(360px, 72vw);
  max-height: 360px;
  object-fit:contain;
  z-index:3;
  filter: drop-shadow(0 18px 50px rgba(0,0,0,.55));
  animation: floaty 3.2s ease-in-out infinite;
}
@keyframes floaty{
  0%,100%{transform: translateY(0px)}
  50%{transform: translateY(-14px)}
}

.title{
  margin:6px 0 0;
  font-size:52px;
  font-weight:950;
  letter-spacing: 1px;
  text-shadow: 0 0 28px rgba(69,211,255,.18);
}
.subtitle{margin:10px 0 18px;color:var(--muted);max-width:720px;line-height:1.55}

.actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:6px}

.btn{
  display:inline-flex; align-items:center; justify-content:center;
  padding:14px 18px;
  border-radius: 18px;
  border:1px solid var(--line);
  text-decoration:none;
  font-weight:800;
  letter-spacing:.6px;
  color:var(--text);
  background: rgba(255,255,255,.04);
  min-width: 170px;
}
.btn--primary{
  background: linear-gradient(180deg, rgba(69,211,255,.28), rgba(42,123,255,.18));
  border-color: rgba(69,211,255,.25);
  box-shadow: 0 0 40px rgba(69,211,255,.14);
}
.btn:hover{transform:translateY(-1px)}
.btn:active{transform:translateY(0px)}

.pillrow{
  display:flex;gap:10px;flex-wrap:wrap;justify-content:center;
  margin-top:14px;
}
.pill{
  padding:10px 12px;
  border-radius: 999px;
  border:1px solid var(--line);
  background: rgba(255,255,255,.03);
  color: var(--muted);
  font-size: 13px;
}

.section{padding:34px 0 0}
.section__head{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.section__head h2{
  margin:0;
  font-size:26px;
  letter-spacing:1px;
}
.section__head p{margin:0;color:var(--muted)}

.cards{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:14px;
}
@media (max-width: 920px){
  .cards{grid-template-columns:1fr}
  .portal{height:380px}
  .title{font-size:42px}
}

.card{
  border:1px solid var(--line);
  background: rgba(255,255,255,.03);
  border-radius: var(--radius);
  padding:18px;
  box-shadow: 0 0 50px rgba(0,0,0,.20);
}
.card__icon{
  width:44px;height:44px;border-radius:16px;
  display:flex;align-items:center;justify-content:center;
  background: rgba(69,211,255,.10);
  border:1px solid rgba(69,211,255,.14);
  margin-bottom:10px;
}
.card__title{font-weight:900;letter-spacing:.6px}
.card__big{
  font-size:30px;
  font-weight:950;
  margin-top:8px;
}
.card__text{color:var(--muted);margin-top:8px;line-height:1.55;font-size:14px}

.contract{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  border:1px solid var(--line);
  background: rgba(255,255,255,.03);
  border-radius: var(--radius);
  padding:14px 14px;
}
.contract code{
  color: rgba(234,242,255,.90);
  font-size: 14px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  max-width: 75%;
}
.copybtn{
  border:1px solid rgba(69,211,255,.20);
  background: rgba(69,211,255,.12);
  color:var(--text);
  border-radius:14px;
  padding:10px 12px;
  cursor:pointer;
  font-weight:900;
}
.hint{color:var(--muted);font-size:12px;margin-top:8px}

.grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:12px;
}
@media (max-width: 920px){
  .grid{grid-template-columns: repeat(2, 1fr);}
}
.ph{
  border:1px solid var(--line);
  background: rgba(255,255,255,.03);
  border-radius: var(--radius);
  padding:18px;
  color: rgba(234,242,255,.45);
  text-align:center;
  min-height: 140px;
  display:flex;align-items:center;justify-content:center;
}

.footer{
  margin-top:40px;
  padding-top:18px;
  border-top:1px solid var(--line);
  color:var(--muted);
  font-size:12px;
  text-align:center;
}
