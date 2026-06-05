# XOXO Voyage

XOXO Voyage is a static, multi-page luxury travel booking platform prototype built with plain HTML, CSS, and JavaScript. It demonstrates a cohesive luxury design system, reusable assets, and light client-side interactivity for demo booking flows.

## Features

- Multi-page static site (Home, Explore, Booking, Dashboard, Support, Auth pages)
- Centralized design tokens and shared CSS in `assets/css`
- Small client-side UI behaviors in `assets/js`:
  - Active navigation highlighting
  - Mobile menu toggle
  - Toast notifications
  - Booking search saved to `localStorage`
  - Payment simulation that saves a confirmation and redirects to the confirmation page
  - Seat selection persisted in `localStorage`
  - Simple sign-in/signup simulation hook (store `xoxo_user`)

## Project structure

- `index.html` — Landing page
- `assets/css/` — Design tokens and shared styles
- `assets/js/` — Global UI scripts and page-specific scripts
- `auth/` — Sign in / sign up / password flows
- `booking/` — Flights, hotels, trains, buses, payment, confirmation
- `dashboard/` — User dashboard
- `explore/` — Destinations, packages, experiences, guides
- `support/` — Contact, FAQ, Help Center

## Quick start

Open the site in a browser directly by opening `index.html`, or serve it with a simple local HTTP server for correct path handling:

```bash
# From the project root (xoxo-voyage)
python -m http.server 8000
# then open http://localhost:8000/
```

or (Node.js)

```bash
npx serve .
```

## Testing dynamic UI (manual)

- Sign up or simulate a user by editing `auth/signup.html` to store a `xoxo_user` object in `localStorage` (or ask me to wire it automatically).
- Run a flight/hotel search on any `booking/*` page and click the search button — it saves the search to `localStorage` under `xoxo_last_search` and shows a toast.
- On `booking/payment.html` click the Pay button — the app simulates processing, stores a confirmation in `xoxo_last_confirmation`, and redirects to `booking/confirmation.html` where the confirmation data is shown.
- Click seats on pages with `.seat` elements to toggle selection; selected seats are saved under `xoxo_selected_seats`.
- Toasts appear in the lower center for feedback.

## Development notes

- Primary scripts live in `assets/js/app.js`. It contains helpers for nav highlighting, toast creation, form actions, and storage. Page-specific scripts live alongside their pages (e.g., `assets/js/booking.js`).
- Styling tokens are in `assets/css/variables.css` and shared styles in `assets/css/global.css`.

## Next steps (suggested)

- Wire `auth/signin.html` and `auth/signup.html` to persist `xoxo_user` automatically when users submit forms.
- Add a small client-side results page to render `xoxo_last_search` and allow turning a search into a booking (persist bookings to `localStorage`).
- Improve accessibility (ARIA roles, keyboard navigation) and add unit test harness if moving beyond a static demo.

## License

This project is a demo. Add a license file if you plan to open-source or distribute it.

## Contact

If you want me to continue, I can: wire the auth forms, implement the in-browser results -> booking flow, or add dashboard CRUD for saved bookings.
