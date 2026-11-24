(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(id){ return document.getElementById(id); };
  var wait = function(ms){ return new Promise(function(r){ setTimeout(r, ms); }); };
  var fmt = function(s){ s = Math.floor(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

  /* ---------- iPhone call screen ---------- */
  var ICON = {
    mute: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M4 4l16 16"/></svg>',
    keys: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="1"/><circle cx="12" cy="6" r="1"/><circle cx="18" cy="6" r="1"/><circle cx="6" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18" cy="12" r="1"/><circle cx="6" cy="18" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="18" cy="18" r="1"/></svg>',
    spk: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
    add: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    vid: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="12" height="12" rx="2"/><path d="M15 10l6-3v10l-6-3"/></svg>',
    con: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>'
  };
  function phoneHTML(name){
    var grid = [['mute','silenciar'],['keys','teclado'],['spk','bocina'],['add','agregar'],['vid','FaceTime'],['con','contactos']].map(function(g){
      return '<div class="gb"><i>' + ICON[g[0]] + '</i><span>' + g[1] + '</span></div>';
    }).join('');
    return '<div class="ph" data-s="ring" role="img" aria-label="Pantalla de llamada de un iPhone">' +
      '<i class="pk a"></i><i class="pk b"></i><i class="pk c"></i><i class="pk d"></i>' +
      '<div class="bz"><div class="sc">' +
        '<div class="isl"></div>' +
        '<div class="sb"><span>9:41</span><span class="sbi">' +
          '<svg width="18" height="12" viewBox="0 0 18 12" fill="#fff"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.500" width="3" height="9.500" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>' +
          '<svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x=".5" y=".5" width="22" height="11" rx="3.500" stroke="#fff" opacity=".5"/><rect x="2" y="2" width="19" height="8" rx="2" fill="#fff"/><rect x="24" y="4" width="2" height="4" rx="1" fill="#fff" opacity=".5"/></svg>' +
        '</span></div>' +
        '<div class="who"><p class="nm">' + name + '</p><p class="sub">Llamada entrante</p></div>' +
        '<div class="cap"><b class="p"><span class="mw"><i></i><i></i><i></i></span><span class="lb">Parlatia</span></b><p></p></div>' +
        '<div class="grid">' + grid + '</div>' +
        '<div class="end" aria-hidden="true"><svg viewBox="0 0 24 24" style="transform:rotate(135deg)"><path d="M6.600 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25c1.100.37 2.300.57 3.600.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.600 21 3 13.400 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.57 3.600a1 1 0 0 1-.25 1z"/></svg></div>' +
        '<div class="rbtns"><button class="rb" type="button" data-act="decline"><i class="r"><svg viewBox="0 0 24 24" style="transform:rotate(135deg)"><path d="M6.600 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25c1.100.37 2.300.57 3.600.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.600 21 3 13.400 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.57 3.600a1 1 0 0 1-.25 1z"/></svg></i><span>Rechazar</span></button>' +
        '<button class="rb acc" type="button" data-act="accept" aria-label="Contestar la llamada"><i class="g"><svg viewBox="0 0 24 24"><path d="M6.600 10.800a15.100 15.100 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25c1.100.37 2.300.57 3.600.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.600 21 3 13.400 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.57 3.600a1 1 0 0 1-.25 1z"/></svg></i><span>Contestar</span></button></div>' +
        '<div class="hi"></div>' +
      '</div></div></div>';
  }
  function Phone(host, name){
    host.innerHTML = phoneHTML(name);
    var ph = host.querySelector('.ph'), cap = ph.querySelector('.cap'), who = cap.querySelector('b'), lb = cap.querySelector('.lb'), p = cap.querySelector('p');
    return {
      el: ph,
      state: function(s){ ph.setAttribute('data-s', s); },
      name: function(n){ ph.querySelector('.nm').textContent = n; },
      sub: function(t){ ph.querySelector('.sub').textContent = t; },
      speak: function(role, text){
        who.className = role; lb.textContent = role === 'p' ? 'Parlatia' : 'Cliente';
        cap.classList.add('sp'); p.textContent = '';
        return words(text, p);
      },
      quiet: function(){ cap.classList.remove('sp'); },
      clear: function(){ p.textContent = ''; cap.classList.remove('sp'); },
      onAccept: function(fn){ ph.querySelector('[data-act=accept]').addEventListener('click', fn); },
      onDecline: function(fn){ ph.querySelector('[data-act=decline]').addEventListener('click', fn); }
    };
  }
  function words(text, host){
    var spans = [];
    text.split(' ').forEach(function(w, i){
      var s = document.createElement('span');
      s.className = 'w'; s.textContent = (i ? ' ' : '') + w;
      host.appendChild(s); spans.push(s);
    });
    return spans;
  }

  /* ---------- Call data: text of the two demo audios published on parlatia.com ---------- */
  var AUDIO = {
    seguros: 'assets/audio/seguro.mp3',
    autos: 'assets/audio/coche.mp3'
  };
  var S = {
    seguros: {
      caller: 'Tu aseguradora', dur: 8.67, lead: 'Javier Ruiz',
      lines: [
        ['p', 'Javier, tu seguro de auto se renueva el 30 de junio con la misma cobertura. ¿Quieres que lo dejemos confirmado?', 0, 5.6],
        ['c', 'Perfecto, confírmalo. Y mándame el recibo por email.', 5.9, 8.67]
      ],
      fields: [
        ['Producto', 'Póliza de auto, vence el 30 de junio', -1],
        ['Origen', 'Lista de renovaciones', -1],
        ['Llamada', 'Iniciada 22 segundos después de entrar el lead', 0.3],
        ['Intención', 'Confirma la renovación', 8.7],
        ['Acción', 'Renovación registrada en el CRM', 9.4],
        ['Recibo', 'Enviado por email', 10.1]
      ],
      status: [[0, 'Llamando', 'run'], [10.8, 'Renovada', 'done']]
    },
    autos: {
      caller: 'Tu concesionario', dur: 11.39, lead: 'Carlos Ortega',
      lines: [
        ['p', 'Hola Carlos, te llamo del concesionario. El otro día viniste a ver el Seat León, ¿has podido decidirte o tienes alguna duda?', 0, 5.8],
        ['c', 'Sí, me gustó. Estaba dándole vueltas a la financiación. ¿Me resuelves algunas dudas?', 6.4, 11.3]
      ],
      fields: [
        ['Origen', 'Visitó el concesionario', -1],
        ['Interés', 'Seat León', -1],
        ['Llamada', 'Iniciada 22 segundos después de entrar el lead', 0.3],
        ['Intención', 'Financiación', 9.7],
        ['Resumen', 'Preparado para tu comercial', 11.5],
        ['Acción', 'Transferencia en caliente a tu comercial', 12.2]
      ],
      status: [[0, 'Llamando', 'run'], [12.9, 'Pasado a una persona', 'done']]
    }
  };

  /* ---------- Hero phone: silent loop of the insurance call ---------- */
  var hero = Phone($('heroPhone'), S.seguros.caller);
  var hRun = 0;
  async function heroLoop(){
    var id = ++hRun, alive = function(){ return id === hRun; };
    var lines = S.seguros.lines;
    hero.state('talk');
    if (reduce){ var sp0 = hero.speak('p', lines[0][1]); sp0.forEach(function(s){ s.classList.add('on'); }); hero.quiet(); hero.sub('0:05'); return; }
    while (alive()){
      var t0 = Date.now();
      var tick = setInterval(function(){ hero.sub(fmt((Date.now() - t0) / 1000)); }, 250);
      hero.state('talk');
      for (var i = 0; i < lines.length; i++){
        if (!alive()) break;
        var sp = hero.speak(lines[i][0], lines[i][1]), per = (lines[i][3] - lines[i][2]) * 1000 / sp.length;
        for (var k = 0; k < sp.length; k++){ if (!alive()) break; sp[k].classList.add('on'); await wait(per); }
        hero.quiet(); await wait(500);
      }
      clearInterval(tick);
      hero.state('end'); hero.sub('Llamada finalizada');
      await wait(2600);
    }
  }
  heroLoop();

  /* ---------- Demo: answer the call, real audio, lead record fills in ---------- */
  var sector = 'seguros', audio = null, timer = null, phone = null, rowEls = [];
  function paintCRM(){
    var cfg = S[sector];
    $('crmName').textContent = cfg.lead;
    var st = $('crmStatus'); st.textContent = 'Nuevo lead'; st.className = 'crm__s';
    var box = $('crmRows'); box.innerHTML = ''; rowEls = [];
    cfg.fields.forEach(function(f){
      var r = document.createElement('div'); r.className = 'fr' + (f[2] >= 0 ? ' empty' : '');
      r.innerHTML = '<span></span><b></b>'; r.children[0].textContent = f[0]; r.children[1].textContent = f[2] >= 0 ? 'Pendiente' : f[1];
      box.appendChild(r); rowEls.push(r);
    });
    $('crmFoot').textContent = 'Ficha de ejemplo. El audio es de la demo de Parlatia.';
  }
  function resetDemo(){
    if (timer){ clearInterval(timer); timer = null; }
    if (audio){ audio.pause(); audio = null; }
    var cfg = S[sector];
    phone = Phone($('demoPhone'), cfg.caller);
    phone.state('ring'); phone.sub('Llamada entrante');
    phone.onAccept(playDemo);
    phone.onDecline(function(){});
    paintCRM();
    $('hint').textContent = 'Pulsa Contestar para escuchar la llamada.';
    $('again').hidden = true;
  }
  function playDemo(){
    var cfg = S[sector], ph = phone;
    var a = new Audio(AUDIO[sector]); audio = a;
    a.play().then(function(){}).catch(function(){ $('hint').textContent = 'Tu navegador bloqueó el audio. Vuelve a pulsar Contestar.'; });
    ph.state('talk'); ph.sub('0:00'); ph.clear();
    $('hint').textContent = 'En llamada';
    var endedAt = null, lineSp = [], filled = 0, stIdx = -1, curLine = -1;
    a.addEventListener('ended', function(){ endedAt = Date.now(); ph.quiet(); });
    timer = setInterval(function(){
      var t = endedAt ? cfg.dur + (Date.now() - endedAt) / 1000 : a.currentTime;
      ph.sub(fmt(Math.min(t, cfg.dur)));
      cfg.lines.forEach(function(l, i){
        if (t < l[2]) return;
        if (i !== curLine){ curLine = i; lineSp = ph.speak(l[0], l[1]); }
        var frac = Math.min(1, (t - l[2]) / (l[3] - l[2])), n = Math.ceil(frac * lineSp.length);
        for (var k = 0; k < n; k++) lineSp[k].classList.add('on');
      });
      cfg.fields.forEach(function(f, i){
        if (f[2] >= 0 && t >= f[2] && rowEls[i].classList.contains('empty')){
          rowEls[i].classList.remove('empty'); rowEls[i].children[1].textContent = f[1];
          if (!reduce){ rowEls[i].classList.add('new'); }
        }
      });
      cfg.status.forEach(function(s, i){
        if (t >= s[0] && i > stIdx){ stIdx = i; var el = $('crmStatus'); el.textContent = s[1]; el.className = 'crm__s ' + s[2]; }
      });
      var allFilled = rowEls.every(function(r){ return !r.classList.contains('empty'); });
      if (endedAt && allFilled && stIdx === cfg.status.length - 1){
        clearInterval(timer); timer = null;
        ph.state('end'); ph.sub('Llamada finalizada');
        $('crmFoot').textContent = 'Duración de la llamada: ' + fmt(cfg.dur) + '. Ficha de ejemplo.';
        $('hint').textContent = '';
        $('again').hidden = false;
      }
    }, 60);
  }
  $('again').addEventListener('click', resetDemo);
  document.querySelectorAll('.tab').forEach(function(b){
    b.addEventListener('click', function(){
      sector = b.dataset.sector;
      document.querySelectorAll('.tab').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      resetDemo();
    });
  });
  resetDemo();

  /* ---------- Use cases under the demo (text only) ---------- */
  var UI = {
    renovar: '<path d="M3 12a9 9 0 0 1 9-9 9.750 9.750 0 0 1 6.740 2.740L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.750 9.750 0 0 1-6.740-2.740L3 16"/><path d="M8 16H3v5"/>',
    recibo: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.500v-11"/>',
    cita: '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
    alta: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    taller: '<path d="M14.700 6.300a1 1 0 0 0 0 1.400l1.600 1.600a1 1 0 0 0 1.400 0l3.770-3.770a6 6 0 0 1-7.940 7.940l-6.910 6.910a2.120 2.120 0 0 1-3-3l6.910-6.910a6 6 0 0 1 7.940-7.940l-3.760 3.760z"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    fuego: '<path d="M8.500 14.500A2.500 2.500 0 0 0 11 12c0-1.380-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.500 2 4.900 4 6.500 2 1.600 3 3.500 3 5.500a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.500 2.500 0 0 0 2.500 2.500z"/>'
  };
  var UC = {
    seguros: {
      t: 'Casos de uso en aseguradoras',
      i: 'Parlatia llama a cada persona de tu lista y los resultados llegan donde tu equipo ya trabaja.',
      l: [['renovar', 'Renovaciones de póliza'], ['recibo', 'Recibos devueltos'], ['cita', 'Citas de peritaje'], ['alta', 'Bienvenida de nuevos asegurados']]
    },
    autos: {
      t: 'Casos de uso en concesionarios',
      i: 'Parlatia llama a tus leads y clientes, cualifica y empuja la conversación hacia la venta.',
      l: [['taller', 'Recordatorios de revisiones'], ['renovar', 'Renovación de financiación'], ['msg', 'Seguimiento post-venta'], ['fuego', 'Reactivación de leads fríos']]
    }
  };
  function paintUC(){
    var u = UC[sector];
    $('ucT').textContent = u.t; $('ucI').textContent = u.i;
    var ul = $('ucL'); ul.innerHTML = '';
    u.l.forEach(function(x){
      var li = document.createElement('li');
      li.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + UI[x[0]] + '</svg><b></b>';
      li.querySelector('b').textContent = x[1];
      ul.appendChild(li);
    });
  }
  paintUC();
  document.querySelectorAll('.tab').forEach(function(b){ b.addEventListener('click', paintUC); });

  /* ---------- Flow: one scene per step, items appear one by one ---------- */
  var flow = $('flow'), fSteps = [].slice.call(flow.querySelectorAll('.fl-s')), fScenes = [].slice.call(flow.querySelectorAll('.fl-sc')), fTimers = [], fAgain = $('flAgain');
  function fClear(){ fTimers.forEach(clearTimeout); fTimers = []; }
  function countUp(el, to){
    var t0 = performance.now(), dur = 1300;
    (function f(now){
      var k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  function fShow(i, mode){
    fSteps.forEach(function(s, k){ s.classList.toggle('act', k === i); s.classList.toggle('done', k < i); });
    fScenes.forEach(function(sc, k){ sc.classList.toggle('on', k === i); });
    var its = [].slice.call(fScenes[i].querySelectorAll('[data-at]'));
    its.forEach(function(el){
      el.classList.remove('on');
      var c = el.querySelector('.fl-cnt'); if (c) c.textContent = mode === 'all' ? el.dataset.count : '0';
    });
    if (mode === 'all'){ its.forEach(function(el){ el.classList.add('on'); }); return 0; }
    if (mode === 'none') return 0;
    its.forEach(function(el){
      fTimers.push(setTimeout(function(){
        el.classList.add('on');
        var c = el.querySelector('.fl-cnt'); if (c) countUp(c, +el.dataset.count);
      }, +el.dataset.at));
    });
    return +fScenes[i].dataset.len;
  }
  function fPlay(from){
    fClear(); fAgain.hidden = true;
    var i = from;
    (function next(){
      var len = fShow(i, 'play');
      fTimers.push(setTimeout(function(){
        if (i < fScenes.length - 1){ i++; next(); } else { fAgain.hidden = false; }
      }, len));
    })();
  }
  if (reduce || !('IntersectionObserver' in window)){
    fShow(0, 'all');
    fSteps.forEach(function(s, k){ s.addEventListener('click', function(){ fShow(k, 'all'); }); });
  } else {
    fShow(0, 'none');
    fSteps.forEach(function(s, k){ s.addEventListener('click', function(){ fPlay(k); }); });
    fAgain.addEventListener('click', function(){ fPlay(0); });
    new IntersectionObserver(function(es, o){
      if (!es[0].isIntersecting) return;
      o.disconnect(); fPlay(0);
    }, {threshold: .45}).observe(flow);
  }

  /* ---------- Dashboard ---------- */
  var days = [['Lun',214,148],['Mar',231,160],['Mié',198,137],['Jue',226,156],['Vie',207,143],['Sáb',124,85],['Dom',40,27]];
  var bars = $('bars');
  days.forEach(function(d){
    var h = Math.round(d[1] / 231 * 130), a = Math.round(d[2] / d[1] * h);
    var c = document.createElement('div');
    c.innerHTML = '<b>' + d[1] + '</b><div class="stk"><i class="b" style="height:' + (h - a) + 'px"></i><i class="a" style="height:' + a + 'px"></i></div><span>' + d[0] + '</span>';
    bars.appendChild(c);
  });
  var calls = [
    ['17:42','Javier Ruiz','Renovación de póliza','Renovada','0:48','ok'],
    ['17:31','Carlos Ortega','Seguimiento de visita','Pasado a una persona','1:12','persona'],
    ['17:20','Lucía Navarro','Recibo devuelto','Cobro reprogramado','1:05','ok'],
    ['17:12','Pablo Moreno','Reactivación de lead','No contestó','0:00','sin'],
    ['16:58','Marta Gil','Bienvenida de asegurado','Datos verificados','0:54','ok'],
    ['16:47','Andrés Cano','Renovación de financiación','Pasado a una persona','1:31','persona'],
    ['16:40','Elena Vidal','Renovación de póliza','Pidió que la llamen más tarde','0:22','ok']
  ];
  function rows(f){
    var tb = $('rows'); tb.innerHTML = '';
    calls.filter(function(c){ return f === 'all' || c[5] === f; }).forEach(function(c){
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + c[0] + '</td><td></td><td></td><td class="' + (c[5] === 'persona' ? 'go' : '') + '"></td><td>' + c[4] + '</td>';
      var td = tr.children; td[1].textContent = c[1]; td[2].textContent = c[2]; td[3].textContent = c[3];
      tb.appendChild(tr);
    });
  }
  rows('all');
  document.querySelectorAll('.filters button').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('.filters button').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      rows(b.dataset.f);
    });
  });
  document.querySelectorAll('.db__nav button').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('.db__nav button').forEach(function(x){ x.setAttribute('aria-current', x === b ? 'true' : 'false'); });
      document.querySelectorAll('.view').forEach(function(v){ v.hidden = v.id !== 'v-' + b.dataset.view; });
    });
  });

  /* ---------- Business rules ---------- */
  var COND = {
    financiacion: ['el cliente menciona la financiación', 'Menciona la financiación'],
    persona: ['el cliente pide hablar con una persona', 'Pide hablar con una persona'],
    nointeres: ['el cliente dice que no le interesa', 'Dice que no le interesa'],
    precio: ['el cliente pregunta por el precio', 'Pregunta por el precio'],
    nocontesta: ['el lead no contesta', 'No contesta la llamada'],
    fuera: ['el lead entra fuera de horario (lunes a viernes, de 9:00 a 20:00)', 'Entra un sábado a las 22:30']
  };
  var ACT = {
    transfer: ['pasa la llamada a una persona, con un resumen hablado', 'Te paso ahora con una persona de nuestro equipo, que ya conoce tu caso.', 'Pasado a una persona, con resumen y transcripción.'],
    retry: ['vuelve a llamar en 2 horas, hasta 3 intentos', '', 'Reintento programado en 2 horas, hasta 3 intentos.'],
    stop: ['registra el motivo y no vuelve a llamar', 'Entendido, no volveremos a llamarte. Gracias por tu tiempo.', 'Marcado como no llamar, con el motivo registrado.'],
    cita: ['agenda una cita con tu equipo', 'Puedo agendarte una cita con nuestro equipo. ¿Qué día te va mejor?', 'Cita agendada con el equipo.'],
    email: ['envía la información por email', 'Te envío la información a tu correo ahora mismo.', 'Información enviada por email.'],
    wait: ['espera al siguiente horario hábil y llama entonces', '', 'Llamada programada para el siguiente horario hábil.']
  };
  var rules = [
    {c: 'financiacion', a: 'transfer', on: true},
    {c: 'persona', a: 'transfer', on: true},
    {c: 'nointeres', a: 'stop', on: true},
    {c: 'nocontesta', a: 'retry', on: true},
    {c: 'fuera', a: 'wait', on: true}
  ];
  var lastSit = null;
  function ruleText(r){ return 'Cuando <b>' + COND[r.c][0] + '</b>, Parlatia <b>' + ACT[r.a][0] + '</b>.'; }
  function renderRules(freshIdx){
    var ul = $('rlist'); ul.innerHTML = '';
    rules.forEach(function(r, i){
      var li = document.createElement('li');
      li.className = (r.on ? '' : 'off') + (i === freshIdx ? ' fresh' : '');
      li.innerHTML = '<label class="sw"><input type="checkbox" ' + (r.on ? 'checked' : '') + ' aria-label="Activar o desactivar la regla"><span class="tg"></span></label><p>' + ruleText(r) + '</p>' + (r.mine ? '<button class="rm" type="button">Quitar</button>' : '<span></span>');
      li.querySelector('input').addEventListener('change', function(e){ r.on = e.target.checked; renderRules(); if (lastSit) test(lastSit); });
      var rm = li.querySelector('.rm');
      if (rm) rm.addEventListener('click', function(){ rules.splice(i, 1); renderRules(); if (lastSit) test(lastSit); });
      ul.appendChild(li);
    });
  }
  function test(key){
    lastSit = key;
    document.querySelectorAll('#sits button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.k === key ? 'true' : 'false'); });
    var hit = null;
    for (var i = 0; i < rules.length; i++){ if (rules[i].on && rules[i].c === key){ hit = rules[i]; break; } }
    var box = $('rres');
    if (!hit){
      box.innerHTML = '<span class="l">Regla aplicada</span><span class="none">Ninguna regla activa para esta situación. Parlatia sigue el guion general y deja la llamada sin clasificar. Añade una regla para decidir qué hace.</span>';
      return;
    }
    var A = ACT[hit.a];
    box.innerHTML = '<span class="l">Regla aplicada</span><span>' + ruleText(hit) + '</span>' +
      (A[1] ? '<span class="l">Parlatia dice</span><b>«' + A[1] + '»</b>' : '') +
      '<span class="l">En tu CRM</span><span>' + A[2] + '</span>';
  }
  Object.keys(COND).forEach(function(k){
    var o = document.createElement('option'); o.value = k; o.textContent = COND[k][0].replace(/ \(.*\)/, ''); $('rc').appendChild(o);
    var b = document.createElement('button'); b.type = 'button'; b.dataset.k = k; b.setAttribute('aria-pressed', 'false'); b.textContent = COND[k][1];
    b.addEventListener('click', function(){ test(k); }); $('sits').appendChild(b);
  });
  Object.keys(ACT).forEach(function(k){
    var o = document.createElement('option'); o.value = k; o.textContent = ACT[k][0]; $('ra').appendChild(o);
  });
  $('radd').addEventListener('submit', function(e){
    e.preventDefault();
    rules.unshift({c: $('rc').value, a: $('ra').value, on: true, mine: true});
    renderRules(0);
    if (lastSit) test(lastSit);
  });
  renderRules();

  /* ---------- Calculator ---------- */
  var nf = new Intl.NumberFormat('es-ES');
  function calc(){
    var leads = +$('c1').value, inTime = +$('c2').value, conv = +$('c3').value, tk = +$('c4').value;
    $('o1').textContent = nf.format(leads);
    $('o2').textContent = inTime + '%';
    $('o3').textContent = conv + '%';
    $('o4').textContent = nf.format(tk) + ' €';
    var late = Math.round(leads * (1 - inTime / 100));
    var sales = Math.round(late * conv / 100);
    $('oBig').textContent = nf.format(sales * tk) + ' €';
    $('oTxt').textContent = nf.format(late) + ' leads al mes se llaman tarde. Si Parlatia los llamara en menos de 30 segundos y compraran al mismo ritmo que el resto, serían ' + nf.format(sales) + ' ventas más cada mes.';
  }
  ['c1','c2','c3','c4'].forEach(function(id){ $(id).addEventListener('input', calc); });
  calc();

  /* ---------- Contact modal ---------- */
  var dlg = $('contact');
  function openM(e){ if (e) e.preventDefault(); $('mbox').classList.remove('sent'); $('mform').reset(); dlg.showModal(); }
  document.querySelectorAll('[data-open]').forEach(function(b){ b.addEventListener('click', openM); });
  $('mclose').addEventListener('click', function(){ dlg.close(); });
  $('mdone').addEventListener('click', function(){ dlg.close(); });
  dlg.addEventListener('click', function(e){ if (e.target === dlg) dlg.close(); });
  $('mform').addEventListener('submit', function(e){
    e.preventDefault();
    if (!e.target.checkValidity()){ e.target.reportValidity(); return; }
    $('mbox').classList.add('sent');
  });
})();
