(function() {
  'use strict';

  var header = document.querySelector('.header');
  var navToggle = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');
  var revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  function handleScroll() { if (window.scrollY > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled'); }
  window.addEventListener('scroll', handleScroll, { passive: true }); handleScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() { navLinks.classList.toggle('active'); navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active')); });
    navLinks.querySelectorAll('a').forEach(function(l) { l.addEventListener('click', function() { navLinks.classList.remove('active'); navToggle.setAttribute('aria-expanded','false'); }); });
    document.addEventListener('keydown', function(e) { if (e.key==='Escape'&&navLinks.classList.contains('active')) { navLinks.classList.remove('active'); navToggle.setAttribute('aria-expanded','false'); } });
  }

  function revealOnScroll() { var wh=window.innerHeight; revealElements.forEach(function(el) { if (el.getBoundingClientRect().top<wh-100) el.classList.add('visible'); }); }
  window.addEventListener('scroll', revealOnScroll, { passive: true }); window.addEventListener('load', revealOnScroll); revealOnScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) { var id=this.getAttribute('href'); if(id==='#')return; var el=document.querySelector(id); if(el){e.preventDefault();window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'});} });
  });

  // ===================== HERO MILESTONES =====================
  var msC = document.getElementById('milestones-container');
  if (msC) {
    var CK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    var HG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6z"/></svg>';
    function mk(type,label,right){var el=document.createElement('div');el.className='milestone milestone--'+type;var ic=document.createElement('span');if(type==='complete'){ic.className='milestone__icon milestone__icon--check';ic.innerHTML=CK;}else if(type==='progress'){ic.className='milestone__icon milestone__icon--progress';ic.innerHTML='<div class="milestone__progress-ring"></div>';}else{ic.className='milestone__icon milestone__icon--hourglass milestone__icon--hourglass-pulse';ic.innerHTML=HG;}var lb=document.createElement('span');lb.className='milestone__label';lb.textContent=label;el.appendChild(ic);el.appendChild(lb);if(right==='bar'){var b=document.createElement('span');b.className='milestone__bar';b.innerHTML='<span class="milestone__bar-fill" style="width:0%"></span>';el.appendChild(b);}else{var t=document.createElement('span');t.className='milestone__time';t.textContent=right||'';el.appendChild(t);}return el;}
    var msW=msC.parentElement,whL=false;
    function runMs(){msC.innerHTML='';msC.style.position='relative';var a=mk('complete','Block On','14:32'),b=mk('complete','Bag Unloading','14:41'),c=mk('progress','PAX Disembarking','bar'),d=mk('pending','Cleaning','');msC.appendChild(a);msC.appendChild(b);msC.appendChild(c);msC.appendChild(d);if(!whL){requestAnimationFrame(function(){msW.style.height=msW.offsetHeight+'px';whL=true;});}var pf=c.querySelector('.milestone__bar-fill');pf.style.transition='width 2.5s cubic-bezier(.25,.1,.25,1)';setTimeout(function(){pf.style.width='90%';},50);setTimeout(function(){pf.style.transition='width 1s cubic-bezier(.25,.1,.25,1)';pf.style.width='100%';},3000);setTimeout(function(){pf.style.transition='background .5s ease';pf.style.background='#4ADE80';},4200);setTimeout(function(){c.className='milestone milestone--complete';var pi=c.querySelector('.milestone__icon');pi.className='milestone__icon milestone__icon--check';pi.innerHTML=CK;var br=c.querySelector('.milestone__bar');if(br){var te=document.createElement('span');te.className='milestone__time';te.textContent='14:48';br.replaceWith(te);}},4800);setTimeout(function(){var rh=c.offsetHeight+parseInt(getComputedStyle(msC).gap||'8');c.style.transition='transform 1s cubic-bezier(.25,.1,.25,1),opacity .8s ease';c.style.transform='translateY(-'+rh+'px)';c.style.opacity='0';c.style.zIndex='0';b.style.position='relative';b.style.zIndex='1';d.style.transition='transform 1s cubic-bezier(.25,.1,.25,1)';d.style.transform='translateY(-'+rh+'px)';var bd=mk('pending','Boarding','');bd.style.opacity='0';bd.style.transform='translateY(8px)';msC.appendChild(bd);setTimeout(function(){bd.style.transition='transform .9s cubic-bezier(.25,.1,.25,1),opacity .8s ease';bd.style.transform='translateY(-'+rh+'px)';bd.style.opacity='1';},150);setTimeout(function(){msC.innerHTML='';msC.appendChild(mk('complete','Block On','14:32'));msC.appendChild(mk('complete','Bag Unloading','14:41'));var c2=mk('pending','Cleaning','');msC.appendChild(c2);msC.appendChild(mk('pending','Boarding',''));setTimeout(function(){c2.style.transition='opacity .4s ease';c2.style.opacity='.4';setTimeout(function(){c2.className='milestone milestone--progress';var ic2=c2.querySelector('.milestone__icon');ic2.className='milestone__icon milestone__icon--progress';ic2.innerHTML='<div class="milestone__progress-ring"></div>';var ts2=c2.querySelector('.milestone__time');if(ts2){var b2=document.createElement('span');b2.className='milestone__bar';b2.innerHTML='<span class="milestone__bar-fill" style="width:0%"></span>';ts2.replaceWith(b2);}c2.style.opacity='1';setTimeout(function(){var cf2=c2.querySelector('.milestone__bar-fill');if(cf2){cf2.style.transition='width 4s cubic-bezier(.25,.1,.25,1)';cf2.style.width='55%';}},200);},450);},600);},1100);},5500);setTimeout(function(){var ch=msC.children;for(var i=0;i<ch.length;i++){ch[i].style.transition='opacity .8s ease';ch[i].style.opacity='0';}setTimeout(runMs,1000);},13000);}
    runMs();
  }

  // ===================== 01: FLIGHT TABS =====================
  var logoMap = { 'BA':'assets/logo/BA.png','AF':'assets/logo/Air France_idKuYSvPDb_1.png','AZ':'assets/logo/ITA.png','U2':'assets/logo/U2.jpeg','FR':'assets/logo/FR.png','KL':'assets/logo/KL.jpeg','LH':'assets/logo/LH.jpeg' };
  var flightData = {
    onground: [
      { code:'BA 8173', route:'BRS → LYS', type:'A320', stand:'Stand 10A', status:'Boarding', sc:'green', logo:'BA' },
      { code:'U2 4419', route:'BRS → BCN', type:'A320', stand:'Stand 11A', status:'Taxi in', sc:'blink', logo:'U2' },
      { code:'FR 4152', route:'BRS → DUB', type:'B738', stand:'Stand 12A', status:'Cleaning', sc:'blue', logo:'FR' }
    ],
    arrivals: [
      { code:'KL 1051', route:'AMS → BRS', type:'E190', stand:'', status:'Confirmed at 15:28', sc:'green', otp:'(-00:12)', oc:'text-success', logo:'KL' },
      { code:'LH 2284', route:'FRA → BRS', type:'A321', stand:'', status:'Expected 16:05', sc:'muted', logo:'LH' },
      { code:'AF 7520', route:'CDG → BRS', type:'A220', stand:'', status:'Expected 16:40', sc:'muted', logo:'AF' }
    ],
    departed: [
      { code:'AZ 1624', route:'BRS → FCO', type:'A320', stand:'Stand 11A', status:'Departed 12:10', sc:'muted', otp:'(-00:05)', oc:'text-success', logo:'AZ' },
      { code:'AF 1284', route:'BRS → CDG', type:'A220', stand:'Stand 10A', status:'Departed 11:45', sc:'muted', otp:'(-00:08)', oc:'text-success', logo:'AF' },
      { code:'BA 8172', route:'BRS → LGW', type:'A320', stand:'Stand 10A', status:'Departed 10:30', sc:'muted', otp:'(+00:09)', oc:'text-danger', logo:'BA' }
    ]
  };
  var flightTabs = document.getElementById('flight-tabs');
  var flightList = document.getElementById('flight-list');
  var tabKeys = ['onground','arrivals','departed'], tabIdx = 0;

  function renderFlights(key) {
    if (!flightList) return;
    flightList.style.opacity = '0';
    setTimeout(function() {
      flightList.innerHTML = '';
      flightData[key].forEach(function(f) {
        var row = document.createElement('div'); row.className = 'feature-detail__flight-row';
        var left = document.createElement('div');
        var ir = document.createElement('div'); ir.className = 'feature-detail__flight-info-row';
        var ls = logoMap[f.logo];
        if (ls) { var lw=document.createElement('span');lw.className='feature-detail__flight-logo';var li=document.createElement('img');li.src=ls;li.alt=f.logo;li.width=16;li.height=16;lw.appendChild(li);ir.appendChild(lw); }
        var cs = document.createElement('span');cs.className='feature-detail__flight-code';cs.textContent=f.code+' • '+f.route;ir.appendChild(cs);
        left.appendChild(ir);
        var meta=document.createElement('div');meta.className='feature-detail__flight-meta';meta.textContent=f.stand?f.type+' • '+f.stand:f.type;left.appendChild(meta);
        row.appendChild(left);
        var right=document.createElement('div');right.style.cssText='display:flex;align-items:center;gap:6px';
        var badge=document.createElement('span');badge.className='feature-detail__flight-badge feature-detail__flight-badge--'+f.sc;badge.textContent=f.status;right.appendChild(badge);
        if(f.otp){var otp=document.createElement('span');otp.className='feature-detail__flight-otp '+f.oc;otp.textContent=f.otp;right.appendChild(otp);}
        row.appendChild(right);flightList.appendChild(row);
      });
      flightList.style.opacity = '1';
    }, 350);
  }

  if (flightTabs) {
    var tabs = flightTabs.querySelectorAll('.feature-detail__tab');
    function setTab(i) { tabs.forEach(function(t){t.classList.remove('feature-detail__tab--active');}); tabs[i].classList.add('feature-detail__tab--active'); renderFlights(tabKeys[i]); }
    tabs.forEach(function(tab,i) { tab.addEventListener('click', function() { tabIdx=i; setTab(i); }); });
    renderFlights('onground');
    setInterval(function() { tabIdx=(tabIdx+1)%tabKeys.length; setTab(tabIdx); }, 5000);
  }

  // ===================== 03: CHAT =====================
  var chatCard = document.getElementById('chat-card');
  var chatMessages = document.getElementById('chat-messages');
  var chatInput = document.getElementById('chat-input');
  var chatSendBtn = document.getElementById('chat-send-btn');
  var chatAnimated = false;
  var chatMsgs = [
    { side:'left', author:'Ramp', ac:'ramp', text:'Bird strike damage on nose gear door, engineering on their way. We can\'t push until they clear it.' },
    { side:'left', author:'Dispatch', ac:'dispatch', text:'Airline ops on the phone, they want an ETA before deciding on pax rebooking. What\'s engineering saying?' },
    { side:'right', author:'Supervisor • N. Laurent', ac:'supervisor', text:'Engineering estimates 25 min for inspection. Keep pax on board for now, I\'ll update the airline directly.' }
  ];
  function animateChat() {
    if (chatAnimated||!chatMessages) return; chatAnimated=true; chatMessages.innerHTML='';
    chatMsgs.forEach(function(m,i) {
      var div=document.createElement('div');div.className='feature-detail__chat-msg feature-detail__chat-msg--'+m.side;div.style.opacity='0';div.style.transform='translateY(10px)';
      var a=document.createElement('div');a.className='feature-detail__chat-author feature-detail__chat-author--'+m.ac;a.textContent=m.author;
      var t=document.createElement('div');t.className='feature-detail__chat-text';t.textContent=m.text;
      div.appendChild(a);div.appendChild(t);chatMessages.appendChild(div);
      setTimeout(function(){div.style.transition='opacity .5s ease,transform .5s ease';div.style.opacity='1';div.style.transform='translateY(0)';},i*1200+100);
    });
  }
  if (chatCard) { var co=new IntersectionObserver(function(e){if(e[0].isIntersecting){animateChat();co.disconnect();}},{threshold:0.3});co.observe(chatCard); }
  function sendChat(){if(!chatInput||!chatMessages)return;var text=chatInput.value.trim();if(!text)return;var msg=document.createElement('div');msg.className='feature-detail__chat-msg feature-detail__chat-msg--right';msg.style.animation='fadeIn .3s ease';var a=document.createElement('div');a.className='feature-detail__chat-author feature-detail__chat-author--supervisor';a.textContent='Supervisor • N. Laurent';var t=document.createElement('div');t.className='feature-detail__chat-text';t.textContent=text;msg.appendChild(a);msg.appendChild(t);chatMessages.appendChild(msg);chatInput.value='';chatMessages.scrollTop=chatMessages.scrollHeight;}
  if(chatSendBtn)chatSendBtn.addEventListener('click',sendChat);
  if(chatInput)chatInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sendChat();}});

  // ===================== 04: PAX FINAL =====================
  var paxFinalBtn = document.getElementById('pax-final-btn');
  var paxFinalActive = false;
  var now = new Date();
  var closeH = now.getHours()-1; if(closeH<0)closeH+=24;
  var closeM = now.getMinutes();
  var boardingCloseTime = (closeH<10?'0':'')+closeH+':'+(closeM<10?'0':'')+closeM;

  if (paxFinalBtn) {
    paxFinalBtn.addEventListener('click', function() {
      var ci=document.getElementById('pax-checkedin'),bags=document.getElementById('pax-bags');
      var dp=document.getElementById('pax-delta-pax'),db=document.getElementById('pax-delta-bags');
      var bl=document.getElementById('boarding-label'),bv=document.getElementById('boarding-value');
      if(!paxFinalActive){
        paxFinalActive=true;
        paxFinalBtn.textContent='FINAL confirmed';paxFinalBtn.className='feature-detail__pax-badge feature-detail__pax-badge--final';
        if(ci)ci.textContent='152';if(bags)bags.textContent='128';
        if(dp)dp.style.display='inline';if(db)db.style.display='inline';
        if(bl)bl.textContent='Boarding closes at';if(bv)bv.textContent=boardingCloseTime;
      } else {
        paxFinalActive=false;
        paxFinalBtn.textContent='FINAL pending';paxFinalBtn.className='feature-detail__pax-badge feature-detail__pax-badge--pending feature-detail__pax-badge--clickable';
        paxFinalBtn.setAttribute('role','button');paxFinalBtn.setAttribute('tabindex','0');
        if(ci)ci.textContent='154';if(bags)bags.textContent='131';
        if(dp)dp.style.display='none';if(db)db.style.display='none';
        if(bl)bl.textContent='Estimated boarding in';if(bv)bv.textContent='08:35';
      }
    });
  }
  var boardingSec = 8*60+35;
  setInterval(function(){if(paxFinalActive)return;boardingSec--;if(boardingSec<0)boardingSec=8*60+35;var bv=document.getElementById('boarding-value');if(bv){var m=Math.floor(boardingSec/60),s=boardingSec%60;bv.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;}},1000);

  // ===================== 06: STAND MANAGEMENT =====================
  var ganttFlights = {
    'BA8173': { label:'BA 8173', otp:'+00:30', otpClass:'danger' },
    'AF1284': { label:'AF 1284', otp:'-00:12', otpClass:'success' },
    'AZ1624': { label:'AZ 1624' },
    'U24419': { label:'U2 4419' },
    'FR4152': { label:'FR 4152' },
    'KL1051': { label:'KL 1051' }
  };

  // Conflict: BA ends at 40%, AF starts at 32% → overlap 32-40%
  // We'll render BA from 5-32%, AF from 40-60%, and a hatched zone at 32-40%
  var conflictLayout = {
    '10A': [
      { id:'BA8173', left:5, width:27, showOtp:true },
      { id:'AF1284', left:40, width:20, showOtp:true },
      { overlap: true, left:32, width:8 }
    ],
    '11A': [ { id:'AZ1624', left:5, width:30 }, { id:'U24419', left:45, width:30 } ],
    '12A': [ { id:'FR4152', left:5, width:25 }, { id:'KL1051', left:55, width:28 } ]
  };
  var resolvedLayout = {
    '10A': [ { id:'BA8173', left:5, width:27 }, { id:'KL1051', left:55, width:28 } ],
    '11A': [ { id:'AZ1624', left:5, width:30 }, { id:'U24419', left:45, width:30 } ],
    '12A': [ { id:'FR4152', left:5, width:25 }, { id:'AF1284', left:40, width:28 } ]
  };

  var ganttResolved = false;
  var suggestBtn = document.getElementById('suggest-allocation-btn');
  var ganttAlert = document.getElementById('gantt-alert');
  var ganttAlertText = document.getElementById('gantt-alert-text');
  var allBlockEls = {};

  function buildGantt(layout, animate) {
    var tracks = { '10A':document.getElementById('track-10A'), '11A':document.getElementById('track-11A'), '12A':document.getElementById('track-12A') };

    if (!animate) {
      Object.keys(tracks).forEach(function(k){if(tracks[k])tracks[k].innerHTML='';});
      allBlockEls = {};

      Object.keys(layout).forEach(function(stand) {
        var track = tracks[stand]; if(!track) return;
        layout[stand].forEach(function(item) {
          if (item.overlap) {
            var overlay = document.createElement('div');
            overlay.className = 'feature-detail__gantt-overlap';
            overlay.style.left = item.left+'%';
            overlay.style.width = item.width+'%';
            track.appendChild(overlay);
            return;
          }
          var fl = ganttFlights[item.id];
          var block = document.createElement('div');
          block.className = 'feature-detail__gantt-block';
          block.setAttribute('data-flight', item.id);
          block.style.left = item.left+'%'; block.style.width = item.width+'%';
          if (item.showOtp && fl.otp) {
            var nameSpan = document.createElement('span');
            nameSpan.textContent = fl.label + ' ';
            var otpSpan = document.createElement('span');
            otpSpan.textContent = '(' + fl.otp + ')';
            otpSpan.style.color = fl.otpClass === 'danger' ? '#FF4444' : '#00E676';
            otpSpan.style.fontWeight = '700';
            block.appendChild(nameSpan);
            block.appendChild(otpSpan);
          } else {
            block.textContent = fl.label;
          }
          track.appendChild(block);
          allBlockEls[item.id] = block;
        });
      });
    } else {
      // Animated: fade out moving blocks, reposition, fade in
      var movedIds = {};
      Object.keys(layout).forEach(function(stand) {
        layout[stand].forEach(function(item) {
          var oldBlock = allBlockEls[item.id];
          if (!oldBlock) return;
          var oldTrack = oldBlock.parentElement;
          var newTrack = tracks[stand];
          if (oldTrack !== newTrack || parseFloat(oldBlock.style.left) !== item.left) {
            movedIds[item.id] = { newStand: stand, left: item.left, width: item.width };
          }
        });
      });

      // Remove overlap overlays
      document.querySelectorAll('.feature-detail__gantt-overlap').forEach(function(el) {
        el.style.opacity = '0';
        setTimeout(function() { el.remove(); }, 500);
      });

      // Fade out moving blocks
      Object.keys(movedIds).forEach(function(id) { if(allBlockEls[id]) allBlockEls[id].style.opacity='0'; });

      setTimeout(function() {
        // Move blocks to new tracks
        Object.keys(movedIds).forEach(function(id) {
          var info = movedIds[id];
          var el = allBlockEls[id];
          var newTrack = tracks[info.newStand];
          if (el && newTrack) {
            el.style.transition = 'none';
            newTrack.appendChild(el);
            el.style.left = info.left+'%';
            el.style.width = info.width+'%';
            void el.offsetHeight;
            el.style.transition = 'opacity .5s ease';
          }
        });

        // Clean ALL blocks: label only, centered
        Object.keys(allBlockEls).forEach(function(id) {
          var el = allBlockEls[id];
          el.textContent = ganttFlights[id].label;
          el.classList.remove('feature-detail__gantt-block--conflict');
          el.style.color = '';
        });

        // Fade in moved blocks
        setTimeout(function() {
          Object.keys(movedIds).forEach(function(id) { if(allBlockEls[id]) allBlockEls[id].style.opacity='1'; });
        }, 100);
      }, 500);
    }
  }

  if (document.getElementById('track-10A')) buildGantt(conflictLayout, false);

  if (suggestBtn) {
    suggestBtn.addEventListener('click', function() {
      ganttResolved = !ganttResolved;
      if (ganttResolved) {
        buildGantt(resolvedLayout, true);
        suggestBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Reset';
        suggestBtn.style.animation = 'none';
        if(ganttAlertText)ganttAlertText.textContent='No conflicts';
        if(ganttAlert){ganttAlert.style.borderColor='rgba(74,222,128,0.25)';ganttAlert.style.background='rgba(74,222,128,0.08)';ganttAlert.style.color='rgba(74,222,128,0.85)';}
        var d=ganttAlert?ganttAlert.querySelector('.feature-detail__conflict-dot'):null;if(d)d.style.background='#4ADE80';
      } else {
        allBlockEls = {};
        buildGantt(conflictLayout, false);
        suggestBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Suggest allocation';
        suggestBtn.style.animation = '';
        if(ganttAlertText)ganttAlertText.textContent='1 conflict on stand 10A';
        if(ganttAlert){ganttAlert.style.borderColor='rgba(248,113,113,0.25)';ganttAlert.style.background='rgba(248,113,113,0.08)';ganttAlert.style.color='rgba(248,113,113,0.85)';}
        var d2=ganttAlert?ganttAlert.querySelector('.feature-detail__conflict-dot'):null;if(d2)d2.style.background='#F87171';
      }
    });
  }

  // ===================== CAPABILITIES CAROUSEL =====================
  var carousel = document.getElementById('capabilities-carousel');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  if (carousel) {
    var cards = carousel.querySelectorAll('.capability-card');
    var total = cards.length;
    var cIdx = 0;
    function getStep() { var gap=parseFloat(getComputedStyle(carousel).gap)||24; return cards[0].offsetWidth+gap; }
    function slideTo(i) {
      var max = total - 3;
      if (max < 0) max = 0;
      if (i < 0) i = 0;
      if (i > max) i = 0;
      cIdx = i;
      carousel.style.transform = 'translateX(-'+(getStep()*cIdx)+'px)';
    }
    if (prevBtn) prevBtn.addEventListener('click', function() { slideTo(cIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { slideTo(cIdx + 1); });
    var autoSlide = setInterval(function() { slideTo(cIdx + 1); }, 5000);
    // Pause auto on hover
    carousel.addEventListener('mouseenter', function() { clearInterval(autoSlide); });
    carousel.addEventListener('mouseleave', function() { autoSlide = setInterval(function() { slideTo(cIdx + 1); }, 5000); });
  }

  // ===================== EARLY ACCESS MODAL =====================
  var eaModal = document.getElementById('ea-modal');
  var eaForm = document.getElementById('ea-form');
  var eaClose = document.getElementById('ea-modal-close');
  var eaFeedback = document.getElementById('ea-feedback');
  var eaSubmit = document.getElementById('ea-submit');

  function openEaModal() {
    if (!eaModal) return;
    eaModal.classList.add('active');
    eaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
    setTimeout(function() {
      var first = document.getElementById('ea-firstname');
      if (first) first.focus();
    }, 100);
  }

  function closeEaModal() {
    if (!eaModal) return;
    eaModal.classList.remove('active');
    eaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function resetEaForm() {
    if (eaForm) eaForm.reset();
    if (eaFeedback) { eaFeedback.textContent = ''; eaFeedback.className = 'modal__feedback'; }
    if (eaSubmit) eaSubmit.disabled = false;
    eaModal.querySelectorAll('.modal__input--error').forEach(function(el) {
      el.classList.remove('modal__input--error');
    });
  }

  document.querySelectorAll('.ea-trigger').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      resetEaForm();
      openEaModal();
    });
  });

  if (eaClose) eaClose.addEventListener('click', closeEaModal);
  if (eaModal) eaModal.addEventListener('click', function(e) { if (e.target === eaModal) closeEaModal(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && eaModal && eaModal.classList.contains('active')) closeEaModal();
  });

  if (eaForm) {
    eaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var firstName = document.getElementById('ea-firstname').value.trim();
      var lastName = document.getElementById('ea-lastname').value.trim();
      var email = document.getElementById('ea-email').value.trim();
      var company = document.getElementById('ea-company').value.trim();
      var station = document.getElementById('ea-station').value.trim();
      var message = document.getElementById('ea-message').value.trim();

      eaModal.querySelectorAll('.modal__input--error').forEach(function(el) {
        el.classList.remove('modal__input--error');
      });

      var valid = true;
      if (!firstName) { document.getElementById('ea-firstname').classList.add('modal__input--error'); valid = false; }
      if (!lastName) { document.getElementById('ea-lastname').classList.add('modal__input--error'); valid = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('ea-email').classList.add('modal__input--error'); valid = false; }
      if (!valid) {
        eaFeedback.textContent = 'Please fill in all required fields.';
        eaFeedback.className = 'modal__feedback modal__feedback--error';
        return;
      }

      eaSubmit.disabled = true;
      eaFeedback.textContent = '';
      eaFeedback.className = 'modal__feedback';

      fetch('https://mayfly-sandbox-api.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          company: company,
          station: station,
          message: message
        })
      })
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        eaFeedback.textContent = 'Request sent! We’ll be in touch.';
        eaFeedback.className = 'modal__feedback modal__feedback--success';
        setTimeout(closeEaModal, 2000);
      })
      .catch(function() {
        eaFeedback.textContent = 'Something went wrong. Please try again.';
        eaFeedback.className = 'modal__feedback modal__feedback--error';
        eaSubmit.disabled = false;
      });
    });
  }

  // ===================== LIVE ACTIVITY FEED =====================
  var feedC = document.getElementById('activity-feed'), feedW = document.getElementById('activity-feed-wrapper');
  if (feedC && feedW) {
    var n2=new Date(),hh=n2.getHours(),mm=n2.getMinutes(),at2=(hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm,cs2=600;
    function ct2(){var m=Math.floor(cs2/60),s=cs2%60;return(m<10?'0':'')+m+':'+(s<10?'0':'')+s;}
    var fi2=[{logo:'assets/logo/BA.png',alt:'BA',code:'BA 4091',msg:'Arriving on block at '+at2},{logo:'assets/logo/Air France_idKuYSvPDb_1.png',alt:'AF',code:'AF 7520',msg:'Check-in closure'},{logo:'assets/logo/BA.png',alt:'BA',code:'BA 8173',msg:'Go boarding in ',countdown:true},{logo:'assets/logo/ITA.png',alt:'AZ',code:'AZ 1624',msg:'De-icing requested'}];
    var fx=0,VC=3;
    function mkR(it){var r=document.createElement('div');r.className='product__screen-activity-row';var ls=document.createElement('span');ls.className='product__screen-activity-logo';var img=document.createElement('img');img.src=it.logo;img.alt=it.alt;img.width=18;img.height=18;ls.appendChild(img);var ts=document.createElement('span');ts.className='product__screen-activity-text';var st=document.createElement('strong');st.textContent=it.code;ts.appendChild(st);ts.appendChild(document.createTextNode(' '+it.msg));if(it.countdown){var cd=document.createElement('span');cd.className='boarding-countdown-value';cd.textContent=ct2();ts.appendChild(cd);}r.appendChild(ls);r.appendChild(ts);return r;}
    for(var i=0;i<VC;i++)feedC.appendChild(mkR(fi2[(fx+i)%fi2.length]));
    setInterval(function(){cs2--;if(cs2<0)cs2=600;var sp=feedC.querySelectorAll('.boarding-countdown-value');for(var j=0;j<sp.length;j++)sp[j].textContent=ct2();},1000);
    var RH=0;
    setTimeout(function(){var fr=feedC.querySelector('.product__screen-activity-row');if(fr){var g=parseFloat(getComputedStyle(feedC).gap)||4;RH=fr.offsetHeight+g;feedW.style.height=(RH*VC-g)+'px';}feedC.style.transition='transform 1600ms cubic-bezier(.25,.1,.25,1)';setInterval(function(){feedC.style.transform='translateY(-'+RH+'px)';setTimeout(function(){feedC.style.transition='none';feedC.removeChild(feedC.firstElementChild);fx=(fx+VC)%fi2.length;feedC.appendChild(mkR(fi2[fx]));feedC.style.transform='translateY(0)';void feedC.offsetHeight;feedC.style.transition='transform 1600ms cubic-bezier(.25,.1,.25,1)';},1650);},5000);},200);
  }
})();
