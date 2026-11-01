# Birdestrians Pack Opener

A pack-opening animation you can play in the browser: pick a pack from the carousel, swipe across the top to tear it open, flip through the cards, and finish on a face-down gift card that flips with confetti. Every pack contains every card in the `cards/` folder.

## Running it
- **Quickest:** double-click `index.html`.
- **On a phone, or for sharing:** host the whole folder on any static host (GitHub Pages, Netlify Drop, etc.) and open the link.
- **Local server:** `python3 -m http.server` in this folder, then open http://localhost:8000.

## Adding your cards
1. Make each card at **750 × 1050 px** (5:7, the standard trading-card ratio). PNG or JPG, with square corners; the app rounds them.
2. Delete the sample cards from `cards/` and drop yours in.
3. Name the files so they sort in the order you want:
   - `01-name.png`, `02-name.png`, … are shown in that order.
   - Put **`holo`** in a name for the rainbow shimmer, e.g. `07-owl-holo.png`.
   - Put **`gift`** in the name of the gift card, e.g. `99-gift.png`. It always comes last, face-down, and flips with confetti.
4. Run `python3 update_cards.py`. It rewrites `cards/cards.js`, which is the list the app reads.

## Changing the packs and text
Edit `config.js` to change the greeting, the gift message, the pack names, the background colours and the pack art.
- Pack art should be **600 × 1040 px**. If you use a different size, update `packAspect`.
- `tearLine` sets how far down the pack the tear runs (0.158 = 15.8% from the top). Line it up with a stripe in your art.

## Sample art
`tools/make_placeholders.py` generates the sample birds. You don't need it once you have real art.
