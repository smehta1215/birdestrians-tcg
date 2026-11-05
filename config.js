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
  // image:  wrapper art (recommended 600 x 1040 px, portrait)
  // colors: [dark, light] used for the screen background behind the pack
  // cards:  card numbers in this pack (the start of each file name in cards/), in reveal order.
  //         Leave it out and the pack contains every card.
  // gift:   gift cards (with "gift" in the file name) are added at the end of every pack.
  //         Set gift: "13" to use one specific gift card for this pack, or gift: false for none.
  //
  // Each pack has one card from each friend: Abhi (01-03), Sunay (04-06), Roshini (07-09), Sachin (10-12).
  packs: [
    { name: "Morning Chorus", image: "packs/pack-1.svg", colors: ["#5b3fd6", "#c9b8ff"], cards: ["08", "12", "01", "04"] },
    { name: "Night Owls",     image: "packs/pack-2.svg", colors: ["#1f3a9e", "#a8c4ff"], cards: ["09", "02", "10", "05"] },
    { name: "Seaside Strut",  image: "packs/pack-3.svg", colors: ["#13827c", "#b5f5ea"], cards: ["07", "11", "03", "06"] }
  ],

  // Width / height of the pack art. 600 x 1040 => 0.577
  packAspect: 600 / 1040,

  // Where the tear happens, as a fraction of the pack height from the top.
  // 0.158 lines up with the white stripe under the logo on the sample packs.
  tearLine: 0.158
};
