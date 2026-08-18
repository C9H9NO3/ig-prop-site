// ============================================================
//  EDIT YOUR PROFILE NUMBERS HERE, then refresh the page.
//  (No rebuild needed - they render live in the real font and
//   auto-center over the posts / followers / following labels.)
//
//  Use whatever format you like, e.g.:
//    posts:     "47"   "141"   "1,234"
//    followers: "183K" "549K"  "1.2M"
//    following: "76"   "228"   "1,005"
//
//  Defaults below are the original traeleg values.
// ============================================================
window.STATS = {
  posts:     "63",
  followers: "223K",
  following: "78",
};

// Daily Views on Insights Overview (Jul 20 → Aug 18, 30 days).
// Y-axis (6M / 3M / 0) scales from the max value automatically.
// Spike days match Content tab videos (Views, last 30 days).
window.VIEWS_GRAPH = {
  labelsX: ["Jul 20", "Aug 3", "Aug 18"],
  values: [
    120000,
    5100000, // Jul 21  4w  Spain 2026 World Cup  5.1M
    180000, 95000, 110000,
    2800000, // Jul 25  3w  WORLD CUP  2.8M
    165000, 88000, 102000, 140000,
    91000, 125000, 78000, 155000, 99000,
    4400000, // Aug 4   2w  dance emojis  4.4M
    190000, 115000, 87000,
    1700000, // Aug 8   1w  Riding with the bro  1.7M
    145000,
    384800,  // Aug 10  1w  Another one  384.8K
    257900,  // Aug 11  1w  Hitch hiker is wilding  257.9K
    98000, 132000, 89000,
    3600000, // Aug 15  3d  Meow meow  3.6M
    175000, 108000, 142000
  ],
};

// Daily net followers on Insights Audience (Jul 20 → Aug 18).
// Y-axis stays 20K / 0 / -20K. Eight needles (~2–4K) for eight posts;
// top three are the Follows tiles × ~1.2 (+4.2K / +2.8K / +2.1K).
window.FOLLOWS_GRAPH = {
  labelsX: ["Jul 20", "Aug 3", "Aug 18"],
  yMin: -20000,
  yMax:  20000,
  values: [
    0, 30, -20, 40,     // short plateau on 0, like the original lead-in
    4190,               // Spain 2026 World Cup     +3,492 × 1.2
    -220, 40,
    2600,               // WORLD CUP
    -160, 30, 0,
    2100,               // 8th post
    -140, 40, 20,
    2753,               // dance emojis             +2,294 × 1.2
    -180, 50, 20,
    2300,               // Riding with the bro
    -100,
    1900,               // Another one
    1800,               // Hitch hiker is wilding
    -90, 30, 20,
    2100,               // Meow meow                +1,750 × 1.2
    -110, 25, 40
  ],
};
