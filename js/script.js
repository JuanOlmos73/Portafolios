// ---------- data (real content only) ----------
const techData = {
  frontend:[["HTML"],["CSS"],["JavaScript"],["TypeScript"],["Angular"],["React"],["Bootstrap"]],
  backend:[["Java"],["Python"],["Node.js"],["Spring Boot"],["Oracle JET"],["APIs REST"],["Microservicios"],["JWT"],["JDBC"]],
  database:[["SQL"],["PL/SQL"],["Oracle DB"],["PostgreSQL"]],
  devops:[["Docker"],["GitHub"],["Git"],["Maven"],["JasperSoft"],["Postman"]],
  tools:[["Jira"],["Trello"],["Scrum"],["Kanban"],["Git Flow"]]
};
const certs = [
  {t:"JavaScript Moderno", meta:"53.5 h · 2024", src:"assets/JsCertificadoUdemy.png", plat:"Udemy"},
  {t:"Java y Jakarta EE", meta:"50 h · 2024", src:"assets/javaCertificadoUdemy.png", plat:"Udemy"},
  {t:"Oracle PL/SQL", meta:"12 h · 2024", src:"assets/plsqlCertificadoUdemy.png", plat:"Udemy"},
  {t:"SQL Avanzado", meta:"21 h · 2023", src:"assets/sqlCertificadoUdemy.png", plat:"Udemy"},
  {t:"Java", meta:"23 h · 2023", src:"assets/javaCertificado2023Udemy.png", plat:"Udemy"},
  {t:"JavaScript ES9", meta:"19 h · 2022", src:"assets/JscriptES9Udemy.png", plat:"Udemy"},
  {t:"SQL Básico", meta:"2 h · 2022", src:"assets/SQLbasicoUdemy.png", plat:"Udemy"},
  {t:"Introducción a la Seguridad Cibernética", meta:"2019", src:"/assets/CiberSeguridadCisco.png", plat:"Cisco"}
];

const CERT_BASE = "https://juanolmos73.github.io/Portafolios/";

// ---------- cert rail ----------
const certScroll = document.getElementById('certScroll');
certs.forEach(c=>{
  const el = document.createElement('div');
  el.className='cert-card';
  el.innerHTML = `<div class="cert-thumb"><img src="${CERT_BASE}${c.src}" alt="${c.t}" loading="lazy"></div>
    <div class="cert-body">
      <div class="cert-title">${c.t}</div>
      <div class="cert-meta"><span>${c.meta}</span><span>${c.plat}</span></div>
    </div>`;
  certScroll.appendChild(el);
});

// ---------- hero schema graph ----------
function buildSchemaSVG(container, opts){
  const w = 480, h = 520;
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  container.appendChild(svg);

  const nodes = [
    {x:240,y:80,r:26,label:"CORE"},
    {x:100,y:180,r:16,label:"UI"},
    {x:380,y:170,r:16,label:"API"},
    {x:70,y:320,r:14,label:"JS"},
    {x:200,y:300,r:18,label:"NODE"},
    {x:340,y:320,r:14,label:"SQL"},
    {x:420,y:290,r:14,label:"PLSQL"},
    {x:150,y:430,r:14,label:"REACT"},
    {x:290,y:440,r:14,label:"DOCKER"},
    {x:400,y:420,r:14,label:"GIT"}
  ];
  const links = [[0,1],[0,2],[1,3],[1,7],[0,4],[4,5],[4,6],[2,6],[4,8],[4,9]];

  const g = document.createElementNS("http://www.w3.org/2000/svg","g");
  links.forEach(([a,b])=>{
    const l = document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute("x1",nodes[a].x);l.setAttribute("y1",nodes[a].y);
    l.setAttribute("x2",nodes[b].x);l.setAttribute("y2",nodes[b].y);
    l.setAttribute("class","schema-link");
    g.appendChild(l);
  });
  svg.appendChild(g);

  nodes.forEach((n,i)=>{
    const grp = document.createElementNS("http://www.w3.org/2000/svg","g");
    grp.setAttribute("class","schema-node"+(i===0?" lit":""));
    const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",n.x);c.setAttribute("cy",n.y);c.setAttribute("r",n.r);
    grp.appendChild(c);
    const t = document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",n.x);t.setAttribute("y",n.y+n.r+16);
    t.setAttribute("text-anchor","middle");
    t.setAttribute("class","schema-label");
    t.textContent = n.label;
    grp.appendChild(t);
    svg.appendChild(grp);
  });

  // ambient pulse: cycle "lit" node
  let active = 0;
  setInterval(()=>{
    const groups = svg.querySelectorAll('.schema-node');
    groups.forEach(g=>g.classList.remove('lit'));
    g.querySelectorAll('line').forEach(l=>l.classList.remove('lit'));
    groups[active].classList.add('lit');
    links.forEach(([a,b],idx)=>{
      if(a===active||b===active) g.children[idx].classList.add('lit');
    });
    active = (active+1) % nodes.length;
  }, 1400);

  // mouse parallax
  container.addEventListener('mousemove', (e)=>{
    const rect = container.getBoundingClientRect();
    const px = (e.clientX-rect.left)/rect.width - .5;
    const py = (e.clientY-rect.top)/rect.height - .5;
    svg.style.transform = `rotateY(${px*8}deg) rotateX(${-py*8}deg)`;
  });
  container.addEventListener('mouseleave', ()=>{ svg.style.transform = ''; });
  svg.style.transition = 'transform .4s ease-out';
  container.style.perspective = '900px';
}
buildSchemaSVG(document.getElementById('heroSchema'));

// ---------- stack graph ----------
function buildStackGraph(){
  const container = document.getElementById('stackGraph');
  const w = 640, h = 480;
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  container.appendChild(svg);

  const catPos = {
    frontend:{x:120,y:110}, backend:{x:500,y:110},
    database:{x:320,y:260}, devops:{x:130,y:400}, tools:{x:500,y:400}
  };
  const catColor = {frontend:1,backend:1,database:1,devops:1,tools:1};
  let allNodes = [];
  Object.entries(techData).forEach(([cat, items])=>{
    const base = catPos[cat];
    items.forEach(([name], i)=>{
      const angle = (i/items.length) * Math.PI*2;
      const rad = 42 + items.length*4;
      allNodes.push({
        cat, name,
        x: base.x + Math.cos(angle+i)*rad*0.9,
        y: base.y + Math.sin(angle+i)*rad*0.9
      });
    });
  });
  // simple center hub per category, links from hub to items
  const hubs = Object.entries(catPos).map(([cat,p])=>({cat, x:p.x, y:p.y}));

  const linkG = document.createElementNS("http://www.w3.org/2000/svg","g");
  const nodeG = document.createElementNS("http://www.w3.org/2000/svg","g");

  hubs.forEach(hub=>{
    allNodes.filter(n=>n.cat===hub.cat).forEach(n=>{
      const l = document.createElementNS("http://www.w3.org/2000/svg","line");
      l.setAttribute("x1",hub.x);l.setAttribute("y1",hub.y);
      l.setAttribute("x2",n.x);l.setAttribute("y2",n.y);
      l.setAttribute("class","tech-link");
      l.dataset.cat = hub.cat;
      linkG.appendChild(l);
    });
  });
  const hubLinks = [["frontend","backend"],["backend","database"],["frontend","devops"],["backend","tools"],["database","devops"]];
  hubLinks.forEach(([a,b])=>{
    const ha = hubs.find(h=>h.cat===a), hb = hubs.find(h=>h.cat===b);
    const l = document.createElementNS("http://www.w3.org/2000/svg","line");
    l.setAttribute("x1",ha.x);l.setAttribute("y1",ha.y);
    l.setAttribute("x2",hb.x);l.setAttribute("y2",hb.y);
    l.setAttribute("class","tech-link");
    l.dataset.hublink = "1";
    linkG.appendChild(l);
  });

  svg.appendChild(linkG);

  hubs.forEach(hub=>{
    const grp = document.createElementNS("http://www.w3.org/2000/svg","g");
    grp.setAttribute("class","tech-node hi");
    grp.dataset.cat = hub.cat;
    const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",hub.x);c.setAttribute("cy",hub.y);c.setAttribute("r",20);
    grp.appendChild(c);
    const t = document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",hub.x);t.setAttribute("y",hub.y+4);
    t.setAttribute("text-anchor","middle");
    t.textContent = hub.cat.slice(0,4).toUpperCase();
    grp.appendChild(t);
    nodeG.appendChild(grp);
  });

  allNodes.forEach(n=>{
    const grp = document.createElementNS("http://www.w3.org/2000/svg","g");
    grp.setAttribute("class","tech-node");
    grp.dataset.cat = n.cat;
    const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx",n.x);c.setAttribute("cy",n.y);c.setAttribute("r",11);
    grp.appendChild(c);
    const t = document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x",n.x);t.setAttribute("y",n.y+n.r_offset||n.y+20);
    t.setAttribute("y", n.y+22);
    t.setAttribute("text-anchor","middle");
    t.textContent = n.name;
    grp.appendChild(t);

    grp.addEventListener('mouseenter', ()=> highlightCat(n.cat));
    grp.addEventListener('mouseleave', ()=> highlightCat('all'));
    nodeG.appendChild(grp);
  });
  svg.appendChild(nodeG);

  function highlightCat(cat){
    const nodes = svg.querySelectorAll('.tech-node');
    const links = svg.querySelectorAll('.tech-link');
    if(cat==='all'){
      nodes.forEach(n=>n.classList.remove('dim','hi'));
      svg.querySelectorAll('g[data-cat]').forEach(g=>{ if(hubs.find(h=>h.cat===g.dataset.cat)) g.classList.add('hi'); });
      links.forEach(l=>l.classList.remove('hi'));
      return;
    }
    nodes.forEach(n=>{
      if(n.dataset.cat===cat){ n.classList.add('hi'); n.classList.remove('dim'); }
      else { n.classList.add('dim'); n.classList.remove('hi'); }
    });
    links.forEach(l=>{
      if(l.dataset.cat===cat){ l.classList.add('hi'); }
      else { l.classList.remove('hi'); }
    });
  }
  highlightCat('all');

  // legend interaction
  document.querySelectorAll('.stack-cat').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.stack-cat').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      highlightCat(btn.dataset.cat);
    });
    btn.addEventListener('mouseenter', ()=> highlightCat(btn.dataset.cat));
    btn.addEventListener('mouseleave', ()=>{
      const active = document.querySelector('.stack-cat.active');
      highlightCat(active ? active.dataset.cat : 'all');
    });
  });
}
buildStackGraph();

// ---------- timeline reveal ----------
const tlObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); });
}, {threshold:.35});
document.querySelectorAll('.tl-item').forEach(el=>tlObserver.observe(el));

// ---------- rail + nav active state ----------
const railLinks = document.querySelectorAll('.rail a');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const secObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id = e.target.id;
      railLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+id));
      navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+id));
    }
  });
}, {threshold:.5});
sections.forEach(s=>secObserver.observe(s));

// ---------- mobile nav ----------
document.getElementById('navToggle').addEventListener('click', ()=>{
  const nl = document.getElementById('navLinks');
  nl.style.display = nl.style.display==='flex' ? 'none' : 'flex';
  nl.style.cssText += 'flex-direction:column;position:fixed;top:64px;right:20px;background:#141b27;border:1px solid #26303f;padding:16px;';
});

// ---------- WhatsApp link (built at runtime, never printed as plain text) ----------
/* (function(){
  const parts = ['5','2','4','4','3','3','0','0','1','5','5','6'];
  const num = parts.join('');
  const msg = encodeURIComponent('Hola Juan Luis, vi tu portafolio y me gustaría platicar sobre un proyecto.');
  const url = `https://wa.me/${num}?text=${msg}`;
  document.getElementById('waFab').href = url;
  document.getElementById('waContactLink').href = url;
  document.getElementById('waContactLink').target = '_blank';
  document.getElementById('waContactLink').rel = 'noopener';
})();
 */
(function(){
  const parts = ['5','2','4','4','3','3','0','0','1','5','5','6'];
  const num = parts.join('');
  const msg = encodeURIComponent('Hola Juan Luis, vi tu portafolio y me gustaría platicar sobre un proyecto.');
  const url = `https://wa.me/${num}?text=${msg}`;

  const waFab = document.getElementById('waFab');
  const waContactLink = document.getElementById('waContactLink');

  if (waFab) {
    waFab.href = url;
  }

  if (waContactLink) {
    waContactLink.href = url;
    waContactLink.target = '_blank';
    waContactLink.rel = 'noopener';
  }
})();

// ---------- Chatbot (local, rule-based — no data leaves the browser) ----------
(function(){
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const body = document.getElementById('chatBody');
  const quick = document.getElementById('chatQuick');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');
  const closeBtn = document.getElementById('chatClose');

  const kb = [
    { keys:['hola','buenas','hey','hi'], a:'¡Hola! Soy el asistente de Juan Luis. Puedo contarte sobre su experiencia, stack, proyectos, servicios o cómo contactarlo.' },
    { keys:['experiencia','trabajo','empleo','trayectoria'], a:'Juan Luis es Jefe de Área de TI en la Notaría Pública No.181 (mayo 2026–actualidad). Antes fue Desarrollador Full Stack Oracle en FIRA (jun 2022–marzo 2026) y Desarrollador de BD/Sistemas Web en el Gobierno del Estado de Michoacán (2020–2022). Más detalle en la sección "Experiencia".' },
    { keys:['stack','tecnolog','lenguaje','herramientas'], a:'Su stack cubre frontend (Angular, React, TypeScript, Oracle JET), backend (Java, Spring Boot, Node.js, APIs REST, JWT), bases de datos (Oracle, PL/SQL, PostgreSQL) y DevOps (Docker, Git, Maven). Puedes explorarlo en la sección "Stack".' },
    { keys:['proyecto','proyectos','portafolio','github'], a:'Destacan: Cosechando Soberanía (FIRA, Oracle JET), un Netflix Clone (Spring Boot + Angular + JWT) y un Sistema de Administración de Inventario (Angular + Spring Boot + PostgreSQL). Están en la sección "Proyectos".' },
    { keys:['servicio','servicios','cotiza','presupuesto','precio'], a:'Ofrece desarrollo full stack, sistemas a medida, modernización de sistemas legados, trabajo con bases de datos/PL-SQL, APIs y asesoría técnica. Revisa la sección "Servicios" para más detalle.' },
    { keys:['contacto','correo','email','whatsapp','telefono','contratar'], a:'Puedes escribirle a olmos.silva18@gmail.com o por WhatsApp con el botón verde flotante — con gusto te responde.' },
    { keys:['certificado','certificacion','curso','estudios','educacion'], a:'Cuenta con certificaciones en JavaScript, Java/Jakarta EE, PL/SQL, SQL, Full Stack y ciberseguridad, además de Ingeniería en Desarrollo y Gestión de Software (UTM). Todo en la sección "Certificaciones".' },
    { keys:['gracias','ok','vale'], a:'¡Con gusto! Si necesitas algo más, aquí estoy.' }
  ];
  const fallback = 'No estoy seguro de eso — pero puedes preguntarme sobre experiencia, stack, proyectos, servicios o contacto, o escribirle directo a Juan Luis por WhatsApp o correo.';

  function addMsg(text, who){
    const el = document.createElement('div');
    el.className = 'chat-msg ' + who;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }
  function reply(text){
    const t = text.toLowerCase();
    const hit = kb.find(k => k.keys.some(w => t.includes(w)));
    setTimeout(()=> addMsg(hit ? hit.a : fallback, 'bot'), 350);
  }
  function ask(text){
    if(!text.trim()) return;
    addMsg(text, 'user');
    reply(text);
    input.value = '';
  }
  const quickPrompts = ['Experiencia','Stack','Proyectos','Servicios','Contacto'];
  quickPrompts.forEach(q=>{
    const b = document.createElement('button');
    b.textContent = q;
    b.addEventListener('click', ()=> ask(q));
    quick.appendChild(b);
  });

  fab.addEventListener('click', ()=>{
    console.log("entro aqui")
    panel.classList.toggle('open');
    if(panel.classList.contains('open') && !body.children.length){
      addMsg('¡Hola! Pregúntame sobre la experiencia, el stack, los proyectos o los servicios de Juan Luis.', 'bot');
    }
    console.error("entro aqui 2")
  });
  closeBtn.addEventListener('click', ()=> panel.classList.remove('open'));
  sendBtn.addEventListener('click', ()=> ask(input.value));
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') ask(input.value); });
})();
