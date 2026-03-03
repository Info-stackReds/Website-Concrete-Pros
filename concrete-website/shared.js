const COMPANY={name:'Concrete Pros IL',phone:'(815) 403-7233',phoneHref:'tel:+18154037233',email:'info@concreteprosil.com',area:'Crystal Lake, IL & McHenry County',license:'[LICENSE NUMBER]'};

// SVG ICONS
const ICONS={
  driveway:`<svg viewBox="0 0 24 24"><path d="M1 12h22M5 12l4-8h6l4 8"/><rect x="3" y="12" width="18" height="4" rx="1"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></svg>`,
  stamped:`<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  patio:`<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V10l7-7 7 7v11"/><path d="M9 21v-6h6v6"/></svg>`,
  wall:`<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="4" rx="1"/><rect x="2" y="13" width="20" height="4" rx="1"/><rect x="5" y="4" width="6" height="3" rx="1"/><rect x="13" y="4" width="6" height="3" rx="1"/><rect x="5" y="17" width="6" height="3" rx="1"/><rect x="13" y="17" width="6" height="3" rx="1"/></svg>`,
  slab:`<svg viewBox="0 0 24 24"><rect x="2" y="13" width="20" height="8" rx="1"/><path d="M2 13l4-8h12l4 8"/><line x1="8" y1="5" x2="6" y2="13"/><line x1="16" y1="5" x2="18" y2="13"/><line x1="12" y1="5" x2="12" y2="13"/></svg>`,
  location:`<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone:`<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.43 2 2 0 012.88 1.25h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.01-1.01a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  arrow:`<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  check:`<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
  star:`<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
};

// LOADING SCREEN (homepage only)
(function(){const l=document.getElementById('loader');if(!l)return;window.addEventListener('load',()=>setTimeout(()=>l.classList.add('loaded'),1600));})();

// NAV
function buildNav(){
  const icon=(name)=>`<span class="drop-icon">${ICONS[name]||ICONS.arrow}</span>`;
  return `
<div class="topbar">
  <div class="container">
    <div class="topbar-left">
      <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> Crystal Lake, Woodstock, Cary, Algonquin &amp; Lake in the Hills, IL</span>
      <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> IL Licensed &amp; Insured</span>
    </div>
    <a href="${COMPANY.phoneHref}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.43 2 2 0 012.88 1.25h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.01-1.01a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> ${COMPANY.phone} — Free Estimates</a>
  </div>
</div>
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo" aria-label="Concrete Pros IL Home">
      <div class="nav-logo-main">Concrete<span>Pros</span> IL</div>
      <div class="nav-logo-sub">McHenry County, Illinois</div>
    </a>
    <div class="nav-menu" role="menubar">
      <div class="nav-item" role="none">
        <button class="nav-link" role="menuitem" aria-haspopup="true">Services <span class="nav-link-caret">▾</span></button>
        <div class="nav-dropdown" role="menu">
          <span class="drop-section-label">Concrete Services</span>
          <a href="concrete-driveway-replacement.html" class="drop-link" role="menuitem">${icon('driveway')}<span class="drop-link-text"><strong>Concrete Driveways</strong><small>Replacement &amp; new installation</small></span></a>
          <a href="stamped-concrete-driveway.html" class="drop-link" role="menuitem">${icon('stamped')}<span class="drop-link-text"><strong>Stamped Driveways</strong><small>Decorative driveway upgrade</small></span></a>
          <a href="concrete-patio.html" class="drop-link" role="menuitem">${icon('patio')}<span class="drop-link-text"><strong>Concrete Patios</strong><small>Standard &amp; decorative finishes</small></span></a>
          <a href="stamped-concrete.html" class="drop-link" role="menuitem">${icon('stamped')}<span class="drop-link-text"><strong>Stamped Patios</strong><small>Slate, flagstone, cobblestone &amp; more</small></span></a>
          <div class="drop-divider"></div>
          <a href="sitting-walls.html" class="drop-link" role="menuitem">${icon('wall')}<span class="drop-link-text"><strong>Sitting &amp; Retaining Walls</strong><small>Garden borders, slope management</small></span></a>
          <a href="concrete-pads.html" class="drop-link" role="menuitem">${icon('slab')}<span class="drop-link-text"><strong>Concrete Pads &amp; Slabs</strong><small>Sheds, AC pads, sport courts</small></span></a>
        </div>
      </div>
      <div class="nav-item" role="none">
        <a href="service-areas.html" class="nav-link" role="menuitem" aria-haspopup="true" style="display:flex;align-items:center;gap:4px">Locations <span class="nav-link-caret">▾</span></a>
        <div class="nav-dropdown" role="menu" style="min-width:240px">
          <span class="drop-section-label">McHenry County Cities</span>
          <a href="crystal-lake.html" class="drop-city" role="menuitem"><span class="drop-city-dot"></span>Crystal Lake, IL</a>
          <a href="woodstock.html" class="drop-city" role="menuitem"><span class="drop-city-dot"></span>Woodstock, IL</a>
          <a href="cary.html" class="drop-city" role="menuitem"><span class="drop-city-dot"></span>Cary, IL</a>
          <a href="algonquin.html" class="drop-city" role="menuitem"><span class="drop-city-dot"></span>Algonquin, IL</a>
          <a href="lake-in-the-hills.html" class="drop-city" role="menuitem"><span class="drop-city-dot"></span>Lake in the Hills, IL</a>
          <div class="drop-divider"></div>
          <a href="service-areas.html" class="drop-city drop-all-areas" role="menuitem">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            View All Service Areas
          </a>
        </div>
      </div>
      <a href="project-map.html" class="nav-link">Project Map</a>
      <a href="gallery.html" class="nav-link">Gallery</a>
      <a href="blog.html" class="nav-link">Blog</a>
      <a href="about.html" class="nav-link">About</a>
    </div>
    <a href="contact.html" class="nav-cta">Free Quote →</a>
    <button class="hamburger" onclick="openMob()" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Mobile menu">
  <div class="mobile-nav-top">
    <a href="index.html" class="nav-logo"><div class="nav-logo-main">Concrete<span style="color:var(--red)">Pros</span> IL</div></a>
    <button class="mobile-close" onclick="closeMob()" aria-label="Close menu">✕</button>
  </div>
  <div class="mobile-body">
    <button class="mobile-link" onclick="toggleMobileSub('subSvc')">Services <span id="arrowSvc">▾</span></button>
    <div id="subSvc" class="mobile-sub-links" style="display:none">
      <a href="concrete-driveway-replacement.html" class="mobile-sub-link" onclick="closeMob()">Concrete Driveways</a>
      <a href="stamped-concrete-driveway.html" class="mobile-sub-link" onclick="closeMob()">Stamped Driveways</a>
      <a href="concrete-patio.html" class="mobile-sub-link" onclick="closeMob()">Concrete Patios</a>
      <a href="stamped-concrete.html" class="mobile-sub-link" onclick="closeMob()">Stamped Patios</a>
      <a href="sitting-walls.html" class="mobile-sub-link" onclick="closeMob()">Sitting &amp; Retaining Walls</a>
      <a href="concrete-pads.html" class="mobile-sub-link" onclick="closeMob()">Concrete Pads &amp; Slabs</a>
    </div>
    <button class="mobile-link" onclick="toggleMobileSub('subLoc')">Locations <span id="arrowLoc">▾</span></button>
    <div id="subLoc" class="mobile-sub-links" style="display:none">
      <a href="crystal-lake.html" class="mobile-sub-link" onclick="closeMob()">Crystal Lake, IL</a>
      <a href="woodstock.html" class="mobile-sub-link" onclick="closeMob()">Woodstock, IL</a>
      <a href="cary.html" class="mobile-sub-link" onclick="closeMob()">Cary, IL</a>
      <a href="algonquin.html" class="mobile-sub-link" onclick="closeMob()">Algonquin, IL</a>
      <a href="lake-in-the-hills.html" class="mobile-sub-link" onclick="closeMob()">Lake in the Hills, IL</a>
    </div>
    <a href="project-map.html" class="mobile-link" onclick="closeMob()">Project Map</a>
    <a href="gallery.html" class="mobile-link" onclick="closeMob()">Gallery</a>
    <a href="blog.html" class="mobile-link" onclick="closeMob()">Blog</a>
    <a href="about.html" class="mobile-link" onclick="closeMob()">About</a>
    <div class="mobile-cta">
      <a href="contact.html" class="btn btn-red" style="width:100%;justify-content:center;" onclick="closeMob()">Get a Free Quote →</a>
      <a href="${COMPANY.phoneHref}" style="display:block;text-align:center;margin-top:12px;font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--red);letter-spacing:0.04em;">${COMPANY.phone}</a>
    </div>
  </div>
</div>`;
}

function buildFooter(){
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Concrete<span>Pros</span> IL</div>
        <div class="footer-logo-sub">${COMPANY.area}</div>
        <p class="footer-desc">Professional concrete contractor specializing in driveways, stamped patios, sitting walls, and concrete slabs throughout McHenry County, Illinois. Licensed, insured, and rated 5&#9733; on Google.</p>
        <div class="footer-contact"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.43 2 2 0 012.88 1.25h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.01-1.01a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><a href="${COMPANY.phoneHref}">${COMPANY.phone}</a></div>
        <div class="footer-contact"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></div>
        <div class="footer-contact"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Mon–Fri 7am–5pm</div>
      </div>
      <div>
        <h4>Services</h4>
        <div class="footer-links">
          <a href="concrete-driveway-replacement.html" class="footer-link">Concrete Driveways</a>
          <a href="stamped-concrete-driveway.html" class="footer-link">Stamped Driveways</a>
          <a href="concrete-patio.html" class="footer-link">Concrete Patios</a>
          <a href="stamped-concrete.html" class="footer-link">Stamped Patios</a>
          <a href="sitting-walls.html" class="footer-link">Sitting Walls</a>
          <a href="concrete-pads.html" class="footer-link">Concrete Pads</a>
        </div>
      </div>
      <div>
        <h4>Locations</h4>
        <div class="footer-links">
          <a href="crystal-lake.html" class="footer-link">Crystal Lake, IL</a>
          <a href="woodstock.html" class="footer-link">Woodstock, IL</a>
          <a href="cary.html" class="footer-link">Cary, IL</a>
          <a href="algonquin.html" class="footer-link">Algonquin, IL</a>
          <a href="lake-in-the-hills.html" class="footer-link">Lake in the Hills, IL</a>
        </div>
      </div>
      <div>
        <h4>Company</h4>
        <div class="footer-links">
          <a href="gallery.html" class="footer-link">Project Gallery</a>
          <a href="project-map.html" class="footer-link">Live Project Map</a>
          <a href="blog.html" class="footer-link">Concrete Blog</a>
          <a href="about.html" class="footer-link">About Us</a>
          <a href="contact.html" class="footer-link">Free Estimate</a>
          <a href="service-areas.html" class="footer-link">Service Areas</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Concrete Pros IL. All rights reserved. Serving McHenry County, Illinois.</p>
      <div class="footer-legal"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
    </div>
  </div>
</footer>
<a href="${COMPANY.phoneHref}" class="float-cta" aria-label="Call us">
  <div class="float-cta-phone">${COMPANY.phone}</div>
  <div class="float-cta-label">Tap to Call — Free Estimates</div>
</a>`;
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-nav]').forEach(el=>{el.outerHTML=buildNav();});
  document.querySelectorAll('[data-footer]').forEach(el=>{el.outerHTML=buildFooter();});
  // Scroll reveal
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>obs.observe(el));
  // FAQ
  document.querySelectorAll('.faq-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const isOpen=btn.classList.contains('open');
      document.querySelectorAll('.faq-btn').forEach(b=>{b.classList.remove('open');b.nextElementSibling?.classList.remove('open');});
      if(!isOpen){btn.classList.add('open');btn.nextElementSibling?.classList.add('open');}
    });
  });
  // Counter
  const cObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);cObs.unobserve(e.target);}});},{threshold:0.5});
  document.querySelectorAll('.counter').forEach(el=>cObs.observe(el));
});

function animateCounter(el){const t=parseInt(el.dataset.target);const dur=1600,steps=60;let c=0;const timer=setInterval(()=>{c=Math.min(c+t/steps,t);el.textContent=Math.floor(c);if(c>=t)clearInterval(timer);},dur/steps);}
function openMob(){document.getElementById('mobileNav')?.classList.add('open');document.body.style.overflow='hidden';}
function closeMob(){document.getElementById('mobileNav')?.classList.remove('open');document.body.style.overflow='';}
function toggleMobileSub(id){const el=document.getElementById(id);if(!el)return;const open=el.style.display!=='none';el.style.display=open?'none':'block';const k=id.replace('sub','arrow');const a=document.getElementById(k);if(a)a.textContent=open?'▾':'▴';}
