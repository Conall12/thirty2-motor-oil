/* Thirty2 mockup: placeholder catalogue.
   All specs, prices and descriptions are placeholders for the sales mockup. */
(function () {
  'use strict';

  var PRODUCTS = [
    {
      id: 'nk2x-5w30', name: 'NK2X 5W-30', viscosity: '5W-30', type: 'Fully synthetic',
      category: 'Engine oil', accent: '#2fae7a', featured: true,
      packs: [{ size: '1L', price: 8.99 }, { size: '4L', price: 24.99 }, { size: '5L', price: 29.99 }, { size: '20L', price: 104.99 }],
      specs: ['ACEA C3', 'API SP', 'Low SAPS'],
      blurb: 'A low-ash, fully synthetic oil for modern petrol and diesel cars with particulate filters.'
    },
    {
      id: 'nk2x-5w40', name: 'NK2X 5W-40', viscosity: '5W-40', type: 'Fully synthetic',
      category: 'Engine oil', accent: '#2f8fd8', featured: true,
      packs: [{ size: '1L', price: 9.49 }, { size: '4L', price: 26.99 }, { size: '5L', price: 31.99 }, { size: '20L', price: 112.99 }],
      specs: ['ACEA A3/B4', 'API SN', 'High performance'],
      blurb: 'A robust all-rounder for high-mileage petrol and diesel engines that run hot and hard.'
    },
    {
      id: 'nk2x-10w40', name: 'NK2X 10W-40', viscosity: '10W-40', type: 'Semi-synthetic',
      category: 'Engine oil', accent: '#c5d82f', featured: true,
      packs: [{ size: '1L', price: 7.99 }, { size: '4L', price: 25.99 }, { size: '5L', price: 28.99 }, { size: '20L', price: 94.99 }],
      specs: ['ACEA A3/B4', 'API SL/CF'],
      blurb: 'Dependable semi-synthetic protection for older cars and everyday motoring.'
    },
    {
      id: 'nk2x-0w20', name: 'NK2X 0W-20', viscosity: '0W-20', type: 'Fully synthetic',
      category: 'Engine oil', accent: '#e0a526',
      packs: [{ size: '1L', price: 10.49 }, { size: '4L', price: 32.99 }, { size: '5L', price: 38.99 }],
      specs: ['API SP', 'ILSAC GF-6A', 'Hybrid ready'],
      blurb: 'Ultra-thin, fuel-saving oil for hybrids and the latest low-viscosity engines.'
    },
    {
      id: 'nk2x-0w30', name: 'NK2X 0W-30', viscosity: '0W-30', type: 'Fully synthetic',
      category: 'Engine oil', accent: '#9b6ad6',
      packs: [{ size: '1L', price: 10.29 }, { size: '4L', price: 31.99 }, { size: '5L', price: 37.49 }],
      specs: ['ACEA C2', 'API SP', 'Low SAPS'],
      blurb: 'Fast cold-start flow with long-drain protection for European cars.'
    },
    {
      id: 'nk2x-5w30-ll', name: 'NK2X 5W-30 Longlife', viscosity: '5W-30', type: 'Fully synthetic',
      category: 'Engine oil', accent: '#18a0a0',
      packs: [{ size: '1L', price: 9.99 }, { size: '4L', price: 28.49 }, { size: '5L', price: 33.99 }, { size: '20L', price: 119.99 }],
      specs: ['ACEA C3', 'Longlife service', 'Low SAPS'],
      blurb: 'Extended-interval formula for cars on variable or long-life service schedules.'
    },
    {
      id: 'nk2x-5w20', name: 'NK2X 5W-20', viscosity: '5W-20', type: 'Fully synthetic',
      category: 'Engine oil', accent: '#e46b3c',
      packs: [{ size: '1L', price: 9.29 }, { size: '4L', price: 27.49 }, { size: '5L', price: 32.49 }],
      specs: ['API SP', 'ILSAC GF-6A'],
      blurb: 'Lightweight synthetic for small turbo petrol engines and economy-focused cars.'
    },
    {
      id: 'nk2x-10w30', name: 'NK2X 10W-30', viscosity: '10W-30', type: 'Semi-synthetic',
      category: 'Engine oil', accent: '#7fb03a',
      packs: [{ size: '1L', price: 7.49 }, { size: '4L', price: 23.99 }, { size: '5L', price: 26.99 }, { size: '20L', price: 89.99 }],
      specs: ['API SL', 'ACEA A3/B3'],
      blurb: 'Versatile semi-synthetic oil for light petrol and diesel engines.'
    },
    {
      id: 'nk2x-15w40', name: 'NK2X 15W-40', viscosity: '15W-40', type: 'Mineral',
      category: 'Engine oil', accent: '#c9a227',
      packs: [{ size: '1L', price: 6.49 }, { size: '5L', price: 22.99 }, { size: '20L', price: 79.99 }],
      specs: ['API CI-4', 'ACEA E7'],
      blurb: 'Tough mineral oil for classic cars, older diesels and agricultural use.'
    },
    {
      id: 'nk2x-75w90', name: 'NK2X Gear 75W-90', viscosity: '75W-90', type: 'Fully synthetic',
      category: 'Gear oil', accent: '#d4493f',
      packs: [{ size: '1L', price: 11.99 }, { size: '5L', price: 44.99 }],
      specs: ['API GL-5', 'Manual & axle'],
      blurb: 'Synthetic gear oil for manual gearboxes, transfer cases and axles.'
    },
    {
      id: 'nk2x-10w40-hd', name: 'NK2X Fleet 10W-40', viscosity: '10W-40', type: 'Fully synthetic',
      category: 'Commercial & fleet', accent: '#f4f3f0', cardArt: '205L',
      packs: [{ size: '5L', price: 34.99 }, { size: '20L', price: 124.99 }, { size: '205L', price: 1149.0 }],
      specs: ['ACEA E6', 'Euro VI', 'Heavy duty'],
      blurb: 'Heavy-duty synthetic for vans, trucks and mixed commercial fleets.'
    }
  ];

  function fmt(n) {
    return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fromPrice(p) {
    return Math.min.apply(null, p.packs.map(function (k) { return k.price; }));
  }

  /* Placeholder jug illustration. `accent` colours the label stripe. */
  function jugSVG(p, opts) {
    opts = opts || {};
    var uid = p.id + (opts.uid || '');
    var label = opts.decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="' + p.name + ' oil container (illustration)"';
    return '' +
      '<svg class="jug" viewBox="0 0 160 200" ' + label + '>' +
        '<defs>' +
          '<linearGradient id="body-' + uid + '" x1="0" x2="1">' +
            '<stop offset="0" stop-color="#1b1b1b"/><stop offset=".45" stop-color="#3a3a3a"/><stop offset="1" stop-color="#121212"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<ellipse cx="80" cy="192" rx="62" ry="6" fill="#000" opacity=".12"/>' +
        '<rect x="56" y="6" width="30" height="18" rx="4" fill="#0d0d0d"/>' +
        '<path d="M28 44 Q30 26 52 24 H96 Q108 24 114 30 L132 48 Q138 54 138 64 V178 Q138 190 126 190 H34 Q22 190 22 178 V58 Q22 48 28 44Z" fill="url(#body-' + uid + ')"/>' +
        '<path d="M104 34 H120 Q128 36 130 46 V86 Q130 92 124 92 H116 Q112 92 112 86 V50 Q112 44 104 44Z" fill="#0b0b0b"/>' +
        '<rect x="32" y="74" width="92" height="96" rx="6" fill="#151515" stroke="#2c2c2c"/>' +
        '<text x="78" y="110" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="24" fill="#f4f3f0" letter-spacing="-.5">NK2X</text>' +
        '<text x="78" y="126" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="10" fill="#bdbab3">' + p.viscosity + '</text>' +
        '<path d="M32 146 L124 132 V140 L32 156Z" fill="' + p.accent + '"/>' +
        '<rect x="30" y="56" width="5" height="110" rx="2.5" fill="#fff" opacity=".06"/>' +
      '</svg>';
  }

  function a11y(p, opts, what) {
    return opts.decorative ? 'aria-hidden="true" focusable="false"'
      : 'role="img" aria-label="' + p.name + ' ' + what + ' (illustration)"';
  }

  /* 20L pail: tapered steel pail with lid, wire handle and pour spout. */
  function pailSVG(p, opts) {
    opts = opts || {};
    var uid = p.id + (opts.uid || '') + '-pail';
    return '' +
      '<svg class="jug pail" viewBox="0 0 160 200" ' + a11y(p, opts, '20 litre pail') + '>' +
        '<defs>' +
          '<linearGradient id="pb-' + uid + '" x1="0" x2="1">' +
            '<stop offset="0" stop-color="#151515"/><stop offset=".4" stop-color="#3d3d3d"/><stop offset=".6" stop-color="#2c2c2c"/><stop offset="1" stop-color="#0f0f0f"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<ellipse cx="80" cy="193" rx="58" ry="6" fill="#000" opacity=".13"/>' +
        '<path d="M32 44 Q80 0 128 44" fill="none" stroke="#4a4a4a" stroke-width="3"/>' +
        '<rect x="64" y="14" width="32" height="9" rx="4.5" fill="#0d0d0d"/>' +
        '<path d="M30 44 H130 L123 185 Q123 190 118 190 H42 Q37 190 37 185 Z" fill="url(#pb-' + uid + ')"/>' +
        '<rect x="26" y="34" width="108" height="13" rx="4" fill="#0c0c0c"/>' +
        '<rect x="104" y="24" width="14" height="11" rx="2" fill="#1e1e1e"/>' +
        '<rect x="101" y="21" width="20" height="5" rx="2" fill="#2a2a2a"/>' +
        '<rect x="31" y="58" width="98" height="4" rx="2" fill="#000" opacity=".35"/>' +
        '<rect x="36" y="174" width="88" height="4" rx="2" fill="#000" opacity=".35"/>' +
        '<rect x="45" y="74" width="70" height="88" rx="5" fill="#151515" stroke="#2c2c2c"/>' +
        '<text x="80" y="110" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="21" fill="#f4f3f0" letter-spacing="-.5">NK2X</text>' +
        '<text x="80" y="125" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="9" fill="#bdbab3">' + p.viscosity + ' · 20L</text>' +
        '<path d="M45 146 L115 136 V143 L45 153Z" fill="' + p.accent + '"/>' +
        '<rect x="38" y="64" width="4" height="108" rx="2" fill="#fff" opacity=".07"/>' +
      '</svg>';
  }

  /* 205L drum: steel barrel with top/bottom chimes, rolling hoops and bungs. */
  function drumSVG(p, opts) {
    opts = opts || {};
    var uid = p.id + (opts.uid || '') + '-drum';
    return '' +
      '<svg class="jug drum" viewBox="0 0 160 200" ' + a11y(p, opts, '205 litre drum') + '>' +
        '<defs>' +
          '<linearGradient id="db-' + uid + '" x1="0" x2="1">' +
            '<stop offset="0" stop-color="#121212"/><stop offset=".22" stop-color="#2e2e2e"/><stop offset=".42" stop-color="#474747"/><stop offset=".62" stop-color="#2a2a2a"/><stop offset="1" stop-color="#0d0d0d"/>' +
          '</linearGradient>' +
          '<linearGradient id="dh-' + uid + '" x1="0" x2="1">' +
            '<stop offset="0" stop-color="#0a0a0a"/><stop offset=".42" stop-color="#555"/><stop offset="1" stop-color="#0a0a0a"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<ellipse cx="80" cy="194" rx="64" ry="5" fill="#000" opacity=".14"/>' +
        '<rect x="44" y="3" width="14" height="7" rx="2" fill="#1c1c1c"/>' +
        '<rect x="100" y="4" width="10" height="6" rx="2" fill="#1c1c1c"/>' +
        '<rect x="24" y="12" width="112" height="178" rx="7" fill="url(#db-' + uid + ')"/>' +
        '<rect x="20" y="8" width="120" height="9" rx="4" fill="url(#dh-' + uid + ')"/>' +
        '<rect x="20" y="183" width="120" height="9" rx="4" fill="url(#dh-' + uid + ')"/>' +
        '<rect x="21" y="56" width="118" height="7" rx="3.5" fill="url(#dh-' + uid + ')"/>' +
        '<rect x="21" y="140" width="118" height="7" rx="3.5" fill="url(#dh-' + uid + ')"/>' +
        '<rect x="38" y="72" width="84" height="60" rx="5" fill="#151515" stroke="#2c2c2c"/>' +
        '<text x="80" y="100" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="21" fill="#f4f3f0" letter-spacing="-.5">NK2X</text>' +
        '<text x="80" y="114" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="9" fill="#bdbab3">' + p.viscosity + ' · 205L</text>' +
        '<path d="M38 124 L122 118 V124 L38 130Z" fill="' + p.accent + '"/>' +
        '<rect x="48" y="20" width="4" height="164" rx="2" fill="#fff" opacity=".07"/>' +
        '<rect x="40" y="152" width="80" height="2" rx="1" fill="#000" opacity=".3"/>' +
        '<rect x="40" y="40" width="80" height="2" rx="1" fill="#000" opacity=".3"/>' +
      '</svg>';
  }

  /* Pick the right container for a pack size: jug up to 5L, pail for 20L, drum for 205L. */
  function packArtSVG(p, size, opts) {
    var l = parseFloat(size) || 0;
    if (l >= 200) return drumSVG(p, opts);
    if (l >= 20) return pailSVG(p, opts);
    return jugSVG(p, opts);
  }

  /* Product card used on the home page and the shop grid. */
  function cardHTML(p, opts) {
    opts = opts || {};
    var pack = p.packs.filter(function (k) { return k.size === '4L'; })[0] || p.packs[0];
    var tag = opts.headingLevel || 'h3';
    var chips = opts.chips ? '<ul class="chips" aria-label="Specifications">' + p.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' : '';
    return '<article class="p-card">' +
      '<div class="p-card-media">' + packArtSVG(p, p.cardArt || pack.size, { decorative: true, uid: opts.uid || '' }) + '</div>' +
      '<div class="p-card-body">' +
        '<' + tag + ' class="p-card-title"><a href="product.html?id=' + p.id + '">' + p.name + '</a></' + tag + '>' +
        '<p class="p-card-type">' + p.type + ' · ' + p.category + '</p>' +
        chips +
        '<p class="p-card-price"><small>' + pack.size + '</small>' + fmt(pack.price) + '</p>' +
      '</div>' +
    '</article>';
  }

  window.Thirty2 = window.Thirty2 || {};
  window.Thirty2.cardHTML = cardHTML;
  window.Thirty2.products = PRODUCTS;
  window.Thirty2.fmt = fmt;
  window.Thirty2.fromPrice = fromPrice;
  window.Thirty2.jugSVG = jugSVG;
  window.Thirty2.pailSVG = pailSVG;
  window.Thirty2.drumSVG = drumSVG;
  window.Thirty2.packArtSVG = packArtSVG;
  window.Thirty2.getProduct = function (id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0];
  };
})();
