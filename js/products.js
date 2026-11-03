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
      category: 'Commercial & fleet', accent: '#f4f3f0',
      packs: [{ size: '5L', price: 34.99 }, { size: '20L', price: 124.99 }, { size: '205L', price: 1149.0 }],
      specs: ['ACEA E6', 'Euro VI', 'Heavy duty'],
      blurb: 'Heavy-duty synthetic for vans, trucks and mixed commercial fleets.'
    }
  ];

  function fmt(n) {
    return '£' + n.toFixed(2);
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

  /* Product card used on the home page and the shop grid. */
  function cardHTML(p, opts) {
    opts = opts || {};
    var pack = p.packs.filter(function (k) { return k.size === '4L'; })[0] || p.packs[0];
    var tag = opts.headingLevel || 'h3';
    var chips = opts.chips ? '<ul class="chips" aria-label="Specifications">' + p.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' : '';
    return '<article class="p-card">' +
      '<div class="p-card-media">' + jugSVG(p, { decorative: true, uid: opts.uid || '' }) + '</div>' +
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
  window.Thirty2.getProduct = function (id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0];
  };
})();
