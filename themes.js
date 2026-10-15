// Tally color themes. "Classic" follows the phone's light/dark setting (colors live in index.html).
// Every other theme sets all the colors itself. Run `node tools/contrast.js` after changing one:
// it checks that text stays easy to read on every background.
//   bg      page background          surface  cards and tables      cell   buttons, empty boxes
//   ink     main text                muted    secondary text         line   dividers
//   accent  big buttons (fill)       aink     text on accent fills   atext  accent-colored text
//   soft    light accent fill        lead     leader's column tint
//   good / bad / gold  wins, minus scores, crowns
window.TALLY_THEMES = {
  amber: { name: 'Amber', dark: true,
    bg: '#1a1206', screen: '#20170a', surface: '#2a1e0d', cell: '#3b2a12', ink: '#fff4e0', muted: '#dcbc8c', line: '#4d3719',
    accent: '#ffb000', aink: '#1a1206', atext: '#ffc23d', soft: '#3f2d0b', lead: 'rgba(255,176,0,.15)', good: '#7bd88f', bad: '#ff8a6a', gold: '#ffc94d' },
  orange: { name: 'Orange Crush', dark: false,
    bg: '#fff0e0', screen: '#fff7ef', surface: '#ffffff', cell: '#ffe2c4', ink: '#3a1c05', muted: '#7a4520', line: '#f5cfa8',
    accent: '#ff7a00', aink: '#2a1200', atext: '#b33f00', soft: '#ffe0bf', lead: 'rgba(255,122,0,.13)', good: '#15803d', bad: '#c0262d', gold: '#b45309' },
  sunset: { name: 'Sunset', dark: true,
    bg: '#241332', screen: '#2a173a', surface: '#341d48', cell: '#452b5c', ink: '#fff0f5', muted: '#dcbcdf', line: '#523669',
    accent: '#ff8a5c', aink: '#241332', atext: '#ffa883', soft: '#4c2b52', lead: 'rgba(255,138,92,.15)', good: '#6fe0a8', bad: '#ff7896', gold: '#ffd166' },
  ocean: { name: 'Ocean', dark: true,
    bg: '#04222e', screen: '#062a38', surface: '#0a3446', cell: '#0f4558', ink: '#e6fbff', muted: '#a6cfdc', line: '#175269',
    accent: '#2ee6d6', aink: '#04222e', atext: '#5ff0e3', soft: '#0f4a56', lead: 'rgba(46,230,214,.13)', good: '#7ee8a8', bad: '#ff8f80', gold: '#ffd166' },
  table: { name: 'Card Table', dark: true,
    bg: '#0d2b1d', screen: '#103223', surface: '#153d2b', cell: '#1e4e38', ink: '#f3f7ee', muted: '#bcd3c0', line: '#265c43',
    accent: '#f2c14e', aink: '#1b1405', atext: '#f6d06f', soft: '#2b4a28', lead: 'rgba(242,193,78,.14)', good: '#95eab0', bad: '#ff9682', gold: '#f2c14e' },
  bubblegum: { name: 'Bubblegum', dark: false,
    bg: '#ffe8f3', screen: '#fff2f8', surface: '#ffffff', cell: '#ffd6ea', ink: '#3d0a26', muted: '#844365', line: '#f7c3dd',
    accent: '#d1127b', aink: '#ffffff', atext: '#ad0e66', soft: '#ffd3e9', lead: 'rgba(209,18,123,.09)', good: '#15803d', bad: '#b91c1c', gold: '#a16207' },
  lime: { name: 'Lime Soda', dark: false,
    bg: '#ecfadc', screen: '#f4fde9', surface: '#ffffff', cell: '#daf3bf', ink: '#1b2e05', muted: '#4b672b', line: '#c8e6a3',
    accent: '#6fd10f', aink: '#132400', atext: '#3a7500', soft: '#d6f5b0', lead: 'rgba(111,209,15,.14)', good: '#15803d', bad: '#b91c1c', gold: '#a16207' },
  grape: { name: 'Grape', dark: false,
    bg: '#f0eaff', screen: '#f6f2ff', surface: '#ffffff', cell: '#e3d8ff', ink: '#22104a', muted: '#5c4888', line: '#d5c7fb',
    accent: '#7c3aed', aink: '#ffffff', atext: '#6527d1', soft: '#e6dbff', lead: 'rgba(124,58,237,.09)', good: '#15803d', bad: '#b91c1c', gold: '#a16207' },
  neon: { name: 'Neon Arcade', dark: true,
    bg: '#0b0b14', screen: '#10101c', surface: '#171726', cell: '#232339', ink: '#f4f4ff', muted: '#acacd0', line: '#2e2e4a',
    accent: '#ff2fa0', aink: '#0b0b14', atext: '#ff6cbd', soft: '#2c1739', lead: 'rgba(255,47,160,.13)', good: '#39f59c', bad: '#ff6b6b', gold: '#ffe14d' },
  sky: { name: 'Sky', dark: false,
    bg: '#e4f3ff', screen: '#eff8ff', surface: '#ffffff', cell: '#d0e9fc', ink: '#0b2540', muted: '#42607d', line: '#bcdcf5',
    accent: '#1570c8', aink: '#ffffff', atext: '#1263b0', soft: '#d3eaff', lead: 'rgba(21,112,200,.09)', good: '#15803d', bad: '#b91c1c', gold: '#a16207' }
};
