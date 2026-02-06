:root{
  --bg:#ffffff;
  --text:#0b0b0f;
  --muted:rgba(11,11,15,.6);
  --line:rgba(11,11,15,.12);
  --soft:rgba(11,11,15,.06);
  --radius:18px;
}

*{box-sizing:border-box}
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background:var(--bg);
  color:var(--text);
}

.wrap{max-width:1080px;margin:0 auto;padding:22px}
.muted{color:var(--muted)}
.small{font-size:12px}

.topbar{
  display:flex;align-items:center;justify-content:space-between;gap:18px;
  position:sticky;top:0;background:rgba(255,255,255,.85);backdrop-filter: blur(10px);
  border-bottom:1px solid var(--line);
}

.brand{display:flex;align-items:center;gap:12px}
.brand__logo{width:42px;height:42px;border-radius:12px;object-fit:cover;border:1px solid var(--line)}
.brand__name{font-weight:800;letter-spacing:.5px}
.brand__tag{font-size:12px;color:var(--muted)}

.nav{display:flex;gap:10px;flex-wrap:wrap}

.btn{
  display:inline-flex;align-items:center;justify-content:center;
  padding:10px 14px;border-radius:999px;
  border:1px solid var(--line);text-decoration:none;color:var(--text);
  font-weight:600;font-size:14px;
}
.btn--solid{background:var(--text);color:white;border-color:var(--text)}
.btn--ghost{background:transparent}
.btn:hover{transform:translateY(-1px)}
.btn:active{transform:translateY(0px)}

.hero{
  display:grid;grid-template-columns:1.1fr .9fr;gap:26px;
  padding-top:26px;padding-bottom:10px;
}
@media (max-width: 900px){
  .hero{grid-template-columns:1fr}
}

h1{font-size:48px;line-height:1.05;margin:0}
@media (max-width: 520px){ h1{font-size:38px} }

.lead{font-size:16px;line-height:1.6;margin:14px 0 0}
.cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.meta{margin-top:14px;font-size:13px;color:var(--muted)}
.label{color:rgba(11,11,15,.85);font-weight:700}

.hero__img{
  width:100%;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background:var(--soft);
  object-fit:cover;
}

.section{padding-top:34px}
.section__head{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
h2{margin:0;font-size:22px}

.grid{
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap:12px;
}
@media (max-width: 900px){ .grid{grid-template-columns: repeat(2, 1fr);} }
.grid img{
  width:100%; aspect-ratio:1/1; object-fit:cover;
  border-radius: var(--radius);
  border:1px solid var(--line);
  background:var(--soft);
}

.steps{
  display:grid;grid-template-columns:repeat(3,1fr);gap:12px;
}
@media (max-width: 900px){ .steps{grid-template-columns:1fr;} }

.card{
  border:1px solid var(--line);
  border-radius: var(--radius);
  padding:16px;
  background: #fff;
}
.step{
  width:34px;height:34px;border-radius:999px;
  display:flex;align-items:center;justify-content:center;
  border:1px solid var(--line);
  font-weight:800;
}
.card__title{margin-top:10px;font-weight:800}
.card__text{margin-top:6px;color:var(--muted);font-size:14px;line-height:1.55}

.links{display:flex;gap:10px;flex-wrap:wrap}

.footer{
  padding-top:30px;padding-bottom:50px;
  border-top:1px solid var(--line);
  margin-top:40px;
}
