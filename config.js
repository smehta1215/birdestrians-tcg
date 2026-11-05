// Birdestrians pack opener settings. Edit freely.
window.BIRDESTRIANS_CONFIG = {
  // Title screen (shown before the packs). introTitle defaults to `title`.
  introSubtitle: "Aida's Birthday Edition",
  // introButton: "Tap to play",   // optional; defaults to "Tap to play" / "Click to play"

  // Shown at the top of the pack-select screen.
  title: "Birdestrians",
  message: "Happy Birthday! Pick a pack",

  // Shown big when the gift card flips over.
  giftMessage: "Happy Birthday!",

  // One entry per pack in the carousel.
  // image:  wrapper art (600 x 1040 px shape; the art is drawn by tools/make_packs.js at 2x)
  // colors: [dark, light] used for the screen background behind the pack
  // Gift cards: any card with "gift" in its file name (91-gift-..., 92-gift-..., 93-gift-...). They are revealed
  // in number order across the session: the 1st pack opened ends with the first gift, the 2nd with the
  // second, and so on, whichever pack she picks. Gift cards are always holo.
  packs: [
    { name: "Celebrations: 29th Birthday Edition", image: "packs/pack-celebrations.webp",     colors: ["#8a5a1c", "#ffe3a0"] },
    { name: "Violet & Yellow: Coalescence",        image: "packs/pack-coalescence.webp",      colors: ["#5b2a9e", "#dcc4ff"] },
    { name: "Evolving Memories",                   image: "packs/pack-evolving-memories.webp", colors: ["#2e7a33", "#c4ecbf"] }
  ],

  // Each friend's cards (card numbers = the start of the file names in cards/). Every time the page
  // loads, each friend's cards are dealt randomly across the packs, one per pack, so every pack gets
  // one card from each friend, in a random order. Add a new friend's cards here and every pack gets one more card.
  friends: {
    Abhi:    ["01", "02", "03"],
    Sunay:   ["04", "05", "06"],
    Roshini: ["07", "08", "09"],
    Sachin:  ["10", "11", "12"]
  },

  // Each visit, one random card in every pack becomes the holo card and is revealed last.
  // Set to false to use "holo" in file names instead.
  randomHolo: true,

  // Width / height of the pack art. 600 x 1040 => 0.577
  packAspect: 600 / 1040,

  // Where the tear happens, as a fraction of the pack height from the top.
  // 0.158 lines up with the white stripe under the logo on the sample packs.
  tearLine: 0.158
};
