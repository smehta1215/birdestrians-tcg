#!/usr/bin/env python3
"""Generates the SAMPLE pack wrappers and cards for the Birdestrians pack opener.

These are placeholders only. Replace the files in cards/ (and optionally packs/)
with your real art, then run update_cards.py.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = "'Arial Rounded MT Bold','Trebuchet MS',Verdana,Arial,sans-serif"


# ---------------------------------------------------------------- the bird ---
def accessory(kind, c):
    if kind == "tophat":
        return ('<g transform="rotate(-10 100 54)"><rect x="68" y="46" width="64" height="10" rx="4" fill="#23202b"/>'
                '<rect x="79" y="6" width="42" height="44" rx="5" fill="#23202b"/>'
                f'<rect x="79" y="36" width="42" height="8" fill="{c}"/></g>')
    if kind == "cap":
        return (f'<path d="M70 62 C 70 26, 130 24, 132 60 Z" fill="{c}"/>'
                f'<path d="M126 56 C 146 54, 162 58, 166 64 L 128 64 Z" fill="{c}" stroke="#00000033" stroke-width="2"/>'
                '<circle cx="100" cy="31" r="5" fill="#ffffffaa"/>')
    if kind == "beanie":
        return (f'<path d="M70 62 C 70 18, 130 18, 130 62 Z" fill="{c}"/>'
                '<rect x="66" y="54" width="68" height="14" rx="7" fill="#ffffff" opacity=".9"/>'
                f'<circle cx="100" cy="18" r="11" fill="#fff"/>')
    if kind == "crown":
        return ('<path d="M72 60 L74 22 L88 40 L100 14 L112 40 L126 22 L128 60 Z" fill="#ffd23f" '
                'stroke="#c99a00" stroke-width="3" stroke-linejoin="round"/>'
                '<circle cx="100" cy="46" r="5" fill="#ff4f79"/><circle cx="84" cy="50" r="3.5" fill="#4fc3ff"/>'
                '<circle cx="116" cy="50" r="3.5" fill="#4fc3ff"/>')
    if kind == "bow":
        return (f'<path d="M100 50 L76 34 L78 66 Z" fill="{c}"/><path d="M100 50 L124 34 L122 66 Z" fill="{c}"/>'
                '<circle cx="100" cy="50" r="8" fill="#fff" opacity=".85"/>')
    if kind == "scarf":
        return (f'<path d="M58 124 C 88 146, 132 146, 158 120 L 160 136 C 132 162, 86 162, 56 140 Z" fill="{c}"/>'
                f'<path d="M74 146 L 66 186 L 84 184 L 88 150 Z" fill="{c}"/>'
                '<path d="M60 132 C 90 152, 130 150, 158 128" stroke="#ffffff88" stroke-width="3" fill="none" stroke-dasharray="6 7"/>')
    if kind == "shades":
        return ('<path d="M110 82 L 70 74" stroke="#15131c" stroke-width="5" stroke-linecap="round"/>'
                '<rect x="106" y="74" width="40" height="22" rx="9" fill="#15131c"/>'
                '<path d="M114 80 L 124 80" stroke="#ffffffaa" stroke-width="3" stroke-linecap="round"/>')
    return ""


def bird(body, belly, wing, beak="#ff9f1c", acc=None, acc_color="#e63946", over_eye=False):
    s = []
    s.append(f'<g stroke="{beak}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">'
             '<path d="M88 158 L80 188 M80 188 L66 190 M80 188 L86 198 M80 188 L72 198"/>'
             '<path d="M114 158 L128 184 M128 184 L142 184 M128 184 L136 194 M128 184 L124 196"/></g>')
    s.append(f'<path d="M46 104 L6 86 L18 112 L2 128 L46 134 Z" fill="{wing}"/>')
    s.append(f'<ellipse cx="100" cy="110" rx="62" ry="58" fill="{body}"/>')
    s.append(f'<ellipse cx="114" cy="128" rx="40" ry="35" fill="{belly}"/>')
    s.append(f'<path d="M60 106 C 68 80, 106 86, 106 116 C 100 142, 72 142, 56 128 Z" fill="{wing}"/>')
    s.append('<path d="M70 112 C 78 108, 90 110, 96 118" stroke="#00000022" stroke-width="3" fill="none"/>')
    if acc == "scarf":
        s.append(accessory("scarf", acc_color))
    s.append('<circle cx="124" cy="86" r="13" fill="#fff"/><circle cx="128" cy="87" r="7.5" fill="#1d1d2b"/>'
             '<circle cx="130.5" cy="84" r="2.6" fill="#fff"/>')
    s.append('<ellipse cx="138" cy="106" rx="9" ry="5.5" fill="#ff7aa2" opacity=".55"/>')
    s.append(f'<path d="M154 88 L186 99 L154 110 Z" fill="{beak}" stroke="#00000030" stroke-width="2" stroke-linejoin="round"/>')
    if acc and acc != "scarf":
        s.append(accessory(acc, acc_color))
    return "".join(s)


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ---------------------------------------------------------------- packs ------
def teeth(y0, y1, w, step=14, up=True):
    pts = []
    for i, x in enumerate(range(0, w + step, step)):
        pts.append(f"{x},{y0 if i % 2 == 0 else y1}")
    return " ".join(pts)


def pack_svg(name, dark, main, light, accent, birdargs, code):
    W, H = 600, 1040
    ridges = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="44" />' for x in range(4, W, 9))
    ridges_b = "".join(f'<line x1="{x}" y1="996" x2="{x}" y2="1040" />' for x in range(4, W, 9))
    rays = "".join(
        f'<path d="M300 560 L {300 + 900 * __import__("math").cos(a):.0f} {560 + 900 * __import__("math").sin(a):.0f} '
        f'L {300 + 900 * __import__("math").cos(a + 0.13):.0f} {560 + 900 * __import__("math").sin(a + 0.13):.0f} Z"/>'
        for a in [i * 0.392 for i in range(16)])
    prints = "".join(
        f'<g transform="translate({x} {y}) rotate({r})"><path d="M0 0 L0 -12 M0 0 L-9 -8 M0 0 L9 -8" /></g>'
        for x, y, r in [(40, 70, -20), (110, 128, 15), (190, 66, -10), (420, 130, 20), (500, 64, -15), (562, 126, 10),
                        (300, 60, 0)])
    sparkles = "".join(
        f'<path transform="translate({x} {y}) scale({s})" d="M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z" fill="#fff"/>'
        for x, y, s in [(90, 260, 1.2), (510, 300, 1.6), (470, 700, 1), (120, 640, 1.4), (420, 230, .8), (160, 420, .7)])
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
 <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{main}"/><stop offset="1" stop-color="{dark}"/></linearGradient>
 <radialGradient id="sky" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="{light}"/><stop offset=".6" stop-color="{main}"/><stop offset="1" stop-color="{dark}"/></radialGradient>
 <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <clipPath id="art"><rect x="0" y="176" width="{W}" height="720"/></clipPath>
</defs>
<path d="M0 8 L {W} 8 L {W} 1032 L 0 1032 Z" fill="url(#bg)"/>
<polygon points="0,14 {teeth(0, 14, W)} {W},44 0,44" fill="{dark}"/>
<g stroke="#ffffff" stroke-opacity=".18" stroke-width="3">{ridges}</g>
<rect x="0" y="44" width="{W}" height="114" fill="{dark}"/>
<g stroke="#ffffff" stroke-opacity=".14" stroke-width="5" stroke-linecap="round" fill="none">{prints}</g>
<text x="300" y="116" text-anchor="middle" font-family="{FONT}" font-weight="900" font-size="54" letter-spacing="1"
  fill="#fff" stroke="{accent}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">BIRDESTRIANS</text>
<rect x="196" y="128" width="208" height="26" rx="13" fill="{accent}"/>
<text x="300" y="148" text-anchor="middle" font-family="{FONT}" font-weight="700" font-size="17" fill="#fff" letter-spacing="2">TRADING CARD GAME</text>
<rect x="0" y="158" width="{W}" height="9" fill="#fff"/>
<rect x="0" y="167" width="{W}" height="9" fill="{accent}"/>
<g clip-path="url(#art)">
 <rect x="0" y="176" width="{W}" height="720" fill="url(#sky)"/>
 <g fill="#fff" opacity=".10">{rays}</g>
 <ellipse cx="300" cy="840" rx="380" ry="80" fill="{dark}" opacity=".55"/>
 {sparkles}
 <g transform="translate(300 590) scale(2.7) translate(-100 -110)">{bird(*birdargs)}</g>
</g>
<rect x="512" y="192" width="70" height="34" rx="8" fill="#15131c"/>
<text x="547" y="217" text-anchor="middle" font-family="{FONT}" font-weight="800" font-size="20" fill="#fff">{code}</text>
<rect x="0" y="880" width="{W}" height="9" fill="{accent}"/>
<rect x="0" y="889" width="{W}" height="107" fill="{dark}"/>
<text x="300" y="952" text-anchor="middle" font-family="{FONT}" font-weight="900" font-size="54"
  fill="#fff" stroke="{accent}" stroke-width="10" paint-order="stroke" stroke-linejoin="round">{esc(name.upper())}</text>
<text x="300" y="984" text-anchor="middle" font-family="{FONT}" font-weight="700" font-size="17" fill="#ffffffcc" letter-spacing="5">BOOSTER PACK</text>
<polygon points="0,996 {W},996 {W},1026 {teeth(1040, 1026, W)} 0,1026" fill="{dark}"/>
<g stroke="#ffffff" stroke-opacity=".18" stroke-width="3">{ridges_b}</g>
<rect x="0" y="0" width="{W}" height="{H}" fill="url(#foil)"/>
</svg>'''


# ---------------------------------------------------------------- cards ------
TYPES = {
    "Street": ("#d9c7a3", "#f4ead2", "#a8875a"),
    "Sky": ("#a9d3ff", "#e4f2ff", "#4f8ef7"),
    "Night": ("#b7a7e8", "#ebe5ff", "#5b48a8"),
    "Sea": ("#9fe0d6", "#e3faf5", "#1f8f86"),
    "Royal": ("#f7d77a", "#fff4d2", "#c28f0c"),
}


def card_svg(n, total, name, hp, ctype, birdargs, info, ability, ability_desc, move, dmg, move_desc, flavor, holo):
    c1, c2, ink = TYPES[ctype]
    frame = "url(#silver)" if holo else "#f2c94c"
    stars = "★★" if holo else "★"
    def lines(arr, x, y, size, lh, style="", fill="#1d1d2b", weight="500"):
        return "".join(f'<text x="{x}" y="{y + i * lh}" font-family="{FONT}" font-size="{size}" font-weight="{weight}" '
                       f'fill="{fill}" {style}>{esc(t)}</text>' for i, t in enumerate(arr))
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
<defs>
 <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>
 <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9edf5"/><stop offset=".35" stop-color="#a8b2c4"/><stop offset=".6" stop-color="#f8faff"/><stop offset="1" stop-color="#9aa4b8"/></linearGradient>
 <radialGradient id="sky" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="{c1}"/></radialGradient>
</defs>
<rect width="750" height="1050" rx="40" fill="{frame}"/>
<rect x="26" y="26" width="698" height="998" rx="24" fill="url(#body)"/>
<text x="60" y="98" font-family="{FONT}" font-size="48" font-weight="800" fill="#1d1d2b">{esc(name)}</text>
<text x="690" y="98" text-anchor="end" font-family="{FONT}" font-size="40" font-weight="800" fill="#c0392b">{hp} ♥</text>
<rect x="56" y="124" width="638" height="432" rx="12" fill="url(#sky)" stroke="{'#c7ced9' if holo else '#d9a521'}" stroke-width="10"/>
<ellipse cx="375" cy="500" rx="250" ry="34" fill="{ink}" opacity=".25"/>
<g transform="translate(375 352) scale(2.05) translate(-100 -110)">{bird(*birdargs)}</g>
<rect x="110" y="566" width="530" height="40" rx="20" fill="#ffffff99"/>
<text x="375" y="594" text-anchor="middle" font-family="{FONT}" font-size="22" font-style="italic" fill="#3a3a4a">{esc(info)}</text>
<rect x="60" y="632" width="118" height="38" rx="19" fill="#c0392b"/>
<text x="119" y="659" text-anchor="middle" font-family="{FONT}" font-size="22" font-weight="800" fill="#fff">Ability</text>
<text x="194" y="662" font-family="{FONT}" font-size="32" font-weight="800" fill="#c0392b">{esc(ability)}</text>
{lines(ability_desc, 62, 704, 24, 32)}
<circle cx="80" cy="792" r="18" fill="{ink}"/><circle cx="122" cy="792" r="18" fill="#ffffff" stroke="{ink}" stroke-width="4"/>
<text x="156" y="804" font-family="{FONT}" font-size="36" font-weight="800" fill="#1d1d2b">{esc(move)}</text>
<text x="690" y="806" text-anchor="end" font-family="{FONT}" font-size="44" font-weight="800" fill="#1d1d2b">{dmg}</text>
{lines(move_desc, 62, 844, 24, 32)}
<line x1="60" y1="884" x2="690" y2="884" stroke="{ink}" stroke-width="3" opacity=".5"/>
{lines(flavor, 62, 922, 22, 30, 'font-style="italic"', '#3a3a4a')}
<text x="60" y="1000" font-family="{FONT}" font-size="20" font-weight="700" fill="#3a3a4a">Birdestrians · {n:03d}/{total:03d}</text>
<text x="375" y="1000" text-anchor="middle" font-family="{FONT}" font-size="18" font-weight="700" fill="#3a3a4a88" letter-spacing="3">SAMPLE CARD</text>
<text x="690" y="1000" text-anchor="end" font-family="{FONT}" font-size="26" fill="#1d1d2b">{stars}</text>
</svg>'''


def gift_svg():
    b = bird("#9aa3b5", "#d7dbe6", "#6c7487", "#ff9f1c", "bow", "#ff4f79")
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 1050" width="750" height="1050">
<defs>
 <linearGradient id="fr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd1e8"/><stop offset=".5" stop-color="#ffe58a"/><stop offset="1" stop-color="#ff9ccc"/></linearGradient>
 <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe3f1"/><stop offset="1" stop-color="#fff7da"/></linearGradient>
 <radialGradient id="sky" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ffc2df"/></radialGradient>
</defs>
<rect width="750" height="1050" rx="40" fill="url(#fr)"/>
<rect x="26" y="26" width="698" height="998" rx="24" fill="url(#body)"/>
<text x="375" y="100" text-anchor="middle" font-family="{FONT}" font-size="50" font-weight="900" fill="#c2185b">A Special Delivery</text>
<rect x="56" y="128" width="638" height="520" rx="14" fill="url(#sky)" stroke="#f5b6d3" stroke-width="10"/>
<g transform="translate(375 470)">
 <rect x="-150" y="-60" width="300" height="190" rx="10" fill="#ff5c93"/>
 <rect x="-170" y="-100" width="340" height="60" rx="10" fill="#ff7aa8"/>
 <rect x="-22" y="-100" width="44" height="230" fill="#ffd23f"/>
 <path d="M0 -100 C -80 -180, -150 -120, -60 -102 Z M0 -100 C 80 -180, 150 -120, 60 -102 Z" fill="#ffd23f" stroke="#e0b100" stroke-width="4"/>
</g>
<g transform="translate(470 300) scale(1.1) translate(-100 -110)">{b}</g>
<text x="375" y="730" text-anchor="middle" font-family="{FONT}" font-size="44" font-weight="900" fill="#1d1d2b">Your gift goes here!</text>
<text x="375" y="790" text-anchor="middle" font-family="{FONT}" font-size="26" fill="#3a3a4a">Replace this placeholder with a card</text>
<text x="375" y="826" text-anchor="middle" font-family="{FONT}" font-size="26" fill="#3a3a4a">that shows off the real present.</text>
<text x="375" y="1000" text-anchor="middle" font-family="{FONT}" font-size="20" font-weight="700" fill="#c2185b" letter-spacing="3">SAMPLE GIFT CARD · ★★★</text>
</svg>'''


CARDS = [
    ("01-sidewalk-sparrow.svg", "Sidewalk Sparrow", 50, "Street", ("#b5835a", "#f3dfc1", "#7a5236", "#ff9f1c", "cap", "#e63946"),
     "Tiny Hopper · Ht 0'6\" · Wt 0.1 lb", "Crumb Radar", ["Look at the top card of your deck. If it's", "a snack, keep it. You deserve it."],
     "Hop Hop Hop", 20, ["Flip 3 coins. This attack does 10 more", "damage for each heads."],
     ["It has never once used the crosswalk", "button, but it presses it anyway."], False),
    ("02-pedestrian-pigeon.svg", "Pedestrian Pigeon", 70, "Street", ("#9aa3b5", "#d7dbe6", "#6c7487", "#ff9f1c", "tophat", "#c0392b"),
     "Gentleman Bird · Ht 1'0\" · Wt 0.8 lb", "Proper Strut", ["Once per turn, you may move this bird", "to the Bench with great dignity."],
     "Head Bob", 30, ["The Defending bird is now", "slightly confused."],
     ["Walks everywhere even though it can fly.", "Says it's \"better for the knees.\""], False),
    ("03-commuter-crow.svg", "Commuter Crow", 80, "Night", ("#3b3f58", "#6d7290", "#262a3d", "#f4b03e", "shades", "#000"),
     "Early Riser · Ht 1'4\" · Wt 1.1 lb", "Shiny Collector", ["When you play this card, search your", "deck for any object that sparkles."],
     "Caw-ffee Break", 40, ["Heal 20 damage from this bird.", "It was a long morning."],
     ["Knows every shortcut in the city and", "will tell you about all of them."], False),
    ("04-jaywalk-jay.svg", "Jaywalk Jay", 60, "Sky", ("#4f8ef7", "#e8f1ff", "#2d5fc4", "#ffb23f", "beanie", "#ff6b6b"),
     "Rule Bender · Ht 0'10\" · Wt 0.2 lb", "Midblock Dash", ["This bird can retreat for free,", "but only when nobody is looking."],
     "Zig Zag", 30, ["Switch this bird with one of your", "Benched birds."],
     ["Crosses the street wherever it", "pleases. Has a perfect safety record."], False),
    ("05-rush-hour-robin.svg", "Rush-Hour Robin", 70, "Street", ("#8a6a55", "#ff7b4a", "#5e4535", "#ffcf3f", "scarf", "#2a9d8f"),
     "Busy Bird · Ht 0'9\" · Wt 0.2 lb", "Five-Minute Warning", ["If you have 5 cards in hand, draw", "1 more. Hurry, the bus is coming!"],
     "Worm Express", 50, ["Discard an Energy from this bird.", ""],
     ["Always late, always smiling.", "Wears the scarf in every season."], False),
    ("06-promenade-puffin-holo.svg", "Promenade Puffin", 100, "Sea", ("#2b2b38", "#ffffff", "#1b1b24", "#ff6b35", "bow", "#ff4f79"),
     "Boardwalk Star · Ht 1'1\" · Wt 1.2 lb", "Seaside Stroll", ["Between turns, heal 10 damage from", "each of your birds. Ocean air helps."],
     "Fishy Flourish", 80, ["If this bird is wearing a bow,", "this attack does 30 more damage."],
     ["Takes the long way along the pier", "just to be admired. It is admired."], True),
    ("07-boulevard-owl-holo.svg", "Boulevard Owl", 130, "Royal", ("#a77b4f", "#f1d9b5", "#6f4e2f", "#f4b03e", "crown", "#000"),
     "Night Monarch · Ht 1'8\" · Wt 3.3 lb", "Who Goes There", ["Your opponent reveals their hand.", "The owl already knew, though."],
     "Royal Decree", 120, ["During your next turn, every bird", "must bow to this one."],
     ["Rules the city after midnight from", "the top of a very fancy lamppost."], True),
]

PACKS = [
    ("pack-1.svg", "Morning Chorus", "#3a1f8a", "#7b5cff", "#d6ccff", "#ff4f9a", ("#ffcf3f", "#fff3c4", "#f2a900", "#ff7b29", "cap", "#ff4f79"), "B1"),
    ("pack-2.svg", "Night Owls", "#0d1b4a", "#2e4bb8", "#a8c4ff", "#7b5cff", ("#3b3f58", "#6d7290", "#262a3d", "#f4b03e", "shades", "#000"), "B1"),
    ("pack-3.svg", "Seaside Strut", "#0b5a63", "#1fa8a0", "#c8fff5", "#ff7a59", ("#2b2b38", "#ffffff", "#1b1b24", "#ff6b35", "bow", "#ff4f79"), "B1"),
]


def main():
    os.makedirs(os.path.join(ROOT, "cards"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "packs"), exist_ok=True)
    total = len(CARDS)
    for i, c in enumerate(CARDS):
        with open(os.path.join(ROOT, "cards", c[0]), "w") as f:
            f.write(card_svg(i + 1, total, *c[1:]))
    with open(os.path.join(ROOT, "cards", "99-gift.svg"), "w") as f:
        f.write(gift_svg())
    for p in PACKS:
        with open(os.path.join(ROOT, "packs", p[0]), "w") as f:
            f.write(pack_svg(*p[1:]))
    print("Wrote", total + 1, "cards and", len(PACKS), "packs")


if __name__ == "__main__":
    main()
