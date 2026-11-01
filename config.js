// Birdestrians pack opener settings. Edit freely.
window.BIRDESTRIANS_CONFIG = {
  // Shown at the top of the pack-select screen.
  title: "Birdestrians",
  message: "Happy Birthday! Pick a pack",

  // Shown big when the gift card flips over.
  giftMessage: "Happy Birthday!",

  // One entry per pack in the carousel. Every pack contains ALL the cards
  // in the cards/ folder; packs only differ in their wrapper art.
  // image:  wrapper art (recommended 600 x 1040 px, portrait)
  // colors: [dark, light] used for the screen background behind the pack
  packs: [
    { name: "Morning Chorus", image: "packs/pack-1.svg", colors: ["#5b3fd6", "#c9b8ff"] },
    { name: "Night Owls",     image: "packs/pack-2.svg", colors: ["#1f3a9e", "#a8c4ff"] },
    { name: "Seaside Strut",  image: "packs/pack-3.svg", colors: ["#13827c", "#b5f5ea"] }
  ],

  // Width / height of the pack art. 600 x 1040 => 0.577
  packAspect: 600 / 1040,

  // Where the tear happens, as a fraction of the pack height from the top.
  // 0.158 lines up with the white stripe under the logo on the sample packs.
  tearLine: 0.158
};
