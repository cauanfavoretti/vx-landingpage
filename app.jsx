// VX Consultoria — Components

const GHL_WEBHOOK_URL = 'https://webhook.schedule10x.com/webhook/scheduling';

const { useState, useEffect, useRef, useCallback } = React;

/* ===== SMOKE CANVAS — cinematic ember diffusion ===== */
function SmokeCanvas() {
  const canvasRef = useRef(null);
  const sparkRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const sparkCanvas = sparkRef.current;
    if (!canvas || !sparkCanvas) return;
    const ctx = canvas.getContext('2d');
    const sctx = sparkCanvas.getContext('2d');
    let w, h, raf, dpr;
    const puffs = [];
    const embers = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = sparkCanvas.width = rect.width * dpr;
      h = canvas.height = sparkCanvas.height = rect.height * dpr;
      [canvas, sparkCanvas].forEach(c => {
        c.style.width = rect.width + 'px';
        c.style.height = rect.height + 'px';
      });
    };
    resize();
    window.addEventListener('resize', resize);

    // layered noise for organic turbulence
    const fbm = (x, y, t) => {
      let v = 0;
      v += Math.sin(x * 0.004 + t * 0.28) * Math.cos(y * 0.005 - t * 0.18);
      v += Math.sin(x * 0.009 - t * 0.35 + y * 0.003) * 0.5;
      v += Math.cos(x * 0.018 + y * 0.011 + t * 0.22) * 0.25;
      return v;
    };

    const spawnPuff = () => {
      if (puffs.length > 22) return;
      const isFire = Math.random() < 0.35;
      const depth = Math.random(); // 0=far, 1=near (3D layers)
      puffs.push({
        x: w * (0.01 + Math.random() * 0.13),
        y: h * (0.72 + Math.random() * 0.28),
        vx: (Math.random() - 0.65) * 0.4,
        vy: isFire ? -(1.8 + Math.random() * 2.2) : -(0.35 + Math.random() * 0.65),
        r: isFire
          ? (18 + Math.random() * 45) * dpr
          : (60 + Math.random() * 160) * dpr * (0.5 + depth * 0.8),
        life: 0,
        maxLife: isFire ? 80 + Math.random() * 60 : 320 + Math.random() * 260,
        isFire,
        depth,
        wobble: Math.random() * Math.PI * 2,
        wobbleAmp: 0.008 + Math.random() * 0.014,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        sx: 0.55 + Math.random() * 0.9,
        sy: 0.7 + Math.random() * 0.6,
        alpha: isFire ? 0.18 + Math.random() * 0.22 : 0.009 + Math.random() * 0.011 + depth * 0.006,
        blobOff: Array.from({length: 3}, () => ({
          ox: (Math.random() - 0.5),
          oy: (Math.random() - 0.5),
          rs: 0.45 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
        })),
      });
    };

    const spawnEmber = () => {
      if (embers.length > 18) return;
      embers.push({
        x: w * (0.01 + Math.random() * 0.15),
        y: h * (0.82 + Math.random() * 0.18),
        vx: (Math.random() - 0.3) * 0.7,
        vy: -1.1 - Math.random() * 1.8,
        r: (0.3 + Math.random() * 0.65) * dpr,
        life: 0,
        maxLife: 90 + Math.random() * 90,
        hue: 18 + Math.random() * 22,
        alpha: 0.65 + Math.random() * 0.35,
        wobble: Math.random() * Math.PI * 2,
      });
    };

    let frame = 0;
    let lastTime = 0;
    const FPS = 30;
    const INTERVAL = 1000 / FPS;
    const tick = (now = 0) => {
      raf = requestAnimationFrame(tick);
      if (now - lastTime < INTERVAL) return;
      lastTime = now;
      const t = frame * 0.016;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(6,6,6,0.045)';
      ctx.fillRect(0, 0, w, h);

      if (frame % 7 === 0) spawnPuff();

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;
        p.wobble += p.wobbleAmp;
        p.rot += p.rotSpeed;

        const nx = fbm(p.x / dpr, p.y / dpr, t);
        const ny = fbm(p.x / dpr + 80, p.y / dpr + 40, t);
        p.x += p.vx + nx * (p.isFire ? 0.8 : 1.6) + Math.sin(p.wobble) * 0.5;
        p.y += p.vy + ny * 0.4;
        if (!p.isFire) p.r += 0.9 + p.depth * 0.5;

        const tl = p.life / p.maxLife;
        const env = Math.sin(tl * Math.PI);
        // fade out as particle approaches 20% of screen width
        const edgeFade = Math.max(0, 1 - Math.max(0, (p.x - w * 0.14) / (w * 0.08)));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(p.sx, p.sy);

        if (p.isFire) {
          ctx.globalCompositeOperation = 'lighter';
          const a = p.alpha * env * edgeFade;
          const hCore = 38 - tl * 28; // yellow-orange → deep orange
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
          g.addColorStop(0,    `hsla(${hCore + 12}, 100%, 80%, ${a})`);
          g.addColorStop(0.28, `hsla(${hCore},      100%, 58%, ${a * 0.75})`);
          g.addColorStop(0.58, `hsla(${hCore - 10}, 95%,  38%, ${a * 0.4})`);
          g.addColorStop(0.82, `hsla(${hCore - 18}, 80%,  18%, ${a * 0.12})`);
          g.addColorStop(1,    `hsla(10, 70%, 8%, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // warm smoke near base, cold dark smoke high up
          const warmth = Math.max(0, 1 - tl * 2.2);
          const depthFade = 0.4 + p.depth * 0.6;
          ctx.globalCompositeOperation = 'source-over';

          // main blob
          const a = p.alpha * env * depthFade * edgeFade;
          const hBase = 20 + warmth * 14; // laranja mais vivo quando quente
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
          g.addColorStop(0,    `hsla(${hBase + 8}, 90%, 45%, ${a * (0.6 + warmth * 0.5)})`);
          g.addColorStop(0.3,  `hsla(${hBase},     80%, 32%, ${a * 0.55})`);
          g.addColorStop(0.62, `hsla(${hBase - 8}, 70%, 22%, ${a * 0.28})`);
          g.addColorStop(1,    `hsla(${hBase - 12},60%, 14%, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();

          // secondary irregular blobs for billowing 3D shape
          for (const b of p.blobOff) {
            const bx = Math.sin(p.wobble + b.phase) * p.r * b.ox;
            const by = Math.cos(p.wobble * 0.7 + b.phase) * p.r * b.oy;
            const br = p.r * b.rs;
            const ba = a * 0.38;
            const g2 = ctx.createRadialGradient(bx, by, 0, bx, by, br);
            g2.addColorStop(0, `hsla(${hBase + 4}, 75%, 30%, ${ba})`);
            g2.addColorStop(1, `hsla(${hBase - 8}, 60%, 18%, 0)`);
            ctx.fillStyle = g2;
            ctx.beginPath();
            ctx.arc(bx, by, br, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
        if (p.life > p.maxLife) puffs.splice(i, 1);
      }

      // ember layer
      sctx.clearRect(0, 0, w, h);
      sctx.globalCompositeOperation = 'lighter';
      if (frame % 11 === 0) spawnEmber();
      for (let i = embers.length - 1; i >= 0; i--) {
        const s = embers[i];
        s.life++;
        s.wobble += 0.065;
        s.x += s.vx + Math.sin(s.wobble) * 0.55;
        s.y += s.vy;
        s.vy += 0.004;
        const tl = s.life / s.maxLife;
        const env = Math.sin(tl * Math.PI);
        const a = s.alpha * env;
        const halo = sctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 7);
        halo.addColorStop(0,   `hsla(${s.hue}, 100%, 72%, ${a * 0.55})`);
        halo.addColorStop(0.45,`hsla(${s.hue - 6}, 100%, 52%, ${a * 0.18})`);
        halo.addColorStop(1,   `hsla(${s.hue - 12}, 90%, 40%, 0)`);
        sctx.fillStyle = halo;
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r * 7, 0, Math.PI * 2);
        sctx.fill();
        sctx.fillStyle = `hsla(${s.hue + 18}, 100%, 92%, ${a})`;
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sctx.fill();
        if (s.life > s.maxLife) embers.splice(i, 1);
      }

      frame++;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <>
      <canvas id="smoke" ref={canvasRef}></canvas>
      <canvas id="sparks" ref={sparkRef}></canvas>
    </>
  );
}

/* ===== NAV ===== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const close = () => setOpen(false);
  const links = [
    { href: '#problema', label: 'Diagnóstico' },
    { href: '#metodo',   label: 'Método' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#contato',  label: 'Contato' },
  ];
  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <div className="logo">
            <img src="uploads/logo-vazada.png" alt="VX Consultoria" width="120" height="32" />
          </div>
          <div className="nav-links">
            {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <a href="#contato" className="btn btn-primary" style={{padding: '10px 18px', fontSize: 13, color: '#ffffff'}}>
              Agendar diagnóstico
            </a>
          </div>
          <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span className={`ham-line ${open ? 'open' : ''}`}></span>
            <span className={`ham-line ${open ? 'open' : ''}`}></span>
            <span className={`ham-line ${open ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>
      {/* Mobile drawer */}
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} onClick={close}>
        <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
          <div className="mobile-menu-logo">
            <img src="uploads/logo-vazada.png" alt="VX Consultoria" height="28" />
          </div>
          <nav className="mobile-menu-links">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
            ))}
          </nav>
          <a href="#contato" className="btn btn-primary mobile-menu-cta" onClick={close}>
            Agendar diagnóstico
          </a>
        </div>
      </div>
    </>
  );
}

/* ===== HERO ===== */
function Hero() {
  return (
    <section className="hero">
      <SmokeCanvas />
      <div className="wrap">
        <div className="hero-stage">
          <div className="hero-left">
            <span className="hero-pill">
              <span className="spark-wrap"><span className="spark"></span></span>
              <span className="pill-text">Consultoria Comercial</span>
              <span className="pill-divider"></span>
              <span className="pill-cat">B2B & B2C</span>
            </span>
            <h1>
              Transforme sua operação comercial em uma <span className="accent">máquina de vendas</span>.
            </h1>
            <p className="lead">
              Diagnóstico, método e execução para times comerciais que querem
              previsibilidade, controle e crescimento real — sem achismo, sem improviso.
            </p>
            <div className="hero-cta">
              <a href="#contato" className="btn btn-primary btn-lg">
                Agendar diagnóstico
                <span className="arrow">→</span>
              </a>
              <a href="#metodo" className="btn btn-ghost btn-lg">Conhecer o método</a>
            </div>
            <div className="hero-meta-left">
              <div className="item">
                <span className="num">+250</span>
                <span className="lbl">Clientes</span>
              </div>
              <div className="item">
                <span className="num">3.4x</span>
                <span className="lbl">Faturamento médio</span>
              </div>
              <div className="item">
                <span className="num">98%</span>
                <span className="lbl">Recomendação</span>
              </div>
            </div>
          </div>
          <div className="hero-portrait-big">
            <img src="uploads/fabio1.png" alt="Consultor VX" fetchpriority="high" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CLIENTS CAROUSEL ===== */
function Clients() {
  const logos = [
    { src: 'uploads/pasted-1777072466716-0.png', alt: 'PneuForte' },
    { src: 'uploads/pasted-1777072420243-0.png', alt: 'Nathália Matos — Dermatologia' },
    { src: 'uploads/pasted-1777072483877-0.png', alt: 'Doctor Saúde' },
    { src: 'uploads/pasted-1777072476436-0.png', alt: 'Grupo Médico Santa Clara' },
    { src: 'uploads/pasted-1777072454736-0.png', alt: 'Yenly Gonzalez — Otorrinolaringologia', big: true },
  ];
  const loop = [...logos, ...logos];
  const titleRef = useRef(null);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setFilled(true); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = 'Dezenas de empresas já escalaram seus resultados e transformaram seus times comerciais com a VX.'.split(' ');
  return (
    <section className="clients">
      <div className="wrap clients-head">
        <span className="eyebrow center">Quem confia</span>
        <h2 ref={titleRef} className={filled ? 'filled' : ''}>
          {words.map((w, i) => (
            <span key={i} className="word" style={{animationDelay: `${i * 0.08}s`}}>{w}{' '}</span>
          ))}
        </h2>
      </div>
      <div className="clients-track-wrap">
        <div className="clients-track">
          {loop.map((l, i) => (
            <div className={`client-logo ${l.big ? 'big' : ''}`} key={i}>
              <img src={l.src} alt={l.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== PROOF ===== */
function Proof() {
  const stats = [
    { n: '+250', l: 'Empresas atendidas' },
    { n: '+R$48mi', l: 'Gerados em vendas' },
    { n: '+1.800', l: 'Vendedores treinados' },
    { n: '4.9/5', l: 'Nota média NPS' },
  ];
  const prints = [
    { src: 'uploads/proof1.jpeg', tag: 'Meta batida', cap: '"Mês passado batemos a meta"' },
    { src: 'uploads/proof2.jpeg', tag: '+R$104k', cap: '"104k até ontem · metade do mês"' },
    { src: 'uploads/proof3.webp', tag: 'R$100.520', cap: '"Saí da prefeitura · 100% consultório"' },
    { src: 'uploads/proof4.jpeg', tag: 'Feedback', cap: '"Tu é demais, obrigada pelos resultados"' },
    { src: 'uploads/proof5.jpeg', tag: '+R$150k', cap: '"Passamos os 150k — equipe maraaa de milhões!"' },
  ];
  const [hoveredPrint, setHoveredPrint] = useState(null);
  const statsRef = useRef(null);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.stat').forEach((s, i) => {
          setTimeout(() => s.classList.add('glitch-in'), i * 120);
        });
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="proof">
      <div className="wrap">
        <div className="proof-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="num">{s.n}</div>
              <div className="lbl">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="proof-prints">
          <div className="proof-prints-head">
            <h3>Resultados reais, conversas reais.</h3>
            <span className="meta">// PROVA SOCIAL · 2024–2025</span>
          </div>
          <div className="prints-row">
            {prints.map((p, i) => (
              <div
                className="print-card"
                key={i}
                onMouseEnter={() => setHoveredPrint(p)}
                onMouseLeave={() => setHoveredPrint(null)}
              >
                <span className="tag">{p.tag}</span>
                <img src={p.src} alt="" loading="lazy" decoding="async" />
                <div className="caption">{p.cap}</div>
              </div>
            ))}
          </div>
          {hoveredPrint && (
            <div className="print-expand" onMouseLeave={() => setHoveredPrint(null)}>
              <img src={hoveredPrint.src} alt="" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== INSTAGRAM VIDEOS ===== */
function InstagramVideos() {
  const posts = [
    'https://www.instagram.com/p/DOZu3NXDvze/',
  ];
  const wrapRefs = useRef([]);

  useEffect(() => {
    const load = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.onload = () => window.instgrm && window.instgrm.Embeds.process();
      document.body.appendChild(s);
    };
    load();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ig-glitch-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    wrapRefs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="ig-section">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow center">Na Prática</span>
          <h2 style={{marginTop: 20}}>Veja como a VX transforma resultados.</h2>
        </div>
        <div className="ig-posts-grid">
          {posts.map((url, i) => (
            <div
              className="ig-post-wrap"
              key={i}
              ref={el => wrapRefs.current[i] = el}
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                data-instgrm-captioned
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: 12,
                  boxShadow: 'none',
                  margin: '0',
                  padding: 0,
                  width: '100%',
                  minWidth: 326,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== PROBLEM ===== */
function Problem() {
  const items = [
    { h: 'Time vendendo no improviso', p: 'Sem script, sem método, cada vendedor faz do seu jeito — e o resultado é inconsistente.' },
    { h: 'Pipeline furado', p: 'Leads entram, mas ninguém sabe onde param. Oportunidades morrem por falta de follow-up.' },
    { h: 'Faturamento em montanha-russa', p: 'Mês bom, mês ruim. Sem previsibilidade você não consegue investir nem planejar.' },
    { h: 'Gestor virou apagador de incêndio', p: 'O dia inteiro resolvendo problema de venda em vez de liderar e treinar o time.' },
  ];
  const strikeRef = useRef(null);
  const blockRef = useRef(null);
  const listRef = useRef(null);
  useEffect(() => {
    const strike = strikeRef.current;
    const block = blockRef.current;
    if (!strike || !block) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const rect = block.getBoundingClientRect();
        const offsetX = window.innerWidth / 2 - (rect.left + rect.width / 2);
        block.style.setProperty('--block-cx', `${offsetX}px`);
        block.classList.add('block-active');
        strike.classList.add('strike-active');
        timer = setTimeout(() => {
          if (listRef.current) listRef.current.classList.add('list-animated');
        }, 2200);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(strike);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <section className="problem" id="problema">
      <div className="wrap problem-grid">
        <div className="problem-block" ref={blockRef}>
          <span className="eyebrow">O Diagnóstico</span>
          <h2 className="problem-quote" style={{marginTop: 32}}>
            Você não tem um problema de <span className="strike" ref={strikeRef}>vendas</span>.<br />
            Você tem um problema de <span style={{color:'var(--orange)'}}>gestão comercial</span>.
          </h2>
          <p className="problem-sub" style={{marginTop: 28, color:'var(--text-dim)', fontSize:17, lineHeight:1.6, maxWidth: 460}}>
            Vender mais não é trabalhar mais. É instalar processo, método e leitura de dados
            no time que você já tem.
          </p>
        </div>
        <div className="problem-list" ref={listRef}>
          {items.map((it, i) => (
            <div className="row" key={i} style={{'--row-i': i}}>
              <span className="x">×</span>
              <div className="row-text">
                <h4>{it.h}</h4>
                <p>{it.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SOLUTION ===== */
function Solution() {
  const points = [
    { n: '01', h: 'Diagnóstico 360° da operação', p: 'Mapeamos funil, processos, KPIs e gargalos do seu time em até 7 dias.' },
    { n: '02', h: 'Playbook comercial sob medida', p: 'Scripts, cadências e processos desenhados para o seu produto e ticket.' },
    { n: '03', h: 'Time treinado e cobrado por métrica', p: 'Implementamos rituais de gestão e treino que sustentam o resultado.' },
  ];
  const pointsRef = useRef(null);
  useEffect(() => {
    const el = pointsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.solution-point').forEach((s, i) => {
          setTimeout(() => s.classList.add('glitch-in'), i * 150);
        });
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="solution">
      <div className="wrap" style={{textAlign:'center'}}>
        <span className="eyebrow center">A Solução</span>
        <h2 style={{fontSize:'clamp(32px,4vw,52px)', marginTop:20, marginBottom:18}}>
          Consultoria que entra na operação. <span style={{color:'var(--orange)'}}>De verdade.</span>
        </h2>
        <p style={{color:'var(--text-dim)', fontSize:17, lineHeight:1.6, maxWidth:640, margin:'0 auto 40px'}}>
          A VX não entrega slides bonitos. A gente coloca a mão na massa com o seu time,
          instala o método e fica até o resultado aparecer no extrato.
        </p>
        <div className="solution-points" ref={pointsRef}>
          {points.map((pt, i) => (
            <div className="solution-point" key={i}>
              <div className="nm">{pt.n}</div>
              <h4 style={{textAlign:'center'}}>{pt.h}</h4>
              <p style={{textAlign:'center'}}>{pt.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== METHOD ===== */
function Method() {
  const steps = [
    { n: '01', h: 'Clareza', p: 'Mapeamos sua operação, identificamos gargalos e definimos metas reais com base nos seus números.' },
    { n: '02', h: 'Processo', p: 'Desenhamos o playbook comercial, estruturamos cadências e treinamos seu time para executar com consistência.' },
    { n: '03', h: 'Acompanhamento Contínuo', p: 'Monitoramos os resultados, ajustamos a rota e estamos ao lado do time até a meta virar rotina.' },
  ];
  const dotR = 160;
  const angles = [-90, 55, 125];
  const textRadii = [200, 285, 285];
  const dotPos  = angles.map(deg => { const a = deg * Math.PI / 180; return { x: Math.cos(a) * dotR,  y: Math.sin(a) * dotR  }; });
  const textPos = angles.map((deg, i) => { const a = deg * Math.PI / 180; return { x: Math.cos(a) * textRadii[i], y: Math.sin(a) * textRadii[i] }; });
  const textAlign     = ['center', 'left', 'right'];
  const textTransform = ['translate(-50%,-100%)', 'translate(0,-50%)', 'translate(-100%,-50%)'];

  const [boosted, setBoosted] = useState(false);
  const boostTimer = useRef(null);
  const onWheelEnter = () => {
    if (boostTimer.current) clearTimeout(boostTimer.current);
    setBoosted(true);
    boostTimer.current = setTimeout(() => setBoosted(false), 1000);
  };

  return (
    <section className="method" id="metodo">
      {/* Ghost gear — blurred background mirror */}
      <div className={`gear-ghost${boosted ? ' gear-boost' : ''}`} aria-hidden="true">
        <svg className="gear-svg gear-outer" viewBox="0 0 540 540" fill="none">
          <circle cx="270" cy="270" r="155" stroke="rgba(255,107,26,0.9)" strokeWidth="1.5" strokeDasharray="8 12"/>
          {Array.from({length: 24}).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r1 = 155, r2 = 167;
            return <line key={i}
              x1={270 + Math.cos(a) * r1} y1={270 + Math.sin(a) * r1}
              x2={270 + Math.cos(a) * r2} y2={270 + Math.sin(a) * r2}
              stroke="rgba(255,107,26,1)" strokeWidth="2.5" strokeLinecap="round"/>;
          })}
          <circle cx="270" cy="270" r="114" stroke="rgba(255,107,26,0.5)" strokeWidth="1" strokeDasharray="4 8"/>
          {dotPos.map((p, i) => (
            <line key={i} x1="270" y1="270" x2={270 + p.x} y2={270 + p.y}
              stroke="rgba(255,107,26,0.7)" strokeWidth="1" strokeDasharray="4 6"/>
          ))}
        </svg>
        <svg className="gear-svg gear-inner" viewBox="0 0 540 540" fill="none">
          <circle cx="270" cy="270" r="70" stroke="rgba(255,107,26,0.9)" strokeWidth="1" strokeDasharray="5 7"/>
          {Array.from({length: 14}).map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            const r1 = 70, r2 = 78;
            return <line key={i}
              x1={270 + Math.cos(a) * r1} y1={270 + Math.sin(a) * r1}
              x2={270 + Math.cos(a) * r2} y2={270 + Math.sin(a) * r2}
              stroke="rgba(255,107,26,1)" strokeWidth="2" strokeLinecap="round"/>;
          })}
        </svg>
      </div>
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow center">Método VX</span>
          <h2>3 etapas. Resultado mensurável.</h2>
        </div>
        <div className={`method-wheel${boosted ? ' gear-boost' : ''}`} onMouseEnter={onWheelEnter}>
          {/* Rotating gear rings */}
          <svg className="gear-svg gear-outer" viewBox="0 0 540 540" fill="none">
            <circle cx="270" cy="270" r="155" stroke="rgba(255,107,26,0.22)" strokeWidth="1.5" strokeDasharray="8 12"/>
            {Array.from({length: 24}).map((_, i) => {
              const a = (i / 24) * Math.PI * 2;
              const r1 = 155, r2 = 167;
              return <line key={i}
                x1={270 + Math.cos(a) * r1} y1={270 + Math.sin(a) * r1}
                x2={270 + Math.cos(a) * r2} y2={270 + Math.sin(a) * r2}
                stroke="rgba(255,107,26,0.35)" strokeWidth="2.5" strokeLinecap="round"/>;
            })}
            <circle cx="270" cy="270" r="114" stroke="rgba(255,107,26,0.1)" strokeWidth="1" strokeDasharray="4 8"/>
            {dotPos.map((p, i) => (
              <line key={i} x1="270" y1="270" x2={270 + p.x} y2={270 + p.y}
                stroke="rgba(255,107,26,0.18)" strokeWidth="1" strokeDasharray="4 6"/>
            ))}
          </svg>
          <svg className="gear-svg gear-inner" viewBox="0 0 540 540" fill="none">
            <circle cx="270" cy="270" r="70" stroke="rgba(255,107,26,0.2)" strokeWidth="1" strokeDasharray="5 7"/>
            {Array.from({length: 14}).map((_, i) => {
              const a = (i / 14) * Math.PI * 2;
              const r1 = 70, r2 = 78;
              return <line key={i}
                x1={270 + Math.cos(a) * r1} y1={270 + Math.sin(a) * r1}
                x2={270 + Math.cos(a) * r2} y2={270 + Math.sin(a) * r2}
                stroke="rgba(255,107,26,0.28)" strokeWidth="2" strokeLinecap="round"/>;
            })}
          </svg>

          {/* Center hub */}
          <div className="gear-center">VX</div>

          {/* Node dots on ring */}
          {dotPos.map((p, i) => (
            <div key={`d${i}`} className="gear-node" style={{left:`calc(50% + ${p.x}px)`, top:`calc(50% + ${p.y}px)`}}/>
          ))}

          {/* Step cards */}
          {steps.map((s, i) => (
            <div key={i} className="wheel-step" style={{
              left: `calc(50% + ${textPos[i].x}px)`,
              top:  `calc(50% + ${textPos[i].y}px)`,
              transform: textTransform[i],
              textAlign: textAlign[i],
            }}>
              <div className="wheel-num">{s.n}</div>
              <h4>{s.h}</h4>
              <p style={i === 0 ? {fontSize: 11} : {}}>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== SERVICES ===== */
function Services() {
  const list = [
    { n: '/01', h: 'Mentoria Individual', p: 'Acompanhamento 1:1 para gestores e fundadores que querem destravar a operação comercial.', b: 'Para gestores e founders' },
    { n: '/02', h: 'Consultoria Comercial', p: 'Implementação completa de processos, métricas, playbook e gestão do time de vendas.', b: 'Para empresas em crescimento', featured: true, tag: 'Mais procurado' },
    { n: '/03', h: 'Treinamento In Company', p: 'Formação intensiva do seu time em prospecção, qualificação, negociação e fechamento.', b: 'Para times de vendas' },
  ];
  return (
    <section className="services" id="servicos">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Serviços</span>
          <h2>Três frentes. Um único objetivo: vender mais.</h2>
          <p>Escolha o formato que se encaixa no momento da sua empresa — ou combine os três.</p>
        </div>
        <div className="services-grid">
          {list.map((s, i) => (
            <div className={`svc-card ${s.featured ? 'featured' : ''}`} key={i}>
              {s.tag && <span className="svc-tag">{s.tag}</span>}
              <span className="svc-num">{s.n}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
              <div className="svc-benefit">
                <span className="pulse"></span>
                {s.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== BENEFITS ===== */
function Benefits() {
  const items = [
    { h: 'Previsibilidade de receita', p: 'Forecast confiável e pipeline saudável mês a mês.' },
    { h: 'Time engajado e cobrado', p: 'Rituais de gestão que mantêm o time em ritmo de meta.' },
    { h: 'Processo replicável', p: 'Playbook documentado para escalar sem depender de ninguém.' },
    { h: 'Decisões baseadas em dado', p: 'KPIs claros e dashboards que mostram onde agir.' },
    { h: 'CAC menor, LTV maior', p: 'Vender melhor para quem já está dentro do funil.' },
    { h: 'Cultura de alta performance', p: 'Time que se cobra, se ajuda e bate meta com método.' },
  ];
  const listRef = useRef(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('benefits-active');
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="benefits">
      <div className="wrap benefits-grid">
        <div>
          <span className="eyebrow">Benefícios</span>
          <h2 style={{fontSize:'clamp(32px,3.6vw,46px)', marginTop:20, marginBottom:18}}>
            O que muda na sua empresa em <span style={{color:'var(--orange)'}}>90 dias</span>.
          </h2>
          <p style={{color:'var(--text-dim)', fontSize:17, lineHeight:1.6}}>
            Resultados que a maioria dos clientes percebe já no primeiro trimestre de método VX.
          </p>
        </div>
        <div className="benefits-list" ref={listRef}>
          {items.map((it, i) => (
            <div className="benefit-item" key={i}>
              <span className="check">
                <svg className="check-v" viewBox="0 0 24 24" fill="none">
                  <polyline className="check-path" points="4,13 9,18 20,7" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="copy">
                <h4>{it.h}</h4>
                <p>{it.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== TECH ===== */
function Tech() {
  const items = [
    { h: 'CRM & Automação', p: 'Implantação e otimização de Pipedrive, RD, HubSpot e similares.' },
    { h: 'IA Aplicada a Vendas', p: 'Qualificação de leads, scoring e respostas automatizadas com IA.' },
    { h: 'Dashboards & BI', p: 'Painéis de performance comercial em tempo real para gestão.' },
    { h: 'Playbook Digital', p: 'Processos, scripts e cadências organizados em plataforma única.' },
  ];
  const Icon = ({ children }) => (
    <span style={{fontFamily: 'var(--display)', fontWeight:700, fontSize:18}}>{children}</span>
  );
  const icons = ['◆', '⚡', '◐', '◇'];
  return (
    <section className="tech">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow center">Tecnologia</span>
          <h2>Método humano. Stack tecnológico.</h2>
          <p>Combinamos consultoria de gente com as melhores ferramentas do mercado para garantir escala.</p>
        </div>
        <div className="tech-grid">
          {items.map((it, i) => (
            <div className="tech-card" key={i}>
              <div className="icn"><Icon>{icons[i]}</Icon></div>
              <h4>{it.h}</h4>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== BOOKING MODAL ===== */
function BookingModal({ onBooked, onClose }) {
  const handleMsg = useCallback((e) => {
    if (typeof e.data === 'string' && (e.data.includes('booking') || e.data.includes('confirmed') || e.data.includes('scheduled'))) {
      onBooked();
    }
  }, [onBooked]);
  useEffect(() => {
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [handleMsg]);

  return (
    <div className="booking-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="booking-modal">
        <button className="booking-close" onClick={onClose}>✕</button>
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/WU0ds4ulezO5mCurDzGU"
          style={{width:'100%', height:'100%', border:'none'}}
          title="Agendar diagnóstico"
        />
      </div>
    </div>
  );
}

/* ===== SUCCESS ANIMATION ===== */
function SuccessScreen({ onDismiss }) {
  return (
    <div className="success-overlay" onClick={onDismiss} style={{cursor:'pointer'}}>
      <div className="success-card">
        <div className="success-ring">
          <svg className="success-check" viewBox="0 0 52 52" fill="none">
            <circle className="check-circle" cx="26" cy="26" r="24" stroke="var(--orange)" strokeWidth="2"/>
            <polyline className="check-mark" points="14,26 22,34 38,18" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="success-title">Boas‑vindas à VX</h3>
        <p className="success-sub">Entraremos em contato em breve.</p>
      </div>
    </div>
  );
}

/* ===== FORM ===== */
function FormSection() {
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({ nome: '', email: '', whatsapp: '', empresa: '', faturamento: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.nome.split(' ')[0],
          lastName: data.nome.split(' ').slice(1).join(' ') || '',
          email: data.email,
          phone: data.whatsapp,
          companyName: data.empresa,
          tags: ['landing-page-vx'],
          source: 'Landing Page VX',
        }),
      });
    } catch (err) {
      console.error('GHL API error:', err);
    }
    setSending(false);
    setShowBooking(true);
  };

  const handleBooked = () => {
    setShowBooking(false);
    setShowSuccess(true);
  };

  return (
    <>
      {showBooking && <BookingModal onBooked={handleBooked} onClose={handleBooked} />}
      {showSuccess && <SuccessScreen onDismiss={() => setShowSuccess(false)} />}
      <section className="form-section" id="contato">
        <div className="wrap form-wrap">
          <div className="form-side">
            <span className="eyebrow">Diagnóstico Gratuito</span>
            <h2 style={{marginTop:20}}>Vamos conversar sobre seus números.</h2>
            <p>Em 30 minutos, mostramos exatamente onde está travando seu faturamento — e o que fazer nos próximos 90 dias.</p>
            <ul>
              <li>Análise gratuita do seu funil comercial</li>
              <li>Plano de ação personalizado</li>
              <li>Sem compromisso, sem enrolação</li>
            </ul>
          </div>
          <div className="form-card">
            <h3>Agende seu diagnóstico</h3>
            <p className="sub">Resposta em até 24 horas úteis.</p>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Nome completo</label>
                <input type="text" required value={data.nome} onChange={(e) => setData({...data, nome: e.target.value})} placeholder="Seu nome" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>E-mail</label>
                  <input type="email" required value={data.email} onChange={(e) => setData({...data, email: e.target.value})} placeholder="voce@empresa.com" />
                </div>
                <div className="field">
                  <label>WhatsApp</label>
                  <input type="tel" required value={data.whatsapp} onChange={(e) => setData({...data, whatsapp: e.target.value})} placeholder="(11) 99999-9999" />
                </div>
              </div>
              <div className="field">
                <label>Empresa</label>
                <input type="text" value={data.empresa} onChange={(e) => setData({...data, empresa: e.target.value})} placeholder="Nome da sua empresa" />
              </div>
              <div className="field">
                <label>Faturamento mensal aproximado</label>
                <select value={data.faturamento} onChange={(e) => setData({...data, faturamento: e.target.value})}>
                  <option value="">Selecione uma faixa</option>
                  <option value="Até R$ 50 mil">Até R$ 50 mil</option>
                  <option value="R$ 50k – R$ 100k">R$ 50k – R$ 100k</option>
                  <option value="R$ 100k – R$ 500k">R$ 100k – R$ 500k</option>
                  <option value="R$ 500k – R$ 1mi">R$ 500k – R$ 1mi</option>
                  <option value="Acima de R$ 1mi">Acima de R$ 1mi</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
                {sending ? 'Enviando…' : 'Quero meu diagnóstico gratuito'}
                {!sending && <span className="arrow">→</span>}
              </button>
              <p className="form-disclaimer">Seus dados estão seguros · LGPD compliant</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

/* ===== FINAL CTA ===== */
function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <span className="eyebrow center">Última Chamada</span>
        <h2>
          Sua próxima meta não vai bater <span style={{color:'var(--orange)'}}>sozinha</span>.
        </h2>
        <p>Pare de tentar resolver vendas com mais esforço. Resolva com método.</p>
        <a href="#contato" className="btn btn-primary">
          Agendar diagnóstico gratuito
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}

/* ===== LOCATION ===== */
function Location() {
  return (
    <section className="location">
      <div className="wrap location-wrap">
        <div className="location-info">
          <span className="eyebrow">Onde estamos</span>
          <h2 style={{marginTop: 20, marginBottom: 16}}>Venha nos visitar.</h2>
          <div className="location-address">
            <span className="loc-icon">◆</span>
            <div>
              <p className="loc-street">Rua Rio Javari, 361</p>
              <p className="loc-city">Nossa Sra. das Graças · Manaus – AM</p>
              <p className="loc-cep">CEP 69053-110</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/Rua+Rio+Javari,+361,+Nossa+Sra.+das+Gracas,+Manaus,+AM,+69053-110"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{marginTop: 28, display: 'inline-flex'}}
          >
            Abrir no Google Maps
            <span className="arrow">→</span>
          </a>
        </div>
        <div className="location-map">
          <video
            src="uploads/WhatsApp Video 2026-04-30 at 17.59.32.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
          />
        </div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="logo">
          <img src="uploads/logo-vazada.png" alt="VX" style={{height:24}} width="72" height="24" loading="lazy" />
        </div>
        <p>© 2026 VX Consultoria · Multiplique suas vendas</p>
        <div className="links">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#contato">Contato</a>
        </div>
      </div>
    </footer>
  );
}

/* ===== APP ===== */
function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <Clients />
      <Proof />
      <InstagramVideos />
      <Problem />
      <Solution />
      <Method />
      <Services />
      <Benefits />
      <Tech />
      <FormSection />
      <Location />
      <FinalCTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
