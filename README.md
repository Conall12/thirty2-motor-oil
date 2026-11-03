# Thirty2 Motor Oil Ireland: sales mockup

A static front-end **sales mockup** for Thirty2 Motor Oil Ireland, an Irish family-run distributor of NK2X lubricants.

- **This is not a live store.** There is no backend, no checkout and no payments. Nothing is ever sent anywhere. Do not deploy it as a shop.
- **All data is placeholder.** Product specs, approvals, prices, delivery rates, stats and contact details are invented for the demo.
- **NK2X is shown as a distributed brand.** The NK2X name and product grades appear only as the range Thirty2 sells. All copy, illustrations and code here are original to this mockup.

## Pages

| Page | What it shows |
| --- | --- |
| `index.html` | Homepage: hero, featured oils, category tiles, why Thirty2, trade CTA |
| `shop.html` | "Passenger car oils" category: sidebar filters, search, sort, product grid |
| `product.html?id=<id>` | Product detail: jug illustration, pack-size selector, quantity, add to cart, spec table, related products |
| `about.html` | Company story, values grid and stats |
| `delivery.html` | Rates table, coverage, cut-off times, returns and FAQ |
| `contact.html` | Contact form (mock), contact cards and opening hours |

### Shop URL parameters

- `shop.html?q=5W-30`: prefills the search box. The header search form submits here.
- `shop.html?cat=engine|gear|commercial`: pre-ticks a category. The homepage tiles and footer links use this.
- `contact.html?type=trade|fleet|retail|other`: pre-selects the enquiry type.

## Running it

No build step and no dependencies. Pick one:

1. **Open the file directly.** Double-click `index.html`.
2. **Use the bundled server** (Node.js required):

   ```bash
   node serve.js
   ```

   Then open http://localhost:5173. Set `PORT=8080` to use another port.
3. **Any static server**, for example:

   ```bash
   npx serve
   ```

## File structure

```
.
├── index.html          Homepage
├── shop.html           Category page (filters, search, sort)
├── product.html        Product detail (reads ?id=)
├── about.html
├── delivery.html
├── contact.html
├── css/
│   └── styles.css      All styles: tokens, components, page sections
├── js/
│   ├── products.js     Placeholder catalogue plus helpers (fmt, jugSVG, cardHTML…)
│   ├── main.js         Shared behaviour: mobile menu, header search, mock cart drawer
│   ├── shop.js         Shop filters, search, sort and URL params
│   ├── product.js      Product page rendering, pack selector, add to cart
│   └── contact.js      Contact form mock (shows a success message, sends nothing)
├── assets/
│   ├── logo.svg
│   └── favicon.svg
├── screenshots/        Reference screenshots (desktop 1440px, mobile 375px)
└── serve.js            Zero-dependency static server
```

Every page loads `js/products.js`, then `js/main.js`, then its own page script. The header and footer markup is the same on every page. Only `aria-current="page"` on the active nav link changes.

## Editing products

All products live in the `PRODUCTS` array at the top of `js/products.js`:

```js
{
  id: 'nk2x-5w30',            // used in product.html?id=nk2x-5w30
  name: 'NK2X 5W-30',
  viscosity: '5W-30',         // shown on the jug label and used by the Viscosity filter
  type: 'Fully synthetic',    // 'Fully synthetic' | 'Semi-synthetic' | 'Mineral'
  category: 'Engine oil',     // 'Engine oil' | 'Gear oil' | 'Commercial & fleet'
  accent: '#2fae7a',          // colour of the stripe on the jug illustration
  featured: true,             // shown on the homepage and first under "Featured"
  packs: [{ size: '1L', price: 8.99 }, { size: '4L', price: 24.99 }],
  specs: ['ACEA C3', 'API SP'],  // spec chips, also searchable
  blurb: 'One-line description.'
}
```

- The shop filters are built from the data. Viscosities, oil types and pack sizes only appear if at least one product has them. Pack sizes are limited to 1L, 4L, 5L, 20L and 205L; add new ones to `PACKS` in `js/shop.js`.
- Cards show the 4L price, or the first pack if there is no 4L. The product page starts on that same pack.

### Switching £ to €

Change the symbol in `fmt` in `js/products.js`:

```js
function fmt(n) {
  return '€' + n.toFixed(2);
}
```

Prices on cards, the product page, the cart and the free-delivery line on the product page all go through `fmt`. The delivery page rates and the "free over £75" lines in `delivery.html` are static text, so update those by hand.

## The cart

The cart is a **localStorage mock** (key `thirty2-cart`). "Add to cart" stores `{ id, size, qty }` lines, updates the header badge and opens the cart drawer. The drawer lets you change quantities and remove items. Checkout is disabled. If storage is blocked (some private windows), the cart just stays empty.

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), a skip link, one `h1` per page and a logical heading order.
- Every form control has a visible `<label>`. Filter groups and the pack-size picker use `<fieldset>`/`<legend>`. Required contact fields use `required`, and the asterisk is explained in text.
- Visible amber focus ring everywhere (`:focus-visible`). Everything works by keyboard: filters, sort, search, pack-size radios (arrow keys), quantity stepper, cart drawer (focus is trapped while open, Esc closes it and returns focus) and the FAQ `<details>`.
- The shop result count is an `aria-live="polite"` region. Product price changes and cart additions are also announced.
- The mobile "Filters" toggle uses `aria-expanded`/`aria-controls`. The mobile menu works the same way.
- Decorative SVGs are `aria-hidden`. The main product jug is a labelled `role="img"`.
- Colour pairs meet WCAG AA. `--grey-500` is used for secondary text on light backgrounds and `--amber-deep` for amber text on light backgrounds.
- Layouts are checked at 1440px and 375px with no horizontal scrolling. `prefers-reduced-motion` turns off transitions.
