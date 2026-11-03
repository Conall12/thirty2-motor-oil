/* Thirty2 mockup: product detail page (product.html?id=<id>). */
(function () {
  'use strict';
  var T = window.Thirty2;
  var root = document.getElementById('product-root');
  var crumb = document.getElementById('crumb-current');
  if (!root) return;

  var id = new URLSearchParams(location.search).get('id');
  var p = id && T.getProduct(id);

  /* ---------- Not found ---------- */
  if (!p) {
    document.title = 'Product not found | Thirty2 Motor Oil Ireland';
    if (crumb) crumb.textContent = 'Product not found';
    root.innerHTML =
      '<section class="wrap section-tight not-found" aria-labelledby="nf-title">' +
        '<p class="eyebrow">Error 404 (mockup)</p>' +
        '<h1 id="nf-title" class="page-title">Product not found</h1>' +
        '<p class="page-intro">We couldn’t find that oil. It may have been renamed, or the link is incomplete.</p>' +
        '<a class="btn btn-dark" href="shop.html">Browse all NK2X oils ' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
      '</section>';
    return;
  }

  document.title = p.name + ' | Thirty2 Motor Oil Ireland';
  if (crumb) crumb.textContent = p.name;

  /* Placeholder copy derived from the data. */
  var BASE = {
    'Fully synthetic': 'Synthetic base stocks (placeholder)',
    'Semi-synthetic': 'Synthetic and mineral blend (placeholder)',
    'Mineral': 'Refined mineral base oil (placeholder)'
  };
  var USE = {
    'Engine oil': 'Passenger cars and light vans; check your handbook for the required grade.',
    'Gear oil': 'Manual gearboxes, transfer cases and axles where this grade is specified.',
    'Commercial & fleet': 'Vans, trucks and mixed commercial fleets on heavy-duty service.'
  };
  var CAT_PARAM = { 'Engine oil': 'engine', 'Gear oil': 'gear', 'Commercial & fleet': 'commercial' };

  var def = p.packs.filter(function (k) { return k.size === '4L'; })[0] || p.packs[0];
  function litres(size) { return parseFloat(size) || 1; }
  function perLitre(k) { return T.fmt(k.price / litres(k.size)) + ' per litre'; }

  var pills = p.packs.map(function (k, i) {
    var pid = 'pack-' + i;
    return '<li class="pill">' +
      '<input type="radio" name="pack" id="' + pid + '" value="' + k.size + '"' + (k === def ? ' checked' : '') + '>' +
      '<label for="' + pid + '"><span class="pill-size">' + k.size + '</span><span class="pill-price">' + T.fmt(k.price) + '</span></label>' +
    '</li>';
  }).join('');

  var chips = '<ul class="chips" aria-label="Specifications">' + p.specs.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';

  var rows = [
    ['Viscosity', p.viscosity],
    ['Oil type', p.type],
    ['Category', p.category],
    ['Approvals / specs', p.specs.join(', ')],
    ['Pack sizes', p.packs.map(function (k) { return k.size; }).join(', ')],
    ['Base oil', BASE[p.type] || 'To be confirmed (placeholder)'],
    ['Recommended for', USE[p.category] || 'To be confirmed (placeholder)'],
    ['Product code', 'T32-' + p.id.replace(/^nk2x-/, '').toUpperCase() + ' (placeholder)']
  ];

  /* "You may also like": same category first, then the rest of the range. */
  var others = T.products.filter(function (o) { return o.id !== p.id; });
  var related = others.filter(function (o) { return o.category === p.category; })
    .concat(others.filter(function (o) { return o.category !== p.category; }))
    .slice(0, 3);

  root.innerHTML =
    '<div class="wrap">' +
      '<article class="pdp" aria-labelledby="pdp-title">' +
        '<div class="pdp-media" id="pdp-media">' + T.packArtSVG(p, def.size, { uid: '-pdp' }) + '</div>' +
        '<div class="pdp-info">' +
          '<p class="eyebrow"><a href="shop.html?cat=' + CAT_PARAM[p.category] + '">' + p.category + '</a></p>' +
          '<h1 id="pdp-title" class="pdp-title">' + p.name + '</h1>' +
          '<p class="pdp-type">' + p.type + ' · ' + p.viscosity + '</p>' +
          '<p class="pdp-blurb">' + p.blurb + '</p>' +
          chips +
          '<p class="pdp-price" aria-live="polite"><span class="visually-hidden">Price: </span>' +
            '<span id="pdp-price">' + T.fmt(def.price) + '</span> ' +
            '<small id="pdp-unit">' + def.size + ' · ' + perLitre(def) + '</small></p>' +
          '<form class="pdp-form" id="pdp-form">' +
            '<fieldset class="pack-picker"><legend>Pack size</legend><ul>' + pills + '</ul></fieldset>' +
            '<div class="pdp-buy">' +
              '<div class="pdp-qty">' +
                '<label for="pdp-qty">Quantity</label>' +
                '<div class="qty">' +
                  '<button type="button" data-step="-1" aria-label="Decrease quantity">−</button>' +
                  '<input id="pdp-qty" name="qty" type="number" inputmode="numeric" min="1" max="99" value="1">' +
                  '<button type="button" data-step="1" aria-label="Increase quantity">+</button>' +
                '</div>' +
              '</div>' +
              '<button class="btn btn-dark pdp-add" type="submit">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/></svg>' +
                'Add to cart</button>' +
            '</div>' +
          '</form>' +
          '<ul class="pdp-perks">' +
            '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 7h11v9H2zM13 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="1.8"/><circle cx="16" cy="18" r="1.8"/></svg><span>Free delivery over £75 (<a href="delivery.html">details</a>)</span></li>' +
            '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg><span>Genuine NK2X stock</span></li>' +
            '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Not sure it fits? <a href="contact.html">Ask us</a></span></li>' +
          '</ul>' +
        '</div>' +
      '</article>' +
    '</div>' +

    '<section class="section section-tight" aria-labelledby="spec-title">' +
      '<div class="wrap">' +
        '<div class="spec-card">' +
          '<h2 id="spec-title">Specifications</h2>' +
          '<table class="spec-table"><tbody>' +
            rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') +
          '</tbody></table>' +
          '<p class="placeholder-note"><strong>Placeholder data.</strong> Specs, approvals and prices are for the sales mockup only. Always check the official NK2X data sheet and your vehicle handbook.</p>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="section" style="padding-top:0" aria-labelledby="related-title">' +
      '<div class="wrap">' +
        '<div class="section-head">' +
          '<h2 id="related-title">You may also like</h2>' +
          '<a class="text-link" href="shop.html">View all oils <span aria-hidden="true">→</span></a>' +
        '</div>' +
        '<div class="product-row">' + related.map(function (o) { return T.cardHTML(o, { uid: '-r', chips: true }); }).join('') + '</div>' +
      '</div>' +
    '</section>';

  /* ---------- Behaviour ---------- */
  var form = document.getElementById('pdp-form');
  var qty = document.getElementById('pdp-qty');
  var priceEl = document.getElementById('pdp-price');
  var unitEl = document.getElementById('pdp-unit');

  function currentPack() {
    var v = form.querySelector('input[name="pack"]:checked').value;
    return p.packs.filter(function (k) { return k.size === v; })[0];
  }
  function clampQty() {
    var n = Math.round(+qty.value) || 1;
    qty.value = Math.max(1, Math.min(99, n));
    return +qty.value;
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'pack') {
      var k = currentPack();
      priceEl.textContent = T.fmt(k.price);
      unitEl.textContent = k.size + ' · ' + perLitre(k);
      var media = document.getElementById('pdp-media');
      media.innerHTML = T.packArtSVG(p, k.size, { uid: '-pdp' });
      media.classList.remove('is-swapping');
      void media.offsetWidth; /* restart the fade-in */
      media.classList.add('is-swapping');
    }
    if (e.target === qty) clampQty();
  });
  form.querySelectorAll('[data-step]').forEach(function (b) {
    b.addEventListener('click', function () {
      qty.value = (+qty.value || 1) + +b.getAttribute('data-step');
      clampQty();
    });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    T.addToCart(p.id, currentPack().size, clampQty());
    T.openCart();
  });
})();
