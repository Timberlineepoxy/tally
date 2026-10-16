// Tally: scorekeeper for card, board, dice and yard games.
// Everything is saved on the phone (localStorage) after every tap.
(function () {
  'use strict';

  const COLORS = ['#d6453c', '#2f6fdb', '#18936a', '#d4961b', '#8b4fd0', '#e0679a', '#0e9aa7', '#7a5a3a', '#5c6b7a', '#ef7d2b', '#3d9e3d', '#b8336a'];
  const KEY = 'tally.v1';
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
  const fmt = n => (n < 0 ? '−' : '') + Math.abs(n).toLocaleString('en-US');
  const sum = a => a.reduce((x, y) => x + y, 0);
  const plural = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
  const initial = n => (String(n).trim()[0] || '?').toUpperCase();

  // ───────── state ─────────
  let S;
  function blank() { return { v: 1, players: [], games: [], history: [], custom: [], favs: [], notes: {}, settings: { theme: 'system', awake: true, colors: {} } }; }
  function load() {
    try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || 'null') || {}); } catch (e) { S = blank(); }
    S.settings = Object.assign(blank().settings, S.settings);
    if (!['system', 'light', 'dark'].includes(S.settings.theme)) S.settings.theme = 'system';
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Could not save — phone storage is full'); } }

  const library = () => TALLY_GAMES.concat(S.custom);
  const findDef = id => library().find(g => g.id === id);
  const shown = () => library().filter(g => !g.hidden);
  const player = id => S.players.find(p => p.id === id);
  const game = id => S.games.find(g => g.id === id);

  // ───────── scoring engine ─────────
  const CALC = {
    spades: (m, st) => {
      const b = m.b | 0, t = m.t | 0; let s, bags = 0;
      if (b === 0) { s = t === 0 ? 100 : -100; bags = t; }
      else if (t >= b) { s = 10 * b + (t - b); bags = t - b; }
      else s = -10 * b;
      st.bags = (st.bags || 0) + bags;
      if (st.bags >= 10) { s -= 100; st.bags -= 10; }
      return s;
    },
    ohhell: m => ((m.t | 0) === (m.b | 0) ? 10 + (m.b | 0) : 0),
    wizard: m => { const b = m.b | 0, t = m.t | 0; return t === b ? 20 + 10 * t : -10 * Math.abs(t - b); },
    skullking: (m, st, n) => {
      const b = m.b | 0, t = m.t | 0, x = m.x | 0;
      if (b === 0) return t === 0 ? 10 * n + x : -10 * n;
      return t === b ? 20 * b + x : -10 * Math.abs(t - b);
    },
    rage: m => { const b = m.b | 0, t = m.t | 0; return t + (t === b ? 10 : -5) + (m.x | 0); }
  };
  const CALC_INFO = {
    spades: { bonus: false, hint: 'Bid 0 is nil: +100 if you take no tricks, −100 if you do' },
    ohhell: { bonus: false, hint: '' },
    wizard: { bonus: false, hint: '' },
    skullking: { bonus: true, hint: 'Bonuses only count when the bid is exact' },
    rage: { bonus: true, hint: 'Bonus Rage cards: +5 or −5 each' }
  };

  function roundCount(g) {
    const r = g.cfg.rounds;
    if (r === 'wizard') return Math.floor(60 / Math.max(3, g.seats.length));
    return r || 0;
  }
  function roundLabel(g, i) {
    const c = g.cfg;
    if (c.names && c.names[i]) return c.names[i];
    if (c.rl === 'cards') return plural(i + 1, 'card');
    return (c.rl || 'Round') + ' ' + (i + 1);
  }
  function catScore(cat, raw) {
    if (raw == null || raw === '') return 0;
    let v = +raw;
    if (cat.tri) return v * (v + 1) / 2;
    if (cat.div) return Math.floor(v / cat.div);
    if (cat.mult) return v * cat.mult;
    if (cat.neg) return -Math.abs(v);
    return v;
  }

  // Works out everything about a game from what was entered.
  function compute(g) {
    const c = g.cfg, ids = g.seats.map(s => s.id), res = { totals: {}, rows: [], roundWins: {}, phases: {}, out: {}, extra: [] };
    ids.forEach(id => { res.totals[id] = 0; res.roundWins[id] = 0; res.phases[id] = 0; });
    const better = (a, b) => c.win === 'low' ? a < b : a > b;

    if (['rounds', 'winner', 'calc'].includes(c.s)) {
      const st = {}; ids.forEach(id => st[id] = {});
      g.rounds.forEach((r, i) => {
        const row = {};
        ids.forEach(id => {
          let v = 0;
          if (c.s === 'winner') v = r.w === id ? (r.v[id] || 0) : 0;
          else if (c.s === 'calc') { const m = (r.m || {})[id]; v = m ? (m.d != null ? +m.d : CALC[c.calc](m, st[id], i + 1)) : 0; }
          else v = r.v[id] || 0;
          row[id] = v; res.totals[id] += v;
          if (c.phase && r.ph && r.ph[id]) res.phases[id] = Math.min(10, res.phases[id] + 1);
        });
        res.rows.push(row);
        // who won the round
        if (c.s === 'winner') { if (r.w && res.roundWins[r.w] != null) res.roundWins[r.w]++; }
        else {
          const vals = ids.map(id => row[id]);
          if (new Set(vals).size > 1) {
            const best = c.win === 'low' ? Math.min(...vals) : Math.max(...vals);
            ids.forEach(id => { if (row[id] === best) res.roundWins[id]++; });
          }
        }
      });
      if (c.calc === 'spades') res.bags = Object.fromEntries(ids.map(id => [id, st[id].bags || 0]));
    } else if (c.s === 'sheet') {
      ids.forEach(id => {
        let t = 0, upper = 0;
        c.cats.forEach((cat, ci) => { const v = catScore(cat, (g.cells[ci] || {})[id]); t += v; if (cat.upper) upper += v; });
        if (c.special === 'yahtzee' && upper >= 63) t += 35;
        if (c.special === 'yatzy' && upper >= 63) t += 50;
        res.totals[id] = t; res.upper = res.upper || {}; res.upper[id] = upper;
      });
    } else if (c.s === 'counter') {
      ids.forEach(id => { res.totals[id] = g.cnt[id]; if (c.loseAt != null && g.cnt[id] <= c.loseAt) res.out[id] = true; });
    } else if (c.s === 'wins') {
      ids.forEach(id => res.totals[id] = 0);
      g.wlog.forEach(w => { if (res.totals[w] != null) res.totals[w]++; });
    }

    // Is the game over, and who's winning?
    const live = ids.filter(id => !res.out[id]);
    const pick = list => { if (!list.length) return []; let b = res.totals[list[0]]; list.forEach(id => { if (better(res.totals[id], b)) b = res.totals[id]; }); return list.filter(id => res.totals[id] === b); };
    res.leaders = c.s === 'wins' ? pick(ids) : pick(live.length ? live : ids);
    if (c.s === 'wins' && res.leaders.length && res.totals[res.leaders[0]] === 0) res.leaders = [];
    res.over = false;
    const tgt = targetOf(g);
    if (c.phase) {
      const done = ids.filter(id => res.phases[id] >= 10);
      if (done.length) { res.over = true; res.winners = pick(done); res.why = 'Finished phase 10'; }
    } else if (c.s === 'counter') {
      if (c.loseAt != null && ids.length > 1 && live.length <= 1) { res.over = true; res.winners = live; res.why = 'Last one standing'; }
      else if (tgt != null) {
        const down = (c.start || 0) > tgt;
        const hit = ids.filter(id => down ? res.totals[id] <= tgt : res.totals[id] >= tgt);
        if (hit.length) { res.over = true; res.winners = hit; res.why = 'Reached ' + fmt(tgt); }
      }
    } else if (['rounds', 'winner', 'calc'].includes(c.s)) {
      const n = roundCount(g);
      if (tgt != null && ids.some(id => res.totals[id] >= tgt)) { res.over = true; res.winners = pick(ids); res.why = (c.win === 'low' ? 'Someone reached ' : 'Reached ') + fmt(tgt); }
      else if (n && g.rounds.length >= n) { res.over = true; res.winners = pick(ids); res.why = 'All ' + n + ' rounds played'; }
    }
    if (c.laps) {
      res.laps = {}; ids.forEach(id => res.laps[id] = (g.laps || {})[id] || 0);
      const done = ids.filter(id => res.laps[id] >= c.laps);
      if (done.length) { res.over = true; res.winners = c.lapWin === 'score' ? pick(ids) : done.length > 1 ? pick(done) : done; res.why = (done.length === 1 ? (g.seats.find(s => s.id === done[0]) || {}).name + ' finished ' : 'Finished ') + plural(c.laps, 'lap'); }
    }
    if (!res.winners) res.winners = res.leaders;
    return res;
  }
  function targetOf(g) {
    const c = g.cfg;
    if (c.tby) { const n = g.seats.length; const k = Object.keys(c.tby).map(Number); const m = c.tby[n] ?? c.tby[n < Math.min(...k) ? Math.min(...k) : Math.max(...k)]; return g.target ?? m; }
    return g.target === undefined ? (c.target ?? null) : g.target;
  }

  // ───────── undo ─────────
  const undo = {};
  function snap(g) { (undo[g.id] = undo[g.id] || []).push(JSON.stringify(g)); if (undo[g.id].length > 50) undo[g.id].shift(); }
  function doUndo(g) {
    const st = undo[g.id]; if (!st || !st.length) { toast('Nothing to undo'); return; }
    const prev = JSON.parse(st.pop()); const i = S.games.findIndex(x => x.id === g.id); S.games[i] = prev; save(); toast('Undone'); render();
  }

  // ───────── games: start / finish ─────────
  function cfgOf(def) {
    const keys = ['n', 's', 'c', 'win', 'target', 'rounds', 'names', 'rl', 'q', 'teams', 'calc', 'phase', 'cats', 'special', 'start', 'loseAt', 'steps', 'exact', 'bust', 'tby', 'unit', 'r', 'wq', 'wl', 'laps', 'lapWin', 'rules', 'lapsOnly'];
    const o = {}; keys.forEach(k => { if (def[k] !== undefined) o[k] = JSON.parse(JSON.stringify(def[k])); }); return o;
  }
  function startGame(def, seats, opt) {
    const cfg = cfgOf(def);
    if (opt.win) cfg.win = opt.win;
    if (opt.rounds !== undefined) cfg.rounds = opt.rounds;
    if (opt.start !== undefined) cfg.start = opt.start;
    if (opt.laps) cfg.laps = opt.laps;
    const g = { id: uid(), def: def.id, cfg, seats, rounds: [], cells: {}, cnt: {}, wlog: [], dealer: opt.dealer ?? 0, trackDealer: !!opt.trackDealer, started: Date.now(), updated: Date.now() };
    if (opt.target !== undefined) g.target = opt.target;
    seats.forEach(s => g.cnt[s.id] = cfg.start || 0);
    S.games.unshift(g); save();
    go('play', { id: g.id });
  }
  function finishGame(g, andThen) {
    const r = compute(g);
    const played = g.cfg.s === 'wins' ? g.wlog.length : 1;
    if (g.cfg.s === 'wins' ? g.wlog.length : (g.rounds.length || Object.keys(g.cells).length || g.seats.some(s => g.cnt[s.id] !== (g.cfg.start || 0)) || Object.values(g.laps || {}).some(Boolean))) {
      S.history.unshift({ id: g.id, def: g.def, name: g.cfg.n, style: g.cfg.s, date: Date.now(), seats: g.seats, totals: r.totals, winners: g.cfg.s === 'wins' ? [] : r.winners,
        roundWins: r.roundWins, played, rounds: g.rounds.length, game: g });
    }
    S.games = S.games.filter(x => x.id !== g.id); save();
    if (andThen === 'rematch') {
      const seats = g.seats.map(s => Object.assign({}, s));
      const def = findAny(g.def) || g.cfg;
      startGame(Object.assign({}, def, g.cfg, { id: g.def }), seats, { target: g.target, dealer: (g.dealer + g.rounds.length + 1) % seats.length, trackDealer: g.trackDealer });
    } else go('home');
  }

  // ───────── routing ─────────
  let V = { name: 'home' };
  let tab = 'card', query = '';
  function go(name, extra = {}) { V = Object.assign({ name }, extra); closeSheet(); render(); window.scrollTo(0, 0); }

  // ───────── rendering helpers ─────────
  const av = (seat, size) => `<span class="av" style="background:${seat.color};${size ? `width:${size}px;height:${size}px;font-size:${size * .45}px` : ''}">${esc(initial(seat.name))}</span>`;
  const styleName = { rounds: 'Every round', winner: 'Winner takes', calc: 'Bids & tricks', sheet: 'Score sheet', counter: 'Counter', wins: 'Just wins' };
  function topbar(title, sub, left, right) {
    return `<header class="top"><div class="tl">${left || ''}</div><div class="tt"><div class="t">${esc(title)}</div>${sub ? `<div class="s">${sub}</div>` : ''}</div><div class="tr">${right || ''}</div></header>`;
  }
  const back = (to = 'home') => `<button class="ico" data-go="${to}" aria-label="Back">‹</button>`;
  function tabbar() {
    const t = [['home', 'Play', 'M4 11l8-7 8 7v9h-5v-6H9v6H4z'], ['games', 'Games', 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'], ['history', 'History', 'M12 6v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'], ['stats', 'Stats', 'M5 20V10M12 20V4M19 20v-7']];
    return `<nav class="tabbar">${t.map(([k, l, d]) => `<button data-go="${k}" class="${V.name === k ? 'on' : ''}"><svg viewBox="0 0 24 24"><path d="${d}"/></svg>${l}</button>`).join('')}</nav>`;
  }

  function render() {
    const app = $('#app');
    const fn = { home: vHome, games: vGames, setup: vSetup, play: vPlay, history: vHistory, past: vPast, stats: vStats, settings: vSettings, custom: vCustom, player: vPlayer }[V.name] || vHome;
    app.innerHTML = fn();
    document.body.classList.toggle('playing', V.name === 'play');
    wake(V.name === 'play');
    if (V.after) { const f = V.after; V.after = null; f(); }
  }

  // ───────── HOME ─────────
  function vHome() {
    const act = S.games.map(g => {
      const r = compute(g), ld = r.leaders.map(id => g.seats.find(s => s.id === id)).filter(Boolean);
      const where = ['rounds', 'winner', 'calc'].includes(g.cfg.s) ? roundLabel(g, g.rounds.length) : styleName[g.cfg.s];
      const fresh = g.cfg.s === 'wins' ? !g.wlog.length : g.cfg.s === 'counter' ? g.seats.every(s => g.cnt[s.id] === (g.cfg.start || 0)) : g.cfg.s === 'sheet' ? !Object.keys(g.cells).length : !g.rounds.length;
      const lead = fresh ? 'Just started' : ld.length ? (ld.length > 1 ? 'Tied' : esc(ld[0].name) + ' leads') + (g.cfg.s === 'wins' ? '' : ' with ' + fmt(r.totals[ld[0].id])) : 'Just started';
      const t = targetOf(g);
      return `<button class="card cont" data-go="play" data-id="${g.id}"><span class="k">Pick up where you left off</span><span class="v">${esc(g.cfg.n)} · ${esc(where)}</span><span class="d">${lead}${t != null ? ' · ' + (g.cfg.s === 'counter' && (g.cfg.start || 0) > t ? 'down to ' : 'to ') + fmt(t) : ''}</span></button>`;
    }).join('');
    const favs = [...new Set(S.favs.concat(S.custom.map(x => x.id)))].map(findDef).filter(Boolean);
    const recent = S.history.slice(0, 4);
    return topbar('Tally', greet(), '', `<button class="ico" data-go="settings" aria-label="Settings"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg></button>`) +
      `<main class="body">
        ${act}
        ${installTip()}
        <div class="big">
          <button class="bigbtn" data-act="lib" data-tab="card"><span class="suits" style="color:var(--p1)">♥♠</span><span class="n">Card games</span><span class="d">Uno, Phase 10, Spades…</span></button>
          <button class="bigbtn" data-act="lib" data-tab="board"><span class="suits" style="color:var(--p3)">▦♜</span><span class="n">Board games</span><span class="d">Catan, Ticket to Ride…</span></button>
          <button class="bigbtn" data-act="lib" data-tab="dice"><span class="suits" style="color:var(--p4)">⚄⚂</span><span class="n">Dice & tiles</span><span class="d">Yahtzee, Farkle, dominoes…</span></button>
          <button class="bigbtn" data-act="lib" data-tab="party"><span class="suits" style="color:var(--p2)">◎✦</span><span class="n">Party & yard</span><span class="d">Cornhole, mini golf…</span></button>
          <button class="bigbtn wide mk" data-act="newcustom"><span><span class="n">Make my own game</span><span class="d">Your rules, your scoring, laps if you want</span></span><span class="ico">✎</span></button>
          <button class="bigbtn wide" data-act="quick"><span><span class="n">Quick score</span><span class="d">Any game · just names and numbers</span></span><span class="ico">+</span></button>
        </div>
        ${favs.length ? `<div class="lbl">Your games</div><div class="favrow">${favs.map(d => `<button class="fav" data-act="pick" data-id="${d.id}">${esc(d.n)}</button>`).join('')}</div>` : ''}
        <div class="lbl">Players</div>
        <div class="ppl">${S.players.map(p => `<button class="pp" data-go="player" data-id="${p.id}">${av(p)}${esc(p.name)}</button>`).join('')}<button class="pp add" data-act="addplayer">+ Add player</button></div>
        ${recent.length ? `<div class="lbl">Recent</div><div class="glist">${recent.map(histRow).join('')}</div>` : ''}
      </main>` + tabbar();
  }
  function greet() {
    const d = new Date(), h = d.getHours(), day = d.toLocaleDateString('en-US', { weekday: 'long' });
    return esc(day + (h < 12 ? ' morning' : h < 17 ? ' afternoon' : ' night'));
  }
  function installTip() {
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const standalone = window.navigator.standalone || matchMedia('(display-mode: standalone)').matches;
    if (!ios || standalone || S.settings.hideTip) return '';
    return `<div class="card tip"><b>Put Tally on your home screen</b><span>In Safari, tap the Share button <span class="sharei">⬆︎</span> then <b>Add to Home Screen</b>. It opens full screen and works with no signal.</span><button class="link" data-act="hidetip">Got it</button></div>`;
  }
  function histRow(h) {
    const w = h.style === 'wins' ? topWins(h) : h.winners.map(id => (h.seats.find(s => s.id === id) || {}).name).filter(Boolean).join(' & ');
    const when = new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const score = h.style === 'wins' ? plural(h.played, 'game') : (h.winners[0] != null ? fmt(h.totals[h.winners[0]]) : '');
    return `<button class="g" data-go="past" data-id="${h.id}"><span><span class="gn">${esc(h.name)}</span><span class="gr">${when} · ${w ? esc(w) + (h.style === 'wins' ? '' : ' won') : 'no winner'}</span></span><span class="st">${score}</span></button>`;
  }
  function topWins(h) {
    const ids = Object.keys(h.totals); if (!ids.length) return '';
    const m = Math.max(...ids.map(i => h.totals[i])); if (!m) return '';
    return ids.filter(i => h.totals[i] === m).map(i => (h.seats.find(s => s.id === i) || {}).name).join(' & ') + ' won ' + m;
  }

  // ───────── GAMES LIBRARY ─────────
  function vGames() {
    const q = query.trim().toLowerCase();
    let list, body = '';
    if (q) {
      list = shown().filter(g => (g.n + ' ' + (g.g || '') + ' ' + (g.r || '') + ' ' + (g.jr ? findDef(g.jr).n + ' junior' : '')).toLowerCase().includes(q));
      body = list.length ? `<div class="glist">${list.map(gameRow).join('')}</div>` : `<p class="empty">No game called "${esc(query)}" yet.<br><button class="btn" data-act="newcustom" data-name="${esc(query)}">Make "${esc(query)}"</button></p>`;
    } else if (tab === 'mine') {
      const favs = S.favs.map(findDef).filter(Boolean);
      body = `<div class="lbl">Quick score</div><div class="glist">${QUICK.map(gameRow).join('')}</div>
        <div class="lbl">Starred</div>${favs.length ? `<div class="glist">${favs.map(gameRow).join('')}</div>` : '<p class="empty small">Tap the ☆ next to any game to keep it here.</p>'}
        <div class="lbl">Made by you</div>${S.custom.length ? `<div class="glist">${S.custom.map(gameRow).join('')}</div>` : '<p class="empty small">Games you make show up here.</p>'}`;
    } else {
      list = TALLY_GAMES.filter(g => g.c === tab && !g.hidden);
      const groups = [...new Set(list.map(g => g.g))];
      body = groups.map(gr => `<div class="lbl">${esc(gr)}</div><div class="glist">${list.filter(g => g.g === gr).map(gameRow).join('')}</div>`).join('');
    }
    const tabs = TALLY_CATS.concat([['mine', 'Mine']]);
    return topbar('Pick a game', plural(shown().length, 'game'), back(), `<button class="ico" data-act="newcustom" aria-label="Make a game">+</button>`) +
      `<main class="body">
        <div class="seg">${tabs.map(([k, l]) => `<button data-act="tab" data-tab="${k}" class="${tab === k && !q ? 'on' : ''}">${l}</button>`).join('')}</div>
        <input id="search" class="search" type="search" placeholder="Search ${shown().length} games…" value="${esc(query)}" autocomplete="off">
        <div id="results">${body}</div>
        <button class="btn ghost wide" data-act="newcustom">+ Make my own game</button>
      </main>` + tabbar();
  }
  function gameRow(g) {
    const fav = S.favs.includes(g.id);
    return `<div class="g"><button class="gmain" data-act="pick" data-id="${g.id}"><span class="gn">${esc(g.n)}</span><span class="gr">${esc(g.r || '')}</span></button>
      ${builtInRules(g.id) || g.rules ? '<span class="st rb" title="Has rules">📖</span>' : ''}${g.jr ? '<span class="st jr">Jr</span>' : ''}<span class="st">${styleName[g.s]}</span>${S.custom.some(x => x.id === g.id) ? `<button class="star" data-act="editgame" data-id="${g.id}" aria-label="Edit">✎</button>` : ''}${g.quick ? '' : `<button class="star ${fav ? 'on' : ''}" data-act="fav" data-id="${g.id}" aria-label="Star">${fav ? '★' : '☆'}</button>`}</div>`;
  }
  const QUICK = [
    { id: 'q-high', n: 'Points every round', s: 'rounds', win: 'high', quick: 1, r: 'Highest total wins · set a target if you like' },
    { id: 'q-low', n: 'Points every round, low wins', s: 'rounds', win: 'low', quick: 1, r: 'Lowest total wins' },
    { id: 'q-winner', n: 'Round winner scores', s: 'winner', win: 'high', quick: 1, r: 'Pick who won the round and their points' },
    { id: 'q-counter', n: 'Counter', s: 'counter', win: 'high', steps: [1, 5, 10], quick: 1, r: 'Big plus and minus buttons' },
    { id: 'q-final', n: 'Final scores only', s: 'sheet', win: 'high', cats: [{ n: 'Final score' }], quick: 1, r: 'Type everyone\'s score at the end' },
    { id: 'q-wins', n: 'Just who won', s: 'wins', win: 'high', quick: 1, r: 'Tap the winner of each game' }
  ];
  QUICK.forEach(q => { q.c = 'mine'; q.g = 'Quick score'; });
  const findAny = id => findDef(id) || QUICK.find(q => q.id === id);

  // ───────── SETUP ─────────
  let setup = null;
  function openSetup(id, keepSel) {
    const d = findAny(id); if (!d) return;
    const last = S.history.find(h => h.def === id);
    const sel = keepSel || (last ? last.seats.flatMap(s => s.members || [s.id]).filter(player) : []);
    setup = { id, sel, win: d.win, target: d.target ?? null, rounds: d.rounds ?? null, start: d.start, laps: d.laps, teams: d.teams ? 2 : 0, dealer: true, first: null };
    go('setup');
  }
  function vSetup() {
    const d = findAny(setup.id), c = d;
    const note = S.notes[d.id] || '';
    const isRounds = ['rounds', 'winner', 'calc'].includes(c.s);
    const opt = [];
    if (c.s !== 'wins' && c.s !== 'counter' && !c.phase) opt.push(`<div class="opt"><span>Who wins</span><div class="seg sm"><button data-act="win" data-v="high" class="${setup.win !== 'low' ? 'on' : ''}">Highest</button><button data-act="win" data-v="low" class="${setup.win === 'low' ? 'on' : ''}">Lowest</button></div></div>`);
    if ((isRounds && !c.phase) || c.s === 'counter') opt.push(`<div class="opt"><label for="o-target">${c.s === 'counter' && (c.start || 0) > (c.target ?? 1e9) ? 'Count down to' : 'Play to'}</label><input id="o-target" class="num" inputmode="numeric" placeholder="${c.tby ? 'by players' : 'no limit'}" value="${setup.target ?? ''}"></div>`);
    if (isRounds && c.rounds !== 'wizard' && !c.phase) opt.push(`<div class="opt"><label for="o-rounds">Number of rounds</label><input id="o-rounds" class="num" inputmode="numeric" placeholder="no limit" value="${setup.rounds ?? ''}"></div>`);
    if (c.laps) opt.push(`<div class="opt"><label for="o-laps">Laps to finish</label><input id="o-laps" class="num" inputmode="numeric" value="${setup.laps ?? c.laps}"></div>`);
    if (c.s === 'counter' && !c.lapsOnly) opt.push(`<div class="opt"><label for="o-start">Everyone starts at</label><input id="o-start" class="num" inputmode="numeric" value="${setup.start ?? 0}"></div>`);
    if (c.s !== 'sheet' && c.s !== 'wins' && c.s !== 'counter') opt.push(`<div class="opt"><span>Track the dealer</span><button class="tog ${setup.dealer ? 'on' : ''}" data-act="dealer" aria-label="Track the dealer"><i></i></button></div>`);
    if (c.teams || setup.teams) opt.push(`<div class="opt"><span>Teams</span><div class="seg sm">${[0, 2, 3].map(n => `<button data-act="teams" data-v="${n}" class="${setup.teams === n ? 'on' : ''}">${n ? n + ' teams' : 'No teams'}</button>`).join('')}</div></div>`);
    else if (c.s !== 'sheet') opt.push(`<div class="opt"><span>Teams</span><div class="seg sm">${[0, 2, 3].map(n => `<button data-act="teams" data-v="${n}" class="${setup.teams === n ? 'on' : ''}">${n ? n + ' teams' : 'No teams'}</button>`).join('')}</div></div>`);

    const chosen = setup.sel.map(player).filter(Boolean);
    const seats = seatsFromSetup();
    const mine = S.custom.some(x => x.id === d.id);
    return topbar(d.n, c.lapsOnly ? 'Laps' : styleName[c.s], back('games'), mine ? `<button class="ico" data-act="editgame" data-id="${d.id}" aria-label="Edit game">✎</button>` : '') +
      `<main class="body">
        ${c.jr || c.parent ? `<div class="seg jrseg"><button data-act="junior" data-id="${c.parent || c.id}" class="${c.parent ? '' : 'on'}">Regular</button><button data-act="junior" data-id="${c.jr || c.id}" class="${c.parent ? 'on' : ''}">⭐ Junior</button></div>` : ''}
        <div class="card rule">${c.parent ? `<b>${esc(c.n)}</b>` : ''}<span>${esc(c.r || '')}</span>${c.s === 'calc' && CALC_INFO[c.calc].hint ? `<span class="muted">${esc(CALC_INFO[c.calc].hint)}</span>` : ''}</div>
        ${hasRules(c, d.id) ? `<button class="btn ghost" data-act="rules" data-id="${d.id}">📖 How to play</button>` : ''}
        <div class="lbl">Who's playing? <span class="muted">tap in seat order</span></div>
        <div class="ppl pick">${S.players.map(p => { const i = setup.sel.indexOf(p.id); return `<button class="pp ${i >= 0 ? 'sel' : ''}" data-act="seat" data-id="${p.id}">${av(p)}${esc(p.name)}${i >= 0 ? `<b class="ord">${i + 1}</b>` : ''}</button>`; }).join('')}
          <button class="pp add" data-act="addplayer" data-seat="1">+ New player</button></div>
        ${setup.teams ? `<div class="teams">${seats.map(t => `<div class="team" style="--tc:${t.color}"><b>${esc(t.name)}</b><span>${t.members.length ? t.members.map(m => esc(player(m).name)).join(', ') : 'no players picked'}</span></div>`).join('')}</div><p class="muted small">Teams alternate around the table: seats 1, 3, 5 are one team.</p>` : ''}
        ${opt.length ? `<div class="opts">${opt.join('')}</div>` : ''}
        ${seats.length > 1 && c.s !== 'sheet' && c.s !== 'wins' ? `<button class="btn ghost" data-act="first">🎲 Who goes first?${setup.first != null && seats[setup.first] ? ` <b>${esc(seats[setup.first].name)}</b>` : ''}</button>` : ''}
        <div class="lbl">House rules</div>
        <textarea id="o-note" class="note" rows="2" placeholder="Anything your family does differently">${esc(note)}</textarea>
        <button class="btn primary big" data-act="start" ${chosen.length || setup.teams ? '' : 'disabled'}>Start ${esc(d.n)}</button>
        ${!chosen.length && !setup.teams ? '<p class="muted small center">Pick at least one player to start.</p>' : ''}
      </main>`;
  }
  function seatsFromSetup() {
    const ps = setup.sel.map(player).filter(Boolean);
    if (!setup.teams) return ps.map(p => ({ id: p.id, name: p.name, color: p.color }));
    const n = setup.teams, teams = [];
    for (let i = 0; i < n; i++) teams.push({ id: 'T' + i, members: [], color: COLORS[[1, 0, 2][i]] });
    ps.forEach((p, i) => teams[i % n].members.push(p.id));
    const fallback = n === 2 ? ['Us', 'Them'] : ['Team 1', 'Team 2', 'Team 3'];
    teams.forEach((t, i) => { t.name = t.members.length ? t.members.map(m => player(m).name).join(' & ') : fallback[i]; });
    return teams;
  }
  function readSetupInputs() {
    const num = id => { const el = $(id); if (!el) return undefined; const v = el.value.trim().replace(/[, ]/g, ''); return v === '' ? null : (isNaN(+v) ? null : +v); };
    const t = num('#o-target'); if (t !== undefined) setup.target = t;
    const r = num('#o-rounds'); if (r !== undefined) setup.rounds = r;
    const s = num('#o-start'); if (s !== undefined) setup.start = s ?? 0;
    const lp = num('#o-laps'); if (lp !== undefined) setup.laps = lp && lp > 0 ? Math.round(lp) : null;
    const n = $('#o-note'); if (n) { const d = findAny(setup.id); if (n.value.trim()) S.notes[d.id] = n.value.trim(); else delete S.notes[d.id]; save(); }
  }

  // ───────── PLAY ─────────
  function vPlay() {
    const g = game(V.id); if (!g) { V = { name: 'home' }; return vHome(); }
    const r = compute(g), c = g.cfg, t = targetOf(g);
    let sub = styleName[c.s];
    if (['rounds', 'winner', 'calc'].includes(c.s)) { const n = roundCount(g); sub = (t != null ? (c.win === 'low' ? 'Ends at ' : 'First to ') + fmt(t) + ' · ' : n ? n + ' rounds · ' : '') + roundLabel(g, g.rounds.length).toLowerCase(); }
    if (c.s === 'counter') sub = t != null ? ((c.start || 0) > t ? 'Down to ' : 'First to ') + fmt(t) + (c.exact ? ' exactly' : '') : c.loseAt != null ? 'Out at ' + fmt(c.loseAt) : 'Highest wins';
    if (c.s === 'wins') sub = plural(g.wlog.length, 'game') + ' played';
    if (c.s === 'sheet') sub = c.win === 'low' ? 'Lowest total wins' : 'Highest total wins';
    if (c.phase) sub = 'Phase 10 · ' + roundLabel(g, g.rounds.length).toLowerCase();
    if (c.laps) sub = plural(c.laps, 'lap') + ' · ' + sub;
    const head = topbar(c.n, sub, back(), `<button class="ico" data-act="undo" aria-label="Undo">↶</button><button class="ico" data-act="menu" aria-label="Game menu">⋯</button>`);
    let body;
    if (['rounds', 'winner', 'calc'].includes(c.s)) body = playGrid(g, r);
    else if (c.s === 'sheet') body = playSheet(g, r);
    else if (c.s === 'counter') body = playCounter(g, r);
    else body = playWins(g, r);
    return head + (c.laps ? lapBar(g, r) : '') + body;
  }
  function lapBar(g, r) {
    const n = g.cfg.laps;
    return `<div class="lapbar"><div class="lbl">Laps · ${n} to finish</div><div class="laps">${g.seats.map(s => {
      const v = r.laps[s.id];
      return `<div class="lap" style="--pc:${s.color}">${av(s, 22)}<span class="ln">${esc(s.name)}</span><span class="lpips">${Array.from({ length: Math.min(n, 12) }, (_, i) => `<i class="${i < v ? 'on' : ''}"></i>`).join('')}</span><b>${v}/${n}</b>
        <button class="lm" data-act="lap" data-id="${s.id}" data-d="-1" aria-label="Take back a lap">−</button><button class="lp" data-act="lap" data-id="${s.id}" data-d="1">+1 lap</button></div>`; }).join('')}</div></div>`;
  }
  const crown = '<span class="crown">♛</span>';
  function seatHead(g, s, i, r) {
    const dealerIdx = g.trackDealer ? (g.dealer + g.rounds.length) % g.seats.length : -1;
    const lead = r.leaders.includes(s.id) && (g.rounds.length || g.cfg.s === 'sheet');
    return `<th class="${lead ? 'lead' : ''}" data-act="seatmenu" data-id="${s.id}">${av(s, 26)}<span class="nm">${esc(s.name)}</span>${lead ? crown : ''}${i === dealerIdx ? '<span class="dealer" title="Dealer">D</span>' : ''}${g.cfg.phase ? `<span class="phase">${r.phases[s.id] >= 10 ? 'All 10 ✓' : 'Phase ' + (r.phases[s.id] + 1)}</span>` : ''}</th>`;
  }
  function playGrid(g, r) {
    const c = g.cfg, ids = g.seats.map(s => s.id), t = targetOf(g);
    const rows = g.rounds.map((rd, i) => `<tr data-act="editround" data-i="${i}"><td class="r">${esc(c.names ? c.names[i] || i + 1 : i + 1)}</td>${ids.map(id => {
      const v = r.rows[i][id]; const lead = r.leaders.includes(id);
      const mark = c.phase && rd.ph && rd.ph[id] ? '<i class="ph">✓</i>' : '';
      const won = c.s === 'winner' ? rd.w === id : false;
      return `<td class="${lead ? 'lead' : ''} ${v === 0 && !won ? 'z' : ''} ${v < 0 ? 'neg' : ''}">${v === 0 && !won && c.s === 'winner' ? '–' : fmt(v)}${mark}</td>`;
    }).join('')}</tr>`).join('');
    const empty = !g.rounds.length ? `<tr><td colspan="${ids.length + 1}" class="emptyrow">Tap <b>+ ${esc(roundLabel(g, 0))}</b> when the first round is done.</td></tr>` : '';
    const wins = g.rounds.length ? `<tr class="rw"><td class="r">won</td>${ids.map(id => `<td>${r.roundWins[id] || ''}</td>`).join('')}</tr>` : '';
    const bags = r.bags ? `<tr class="rw"><td class="r">bags</td>${ids.map(id => `<td>${r.bags[id]}</td>`).join('')}</tr>` : '';
    let race = '';
    if (t != null && g.rounds.length) {
      const order = ids.slice().sort((a, b) => r.totals[b] - r.totals[a]);
      race = `<div class="lbl">${c.win === 'low' ? 'Closest to ' + fmt(t) + ' (that ends it)' : 'Race to ' + fmt(t)}</div><div class="prog">${order.map(id => { const s = g.seats.find(x => x.id === id); return `<div class="pr"><span>${esc(s.name)}</span><span class="trk"><i style="width:${Math.max(0, Math.min(100, r.totals[id] / t * 100))}%;background:${s.color}"></i></span><span>${fmt(r.totals[id])}</span></div>`; }).join('')}</div>`;
    }
    const n = roundCount(g);
    const next = r.over ? `<button class="fab" data-act="over">See who won</button>` : `<button class="fab" data-act="addround">+ ${esc(roundLabel(g, g.rounds.length))}${n ? ` <small>of ${n}</small>` : ''}</button>`;
    return `<main class="body grid"><div class="tablewrap"><table class="sheet"><thead><tr><th></th>${g.seats.map((s, i) => seatHead(g, s, i, r)).join('')}</tr></thead>
      <tbody>${rows}${empty}</tbody><tfoot>${bags}${wins}<tr class="tot"><td class="r">total</td>${ids.map(id => `<td class="${r.leaders.includes(id) && g.rounds.length ? 'lead' : ''}">${fmt(r.totals[id])}</td>`).join('')}</tr></tfoot></table></div>
      ${race}${note(g)}</main>${next}`;
  }
  function note(g) { const n = S.notes[g.def]; return n ? `<div class="card housenote"><b>House rules</b>${esc(n)}</div>` : ''; }
  function playSheet(g, r) {
    const c = g.cfg, ids = g.seats.map(s => s.id);
    const row = (cat, ci) => `<tr><td class="c">${esc(cat.n)}${cat.h ? `<small>${esc(cat.h)}</small>` : ''}</td>${ids.map(id => {
      const raw = (g.cells[ci] || {})[id]; const has = raw != null && raw !== '';
      const v = catScore(cat, raw);
      const sub = has && (cat.tri || cat.div || cat.mult) ? `<small>${raw}${cat.tri ? ' marks' : cat.div ? ' coins' : '×'}</small>` : '';
      return `<td class="cell ${has ? '' : 'blank'} ${v < 0 ? 'neg' : ''} ${r.leaders.includes(id) ? 'lead' : ''}" data-act="cell" data-ci="${ci}" data-id="${id}">${has ? fmt(v) : '·'}${sub}</td>`;
    }).join('')}</tr>`;
    let body = '';
    const upIdx = c.cats.findIndex(x => !x.upper);
    c.cats.forEach((cat, ci) => {
      if ((c.special === 'yahtzee' || c.special === 'yatzy') && ci === upIdx) {
        const need = 63, bonus = c.special === 'yahtzee' ? 35 : 50;
        body += `<tr class="sub"><td class="c">Upper total<small>${need}+ earns ${bonus}</small></td>${ids.map(id => `<td class="${r.leaders.includes(id) ? 'lead' : ''}">${r.upper[id]}${r.upper[id] >= need ? ` <b class="ok">+${bonus}</b>` : `<small>${need - r.upper[id]} to go</small>`}</td>`).join('')}</tr>`;
      }
      body += row(cat, ci);
    });
    const filled = c.cats.length * ids.length, done = c.cats.reduce((a, _, ci) => a + ids.filter(id => (g.cells[ci] || {})[id] != null && (g.cells[ci] || {})[id] !== '').length, 0);
    return `<main class="body grid"><div class="tablewrap"><table class="sheet cat"><thead><tr><th class="c"></th>${g.seats.map((s, i) => seatHead(g, s, i, r)).join('')}</tr></thead>
      <tbody>${body}</tbody><tfoot><tr class="tot"><td class="c">Total</td>${ids.map(id => `<td class="${r.leaders.includes(id) && done ? 'lead' : ''}">${fmt(r.totals[id])}</td>`).join('')}</tr></tfoot></table></div>
      <p class="muted small center">${done} of ${filled} boxes filled · tap any box to score it</p>${note(g)}</main>
      <button class="fab" data-act="over">Finish game</button>`;
  }
  function playCounter(g, r) {
    const c = g.cfg, steps = c.steps || [1, 5, 10], t = targetOf(g);
    const st = V.step && steps.includes(V.step) ? V.step : steps[0];
    return `<main class="body">
      <div class="steps"><span class="muted small">Step</span>${steps.map(s => `<button data-act="step" data-v="${s}" class="${s === st ? 'on' : ''}">${s}</button>`).join('')}</div>
      <div class="counters n${Math.min(g.seats.length, 6)}">${g.seats.map(s => {
        const v = g.cnt[s.id], out = r.out[s.id], lead = r.leaders.includes(s.id) && g.seats.length > 1;
        const pct = t != null ? Math.max(0, Math.min(100, ((c.start || 0) > t ? ((c.start || 0) - v) / ((c.start || 0) - t) : (v - (c.start || 0)) / (t - (c.start || 0))) * 100)) : null;
        return `<div class="ctr ${out ? 'out' : ''}" style="--pc:${s.color}">
          <div class="cn">${av(s, 22)}<span>${esc(s.name)}</span>${lead ? crown : ''}${out ? '<span class="outtag">out</span>' : ''}</div>
          <button class="cv" data-act="cntpad" data-id="${s.id}">${fmt(v)}<small>${esc(c.unit || 'points')}</small></button>
          ${pct != null ? `<span class="trk"><i style="width:${pct}%;background:${s.color}"></i></span>` : ''}
          <div class="cb"><button data-act="cnt" data-id="${s.id}" data-d="${-st}">−${st}</button><button data-act="cnt" data-id="${s.id}" data-d="${st}">+${st}</button></div>
        </div>`; }).join('')}</div>
      ${g.log && g.log.length ? `<div class="lbl">Last moves</div><div class="log">${g.log.slice(-6).reverse().map(l => { const s = g.seats.find(x => x.id === l.id) || {}; return `<span><b style="color:${s.color}">${esc(s.name)}</b> ${l.d > 0 ? '+' : '−'}${fmt(Math.abs(l.d))}${l.bust ? ' (bust)' : ''}</span>`; }).join('')}</div>` : ''}
      ${note(g)}
    </main><button class="fab ghostfab" data-act="over">Finish game</button>`;
  }
  function playWins(g, r) {
    const total = g.wlog.length, mx = Math.max(1, ...g.seats.map(s => r.totals[s.id]));
    return `<main class="body">
      <p class="muted center">Tap whoever won the game.</p>
      <div class="wins">${g.seats.map(s => `<button class="wt" data-act="won" data-id="${s.id}" style="--pc:${s.color}">${av(s, 34)}<span class="wn">${esc(s.name)}</span><span class="wc">${r.totals[s.id]}</span><span class="wl">${r.leaders.includes(s.id) ? crown + ' ' : ''}${total ? Math.round(r.totals[s.id] / total * 100) + '%' : 'wins'}</span></button>`).join('')}</div>
      ${total ? `<div class="lbl">Tonight</div><div class="prog">${g.seats.slice().sort((a, b) => r.totals[b.id] - r.totals[a.id]).map(s => `<div class="pr"><span>${esc(s.name)}</span><span class="trk"><i style="width:${r.totals[s.id] / mx * 100}%;background:${s.color}"></i></span><span>${r.totals[s.id]}</span></div>`).join('')}</div>` : ''}
      <button class="btn ghost" data-act="pickfirst">🎲 Who goes first?</button>
      ${note(g)}
    </main><button class="fab ghostfab" data-act="over">Done for tonight</button>`;
  }

  // ───────── sheets (bottom panels) ─────────
  let SH = null;
  function openSheet(o) { SH = o; drawSheet(); }
  function closeSheet() { SH = null; const el = $('#sheet'); if (el) el.hidden = true; }
  function drawSheet() {
    const el = $('#sheet'); if (!SH) { el.hidden = true; return; }
    el.hidden = false;
    el.querySelector('.panel').innerHTML = `<div class="grab"></div>` + SH.draw();
  }

  // Expression pad: "20+20+50" style entry so you can count a hand card by card.
  const padVal = e => { if (!e || !e.s) return null; const parts = e.s.split('+').filter(x => x !== ''); if (!parts.length) return null; const v = sum(parts.map(Number)); return e.neg ? -v : v; };
  function padKeys(okLabel) {
    return `<div class="keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<button data-pad="${k}">${k}</button>`).join('')}
      <button data-pad="neg">±</button><button data-pad="0">0</button><button data-pad="back" aria-label="Delete">⌫</button>
      <button data-pad="plus" class="plus">+ add</button><button data-pad="ok" class="ok">${okLabel}</button></div>`;
  }
  function padShow(e, label) {
    const v = padVal(e);
    return `<div class="entry"><small>${label || ''}</small><span>${e && e.s ? (e.neg ? '−(' : '') + esc(e.s.replace(/\+/g, ' + ')) + (e.neg ? ')' : '') : '<i>0</i>'}</span>${e && e.s && e.s.includes('+') ? `<em>= ${fmt(v)}</em>` : ''}</div>`;
  }
  function padPress(e, k) {
    if (k === 'back') { e.tail = false; e.s = (e.s || '').slice(0, -1); return; }
    if (k === 'neg') { e.neg = !e.neg; return; }
    if (k === 'plus') { if (e.s && !e.s.endsWith('+')) e.s += '+'; return; }
    if (/^\d$/.test(k) && e.tail) { e.s += '+'; e.tail = false; }
    if (/^\d$/.test(k)) { const parts = (e.s || '').split('+'); if (parts[parts.length - 1].length >= 7) return; e.s = (e.s || '') + k; }
  }
  const chip = (q, i) => `<button data-chip="${i}">${esc(q[0])} <b>${q[1] > 0 ? '+' : ''}${q[1]}</b></button>`;
  function addChip(e, v) { if (v < 0 && !(e.s)) { e.neg = true; e.s = String(-v); e.tail = true; return; } e.s = (e.s && !e.s.endsWith('+') ? e.s + '+' : (e.s || '')) + Math.abs(v); e.tail = true; }

  // Round entry for 'rounds' style
  function roundSheet(g, ri, focus) {
    const c = g.cfg, ids = g.seats.map(s => s.id), editing = ri != null, rd = editing ? g.rounds[ri] : null;
    const E = { cur: focus ? ids.indexOf(focus) : 0, vals: {}, ph: Object.assign({}, rd && rd.ph || {}) };
    ids.forEach(id => { const v = rd ? rd.v[id] : null; E.vals[id] = v != null && v !== 0 ? { s: String(Math.abs(v)), neg: v < 0 } : { s: rd ? '0' : '', neg: false }; });
    if (E.cur < 0) E.cur = 0;
    const saveIt = () => {
      snap(g);
      const v = {}; ids.forEach(id => v[id] = padVal(E.vals[id]) || 0);
      const nr = { v, ph: c.phase ? E.ph : undefined };
      if (editing) g.rounds[ri] = nr; else g.rounds.push(nr);
      g.updated = Date.now(); save(); closeSheet(); render(); checkOver(g);
    };
    openSheet({
      E, draw: () => {
        const cur = ids[E.cur], s = g.seats[E.cur];
        return `<div class="sh-h"><b>${esc(roundLabel(g, editing ? ri : g.rounds.length))}</b>${editing ? `<button class="link danger" data-sh="del">Delete round</button>` : ''}<button class="ico" data-sh="close" aria-label="Close">✕</button></div>
          <div class="who list">${g.seats.map((p, i) => { const v = padVal(E.vals[p.id]); return `<button class="${i === E.cur ? 'sel' : ''}" data-sh="sel" data-i="${i}" style="--pc:${p.color}">${av(p, 20)}<span>${esc(p.name)}</span><b>${v == null ? '–' : fmt(v)}</b>${c.phase ? `<span class="phx ${E.ph[p.id] ? 'on' : ''}" data-sh="ph" data-id="${p.id}">${E.ph[p.id] ? '✓ phase' : 'phase?'}</span>` : ''}</button>`; }).join('')}</div>
          ${padShow(E.vals[cur], esc(s.name) + (c.phase ? ' · points left in hand' : ''))}
          ${c.q ? `<div class="quick">${c.q.map(chip).join('')}</div>` : ''}
          ${padKeys(E.cur < ids.length - 1 ? 'Next ›' : 'Save')}
          ${E.cur < ids.length - 1 ? `<button class="btn primary wide" data-sh="save">Save round</button>` : ''}`;
      },
      on: (k, el) => {
        const cur = ids[E.cur];
        if (k === 'sel') E.cur = +el.dataset.i;
        else if (k === 'ph') { E.ph[el.dataset.id] = !E.ph[el.dataset.id]; }
        else if (k === 'save') return saveIt();
        else if (k === 'del') return confirmBox('Delete this round?', 'Delete', () => { snap(g); g.rounds.splice(ri, 1); save(); render(); });
        else if (k === 'ok') { if (E.cur < ids.length - 1) E.cur++; else return saveIt(); }
        else if (k === 'chip') addChip(E.vals[cur], c.q[+el.dataset.chip][1]);
        else padPress(E.vals[cur], k);
        drawSheet();
      }
    });
  }
  // Round entry for 'winner' style
  function winnerSheet(g, ri) {
    const c = g.cfg, editing = ri != null, rd = editing ? g.rounds[ri] : null;
    const E = { w: rd ? rd.w : null, e: rd && rd.w ? { s: String(rd.v[rd.w] || ''), neg: false } : { s: '', neg: false } };
    const saveIt = () => {
      if (!E.w) { toast('Tap who went out first'); return; }
      snap(g); const v = {}; v[E.w] = padVal(E.e) || 0;
      const nr = { w: E.w, v }; if (editing) g.rounds[ri] = nr; else g.rounds.push(nr);
      g.updated = Date.now(); save(); closeSheet(); render(); checkOver(g);
    };
    openSheet({
      draw: () => `<div class="sh-h"><b>${esc(roundLabel(g, editing ? ri : g.rounds.length))} · ${esc(c.wq || 'Who went out?')}</b>${editing ? `<button class="link danger" data-sh="del">Delete</button>` : ''}<button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        <div class="who">${g.seats.map(p => `<button class="${E.w === p.id ? 'sel' : ''}" data-sh="w" data-id="${p.id}" style="--pc:${p.color}">${av(p, 24)}<span>${esc(p.name)}</span></button>`).join('')}</div>
        ${padShow(E.e, c.wl || 'Cards left in everyone else\'s hands')}
        ${c.q ? `<div class="quick">${c.q.map(chip).join('')}</div>` : ''}
        ${padKeys('Save')}`,
      on: (k, el) => {
        if (k === 'w') E.w = el.dataset.id;
        else if (k === 'ok') return saveIt();
        else if (k === 'del') return confirmBox('Delete this round?', 'Delete', () => { snap(g); g.rounds.splice(ri, 1); save(); render(); });
        else if (k === 'chip') addChip(E.e, c.q[+el.dataset.chip][1]);
        else padPress(E.e, k);
        drawSheet();
      }
    });
  }
  // Round entry for bid-and-tricks games
  function calcSheet(g, ri) {
    const c = g.cfg, ids = g.seats.map(s => s.id), editing = ri != null, rd = editing ? g.rounds[ri] : null;
    const n = (editing ? ri : g.rounds.length) + 1;
    const cards = c.names ? parseInt(c.names[n - 1]) : (c.rl === 'cards' ? n : null);
    const M = {}; ids.forEach(id => M[id] = Object.assign({ b: 0, t: 0, x: 0 }, rd && rd.m && rd.m[id] || {}));
    const info = CALC_INFO[c.calc];
    const prevBags = () => { const tmp = Object.assign({}, g, { rounds: g.rounds.slice(0, editing ? ri : g.rounds.length) }); const r = compute(tmp); return r.bags || {}; };
    const pb = prevBags();
    const preview = id => { const st = { bags: pb[id] || 0 }; return CALC[c.calc](M[id], st, n); };
    const saveIt = () => {
      snap(g); const nr = { m: JSON.parse(JSON.stringify(M)), v: {} };
      if (editing) g.rounds[ri] = nr; else g.rounds.push(nr);
      g.updated = Date.now(); save(); closeSheet(); render(); checkOver(g);
    };
    const stepper = (id, k, lbl, step = 1) => `<div class="stp"><span>${lbl}</span><button data-sh="dec" data-id="${id}" data-k="${k}" data-s="${step}">−</button><b>${M[id][k]}</b><button data-sh="inc" data-id="${id}" data-k="${k}" data-s="${step}">+</button></div>`;
    openSheet({
      draw: () => {
        const tricks = sum(ids.map(id => M[id].t)), bids = sum(ids.map(id => M[id].b));
        return `<div class="sh-h"><b>${esc(roundLabel(g, n - 1))}</b>${editing ? `<button class="link danger" data-sh="del">Delete</button>` : ''}<button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        <p class="muted small">Bids ${bids}${cards ? ' of ' + cards : ''} · tricks taken ${tricks}${cards ? ' of ' + cards : ''}${info.hint ? ' · ' + esc(info.hint) : ''}</p>
        <div class="calcs">${g.seats.map(s => { const p = preview(s.id); return `<div class="calc" style="--pc:${s.color}"><div class="cn">${av(s, 20)}<span>${esc(s.name)}</span><b class="${p < 0 ? 'neg' : ''}">${p > 0 ? '+' : ''}${fmt(p)}</b></div>
          ${stepper(s.id, 'b', 'Bid')}${stepper(s.id, 't', 'Took')}${info.bonus ? stepper(s.id, 'x', 'Bonus', c.calc === 'rage' ? 5 : 10) : ''}</div>`; }).join('')}</div>
        <button class="btn primary wide" data-sh="save">Save ${esc(roundLabel(g, n - 1).toLowerCase())}</button>`;
      },
      on: (k, el) => {
        if (k === 'inc' || k === 'dec') { const m = M[el.dataset.id], key = el.dataset.k, s = +el.dataset.s; m[key] += k === 'inc' ? s : -s; if (key !== 'x' && m[key] < 0) m[key] = 0; }
        else if (k === 'save') return saveIt();
        else if (k === 'del') return confirmBox('Delete this round?', 'Delete', () => { snap(g); g.rounds.splice(ri, 1); save(); render(); });
        drawSheet();
      }
    });
  }
  // Score-sheet box
  function cellSheet(g, ci, id) {
    const c = g.cfg, cat = c.cats[ci], s = g.seats.find(x => x.id === id);
    const raw = (g.cells[ci] || {})[id];
    const E = { s: raw != null && raw !== '' ? String(Math.abs(raw)) : '', neg: raw < 0 };
    const conv = cat.tri || cat.div || cat.mult;
    const saveIt = clear => {
      snap(g); g.cells[ci] = g.cells[ci] || {};
      const v = padVal(E); if (clear || v == null) delete g.cells[ci][id]; else g.cells[ci][id] = v;
      g.updated = Date.now(); save(); closeSheet(); render();
      // jump to the next empty box for the same player
      if (!clear && c.cats.every((_, k) => g.seats.every(p => (g.cells[k] || {})[p.id] != null))) setTimeout(() => showOver(g), 150);
    };
    openSheet({
      draw: () => {
        const v = padVal(E);
        return `<div class="sh-h"><b>${esc(cat.n)} · ${esc(s.name)}</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        ${cat.h ? `<p class="muted small">${esc(cat.h)}</p>` : ''}
        ${padShow(E, conv && v != null ? '= ' + fmt(catScore(cat, v)) + ' points' : cat.neg ? 'counts as minus' : '')}
        ${cat.chips ? `<div class="quick">${cat.chips.map(chip).join('')}</div>` : ''}
        ${padKeys('Save')}
        ${raw != null ? `<button class="link wide" data-sh="clear">Clear this box</button>` : ''}`;
      },
      on: (k, el) => {
        if (k === 'ok') return saveIt();
        if (k === 'clear') return saveIt(true);
        if (k === 'chip') { const q = cat.chips[+el.dataset.chip]; if (cat.sum) addChip(E, q[1]); else { E.s = String(q[1]); E.neg = false; } }
        else padPress(E, k);
        drawSheet();
      }
    });
  }
  // Counter: type an amount
  function counterPad(g, id) {
    const s = g.seats.find(x => x.id === id), E = { s: '', neg: false };
    openSheet({
      draw: () => `<div class="sh-h"><b>${esc(s.name)} · ${fmt(g.cnt[id])}</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        ${padShow(E, 'Amount')}
        <div class="keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => `<button data-pad="${k}">${k}</button>`).join('')}<button data-pad="plus" class="plus">+ add</button><button data-pad="0">0</button><button data-pad="back">⌫</button></div>
        <div class="two"><button class="btn" data-sh="sub">− Subtract</button><button class="btn primary" data-sh="add">+ Add</button></div>
        <button class="link wide" data-sh="set">Set to exactly this</button>`,
      on: (k) => {
        const v = padVal(E);
        if ((k === 'add' || k === 'sub' || k === 'set') && v == null) { toast('Type an amount first'); return; }
        if (k === 'add') { closeSheet(); return bump(g, id, v); }
        if (k === 'sub') { closeSheet(); return bump(g, id, -v); }
        if (k === 'set') { closeSheet(); return bump(g, id, v - g.cnt[id]); }
        padPress(E, k); drawSheet();
      }
    });
  }
  function bump(g, id, d) {
    const c = g.cfg, t = targetOf(g); snap(g);
    let nv = g.cnt[id] + d, bust = false;
    if (c.exact && t != null) {
      const down = (c.start || 0) > t;
      if (down ? nv < t : nv > t) { bust = true; nv = c.bust === 'revert' ? g.cnt[id] : c.bust; }
    }
    g.log = g.log || []; g.log.push({ id, d, bust }); if (g.log.length > 60) g.log.shift();
    g.cnt[id] = nv; g.updated = Date.now(); save(); render();
    if (bust) toast(c.bust === 'revert' ? 'Bust! That turn doesn\'t count' : 'Over ' + t + '! Back to ' + c.bust);
    checkOver(g);
  }

  function checkOver(g) { const r = compute(g); if (r.over) setTimeout(() => showOver(g), 200); }
  function showOver(g) {
    g = game(g.id); if (!g) return;
    const r = compute(g), c = g.cfg;
    const order = g.seats.slice().sort((a, b) => c.s === 'counter' && r.out[a.id] !== r.out[b.id] ? (r.out[a.id] ? 1 : -1) : (c.win === 'low' ? r.totals[a.id] - r.totals[b.id] : r.totals[b.id] - r.totals[a.id]));
    const W = r.winners.map(id => g.seats.find(s => s.id === id)).filter(Boolean);
    const title = c.s === 'wins' ? 'Tonight\'s results' : !W.length ? 'No winner yet' : W.length > 1 ? 'It\'s a tie!' : W[0].name + ' wins';
    openSheet({
      draw: () => `<div class="win">${W.length ? `<div class="avs">${W.map(s => av(s, 52)).join('')}</div>` : ''}<div class="wn">${esc(title)}</div><div class="ws">${esc(c.n)}${r.over && r.why ? ' · ' + esc(r.why) : ''}${['rounds', 'winner', 'calc'].includes(c.s) ? ' · ' + plural(g.rounds.length, 'round') : ''}</div></div>
        <div class="places">${order.map((s, i) => `<div class="place"><span>${i + 1} · ${av(s, 18)} <b>${esc(s.name)}</b>${r.out[s.id] ? ' <span class="muted">out</span>' : ''}</span><span>${c.s === 'wins' ? plural(r.totals[s.id], 'win') : fmt(r.totals[s.id])}${r.roundWins[s.id] && ['rounds', 'winner', 'calc'].includes(c.s) ? `<small> · ${plural(r.roundWins[s.id], 'round')} won</small>` : ''}</span></div>`).join('')}</div>
        ${recordBars(g)}
        <div class="three"><button class="btn primary" data-sh="rematch">Rematch</button><button class="btn" data-sh="done">Save & finish</button><button class="btn ghost" data-sh="keep">Keep playing</button></div>`,
      on: k => {
        if (k === 'rematch') { closeSheet(); finishGame(g, 'rematch'); toast('Saved · new game started'); }
        else if (k === 'done') { closeSheet(); finishGame(g); toast('Game saved to History'); }
        else if (k === 'keep') closeSheet();
      }
    });
  }
  function recordBars(g) {
    const ids = g.seats.map(s => s.id), r = compute(g), wins = {};
    ids.forEach(id => wins[id] = 0);
    S.history.filter(h => h.def === g.def).forEach(h => {
      if (h.style === 'wins') ids.forEach(id => wins[id] += h.totals[id] || 0);
      else h.winners.forEach(id => { if (wins[id] != null) wins[id]++; });
    });
    if (g.cfg.s === 'wins') ids.forEach(id => wins[id] += r.totals[id]); else r.winners.forEach(id => wins[id]++);
    const mx = Math.max(1, ...ids.map(id => wins[id]));
    return `<div class="lbl">${esc(g.cfg.n)} wins, all time (with this game)</div><div class="prog">${g.seats.slice().sort((a, b) => wins[b.id] - wins[a.id]).map(s => `<div class="pr"><span>${esc(s.name)}</span><span class="trk"><i style="width:${wins[s.id] / mx * 100}%;background:${s.color}"></i></span><span>${wins[s.id]}</span></div>`).join('')}</div>`;
  }

  function gameMenu(g) {
    const c = g.cfg, t = targetOf(g);
    openSheet({
      draw: () => `<div class="sh-h"><b>${esc(c.n)}</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        <div class="menu">
          <button data-sh="undo">↶ Undo last change</button>
          <button data-sh="add">+ Add a player</button>
          <button data-sh="rename">✎ Rename players</button>
          ${['rounds', 'winner', 'calc', 'counter'].includes(c.s) && !c.phase ? `<button data-sh="target">◎ Change the target ${t != null ? '(now ' + fmt(t) + ')' : ''}</button>` : ''}
          ${c.s !== 'sheet' && c.s !== 'wins' ? `<button data-sh="dealer">${g.trackDealer ? 'Stop tracking the dealer' : 'Track the dealer'}</button>` : ''}
          <button data-sh="first">🎲 Who goes first?</button>
          ${hasRules(c, g.def) ? '<button data-sh="readrules">📖 How to play</button>' : ''}
          <button data-sh="rules">📝 House rules</button>
          <button data-sh="finish">⚑ Finish game now</button>
          <button data-sh="delete" class="danger">Delete this game</button>
        </div>`,
      on: k => {
        if (k === 'undo') { closeSheet(); doUndo(g); }
        else if (k === 'add') addSeat(g);
        else if (k === 'rename') renameSeats(g);
        else if (k === 'target') askNumber('Play to', t, v => { snap(g); g.target = v; save(); render(); checkOver(g); });
        else if (k === 'dealer') { g.trackDealer = !g.trackDealer; save(); closeSheet(); render(); }
        else if (k === 'first') { closeSheet(); pickFirst(g.seats, i => { if (g.trackDealer) { g.dealer = ((i - g.rounds.length) % g.seats.length + g.seats.length) % g.seats.length; save(); render(); } }); }
        else if (k === 'readrules') { closeSheet(); showRules(c, g.def); }
        else if (k === 'rules') askText('House rules for ' + c.n, S.notes[g.def] || '', v => { if (v) S.notes[g.def] = v; else delete S.notes[g.def]; save(); render(); });
        else if (k === 'finish') { closeSheet(); showOver(g); }
        else if (k === 'delete') confirmBox('Delete this game? It won\'t be saved to History.', 'Delete', () => { S.games = S.games.filter(x => x.id !== g.id); save(); go('home'); });
      }
    });
  }
  function addSeat(g) {
    const inGame = new Set(g.seats.flatMap(s => s.members || [s.id]));
    const avail = S.players.filter(p => !inGame.has(p.id));
    openSheet({
      draw: () => `<div class="sh-h"><b>Add a player</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        <p class="muted small">They start with 0 for rounds already played.</p>
        <div class="ppl pick">${avail.map(p => `<button class="pp" data-sh="p" data-id="${p.id}">${av(p)}${esc(p.name)}</button>`).join('')}</div>
        <div class="row"><input id="np" class="txt" placeholder="New player's name" autocomplete="off"><button class="btn primary" data-sh="new">Add</button></div>`,
      on: (k, el) => {
        let p;
        if (k === 'p') p = player(el.dataset.id);
        if (k === 'new') { const n = $('#np').value.trim(); if (!n) return; p = newPlayer(n); }
        if (!p) return;
        snap(g); g.seats.push({ id: p.id, name: p.name, color: p.color }); g.cnt[p.id] = g.cfg.start || 0; save(); closeSheet(); render(); toast(p.name + ' joined');
      }
    });
  }
  function renameSeats(g) {
    openSheet({
      draw: () => `<div class="sh-h"><b>Rename players</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        ${g.seats.map((s, i) => `<div class="row">${av(s, 26)}<input id="rn${i}" class="txt" value="${esc(s.name)}" autocomplete="off"><button class="ico" data-sh="rm" data-i="${i}" aria-label="Remove">✕</button></div>`).join('')}
        <button class="btn primary wide" data-sh="ok">Save names</button>`,
      on: (k, el) => {
        if (k === 'rm') { if (g.seats.length < 2) return; const s = g.seats[+el.dataset.i]; confirmBox('Take ' + s.name + ' out of this game?', 'Remove', () => { snap(g); g.seats.splice(+el.dataset.i, 1); save(); render(); }); return; }
        if (k === 'ok') { snap(g); g.seats.forEach((s, i) => { const v = $('#rn' + i).value.trim(); if (v) { s.name = v; const p = player(s.id); if (p) p.name = v; } }); save(); closeSheet(); render(); }
      }
    });
  }

  // ───────── small dialogs ─────────
  function confirmBox(msg, ok, fn) {
    openSheet({ draw: () => `<p class="ask">${esc(msg)}</p><div class="two"><button class="btn" data-sh="close">Cancel</button><button class="btn danger" data-sh="yes">${esc(ok)}</button></div>`, on: k => { if (k === 'yes') { closeSheet(); fn(); } } });
  }
  function askNumber(label, cur, fn) {
    const E = { s: cur != null ? String(Math.abs(cur)) : '', neg: cur < 0 };
    openSheet({
      draw: () => `<div class="sh-h"><b>${esc(label)}</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>${padShow(E, '')}${padKeys('Save')}<button class="link wide" data-sh="none">No limit</button>`,
      on: k => { if (k === 'ok') { closeSheet(); fn(padVal(E)); return; } if (k === 'none') { closeSheet(); fn(null); return; } padPress(E, k); drawSheet(); }
    });
  }
  function askText(label, cur, fn) {
    openSheet({
      draw: () => `<div class="sh-h"><b>${esc(label)}</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div><textarea id="at" class="note" rows="4">${esc(cur)}</textarea><button class="btn primary wide" data-sh="ok">Save</button>`,
      on: k => { if (k === 'ok') { const v = $('#at').value.trim(); closeSheet(); fn(v); } }
    });
  }
  function pickFirst(seats, cb) {
    if (seats.length < 2) return;
    let i = 0, n = 0; const total = 14 + Math.floor(Math.random() * seats.length * 2);
    openSheet({ draw: () => `<div class="spin"><div class="lbl">Who goes first?</div><div class="spinname" style="color:${seats[i].color}">${av(seats[i], 60)}<b>${esc(seats[i].name)}</b></div></div><button class="btn primary wide" data-sh="close">${n >= total ? 'OK' : '…'}</button>`, on: () => { } });
    const tick = () => { if (!SH) return; i = (i + 1) % seats.length; n++; drawSheet(); if (n < total) setTimeout(tick, 40 + n * 12); else { cb && cb(i); if (navigator.vibrate) navigator.vibrate(30); } };
    setTimeout(tick, 60);
  }
  function newPlayer(name) {
    const used = S.players.map(p => p.color);
    const color = COLORS.find(c => !used.includes(c)) || COLORS[S.players.length % COLORS.length];
    const p = { id: uid(), name: name.slice(0, 20), color }; S.players.push(p); save(); return p;
  }
  function addPlayerSheet(then) {
    openSheet({
      draw: () => `<div class="sh-h"><b>New player</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        <div class="row"><input id="np" class="txt" placeholder="Name" maxlength="20" autocomplete="off" enterkeyhint="done"><button class="btn primary" data-sh="ok">Add</button></div>
        <p class="muted small">Add as many as you like. Everyone gets their own color.</p>
        <div class="ppl">${S.players.map(p => `<span class="pp">${av(p)}${esc(p.name)}</span>`).join('')}</div>`,
      on: k => { if (k === 'ok') { const n = $('#np').value.trim(); if (!n) return; const p = newPlayer(n); then && then(p); drawSheet(); setTimeout(() => $('#np') && $('#np').focus(), 50); render(); } }
    });
    setTimeout(() => $('#np') && $('#np').focus(), 80);
  }

  // ───────── HISTORY ─────────
  function vHistory() {
    const h = S.history;
    return topbar('History', plural(h.length, 'game') + ' saved', '') + `<main class="body">
      ${h.length ? `<div class="glist">${h.map(histRow).join('')}</div>` : '<p class="empty">Finished games show up here.<br>Start one from the Play tab.</p>'}
    </main>` + tabbar();
  }
  function vPast() {
    const h = S.history.find(x => x.id === V.id); if (!h) return vHistory();
    const g = h.game, r = compute(g), c = g.cfg;
    const when = new Date(h.date).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    let table = '';
    if (['rounds', 'winner', 'calc'].includes(c.s)) table = `<div class="tablewrap"><table class="sheet"><thead><tr><th></th>${g.seats.map(s => `<th>${av(s, 24)}<span class="nm">${esc(s.name)}</span></th>`).join('')}</tr></thead><tbody>${r.rows.map((row, i) => `<tr><td class="r">${esc(c.names ? c.names[i] || i + 1 : i + 1)}</td>${g.seats.map(s => `<td class="${row[s.id] === 0 ? 'z' : ''} ${row[s.id] < 0 ? 'neg' : ''}">${fmt(row[s.id])}</td>`).join('')}</tr>`).join('')}</tbody><tfoot><tr class="tot"><td class="r">total</td>${g.seats.map(s => `<td>${fmt(r.totals[s.id])}</td>`).join('')}</tr></tfoot></table></div>`;
    else if (c.s === 'sheet') table = `<div class="tablewrap"><table class="sheet cat"><thead><tr><th></th>${g.seats.map(s => `<th>${av(s, 24)}<span class="nm">${esc(s.name)}</span></th>`).join('')}</tr></thead><tbody>${c.cats.map((cat, ci) => `<tr><td class="c">${esc(cat.n)}</td>${g.seats.map(s => `<td>${fmt(catScore(cat, (g.cells[ci] || {})[s.id]))}</td>`).join('')}</tr>`).join('')}</tbody><tfoot><tr class="tot"><td class="c">Total</td>${g.seats.map(s => `<td>${fmt(r.totals[s.id])}</td>`).join('')}</tr></tfoot></table></div>`;
    const order = g.seats.slice().sort((a, b) => c.win === 'low' && c.s !== 'wins' ? r.totals[a.id] - r.totals[b.id] : r.totals[b.id] - r.totals[a.id]);
    return topbar(h.name, esc(when), back('history')) + `<main class="body">
      <div class="places">${order.map((s, i) => `<div class="place"><span>${i + 1} · ${av(s, 18)} <b>${esc(s.name)}</b>${h.winners.includes(s.id) ? ' ' + crown : ''}</span><span>${c.s === 'wins' ? plural(r.totals[s.id], 'win') : fmt(r.totals[s.id])}</span></div>`).join('')}</div>
      ${table}
      <div class="two"><button class="btn primary" data-act="again" data-id="${h.id}">Play again</button><button class="btn danger" data-act="delhist" data-id="${h.id}">Delete</button></div>
    </main>`;
  }

  // ───────── STATS ─────────
  let statGame = 'all';
  function vStats() {
    const hs = S.history.filter(h => statGame === 'all' || h.def === statGame);
    const P = {};
    const credit = (seat, k, n) => (seat.members || [seat.id]).forEach(pid => { const p = P[pid] || (P[pid] = { played: 0, wins: 0, rounds: 0 }); p[k] += n; });
    hs.forEach(h => h.seats.forEach(s => {
      credit(s, 'played', h.played || 1);
      if (h.style === 'wins') credit(s, 'wins', h.totals[s.id] || 0); else if (h.winners.includes(s.id)) credit(s, 'wins', 1);
      credit(s, 'rounds', (h.roundWins || {})[s.id] || 0);
    }));
    const rows = Object.keys(P).map(id => ({ id, p: player(id), ...P[id] })).filter(x => x.p).sort((a, b) => b.wins - a.wins || b.played - a.played);
    const mx = Math.max(1, ...rows.map(x => x.wins));
    const played = [...new Set(S.history.map(h => h.def))].map(id => ({ id, name: (S.history.find(h => h.def === id) || {}).name }));
    const counts = {}; S.history.forEach(h => counts[h.def] = (counts[h.def] || 0) + (h.played || 1));
    const most = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 5);
    return topbar('Stats', 'Who\'s winning at your table', '') + `<main class="body">
      ${S.history.length ? `
      <select id="statgame" class="search"><option value="all">All games</option>${played.map(g => `<option value="${esc(g.id)}" ${statGame === g.id ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select>
      <div class="lbl">Wins</div>
      <div class="prog big">${rows.map(x => `<div class="pr"><span>${av(x.p, 20)} ${esc(x.p.name)}</span><span class="trk"><i style="width:${x.wins / mx * 100}%;background:${x.p.color}"></i></span><span>${x.wins}</span></div>`).join('')}</div>
      <div class="tablewrap"><table class="stats"><thead><tr><th>Player</th><th>Played</th><th>Won</th><th>Win %</th><th>Rounds won</th></tr></thead><tbody>
        ${rows.map(x => `<tr data-go="player" data-id="${x.id}"><td>${av(x.p, 18)} ${esc(x.p.name)}</td><td>${x.played}</td><td>${x.wins}</td><td>${x.played ? Math.round(x.wins / x.played * 100) : 0}%</td><td>${x.rounds}</td></tr>`).join('')}
      </tbody></table></div>
      ${statGame === 'all' ? `<div class="lbl">Most played</div><div class="glist">${most.map(id => `<button class="g" data-act="statgame" data-id="${esc(id)}"><span class="gn">${esc((S.history.find(h => h.def === id) || {}).name)}</span><span class="st">${plural(counts[id], 'game')}</span></button>`).join('')}</div>` : ''}
      ` : '<p class="empty">Finish a game and the wins start counting here.</p>'}
    </main>` + tabbar();
  }

  // ───────── PLAYER PROFILE ─────────
  // Everything here comes from saved History, so it covers games played before profiles existed.
  const ord = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
  function playerRecord(pid) {
    const results = [], sessions = [];
    // oldest first, so streaks read in the order games were played
    S.history.slice().reverse().forEach(h => {
      const seat = h.seats.find(s => s.id === pid || (s.members || []).includes(pid));
      if (!seat) return;
      const others = h.seats.filter(s => s !== seat);
      if (h.style === 'wins') {
        (h.game.wlog || []).forEach(w => results.push({ h, won: w === seat.id, beat: w === seat.id ? others : [], lost: others.filter(o => o.id === w) }));
        sessions.push({ h, seat, wins: h.totals[seat.id] || 0, of: h.played });
        return;
      }
      const win = (h.game.cfg || {}).win === 'low' ? -1 : 1, me = h.totals[seat.id];
      const place = 1 + h.seats.filter(s => s !== seat && (h.totals[s.id] - me) * win > 0).length;
      const won = h.winners.includes(seat.id);
      // finishing order decides head-to-head; winners always count as ahead
      const ahead = o => won && !h.winners.includes(o.id) ? true : !won && h.winners.includes(o.id) ? false : (me - h.totals[o.id]) * win > 0 ? true : (me - h.totals[o.id]) * win < 0 ? false : null;
      results.push({ h, won, beat: others.filter(o => ahead(o) === true), lost: others.filter(o => ahead(o) === false) });
      sessions.push({ h, seat, won, place: won ? 1 : place, of: h.seats.length, score: me, rounds: (h.roundWins || {})[seat.id] || 0, win });
    });
    return { results, sessions };
  }
  function vPlayer() {
    const p = player(V.id); if (!p) return vSettings();
    const { results, sessions } = playerRecord(p.id);
    const played = results.length, wins = results.filter(r => r.won).length;
    const rounds = sum(sessions.map(s => s.rounds || 0));
    // streaks
    let cur = 0, best = 0, run = 0;
    results.forEach(r => { run = r.won ? run + 1 : 0; best = Math.max(best, run); });
    for (let i = results.length - 1; i >= 0 && results[i].won; i--) cur++;
    // per game
    const G = {};
    results.forEach(r => { const k = r.h.def, x = G[k] || (G[k] = { name: r.h.name, played: 0, wins: 0, best: null, win: 1, scored: false }); x.played++; if (r.won) x.wins++; });
    sessions.forEach(s => { if (s.score == null || s.h.style === 'counter') return; const x = G[s.h.def]; x.scored = true; x.win = s.win; if (x.best == null || (s.score - x.best) * s.win > 0) x.best = s.score; });
    const games = Object.keys(G).map(k => Object.assign({ id: k }, G[k])).sort((a, b) => b.played - a.played || b.wins - a.wins);
    const top = games.filter(g => g.played >= 2 && g.wins).sort((a, b) => b.wins / b.played - a.wins / a.played || b.wins - a.wins)[0];
    // head to head
    const H = {};
    results.forEach(r => { r.beat.forEach(o => (o.members || [o.id]).forEach(q => { (H[q] = H[q] || { w: 0, l: 0 }).w++; })); r.lost.forEach(o => (o.members || [o.id]).forEach(q => { (H[q] = H[q] || { w: 0, l: 0 }).l++; })); });
    const h2h = Object.keys(H).filter(q => q !== p.id && player(q)).map(q => ({ q: player(q), ...H[q] })).sort((a, b) => (b.w + b.l) - (a.w + a.l));
    const bests = games.filter(g => g.scored && g.best != null).slice(0, 8);
    const recent = sessions.slice().reverse().slice(0, 12);
    const stat = (n, l) => `<div class="pstat"><b>${n}</b><span>${l}</span></div>`;
    return topbar(p.name, played ? plural(played, 'game') + ' played' : 'No games yet', back(V.from || 'home'), `<button class="ico" data-act="editplayer" data-id="${p.id}" aria-label="Edit">✎</button>`) +
      `<main class="body">
        <div class="phead">${av(p, 64)}<div><div class="pname">${esc(p.name)}</div>
          <div class="muted">${cur >= 2 ? `🔥 ${cur} wins in a row` : top ? 'Best at ' + esc(top.name) : played ? 'Keep playing!' : 'Play a game and stats show up here'}</div></div></div>
        ${played ? `
        <div class="pstats">${stat(wins, wins === 1 ? 'win' : 'wins')}${stat(played, 'played')}${stat(Math.round(wins / played * 100) + '%', 'win rate')}${stat(rounds, 'rounds won')}${stat(best, 'best streak')}</div>
        <div class="lbl">Their games</div>
        <div class="glist">${games.map(g => `<div class="g"><span><span class="gn">${esc(g.name)}</span><span class="gr">${g.wins} of ${plural(g.played, 'game')} won</span></span><span class="trk mini"><i style="width:${g.wins / g.played * 100}%;background:${p.color}"></i></span><span class="st">${Math.round(g.wins / g.played * 100)}%</span></div>`).join('')}</div>
        ${h2h.length ? `<div class="lbl">Head to head</div><div class="glist">${h2h.map(x => `<button class="g" data-go="player" data-id="${x.q.id}"><span class="h2h">${av(p, 22)}<b>${x.w}</b><span class="muted">–</span><b>${x.l}</b>${av(x.q, 22)}<span class="gn">vs ${esc(x.q.name)}</span></span><span class="st ${x.w > x.l ? 'up' : x.w < x.l ? 'down' : ''}">${x.w > x.l ? 'Ahead' : x.w < x.l ? 'Behind' : 'Even'}</span></button>`).join('')}</div><p class="muted small">Every game you both played: who finished ahead.</p>` : ''}
        ${bests.length ? `<div class="lbl">Personal bests</div><div class="glist">${bests.map(g => `<div class="g"><span class="gn">${esc(g.name)}</span><span class="st">${g.win < 0 ? 'Lowest' : 'Highest'} ${fmt(g.best)}</span></div>`).join('')}</div>` : ''}
        <div class="lbl">Recent games</div>
        <div class="glist">${recent.map(s => { const when = new Date(s.h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const res = s.h.style === 'wins' ? `won ${s.wins} of ${s.of}` : s.won ? 'Won' : ord(s.place) + ' of ' + s.of;
          const good = s.h.style === 'wins' ? s.wins > 0 : s.won;
          const mates = s.seat.members ? s.seat.members.filter(m => m !== p.id).map(m => (player(m) || {}).name).filter(Boolean).join(', ') : '';
          return `<button class="g" data-go="past" data-id="${s.h.id}"><span class="res ${good ? 'w' : 'l'}">${good ? '✓' : '✗'}</span><span class="gtxt"><span class="gn">${esc(s.h.name)}</span><span class="gr">${when} · ${res}${mates ? ' · with ' + esc(mates) : ''}</span></span><span class="st">${s.h.style === 'wins' ? plural(s.of, 'game') : fmt(s.score)}</span></button>`; }).join('')}</div>
        ` : ''}
      </main>`;
  }
  function editPlayer(p) {
    let color = p.color;
    openSheet({
      draw: () => `<div class="sh-h"><b>Edit player</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        <div class="row">${av({ name: p.name, color }, 40)}<input id="ep" class="txt" value="${esc(p.name)}" maxlength="20" autocomplete="off"></div>
        <div class="lbl">Color</div>
        <div class="swatches">${COLORS.map(c => `<button data-sh="c" data-c="${c}" class="${c === color ? 'on' : ''}" style="background:${c}" aria-label="Color"></button>`).join('')}</div>
        <button class="btn primary wide" data-sh="ok">Save</button>
        <button class="link danger wide" data-sh="del">Remove ${esc(p.name)} from players</button>`,
      on: (k, el) => {
        if (k === 'c') { const n = $('#ep').value; color = el.dataset.c; drawSheet(); $('#ep').value = n; return; }
        if (k === 'ok') { const n = $('#ep').value.trim(); if (n) p.name = n; p.color = color; save(); closeSheet(); render(); }
        if (k === 'del') confirmBox('Remove ' + p.name + ' from your players? Past games keep their scores.', 'Remove', () => { S.players = S.players.filter(x => x.id !== p.id); save(); go('home'); });
      }
    });
  }

  // ───────── SETTINGS ─────────
  function vSettings() {
    return topbar('Settings', '', back()) + `<main class="body">
      <div class="lbl">Players</div>
      <div class="glist">${S.players.map(p => `<button class="g" data-go="player" data-id="${p.id}"><span class="h2h">${av(p, 30)}<span class="gn">${esc(p.name)}</span></span><span class="muted">Profile ›</span></button>`).join('')}</div>
      <button class="btn ghost" data-act="addplayer">+ Add player</button>
      <p class="muted small">Tap a player to see their stats, or to change their name and color.</p>
      <div class="lbl">Colors</div>
      <div id="colors">${colorPanel()}</div>
      <div class="opt"><span>Keep the screen on while playing</span><button class="tog ${S.settings.awake ? 'on' : ''}" data-act="awake" aria-label="Keep screen on"><i></i></button></div>
      <div class="lbl">Backup</div>
      <p class="muted small">Scores live on this phone. Save a backup file before switching phones.</p>
      <div class="two"><button class="btn" data-act="export">Save backup</button><label class="btn" for="imp">Restore backup</label></div>
      <input id="imp" type="file" accept=".json,application/json" hidden>
      <p class="muted small center">Tally · ${TALLY_GAMES.filter(g => !g.hidden).length} games built in · no ads, no account</p>
    </main>`;
  }

  // ───────── CUSTOM GAME ─────────
  // A family game has a name, its own written rules, a way of scoring, and (optionally) laps.
  // "Create my own" builds the scoring from parts; the presets are the five common shapes.
  let draft = null;
  const PRESETS = [['rounds', 'Everyone scores each round'], ['winner', 'Round winner takes the points'], ['sheet', 'Score sheet with categories'], ['counter', 'Counter with + and −'], ['wins', 'Just who won']];
  const POINTS = [['round', 'Everyone scores each round'], ['winner', 'Only the round winner scores'], ['end', 'Score boxes at the end'], ['tap', 'Plus and minus any time'], ['none', 'No points']];
  const PT_STYLE = { round: 'rounds', winner: 'winner', end: 'sheet', tap: 'counter', none: 'wins' };
  function newDraft(name) { return { n: name || '', mode: 'preset', s: 'rounds', pts: 'round', win: 'high', target: null, rounds: null, start: 0, stepsText: '1, 5, 10', cats: [], q: [], r: '', rules: '', lapsOn: false, lapsN: 3, lapWin: 'first' }; }
  function draftFromDef(d) {
    const x = Object.assign(newDraft(), JSON.parse(JSON.stringify(d)));
    if (x.lapsOnly) { x.s = 'wins'; x.pts = 'none'; delete x.target; x.target = x.tgtSaved ?? null; }
    if (d.steps) x.stepsText = d.steps.join(', ');
    if (x.rAuto) x.r = '';
    return x;
  }
  function defFromDraft(dr) {
    const d = { id: dr.id || 'my-' + uid(), n: dr.n, c: 'mine', g: 'Made by you', win: dr.win, rules: dr.rules || '',
      mode: dr.mode, pts: dr.pts, lapsOn: dr.lapsOn, lapsN: dr.lapsN, lapWin: dr.lapWin, stepsText: dr.stepsText };
    d.s = dr.mode === 'build' ? PT_STYLE[dr.pts] : dr.s;
    if (['rounds', 'winner', 'counter'].includes(d.s) && dr.target != null) d.target = dr.target;
    if (['rounds', 'winner'].includes(d.s) && dr.rounds != null) d.rounds = dr.rounds;
    if (['rounds', 'winner'].includes(d.s) && dr.q && dr.q.length) d.q = dr.q;
    if (d.s === 'sheet') d.cats = dr.cats && dr.cats.length ? dr.cats : [{ n: 'Final score' }];
    if (d.s === 'counter') {
      d.start = dr.start || 0;
      const st = String(dr.stepsText || '').split(/[ ,]+/).map(Number).filter(n => n > 0);
      d.steps = st.length ? st.slice(0, 8) : [1, 5, 10];
    }
    if (dr.lapsOn && dr.lapsN > 0) {
      if (d.s === 'wins') {
        // laps only: a lap counter where the first to finish wins
        Object.assign(d, { s: 'counter', start: 0, target: dr.lapsN, steps: [1], unit: 'laps', lapsOnly: true, tgtSaved: dr.target });
      } else { d.laps = dr.lapsN; d.lapWin = dr.lapWin; }
    }
    const bits = [];
    if (d.lapsOnly) bits.push('First around the board ' + plural(dr.lapsN, 'time') + ' wins');
    else {
      if (d.s !== 'wins') bits.push((d.win === 'low' ? 'Lowest' : 'Highest') + ' total wins');
      if (d.target != null) bits.push('to ' + fmt(d.target));
      if (d.rounds) bits.push(plural(d.rounds, 'round'));
      if (d.laps) bits.push(plural(d.laps, 'lap') + (d.lapWin === 'score' ? ', then best score wins' : ' to win'));
      if (d.s === 'wins') bits.push('tap the winner');
    }
    d.rAuto = !(dr.r && dr.r.trim());
    d.r = d.rAuto ? bits.join(' · ') : dr.r.trim();
    return d;
  }

  // Reads the family's written rules and suggests the scoring. Offline, so it only
  // looks for clear phrases ("first to 300", "lowest score wins", "3 laps", "Wild cards are worth 50").
  const WORDN = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fifteen: 15, twenty: 20, fifty: 50, hundred: 100 };
  const NUM = '(\\d[\\d,]*|' + Object.keys(WORDN).join('|') + ')';
  const toN = x => WORDN[x] ?? +String(x).replace(/,/g, '');
  function readRules(text) {
    const T = ' ' + String(text || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ') + ' ';
    const s = { found: [] };
    let m;
    if (/(lowest|fewest|least)( total)?( score| points?)?( at the end)? (wins|is the winner)|low score wins/.test(T)) { s.win = 'low'; s.found.push('Lowest score wins'); }
    else if (/(highest|most)( total)?( score| points?)( at the end)? (wins|is the winner)|highest wins|most points wins/.test(T)) { s.win = 'high'; s.found.push('Highest score wins'); }
    if ((m = T.match(new RegExp(NUM + ' (laps?|times around)'))) || (m = T.match(new RegExp('around the board ' + NUM + ' times')))) {
      s.laps = toN(m[1]); s.found.push(plural(s.laps, 'lap') + ' around the board');
    }
    m = T.match(new RegExp('(?:first (?:player |person |one |team )?to (?:reach |get |score |hit )?|play(?:ed|ing)? (?:up )?to |race to |game ends (?:at|when someone reaches) |until (?:someone|a player) (?:reaches|gets|scores) )(?<n>' + NUM.slice(1, -1) + ')(?! (?:laps?|times|rounds?|cards?))'));
    if (m && toN(m.groups.n) > 0) { s.target = toN(m.groups.n); s.found.push('Play to ' + fmt(s.target)); }
    if ((m = T.match(new RegExp(NUM + ' (rounds|hands|holes|deals)')))) { s.rounds = toN(m[1]); s.found.push(plural(s.rounds, 'round')); }
    // how points come in
    if (/(winner|player who (goes|went) out|whoever (wins|goes out))( of (the|each|a) (round|hand))? (scores|gets|collects|earns|takes)/.test(T)) s.pts = 'winner';
    else if (/(at the end of the game|when the game ends|end of the game).{0,60}(count|add|score|total)|score (sheet|card)|categor/.test(T)) s.pts = 'end';
    else if (/(each|every|end of (the|each)|after (each|every)) (round|hand|turn).{0,60}(points?|score)|(points?|score).{0,60}(each|every) (round|hand)/.test(T)) s.pts = 'round';
    else if (/\b(lives|life points|chips|tokens|lose a life|gain|plus|minus)\b/.test(T) && /points?|lives|chips|tokens/.test(T)) s.pts = 'tap';
    else if (/(first (player |person |one |team )?to (finish|get rid|reach the end|get home|get all|cross|win)|last (player |one |person )?(standing|left))/.test(T) && !/points?/.test(T)) s.pts = 'none';
    else if (/points?|score/.test(T)) s.pts = 'round';
    const ptsName = { round: 'Everyone scores each round', winner: 'Only the round winner scores', end: 'Score boxes at the end', tap: 'Plus and minus any time', none: 'No points' };
    if (s.pts) s.found.push(ptsName[s.pts]);
    if (s.laps && s.pts && s.pts !== 'none') s.lapWin = /(most|highest) (points|score)|best score/.test(T) ? 'score' : 'first';
    // quick-add buttons from point values
    const q = [], seen = new Set();
    const add = (label, v) => { label = label.trim().replace(/^(a|an|the|each|every)\s+/, '').replace(/\s+(cards?)$/, ''); if (!label || label.length > 18 || isNaN(v) || seen.has(label)) return; seen.add(label); q.push([label[0].toUpperCase() + label.slice(1), v]); };
    const plain = T.replace(/[.;!?\n]/g, ' . ');
    for (const r of plain.matchAll(/([a-z][a-z0-9 \-]{0,18}?)\s+(cards?\s+)?(are|is)\s+worth\s+(minus\s+|-)?(\d+)/g)) add(r[1], (r[4] ? -1 : 1) * +r[5]);
    for (const r of plain.matchAll(/([a-z][a-z0-9 \-]{0,18}?)\s*(=|:)\s*(-?\d+)\s*(points?|pts)?/g)) add(r[1], +r[3]);
    for (const r of plain.matchAll(/(lose|minus|-)?\s*(\d+)\s+points?\s+(for|per)\s+(each|every|a|an)?\s*([a-z][a-z \-]{1,18}?)\s*[.,]/g)) add(r[5], (r[1] ? -1 : 1) * +r[2]);
    if (q.length) { s.q = q.slice(0, 8); s.found.push('Buttons: ' + s.q.map(x => x[0] + ' ' + (x[1] > 0 ? '+' : '') + x[1]).join(', ')); }
    return s;
  }
  function useSuggestion(sg) {
    draft.mode = 'build';
    if (sg.pts) draft.pts = sg.pts;
    if (sg.win) draft.win = sg.win;
    if (sg.target != null) draft.target = sg.target;
    if (sg.rounds != null) draft.rounds = sg.rounds;
    if (sg.laps) { draft.lapsOn = true; draft.lapsN = sg.laps; if (sg.lapWin) draft.lapWin = sg.lapWin; }
    if (sg.q) draft.q = sg.q;
    draft.sugg = null;
  }

  function vCustom() {
    const d = draft, build = d.mode === 'build', s = build ? PT_STYLE[d.pts] : d.s;
    const opt = (k, label, html) => `<div class="opt"><label for="c-${k}">${label}</label>${html}</div>`;
    const numIn = (k, v, ph) => `<input id="c-${k}" class="num" inputmode="numeric" value="${v ?? ''}" placeholder="${ph || 'no limit'}">`;
    const hasPoints = s !== 'wins';
    const sg = d.sugg;
    return topbar(d.id ? 'Edit game' : 'Make a game', d.id ? esc(d.n) : '', back(d.from || 'games')) + `<main class="body">
      <label class="lbl" for="c-name">Name</label><input id="c-name" class="txt" value="${esc(d.n)}" placeholder="e.g. Grandma's Rummy" maxlength="40">

      <label class="lbl" for="c-rules">📖 Rules <span class="muted">(how to play, in your own words)</span></label>
      <textarea id="c-rules" class="note rules" rows="6" placeholder="e.g. Everyone gets 7 cards. Each round, the player who goes out scores the cards left in everyone's hands. Wild cards are worth 50. First to 300 wins.">${esc(d.rules || '')}</textarea>
      <button class="btn ghost" data-act="cread">✨ Read my rules and suggest the scoring</button>
      ${sg ? `<div class="card sugg">${sg.found.length ? `<b>From your rules I found:</b><ul>${sg.found.map(f => `<li>${esc(f)}</li>`).join('')}</ul><div class="two"><button class="btn" data-act="cnosugg">No thanks</button><button class="btn primary" data-act="cusesugg">Use this</button></div>`
        : `<b>I couldn't spot the scoring in those rules.</b><span class="muted small">Try phrases like "first to 300", "lowest score wins", "3 laps", "each round", or "Wild cards are worth 50". Or pick the scoring below.</span><button class="btn" data-act="cnosugg">OK</button>`}</div>` : ''}

      <div class="lbl">How is it scored?</div>
      <div class="radios">${PRESETS.map(([k, l]) => `<button data-act="cstyle" data-v="${k}" class="${!build && d.s === k ? 'on' : ''}">${l}</button>`).join('')}
        <button data-act="cstyle" data-v="build" class="${build ? 'on' : ''} mine">✨ Create my own<span class="muted small">Build the scoring from parts</span></button></div>

      ${build ? `<div class="lbl">How do points work?</div>
      <div class="radios sm">${POINTS.map(([k, l]) => `<button data-act="cpts" data-v="${k}" class="${d.pts === k ? 'on' : ''}">${l}</button>`).join('')}</div>` : ''}

      <div class="opts">
        ${hasPoints && s !== 'counter' ? `<div class="opt"><span>Who wins</span><div class="seg sm"><button data-act="cwin" data-v="high" class="${d.win !== 'low' ? 'on' : ''}">Highest</button><button data-act="cwin" data-v="low" class="${d.win === 'low' ? 'on' : ''}">Lowest</button></div></div>` : ''}
        ${['rounds', 'winner', 'counter'].includes(s) ? opt('target', 'Play to', numIn('target', d.target)) : ''}
        ${['rounds', 'winner'].includes(s) ? opt('rounds', 'Number of rounds', numIn('rounds', d.rounds)) : ''}
        ${s === 'counter' ? opt('start', 'Everyone starts at', numIn('start', d.start ?? 0, '0')) + opt('steps', 'Button amounts', `<input id="c-steps" class="num wide" value="${esc(d.stepsText || '1, 5, 10')}" placeholder="1, 5, 10">`) : ''}
        <div class="opt"><span>Count laps around the board</span><button class="tog ${d.lapsOn ? 'on' : ''}" data-act="claps" aria-label="Count laps"><i></i></button></div>
        ${d.lapsOn ? opt('lapsn', 'Laps to finish', numIn('lapsn', d.lapsN, '3')) : ''}
        ${d.lapsOn && hasPoints ? `<div class="opt col"><span>When someone finishes the laps</span><div class="seg sm"><button data-act="clapwin" data-v="first" class="${d.lapWin !== 'score' ? 'on' : ''}">They win</button><button data-act="clapwin" data-v="score" class="${d.lapWin === 'score' ? 'on' : ''}">Best score wins</button></div></div>` : ''}
      </div>
      ${d.lapsOn && !hasPoints ? '<p class="muted small">No points: the first player to finish the laps wins.</p>' : ''}

      ${s === 'sheet' ? `<label class="lbl" for="c-cats">Score boxes, one per line <span class="muted">(start with − for ones that subtract)</span></label><textarea id="c-cats" class="note" rows="5" placeholder="Routes&#10;Tickets&#10;−Penalties">${esc((d.cats || []).map(c => (c.neg ? '−' : '') + c.n).join('\n'))}</textarea>` : ''}
      ${['rounds', 'winner'].includes(s) ? `<label class="lbl" for="c-quick">Quick-add buttons <span class="muted">(like "Wild 50", one per line)</span></label><textarea id="c-quick" class="note" rows="3" placeholder="Wild 50&#10;Skip 20">${esc((d.q || []).map(q => q[0] + ' ' + q[1]).join('\n'))}</textarea>` : ''}
      <label class="lbl" for="c-rule">Short description <span class="muted">(optional, shows in the game list)</span></label><input id="c-rule" class="txt" value="${esc(d.r || '')}" placeholder="Filled in for you if left blank">
      <button class="btn primary big" data-act="csave">${d.id ? 'Save changes' : 'Save game'}</button>
      ${d.id ? `<button class="btn danger" data-act="cdel">Delete this game</button>` : ''}
    </main>`;
  }
  function readDraft() {
    const v = id => { const el = $(id); return el ? el.value.trim() : undefined; };
    const num = id => { const x = v(id); if (x === undefined) return undefined; return x === '' || isNaN(+x.replace(/,/g, '')) ? null : +x.replace(/,/g, ''); };
    if (v('#c-name') !== undefined) draft.n = v('#c-name');
    if (v('#c-rule') !== undefined) draft.r = v('#c-rule');
    const rules = $('#c-rules'); if (rules) draft.rules = rules.value;
    ['target', 'rounds', 'start'].forEach(k => { const x = num('#c-' + k); if (x !== undefined) draft[k] = x; });
    const ln = num('#c-lapsn'); if (ln !== undefined) draft.lapsN = ln && ln > 0 ? Math.round(ln) : 3;
    if (v('#c-steps') !== undefined) draft.stepsText = v('#c-steps');
    const cats = v('#c-cats'); if (cats !== undefined) draft.cats = cats.split('\n').map(x => x.trim()).filter(Boolean).map(x => /^[−-]/.test(x) ? { n: x.replace(/^[−-]\s*/, ''), neg: true } : { n: x });
    const q = v('#c-quick'); if (q !== undefined) draft.q = q.split('\n').map(x => x.trim().match(/^(.*?)\s*([−-]?\d+)$/)).filter(Boolean).map(m => [m[1] || 'Add', +m[2].replace('−', '-')]);
  }
  // Built-in games use rules.js; games the family made use their own written rules.
  const builtInRules = id => (window.TALLY_RULES || {})[id];
  const hasRules = (c, id) => !!(c.rules || builtInRules(id));
  function ruleBody(c, defId) {
    const R = builtInRules(defId);
    if (!R) return `<div class="rulestext">${c.rules ? esc(c.rules) : '<span class="muted">No rules written yet.</span>'}</div>`;
    return `<div class="rulesdoc">${R.sections.map(s => `<h4>${esc(s.h)}</h4>${s.p ? `<p>${esc(s.p)}</p>` : ''}${s.li ? `<ul>${s.li.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`).join('')}
      ${R.note ? `<div class="rnote"><b>Good to know</b>${esc(R.note)}</div>` : ''}
      ${(R.links || []).map(([t, u]) => `<a class="rlink" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('')}
      <p class="muted small">Written in our own words. Your game box has the official rules.</p></div>`;
  }
  function showRules(c, defId) {
    const house = S.notes[defId];
    openSheet({
      draw: () => `<div class="sh-h"><b>📖 ${esc(c.n)}</b><button class="ico" data-sh="close" aria-label="Close">✕</button></div>
        ${ruleBody(c, defId)}
        ${house ? `<div class="card housenote"><b>House rules</b>${esc(house)}</div>` : ''}
        ${S.custom.some(x => x.id === defId) ? `<button class="btn ghost wide" data-sh="edit">✎ Edit this game</button>` : ''}`,
      on: k => { if (k === 'edit') { closeSheet(); editGame(defId); } }
    });
  }
  function editGame(id, from) {
    const d = S.custom.find(x => x.id === id); if (!d) return;
    draft = draftFromDef(d); draft.from = from || (V.name === 'setup' ? 'games' : V.name === 'play' ? 'home' : 'games');
    go('custom');
  }

  // ───────── events ─────────
  document.addEventListener('click', e => {
    const sh = e.target.closest('[data-sh],[data-pad],[data-chip]');
    if (sh && SH && sh.closest('#sheet')) {
      e.preventDefault();
      const k = sh.dataset.sh || (sh.dataset.pad != null ? sh.dataset.pad : 'chip');
      if (k === 'close') { closeSheet(); return; }
      if (navigator.vibrate) navigator.vibrate(8);
      SH.on(k, sh); return;
    }
    if (e.target.id === 'sheet') { closeSheet(); return; }
    const el = e.target.closest('[data-go],[data-act]'); if (!el) return;
    if (el.dataset.go) {
      if (el.dataset.go === 'games' && !el.closest('.tabbar')) { go('games'); return; }
      go(el.dataset.go, { id: el.dataset.id, from: el.dataset.go === 'player' ? (V.name === 'player' ? V.from : V.name) : undefined }); return;
    }
    const a = el.dataset.act, id = el.dataset.id;
    const g = V.name === 'play' ? game(V.id) : null;
    switch (a) {
      case 'lib': tab = el.dataset.tab; query = ''; go('games'); break;
      case 'tab': tab = el.dataset.tab; query = ''; render(); break;
      case 'quick': tab = 'mine'; query = ''; go('games'); break;
      case 'pick': openSetup(id); break;
      case 'junior': if (id !== setup.id) { readSetupInputs(); openSetup(id, setup.sel.slice()); } break;
      case 'fav': S.favs = S.favs.includes(id) ? S.favs.filter(x => x !== id) : S.favs.concat(id); save(); refreshResults(); break;
      case 'hidetip': S.settings.hideTip = true; save(); render(); break;
      case 'addplayer': if (V.name === 'setup') readSetupInputs(); addPlayerSheet(p => { if (el.dataset.seat && setup) setup.sel.push(p.id); }); break;
      case 'seat': readSetupInputs(); setup.sel = setup.sel.includes(id) ? setup.sel.filter(x => x !== id) : setup.sel.concat(id); setup.first = null; render(); break;
      case 'win': readSetupInputs(); setup.win = el.dataset.v; render(); break;
      case 'dealer': readSetupInputs(); setup.dealer = !setup.dealer; render(); break;
      case 'teams': readSetupInputs(); setup.teams = +el.dataset.v; setup.first = null; render(); break;
      case 'first': readSetupInputs(); { const seats = seatsFromSetup(); if (seats.length < 2) { toast('Pick at least two players'); break; } pickFirst(seats, i => { setup.first = i; setTimeout(render, 900); }); } break;
      case 'start': {
        readSetupInputs(); const d = findAny(setup.id), seats = seatsFromSetup();
        if (!seats.length) { toast('Pick at least one player'); break; }
        const opt = { win: setup.win, trackDealer: setup.dealer && !['sheet', 'wins', 'counter'].includes(d.s), dealer: setup.first ?? 0 };
        if (['rounds', 'winner', 'calc', 'counter'].includes(d.s) && !d.phase) opt.target = setup.target;
        if (['rounds', 'winner', 'calc'].includes(d.s) && d.rounds !== 'wizard') opt.rounds = setup.rounds;
        if (d.s === 'counter') opt.start = setup.start ?? d.start ?? 0;
        if (d.tby && setup.target == null) delete opt.target;
        if (d.laps) opt.laps = setup.laps || d.laps;
        startGame(d, seats, opt); break;
      }
      case 'undo': if (g) doUndo(g); break;
      case 'menu': if (g) gameMenu(g); break;
      case 'addround': if (g) (g.cfg.s === 'winner' ? winnerSheet(g) : g.cfg.s === 'calc' ? calcSheet(g) : roundSheet(g)); break;
      case 'editround': if (g) { const i = +el.dataset.i; const td = e.target.closest('td'); const col = td ? [...td.parentNode.children].indexOf(td) - 1 : -1; const sid = col >= 0 ? g.seats[col] && g.seats[col].id : null; g.cfg.s === 'winner' ? winnerSheet(g, i) : g.cfg.s === 'calc' ? calcSheet(g, i) : roundSheet(g, i, sid); } break;
      case 'cell': if (g) cellSheet(g, +el.dataset.ci, id); break;
      case 'step': V.step = +el.dataset.v; render(); break;
      case 'cnt': if (g) bump(g, id, +el.dataset.d); break;
      case 'cntpad': if (g) counterPad(g, id); break;
      case 'won': if (g) { snap(g); g.wlog.push(id); g.updated = Date.now(); save(); render(); const s = g.seats.find(x => x.id === id); toast(s.name + ' wins game ' + g.wlog.length); if (navigator.vibrate) navigator.vibrate(20); } break;
      case 'pickfirst': if (g) pickFirst(g.seats); break;
      case 'over': if (g) showOver(g); break;
      case 'seatmenu': break;
      case 'again': { const h = S.history.find(x => x.id === id); if (!h) break; const d = findDef(h.def) || h.game.cfg; startGame(Object.assign({}, d, h.game.cfg, { id: h.def }), h.seats.map(s => Object.assign({}, s)), { target: h.game.target, trackDealer: h.game.trackDealer, dealer: 0 }); break; }
      case 'delhist': confirmBox('Delete this game from History? Its wins come off the stats too.', 'Delete', () => { S.history = S.history.filter(x => x.id !== id); save(); go('history'); }); break;
      case 'statgame': statGame = id; render(); break;
      case 'editplayer': { const p = player(id); if (p) editPlayer(p); break; }
      case 'recolor': { const p = player(id); p.color = COLORS[(COLORS.indexOf(p.color) + 1) % COLORS.length]; save(); render(); break; }
      case 'delplayer': { const p = player(id); confirmBox('Remove ' + p.name + ' from your players? Past games keep their scores.', 'Remove', () => { S.players = S.players.filter(x => x.id !== id); save(); render(); }); break; }
      case 'theme': S.settings.theme = el.dataset.v; save(); applyTheme(); refreshColors(); break;
      case 'ctab': colorTab = el.dataset.v; refreshColors(); break;
      case 'cpick': setColor(el.dataset.v); break;
      case 'creset': S.settings.colors = {}; save(); applyTheme(); refreshColors(); toast('Original colors are back'); break;
      case 'awake': S.settings.awake = !S.settings.awake; save(); render(); break;
      case 'export': exportBackup(); break;
      case 'newcustom': draft = newDraft(el.dataset.name); draft.from = V.name === 'home' ? 'home' : 'games'; go('custom'); break;
      case 'cstyle': readDraft();
        if (el.dataset.v === 'build') { if (draft.mode !== 'build') { draft.mode = 'build'; draft.pts = { rounds: 'round', winner: 'winner', sheet: 'end', counter: 'tap', wins: 'none' }[draft.s] || 'round'; } }
        else { draft.mode = 'preset'; draft.s = el.dataset.v; }
        render(); break;
      case 'cpts': readDraft(); draft.pts = el.dataset.v; render(); break;
      case 'cwin': readDraft(); draft.win = el.dataset.v; render(); break;
      case 'claps': readDraft(); draft.lapsOn = !draft.lapsOn; render(); break;
      case 'clapwin': readDraft(); draft.lapWin = el.dataset.v; render(); break;
      case 'cread': readDraft(); if (!String(draft.rules || '').trim()) { toast('Type your rules in the box first'); break; } draft.sugg = readRules(draft.rules); render(); setTimeout(() => { const x = $('.sugg'); if (x) x.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 60); break;
      case 'cusesugg': readDraft(); useSuggestion(draft.sugg); render(); toast('Scoring set from your rules · check it below'); break;
      case 'cnosugg': readDraft(); draft.sugg = null; render(); break;
      case 'csave': {
        readDraft(); if (!draft.n) { toast('Give the game a name'); break; }
        const d = defFromDraft(draft);
        S.custom = S.custom.filter(x => x.id !== d.id).concat(d); save(); toast(draft.id ? 'Changes saved' : 'Saved to Mine'); tab = 'mine'; openSetup(d.id); break;
      }
      case 'editgame': editGame(id); break;
      case 'rules': showRules(findAny(id), id); break;
      case 'lap': if (g) {
        snap(g); g.laps = g.laps || {}; const d = +el.dataset.d, v = Math.max(0, (g.laps[id] || 0) + d); g.laps[id] = v; g.updated = Date.now(); save(); render();
        if (d > 0) { const s = g.seats.find(x => x.id === id); toast(s.name + ' · lap ' + v + ' of ' + g.cfg.laps); if (navigator.vibrate) navigator.vibrate(20); checkOver(g); }
      } break;
      case 'cdel': confirmBox('Delete this game?', 'Delete', () => { S.custom = S.custom.filter(x => x.id !== draft.id); S.favs = S.favs.filter(x => x !== draft.id); save(); go('games'); }); break;
    }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'cany') { S.settings.colors = Object.assign({}, S.settings.colors, { [colorTab]: e.target.value }); applyTheme(); }
    if (e.target.id === 'search') { query = e.target.value; refreshResults(); }
    if (e.target.dataset.act === 'pname') { const p = player(e.target.dataset.id); if (p && e.target.value.trim()) { p.name = e.target.value.trim(); save(); } }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'cany') setColor(e.target.value);
    if (e.target.id === 'statgame') { statGame = e.target.value; render(); }
    if (e.target.id === 'imp') importBackup(e.target.files[0]);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.id === 'np' && SH) { e.preventDefault(); SH.on(V.name === 'play' ? 'new' : 'ok'); }
  });
  function setColor(v) { S.settings.colors = Object.assign({}, S.settings.colors); if (v) S.settings.colors[colorTab] = v; else delete S.settings.colors[colorTab]; save(); applyTheme(); refreshColors(); }
  // redraw just the color panel so the page doesn't jump while picking
  function refreshColors() { const el = $('#colors'); if (el) el.innerHTML = colorPanel(); else render(); }
  function refreshResults() {
    // Re-render the list only, so the search box keeps focus while typing.
    const box = $('#results'); if (!box) return render();
    const tmp = document.createElement('div'); tmp.innerHTML = vGames();
    box.innerHTML = tmp.querySelector('#results').innerHTML;
    document.querySelectorAll('.seg button[data-act="tab"]').forEach(b => b.classList.toggle('on', !query.trim() && b.dataset.tab === tab));
  }

  // ───────── backup ─────────
  function exportBackup() {
    const blob = new Blob([JSON.stringify(S)], { type: 'application/json' });
    const name = 'tally-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    const file = new File([blob], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: 'Tally backup' }).catch(() => { }); return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function importBackup(f) {
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = JSON.parse(rd.result); if (!d || !Array.isArray(d.players)) throw 0;
        confirmBox('Replace everything on this phone with the backup from that file?', 'Restore', () => { S = Object.assign(blank(), d); save(); applyTheme(); toast('Backup restored'); go('home'); });
      } catch (e) { toast('That file isn\'t a Tally backup'); }
    };
    rd.readAsText(f);
  }

  // ───────── screen awake, theme, toast ─────────
  let lock = null;
  async function wake(on) {
    try {
      if (on && S.settings.awake && 'wakeLock' in navigator && document.visibilityState === 'visible') { if (!lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); } }
      else if (lock) { await lock.release(); lock = null; }
    } catch (e) { lock = null; }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') wake(V.name === 'play'); });
  // ───────── colors ─────────
  // The original look lives in index.html (follows the phone, or forced light/dark).
  // On top of it, the family can pick their own background, text and button colors;
  // everything else (cards, lines, faded text) is worked out from those three.
  const BASE = {
    light: { bg: '#f3f1ec', screen: '#fbfaf7', surface: '#ffffff', cell: '#ece9e2', ink: '#1c2033', muted: '#646879', line: '#dedad1', accent: '#2f5bd3', good: '#18936a', bad: '#c2410c', gold: '#d4961b' },
    dark: { bg: '#13151d', screen: '#171a24', surface: '#1f2330', cell: '#272c3b', ink: '#eceef5', muted: '#9fa3b5', line: '#2f3445', accent: '#7d9cf5', good: '#3fc290', bad: '#f08a52', gold: '#efb94a' }
  };
  const SWATCH = {
    bg: ['#ffffff', '#f7f7f7', '#f3f1ec', '#ece6da', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#000000',
      '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#78350f', '#451a03',
      '#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#9a3412', '#431407',
      '#fef2f2', '#fecaca', '#fce7f3', '#fbcfe8', '#f5d0fe', '#ede9fe', '#ddd6fe', '#e0e7ff', '#dbeafe', '#bfdbfe', '#e0f2fe', '#cffafe',
      '#ccfbf1', '#d1fae5', '#bbf7d0', '#dcfce7', '#ecfccb', '#d9f99d', '#fef9c3',
      '#7f1d1d', '#450a0a', '#500724', '#4a044e', '#3b0764', '#2e1065', '#1e1b4b', '#172554', '#0f172a', '#083344', '#134e4a', '#022c22', '#052e16', '#14532d', '#1a2e05', '#1c1917'],
    ink: ['#000000', '#111827', '#1f2937', '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6', '#ffffff',
      '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03',
      '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407',
      '#fecaca', '#f87171', '#dc2626', '#991b1b', '#7f1d1d', '#fbcfe8', '#f472b6', '#be185d', '#831843',
      '#e9d5ff', '#c084fc', '#7e22ce', '#581c87', '#3b0764', '#c7d2fe', '#818cf8', '#4338ca', '#312e81',
      '#bfdbfe', '#60a5fa', '#1d4ed8', '#1e3a8a', '#172554', '#a5f3fc', '#22d3ee', '#0e7490', '#164e63',
      '#a7f3d0', '#34d399', '#047857', '#064e3b', '#bbf7d0', '#4ade80', '#15803d', '#14532d', '#d9f99d', '#a3e635', '#4d7c0f', '#365314'],
    accent: ['#ef4444', '#dc2626', '#b91c1c', '#7f1d1d', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#fbbf24', '#f59e0b', '#d97706', '#b45309',
      '#facc15', '#eab308', '#ca8a04', '#a16207', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#4ade80', '#22c55e', '#16a34a', '#15803d',
      '#34d399', '#10b981', '#059669', '#047857', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490',
      '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#818cf8', '#6366f1', '#4f46e5', '#4338ca',
      '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#e879f9', '#d946ef', '#c026d3', '#a21caf',
      '#f472b6', '#ec4899', '#db2777', '#be185d', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#a8a29e', '#78716c', '#57534e', '#292524',
      '#94a3b8', '#64748b', '#475569', '#1e293b', '#ffffff', '#000000']
  };
  const rgb = h => h.replace('#', '').match(/../g).map(x => parseInt(x, 16));
  const hex = a => '#' + a.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const x = rgb(a), y = rgb(b); return hex(x.map((v, i) => v + (y[i] - v) * t)); };
  const lum = h => { const c = rgb(h).map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  // nudge a color toward `to` until it reads clearly on `on`
  const readable = (c, on, to, need = 4.5) => { let t = 0, out = c; while (contrast(out, on) < need && t < 1) { t += 0.05; out = mix(c, to, t); } return out; };
  function colorTokens() {
    const c = S.settings.colors || {};
    if (!c.bg && !c.ink && !c.accent) return null;
    const phoneDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = c.bg ? lum(c.bg) < 0.18 : S.settings.theme === 'dark' || (S.settings.theme === 'system' && phoneDark);
    const b = BASE[dark ? 'dark' : 'light'], t = Object.assign({}, b);
    if (c.bg) {
      t.bg = c.bg;
      t.screen = dark ? mix(c.bg, '#ffffff', .03) : mix(c.bg, '#ffffff', .5);
      t.surface = dark ? mix(c.bg, '#ffffff', .07) : lum(c.bg) > .85 ? mix(c.bg, '#000000', .02) : mix(c.bg, '#ffffff', .7);
      t.cell = dark ? mix(c.bg, '#ffffff', .13) : mix(c.bg, '#000000', .07);
      t.line = dark ? mix(c.bg, '#ffffff', .2) : mix(c.bg, '#000000', .14);
      if (!c.ink) t.ink = dark ? '#f4f4f6' : '#1c2033';
    }
    if (c.ink) t.ink = c.ink;
    t.muted = readable(mix(t.ink, t.surface, .35), t.surface, t.ink);
    t.accent = c.accent || b.accent;
    t.aink = contrast('#ffffff', t.accent) >= contrast('#111111', t.accent) ? '#ffffff' : '#111111';
    t.atext = readable(t.accent, t.surface, t.ink);
    t.soft = mix(t.accent, t.surface, .84);
    t.lead = 'rgba(' + rgb(t.accent).join(',') + ',.13)';
    t.dark = dark;
    return t;
  }
  const TOKENS = { bg: 'bg', screen: 'screen', surface: 'surface', cell: 'cell', ink: 'ink', muted: 'muted', line: 'line', accent: 'accent', aink: 'accent-ink', atext: 'atext', soft: 'soft', lead: 'lead', good: 'good', bad: 'bad', gold: 'gold' };
  function applyTheme() {
    const th = S.settings.theme, root = document.documentElement, t = colorTokens();
    Object.values(TOKENS).forEach(v => root.style.removeProperty('--' + v));
    if (t) {
      root.setAttribute('data-theme', t.dark ? 'dark' : 'light');
      Object.entries(TOKENS).forEach(([k, v]) => root.style.setProperty('--' + v, t[k]));
    } else if (th === 'light' || th === 'dark') root.setAttribute('data-theme', th);
    else root.removeAttribute('data-theme');
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = bg || '#f3f1ec';
  }
  let colorTab = 'bg';
  function colorPanel() {
    const c = S.settings.colors || {}, cur = c[colorTab];
    const names = { bg: 'Background', ink: 'Text', accent: 'Buttons' };
    const t = colorTokens(), st = getComputedStyle(document.documentElement);
    const now = k => (t ? t[k] : st.getPropertyValue('--' + k).trim());
    const hard = contrast(now('ink'), now('bg')) < 4.5 || contrast(now('ink'), now('surface')) < 4.5;
    return `<div class="seg">${[['system', 'Match phone'], ['light', 'Light'], ['dark', 'Dark']].map(([k, l]) => `<button data-act="theme" data-v="${k}" class="${S.settings.theme === k ? 'on' : ''}">${l}</button>`).join('')}</div>
      <div class="card preview"><span class="pvrow"><b>Dad</b><b class="pvnum">120</b></span><span class="muted small">Uno · round 4</span><span class="pvbtn">+ Round 5</span></div>
      <div class="lbl">Change the color of</div>
      <div class="seg">${Object.entries(names).map(([k, l]) => `<button data-act="ctab" data-v="${k}" class="${colorTab === k ? 'on' : ''}"><i class="dot" style="background:${now(k)}"></i>${l}</button>`).join('')}</div>
      ${hard ? `<p class="warn">⚠ The text is hard to read on this background. Pick a ${lum(now('bg')) < .18 ? 'lighter' : 'darker'} text color.</p>` : ''}
      <div class="sw">
        <button class="${!cur ? 'on' : ''} orig" data-act="cpick" data-v="" aria-label="Original">↺</button>
        ${SWATCH[colorTab].map(h => `<button class="${cur === h ? 'on' : ''}" data-act="cpick" data-v="${h}" style="background:${h}" aria-label="${h}"></button>`).join('')}
        <label class="any" aria-label="Any color"><input id="cany" type="color" value="${cur || now(colorTab)}"></label>
      </div>
      <p class="muted small">↺ puts that one back to the original. The rainbow circle opens every color there is.</p>
      ${c.bg || c.ink || c.accent ? '<button class="btn ghost wide" data-act="creset">Put all colors back to the original</button>' : ''}`;
  }
  let tt;
  function toast(msg) { const el = $('#toast'); el.textContent = msg; el.hidden = false; clearTimeout(tt); tt = setTimeout(() => el.hidden = true, 2200); }

  // ───────── boot ─────────
  load();
  if (!S.players.length && !S.history.length && !S.games.length) S.players = [];
  applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { applyTheme(); if (V.name === 'settings') refreshColors(); });
  render();
  if (!S.players.length) setTimeout(() => { if (!S.players.length) addPlayerSheet(); }, 400);
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
  window.__tally = { compute, get S() { return S; } };
})();
