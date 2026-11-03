/* Thirty2 mockup: shared behaviour (mobile menu, header search, mock cart). */
(function () {
  'use strict';
  var T = window.Thirty2 = window.Thirty2 || {};
  var CART_KEY = 'thirty2-cart';

  /* ---------- Cart storage (localStorage, fails safely) ---------- */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ }
    renderCart();
  }
  T.addToCart = function (id, size, qty) {
    var items = readCart();
    var hit = items.filter(function (i) { return i.id === id && i.size === size; })[0];
    if (hit) hit.qty += qty; else items.push({ id: id, size: size, qty: qty });
    writeCart(items);
    announce(qty + ' × ' + (T.getProduct(id) || {}).name + ' ' + size + ' added to cart');
  };

  function cartCount(items) {
    return items.reduce(function (n, i) { return n + i.qty; }, 0);
  }

  function priceFor(item) {
    var p = T.getProduct(item.id);
    if (!p) return 0;
    var pack = p.packs.filter(function (k) { return k.size === item.size; })[0];
    return pack ? pack.price : 0;
  }

  /* ---------- Live region for announcements ---------- */
  var live;
  function announce(msg) {
    if (!live) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 30);
    var toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = msg;
      toast.classList.add('is-visible');
      clearTimeout(announce.t);
      announce.t = setTimeout(function () { toast.classList.remove('is-visible'); }, 2600);
    }
  }

  /* ---------- Cart drawer ---------- */
  var drawer, lastFocus;

  function buildDrawer() {
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="drawer-backdrop" data-close-cart hidden></div>' +
      '<aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>' +
        '<div class="drawer-head">' +
          '<h2 id="cart-title">Your cart</h2>' +
          '<button class="icon-btn" type="button" data-close-cart aria-label="Close cart">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="drawer-body" id="cart-items"></div>' +
        '<div class="drawer-foot">' +
          '<div class="drawer-total"><span>Subtotal</span><strong id="cart-subtotal">£0.00</strong></div>' +
          '<p class="drawer-note">Mockup only. No orders are taken and nothing is charged.</p>' +
          '<button class="btn btn-dark btn-block" type="button" disabled>Checkout (demo)</button>' +
        '</div>' +
      '</aside>' +
      '<div class="toast" id="toast" aria-hidden="true"></div>' +
      '<div class="visually-hidden" id="live" aria-live="polite"></div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
    drawer = document.getElementById('cart-drawer');
    live = document.getElementById('live');

    document.querySelectorAll('[data-close-cart]').forEach(function (el) {
      el.addEventListener('click', closeCart);
    });
    document.getElementById('cart-items').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-cart-action]');
      if (!btn) return;
      var idx = +btn.getAttribute('data-index');
      var items = readCart();
      var act = btn.getAttribute('data-cart-action');
      if (act === 'inc') items[idx].qty++;
      if (act === 'dec') items[idx].qty--;
      if (act === 'remove' || items[idx].qty < 1) items.splice(idx, 1);
      writeCart(items);
      var first = drawer.querySelector('[data-cart-action]') || drawer.querySelector('[data-close-cart]');
      if (!drawer.contains(document.activeElement) && first) first.focus();
    });
    drawer.addEventListener('keydown', trapFocus);
  }

  function renderCart() {
    var items = readCart();
    var count = cartCount(items);
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
    document.querySelectorAll('[data-open-cart]').forEach(function (el) {
      el.setAttribute('aria-label', 'Cart, ' + count + (count === 1 ? ' item' : ' items'));
    });
    var list = document.getElementById('cart-items');
    if (!list) return;
    if (!items.length) {
      list.innerHTML = '<p class="cart-empty">Your cart is empty.<br><a href="shop.html">Browse NK2X oils</a></p>';
    } else {
      list.innerHTML = '<ul class="cart-list">' + items.map(function (i, idx) {
        var p = T.getProduct(i.id);
        if (!p) return '';
        return '<li class="cart-line">' +
          '<div class="cart-thumb">' + T.packArtSVG(p, i.size, { decorative: true, uid: '-c' + idx }) + '</div>' +
          '<div class="cart-info">' +
            '<p class="cart-name">' + p.name + '</p>' +
            '<p class="cart-meta">' + i.size + ' · ' + T.fmt(priceFor(i)) + '</p>' +
            '<div class="qty qty-sm">' +
              '<button type="button" data-cart-action="dec" data-index="' + idx + '" aria-label="Decrease quantity of ' + p.name + ' ' + i.size + '">−</button>' +
              '<span aria-label="Quantity">' + i.qty + '</span>' +
              '<button type="button" data-cart-action="inc" data-index="' + idx + '" aria-label="Increase quantity of ' + p.name + ' ' + i.size + '">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="cart-side">' +
            '<strong>' + T.fmt(priceFor(i) * i.qty) + '</strong>' +
            '<button type="button" class="link-btn" data-cart-action="remove" data-index="' + idx + '">Remove<span class="visually-hidden"> ' + p.name + ' ' + i.size + '</span></button>' +
          '</div>' +
        '</li>';
      }).join('') + '</ul>';
    }
    var sub = items.reduce(function (s, i) { return s + priceFor(i) * i.qty; }, 0);
    var subEl = document.getElementById('cart-subtotal');
    if (subEl) subEl.textContent = T.fmt(sub);
  }

  function openCart() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    drawer.previousElementSibling.hidden = false;
    requestAnimationFrame(function () {
      document.body.classList.add('cart-open');
      drawer.querySelector('[data-close-cart]').focus();
    });
  }
  function closeCart() {
    document.body.classList.remove('cart-open');
    setTimeout(function () {
      drawer.hidden = true;
      drawer.previousElementSibling.hidden = true;
    }, 220);
    if (lastFocus) lastFocus.focus();
  }
  T.openCart = openCart;

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    var f = drawer.querySelectorAll('button:not([disabled]), a[href]');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      setMenu(!open);
    });
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
      if (open) { var a = nav.querySelector('a'); if (a) a.focus(); }
    }
    T.closeMenu = function () {
      if (toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    };
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (m) {
      if (m.matches) setMenu(false);
    });
  }

  /* ---------- Header search ---------- */
  function initSearch() {
    var btn = document.querySelector('[data-open-search]');
    var form = document.getElementById('header-search');
    if (!btn || !form) return;
    btn.addEventListener('click', function () {
      var open = form.hidden;
      form.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      if (open) form.querySelector('input').focus();
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    buildDrawer();
    renderCart();
    initMenu();
    initSearch();
    document.querySelectorAll('[data-open-cart]').forEach(function (el) {
      el.addEventListener('click', openCart);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (document.body.classList.contains('cart-open')) closeCart();
      else if (T.closeMenu) T.closeMenu();
      var form = document.getElementById('header-search');
      if (form && !form.hidden && form.contains(document.activeElement)) {
        form.hidden = true;
        var b = document.querySelector('[data-open-search]');
        b.setAttribute('aria-expanded', 'false');
        b.focus();
      }
    });
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
