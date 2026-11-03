/* Thirty2 mockup: shop category page (filters, search, sort, URL params). */
(function () {
  'use strict';
  var T = window.Thirty2;

  var grid = document.getElementById('shop-grid');
  var form = document.getElementById('filter-form');
  var search = document.getElementById('shop-q');
  var sort = document.getElementById('sort');
  var count = document.getElementById('result-count');
  var empty = document.getElementById('empty-state');
  var toggle = document.querySelector('.filters-toggle');
  var panel = document.getElementById('filters');
  if (!grid || !form) return;

  /* ---------- Filter groups, built from the catalogue ---------- */
  var CATEGORIES = [
    { value: 'engine', label: 'Engine oil' },
    { value: 'gear', label: 'Gear oil' },
    { value: 'commercial', label: 'Commercial & fleet' }
  ];
  var TYPES = ['Fully synthetic', 'Semi-synthetic', 'Mineral'];
  var PACKS = ['1L', '4L', '5L', '20L', '205L'];

  function catKey(p) {
    return (CATEGORIES.filter(function (c) { return c.label === p.category; })[0] || {}).value;
  }
  /* Sort viscosities by cold grade, then hot grade: 0W-20, 0W-30, 5W-20 ... 75W-90 */
  function viscKey(v) {
    var m = /^(\d+)W-(\d+)$/.exec(v) || [0, 999, 999];
    return +m[1] * 1000 + +m[2];
  }
  function has(p, group, value) {
    if (group === 'viscosity') return p.viscosity === value;
    if (group === 'type') return p.type === value;
    if (group === 'pack') return p.packs.some(function (k) { return k.size === value; });
    if (group === 'category') return catKey(p) === value;
    return false;
  }

  var viscosities = T.products.map(function (p) { return p.viscosity; })
    .filter(function (v, i, a) { return a.indexOf(v) === i; })
    .sort(function (a, b) { return viscKey(a) - viscKey(b); });

  var GROUPS = [
    { key: 'category', legend: 'Category', options: CATEGORIES },
    { key: 'viscosity', legend: 'Viscosity', options: viscosities.map(function (v) { return { value: v, label: v }; }) },
    { key: 'type', legend: 'Oil type', options: TYPES.map(function (t) { return { value: t, label: t }; }) },
    { key: 'pack', legend: 'Pack size', options: PACKS.map(function (s) { return { value: s, label: s }; }) }
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  form.innerHTML = GROUPS.map(function (g) {
    var opts = g.options.map(function (o) {
      var n = T.products.filter(function (p) { return has(p, g.key, o.value); }).length;
      if (!n) return ''; // only show options present in the data
      var id = 'f-' + g.key + '-' + o.value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return '<li><input type="checkbox" id="' + id + '" name="' + g.key + '" value="' + esc(o.value) + '">' +
        '<label for="' + id + '">' + esc(o.label) + ' <span class="filter-n" aria-hidden="true">' + n + '</span>' +
        '<span class="visually-hidden">(' + n + (n === 1 ? ' product' : ' products') + ')</span></label></li>';
    }).join('');
    return '<fieldset class="filter-group"><legend>' + g.legend + '</legend><ul>' + opts + '</ul></fieldset>';
  }).join('');

  /* ---------- State ---------- */
  function selected(group) {
    return Array.prototype.map.call(form.querySelectorAll('input[name="' + group + '"]:checked'), function (i) { return i.value; });
  }
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function matchesQuery(p, q) {
    if (!q) return true;
    var hay = [p.name, p.viscosity, p.type, p.category].concat(p.specs).join(' ');
    return hay.toLowerCase().indexOf(q.toLowerCase()) !== -1 || norm(hay).indexOf(norm(q)) !== -1;
  }
  /* The price shown on the card (4L, else the first pack) so sorting matches what people see. */
  function cardPrice(p) {
    var pack = p.packs.filter(function (k) { return k.size === '4L'; })[0] || p.packs[0];
    return pack.price;
  }

  function render() {
    var q = search.value.trim();
    var active = GROUPS.map(function (g) { return { key: g.key, values: selected(g.key) }; });
    var list = T.products.filter(function (p) {
      return matchesQuery(p, q) && active.every(function (a) {
        return !a.values.length || a.values.some(function (v) { return has(p, a.key, v); });
      });
    });

    var order = T.products.slice();
    var by = {
      'price-asc': function (a, b) { return cardPrice(a) - cardPrice(b); },
      'price-desc': function (a, b) { return cardPrice(b) - cardPrice(a); },
      name: function (a, b) { return a.name.localeCompare(b.name, 'en', { numeric: true }); },
      featured: function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || order.indexOf(a) - order.indexOf(b); }
    }[sort.value] || null;
    if (by) list.sort(by);

    grid.innerHTML = list.map(function (p) { return T.cardHTML(p, { chips: true, headingLevel: 'h2' }); }).join('');
    grid.hidden = !list.length;
    empty.hidden = !!list.length;
    count.textContent = list.length + (list.length === 1 ? ' product' : ' products');

    var n = active.reduce(function (s, a) { return s + a.values.length; }, 0);
    document.querySelectorAll('[data-filter-count]').forEach(function (el) {
      el.textContent = '(' + n + ')';
      el.hidden = !n;
    });
  }

  function clearAll() {
    form.querySelectorAll('input:checked').forEach(function (i) { i.checked = false; });
    search.value = '';
    render();
    search.focus();
  }

  /* ---------- URL params: ?q= from header search, ?cat= from home tiles ---------- */
  var params = new URLSearchParams(location.search);
  var q = params.get('q');
  if (q) {
    search.value = q;
    var hq = document.getElementById('q-header');
    if (hq) hq.value = q;
  }
  var cat = params.get('cat');
  if (cat) {
    var box = form.querySelector('input[name="category"][value="' + cat.replace(/[^a-z]/g, '') + '"]');
    if (box) box.checked = true;
  }

  /* ---------- Events ---------- */
  form.addEventListener('change', render);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  sort.addEventListener('change', render);
  search.addEventListener('input', render);
  search.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
  document.querySelectorAll('[data-clear-filters]').forEach(function (b) { b.addEventListener('click', clearAll); });

  /* Mobile: "Filters" button reveals the stacked panel above the grid. */
  function setPanel(open) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    setPanel(open);
    if (open) { var first = panel.querySelector('input'); if (first) first.focus(); }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) { if (m.matches) setPanel(false); });

  render();
})();
