// Tally game library. Each game is a preset of one scoring style:
//   rounds  - everyone scores every round (columns = players, rows = rounds)
//   winner  - only the player who went out scores that round
//   calc    - bid-and-tricks games; the app works out each round's score
//   sheet   - score once at the end, in labeled boxes (cats)
//   counter - big + / - buttons, points move all game long
//   wins    - no points, just who won each game
// Options: win 'high'|'low', target (ends when someone reaches it), rounds (fixed number),
// names (round labels), rl (round label word), q (quick-add chips [label, value]),
// teams, calc, phase (Phase 10), start/loseAt/steps/exact/bust (counters),
// tby (target by player count), r (the one-line rule shown in the app).
(function () {
  const L = [];
  let cat = '', grp = '';
  const G = (n, s, o = {}) => L.push(Object.assign({ n, s, c: cat, g: grp, win: 'high' }, o));
  const range = (a, b) => { const r = []; for (let i = a; a <= b ? i <= b : i >= b; i += a <= b ? 1 : -1) r.push(i); return r; };

  // ───────────────────────── CARD GAMES ─────────────────────────
  cat = 'card';

  grp = 'Uno & friends';
  G('Uno', 'winner', { target: 500, r: 'Round winner scores the cards left in everyone else\'s hands · first to 500',
    q: [['Draw Two', 20], ['Reverse', 20], ['Skip', 20], ['Wild', 50], ['Wild Draw 4', 50]] });
  G('Uno Flip!', 'winner', { target: 500, r: 'Round winner scores everyone else\'s cards · first to 500',
    q: [['Draw One', 10], ['Reverse / Skip / Flip', 20], ['Draw Five', 20], ['Skip Everyone', 30], ['Wild', 40], ['Wild Draw Two', 50], ['Wild Draw Color', 60]] });
  G('Uno Attack!', 'winner', { target: 500, r: 'Round winner scores everyone else\'s cards · first to 500',
    q: [['Skip / Reverse / Hit 2', 20], ['Discard All', 30], ['Wild', 50]] });
  G('Uno All Wild!', 'winner', { target: 500, r: 'Round winner scores everyone else\'s cards · first to 500',
    q: [['Wild', 20], ['Action Wild', 50]] });
  G('Uno Show \'Em No Mercy', 'wins', { r: 'Last player standing wins (25 cards and you\'re out) · tap the winner' });
  G('Dos', 'winner', { target: 200, r: 'Round winner scores everyone else\'s cards · first to 200', q: [['Wild DOS', 20], ['Wild #', 40]] });
  G('Uno Golf', 'rounds', { win: 'low', rounds: 9, rl: 'Hole', r: 'Clear matching columns to cut your points · 9 holes · lowest total wins' });
  G('Phase 10', 'rounds', { win: 'low', phase: true, r: 'Finish all 10 phases first to win · points break ties, lowest wins',
    q: [['Card 1–9', 5], ['Card 10–12', 10], ['Skip', 15], ['Wild', 25]] });
  G('Skip-Bo', 'winner', { target: 500, r: 'Winner scores 25 plus 5 for each card left in other stockpiles · first to 500',
    q: [['Going out', 25], ['Stockpile card', 5]] });
  G('Crazy Eights', 'winner', { r: 'Player who goes out scores everyone else\'s cards · set your target',
    q: [['Eight', 50], ['Face card', 10], ['Ace', 1]] });

  grp = 'Rummy family';
  G('Rummy 500', 'rounds', { target: 500, r: 'Score melds minus cards left in hand each round · first to 500',
    q: [['Ace', 15], ['Face card / 10', 10]] });
  G('Gin Rummy', 'winner', { target: 100, r: 'Hand winner scores the deadwood difference plus bonuses · first to 100',
    q: [['Gin bonus', 25], ['Undercut bonus', 25]] });
  G('Five Crowns', 'rounds', { win: 'low', rounds: 11, names: ['3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'Jacks', 'Queens', 'Kings'],
    r: '11 rounds, 3s up to Kings · lowest total wins', q: [['Joker', 50], ['Wild card', 20], ['King', 13], ['Queen', 12], ['Jack', 11]] });
  G('Contract Rummy', 'rounds', { win: 'low', rounds: 7, rl: 'Deal',
    r: 'Also called Liverpool or Shanghai · 7 deals, each with a set contract · lowest total wins' });
  G('Canasta', 'rounds', { teams: true, target: 5000, r: 'Partners score melds, canastas and bonuses each hand · first to 5,000',
    q: [['Natural canasta', 500], ['Mixed canasta', 300], ['Going out', 100], ['Red three', 100], ['Joker', 50], ['Ace / 2', 20], ['8–K', 10], ['4–7 / black 3', 5]] });
  G('Hand and Foot', 'rounds', { teams: true, rounds: 4, rl: 'Hand', r: '4 hands · meld 50, 90, 120, 150 to go down · highest total wins',
    q: [['Clean book', 500], ['Dirty book', 300], ['Wild book', 1500], ['Going out', 100], ['Red three', 100], ['Joker', 50], ['Ace / 2', 20], ['8–K', 10], ['4–7', 5]] });
  G('Golf (card game)', 'rounds', { win: 'low', rounds: 9, rl: 'Hole', r: '9 holes · lowest total wins',
    q: [['Jack / Queen', 10], ['Ace', 1], ['King', 0]] });
  G('Quiddler', 'rounds', { rounds: 8, names: range(3, 10).map(n => n + ' cards'), r: '8 hands, 3 cards up to 10 · spell words, highest total wins',
    q: [['Longest word', 10], ['Most words', 10]] });

  grp = 'Trick-taking';
  G('Hearts', 'rounds', { win: 'low', target: 100, r: 'Game ends when someone hits 100 · lowest total wins',
    q: [['Heart', 1], ['Queen of Spades', 13], ['Shoot the moon (others)', 26]] });
  G('Spades', 'calc', { calc: 'spades', teams: true, target: 500,
    r: 'Make your bid: 10 per trick bid + 1 per bag; miss: lose 10 per trick bid · every 10 bags costs 100 · first to 500' });
  G('Spades (cutthroat)', 'calc', { calc: 'spades', target: 500, r: 'Spades with no partners · same bid scoring · first to 500' });
  G('Euchre', 'rounds', { teams: true, target: 10, r: 'Make it 1 point, all 5 tricks 2, alone with all 5 is 4, euchre the makers 2 · first to 10',
    q: [['Made it', 1], ['March / euchred them', 2], ['Loner march', 4]] });
  G('Oh Hell', 'calc', { calc: 'ohhell', r: 'Also Up and Down the River · bid exactly right: 10 + your bid · miss: 0' });
  G('Wizard', 'calc', { calc: 'wizard', rounds: 'wizard', rl: 'cards',
    r: 'Bid exactly: 20 + 10 per trick · miss: lose 10 per trick off · 60 cards ÷ players = rounds' });
  G('Skull King', 'calc', { calc: 'skullking', rounds: 10, rl: 'cards',
    r: 'Bid exactly: 20 per trick + bonuses · miss: lose 10 per trick off · bid zero: ±10 × round' });
  G('Rage', 'calc', { calc: 'rage', rounds: 10, names: range(10, 1).map(n => n + (n === 1 ? ' card' : ' cards')),
    r: '1 per trick · exact bid +10 (+5 for a correct zero) · Bonus and Mad Rage cards ±5' });
  G('Pinochle', 'rounds', { teams: true, target: 1500, r: 'Meld plus counters each hand · set if you miss the bid · first to 1,500 (set yours)' });
  G('Rook', 'rounds', { teams: true, target: 500, r: 'Bid team scores counters if they make it, loses the bid if not · first to 500' });
  G('Bid Whist', 'rounds', { teams: true, target: 7, r: 'Books over six count toward the bid · first to 7' });
  G('Whist', 'rounds', { teams: true, target: 7, r: '1 point per trick over six · first to 7 (5 in British whist)' });
  G('500 (Five Hundred)', 'rounds', { teams: true, target: 500, r: 'Make your bid to score it, miss and lose it · first to 500 (−500 loses)' });
  G('Pitch', 'rounds', { teams: true, target: 21, r: 'High, Low, Jack, Game · bidder sets back if short · first to 21' });
  G('Smear', 'rounds', { teams: true, target: 21, r: 'High, Low, Jack, Game and more · usually first to 21' });
  G('Sheepshead', 'rounds', { r: 'Wisconsin\'s game · points move between picker and the rest each hand' });
  G('Bridge', 'rounds', { teams: true, r: 'Enter each side\'s points per hand · set the target you play to' });

  grp = 'Family card games';
  G('Nertz', 'rounds', { target: 100, r: '+1 per card played to the center, −2 per card left in your Nertz pile · first to 100' });
  G('Dutch Blitz', 'rounds', { target: 75, r: '+1 per card in the Dutch piles, −2 per card left in your Blitz pile · first to 75' });
  G('Racko', 'rounds', { target: 500, r: 'Going Racko scores 75 · 5 per card in order from the front · first to 500',
    q: [['Racko', 75], ['Card in order', 5]] });
  G('Mille Bornes', 'rounds', { target: 5000, r: 'Miles traveled plus safety and trip bonuses · first to 5,000',
    q: [['Trip complete', 400], ['Safety', 100], ['Coup fourré', 300], ['All 4 safeties bonus', 300], ['Safe trip', 300], ['Delayed action', 300], ['Extension', 200], ['Shutout', 500]] });
  G('Pit', 'rounds', { target: 500, r: 'Corner the market to score that commodity · first to 500' });
  G('Skyjo', 'rounds', { win: 'low', target: 100, r: 'Game ends when someone hits 100 · lowest total wins · ender doubles if not lowest' });
  G('Flip 7', 'rounds', { target: 200, r: 'Bank your cards or bust · Flip 7 bonus +15 · first to 200', q: [['Flip 7 bonus', 15]] });
  G('Flip 7: With a Vengeance', 'rounds', { target: 200, r: 'Same as Flip 7, but modifiers take points away · first to 200',
    q: [['Flip 7 bonus', 15], ['−2', -2], ['−4', -4], ['−6', -6], ['−8', -8], ['−10', -10]] });
  G('Dragonwood', 'sheet', { cats: [{ n: 'Creature points', h: 'add up the shields on the creatures you captured' }, { n: 'Most creatures', chips: [['Most creatures bonus', 3]] }],
    r: 'Capture creatures for points · +3 for capturing the most · highest total wins' });
  G('Happy Salmon', 'wins', { r: 'First to get rid of all their cards shouts "FIN-ished!"' });
  G('Cabo', 'rounds', { win: 'low', target: 100, r: 'Lowest hand wins the round · hit exactly 100 and drop to 50 · over 100 ends it' });
  G('Sushi Go!', 'rounds', { rounds: 3, r: '3 rounds · count pudding at the end of round 3 · highest total wins',
    q: [['Tempura pair', 5], ['Sashimi set', 10], ['Squid nigiri', 3], ['Most pudding', 6], ['Least pudding', -6]] });
  G('Sushi Go Party!', 'rounds', { rounds: 3, r: '3 rounds · highest total wins' });
  G('6 Nimmt!', 'rounds', { win: 'low', target: 66, r: 'Take a row and score its bullheads · ends at 66 · fewest bullheads wins' });
  G('No Thanks!', 'sheet', { win: 'low', cats: [{ n: 'Card runs (lowest card of each run)' }, { n: 'Chips', neg: true, h: 'each chip subtracts 1' }],
    r: 'Lowest card of each run counts · chips subtract · lowest total wins' });
  G('Lost Cities', 'rounds', { rounds: 3, r: 'Each expedition: (cards − 20) × wager · +20 for 8+ cards · 3 rounds' });
  G('Love Letter', 'counter', { tby: { 2: 7, 3: 5, 4: 4 }, steps: [1], unit: 'tokens', r: 'Win a round, get a token · 2 players: 7 · 3: 5 · 4: 4 (classic edition)' });
  G('Skull', 'counter', { target: 2, steps: [1], unit: 'wins', r: 'Win two challenges, or be the last one with cards' });
  G('Munchkin', 'counter', { start: 1, target: 10, steps: [1], unit: 'level', r: 'Everyone starts at level 1 · first to level 10 wins' });
  G('Coup', 'wins', { r: 'Last player with influence wins' });
  G('Exploding Kittens', 'wins', { r: 'Last player who hasn\'t exploded wins' });
  G('Taco Cat Goat Cheese Pizza', 'wins', { r: 'First to get rid of all their cards wins' });
  G('Sleeping Queens', 'wins', { r: 'Wake enough queens or points first' });
  G('Monopoly Deal', 'wins', { r: 'First to 3 full property sets wins' });
  G('Cover Your Assets', 'wins', { r: 'First to $1,000,000 wins' });
  G('Unstable Unicorns', 'wins', { r: 'First to fill their stable wins' });
  G('Here to Slay', 'wins', { r: 'Slay 3 monsters or own 6 hero classes' });
  G('Fluxx', 'wins', { r: 'Match the current Goal to win' });
  G('Bang!', 'wins', { r: 'Your role decides how you win' });
  G('Throw Throw Burrito', 'rounds', { rounds: 2, r: 'Sets 1 point, burrito sets 2 · each bruise −1 · most points after 2 rounds',
    q: [['Set of 3', 1], ['Burrito set', 2], ['Bruise', -1]] });
  G('Spot It!', 'wins', { r: 'Fastest eyes win · tap the winner of each game' });
  G('Blink', 'wins', { r: 'First to empty their draw pile wins' });
  G('Sequence', 'wins', { r: 'Make your sequences first · works with teams too' });
  G('Jaipur', 'wins', { r: 'Best two out of three rounds (seals of excellence)' });

  grp = 'Kids\' classics';
  G('Go Fish', 'wins', { r: 'Most books wins' });
  G('Old Maid', 'wins', { r: 'Tap whoever is left without the Old Maid... or track who got stuck' });
  G('War', 'wins', { r: 'Win all the cards' });
  G('Slapjack', 'wins', { r: 'Fastest hand wins all the cards' });
  G('Snap', 'wins', { r: 'Win all the cards' });
  G('Memory', 'sheet', { cats: [{ n: 'Pairs found' }], r: 'Most pairs wins' });
  G('Spoons', 'wins', { r: 'Don\'t be the one left without a spoon' });
  G('Speed / Spit', 'wins', { r: 'First to play out all their cards' });
  G('Egyptian Ratscrew', 'wins', { r: 'Win the whole deck' });
  G('Kings in the Corner', 'wins', { r: 'First to play all their cards' });
  G('Garbage (Trash)', 'wins', { r: 'First to fill all ten spots' });
  G('Cheat (I Doubt It)', 'wins', { r: 'First to get rid of all their cards' });
  G('Pig (card game)', 'wins', { r: 'Four of a kind, then touch your nose' });
  G('President', 'wins', { r: 'First out becomes President · tap each game\'s President' });
  G('Kemps', 'wins', { r: 'Partners with a secret signal · tap the winning pair' });
  G('Poopy Diapers', 'sheet', { cats: [{ n: 'Points' }], r: 'Change the most diapers by nap time · most points wins' });

  grp = 'Casino & classic';
  G('Cribbage', 'counter', { target: 121, steps: [1, 2, 3, 4, 6, 8, 12], unit: 'holes', r: 'Peg your hand, crib and play · first to 121' });
  G('Casino', 'rounds', { target: 21, r: 'Cards, spades, Big and Little Casino, aces and sweeps · first to 21',
    q: [['Most cards', 3], ['Most spades', 1], ['Big Casino (10♦)', 2], ['Little Casino (2♠)', 1], ['Ace', 1], ['Sweep', 1]] });
  G('Thirty-One (Scat)', 'counter', { start: 3, loseAt: 0, steps: [1], unit: 'lives', r: 'Lowest hand loses a life · last player with lives wins' });
  G('Blackjack (chips)', 'counter', { start: 100, loseAt: 0, steps: [5, 10, 25], unit: 'chips', r: 'Track everyone\'s chip stack' });
  G('Poker (chips)', 'counter', { start: 1000, loseAt: 0, steps: [25, 100, 500], unit: 'chips', r: 'Track everyone\'s chip stack · out at zero' });
  G('Spite and Malice', 'wins', { r: 'First to empty their pay-off pile' });
  G('Durak', 'wins', { r: 'The last one holding cards is the fool' });

  grp = 'Trading card games';
  G('Magic: The Gathering', 'counter', { start: 20, loseAt: 0, steps: [1, 2, 3, 5], unit: 'life', r: 'Everyone starts at 20 life · out at 0' });
  G('Magic: Commander', 'counter', { start: 40, loseAt: 0, steps: [1, 2, 3, 5, 10], unit: 'life', r: 'Everyone starts at 40 life · out at 0' });
  G('Pokémon TCG', 'counter', { start: 0, target: 6, steps: [1, 2], unit: 'prizes', r: 'Take all 6 prize cards first to win' });
  G('Yu-Gi-Oh!', 'counter', { start: 8000, loseAt: 0, steps: [100, 500, 1000], unit: 'LP', r: 'Everyone starts at 8,000 Life Points · out at 0' });
  G('Disney Lorcana', 'counter', { start: 0, target: 20, steps: [1, 2, 3], unit: 'lore', r: 'First to 20 lore wins' });
  G('Flesh and Blood', 'counter', { start: 40, loseAt: 0, steps: [1, 2, 3, 5], unit: 'life', r: 'Start at your hero\'s life (change it in setup) · out at 0' });

  // ───────────────────────── BOARD GAMES ─────────────────────────
  cat = 'board';

  grp = 'Family classics';
  ['Monopoly', 'Sorry!', 'Trouble', 'Clue', 'Candy Land', 'Chutes and Ladders', 'Connect 4', 'Battleship', 'Guess Who?',
    'Mouse Trap', 'Jenga', 'Perfection', 'Trivial Pursuit', 'Risk', 'Stratego', 'Parcheesi', 'Aggravation',
    'Hedbanz', 'Pie Face', 'Don\'t Break the Ice', 'Hi Ho! Cherry-O', 'Chess', 'Checkers', 'Labyrinth', 'Mastermind',
    'Hungry Hungry Hippos', 'Pictionary', 'Uno Stacko', 'Kerplunk', 'Twister']
    .forEach(n => G(n, 'wins', { r: 'Tap the winner of each game · the app keeps the record' }));
  G('Bounce-Off', 'counter', { target: 3, steps: [1], unit: 'cards', r: 'Bounce your balls into the card\'s pattern first to win the card · first to 3 cards' });
  G('Topple', 'counter', { target: 100, steps: [1, 3, 10], unit: 'points', r: '3 for finishing a row, 1 for each stack you top · knock pieces off: −10 · first to 100' });
  G('Super Mario Level Up!', 'rounds', { rounds: 3, r: '3 rounds · score the levels your secret characters reached · most points wins' });
  G('Wheel of Fortune', 'rounds', { rl: 'Puzzle', r: 'Solve the puzzle to bank that round\'s money · most money wins' });
  G('Pac-Man: The Board Game', 'winner', { wq: 'Who was Pac-Man?', wl: 'Points they scored as Pac-Man', rl: 'Turn',
    r: 'Everyone takes a turn as Pac-Man · highest score wins' });
  G('Tetris', 'sheet', { cats: [{ n: 'Final score' }], r: 'Enter everyone\'s final score · highest wins (or use Just who won for race versions)' });
  G('I Need a New Butt!', 'wins', { r: 'First to collect a whole new butt wins' });
  G('Tower Stack', 'wins', { r: 'Don\'t be the one who knocks the tower over · tap the winner' });
  G('The Game of Life', 'sheet', { cats: [{ n: 'Cash' }, { n: 'Retirement / house value' }, { n: 'Life tiles' }, { n: 'Loans', neg: true }], r: 'Count up at retirement · most money wins' });
  G('Operation', 'sheet', { cats: [{ n: 'Money earned' }], r: 'Most money wins' });
  G('Mancala', 'sheet', { cats: [{ n: 'Stones in your store' }], r: 'Most stones wins' });
  G('Othello', 'sheet', { cats: [{ n: 'Discs of your color' }], r: 'Most discs wins' });
  G('Blokus', 'sheet', { cats: [{ n: 'Squares left over', neg: true, h: 'each square subtracts 1' }, { n: 'Bonus', h: '+15 for placing every piece, or +20 if the last one was the single square' }],
    r: 'Lose 1 per leftover square · +15 for placing everything · highest wins' });
  G('Scrabble', 'rounds', { rl: 'Turn', r: 'Score every turn · leftover tiles subtract at the end · highest wins', q: [['Bingo (all 7 tiles)', 50]] });
  G('Backgammon', 'counter', { target: 5, steps: [1, 2, 3], unit: 'points', r: 'Single game 1, gammon 2, backgammon 3 · first to 5 (set your match length)' });

  grp = 'Modern board games';
  G('Catan', 'counter', { target: 10, steps: [1, 2], unit: 'VP', r: 'Settlement 1, city 2, longest road 2, largest army 2 · first to 10' });
  G('Catan: Cities & Knights', 'counter', { target: 13, steps: [1, 2], unit: 'VP', r: 'First to 13 victory points' });
  G('Ticket to Ride', 'sheet', { cats: [
    { n: 'Routes', sum: true, chips: [['1 train', 1], ['2 trains', 2], ['3 trains', 4], ['4 trains', 7], ['5 trains', 10], ['6 trains', 15]], h: 'tap each route you claimed' },
    { n: 'Tickets completed' }, { n: 'Tickets missed', neg: true }, { n: 'Longest route', chips: [['Longest route', 10]] }],
    r: 'Routes + completed tickets − missed tickets + 10 for the longest route' });
  G('Ticket to Ride: Europe', 'sheet', { cats: [
    { n: 'Routes', sum: true, chips: [['1 train', 1], ['2 trains', 2], ['3 trains', 4], ['4 trains', 7], ['5 trains', 10], ['6 trains', 15], ['8 trains', 21]], h: 'tap each route you claimed' },
    { n: 'Tickets completed' }, { n: 'Tickets missed', neg: true }, { n: 'Stations kept', mult: 4, h: 'how many unused stations (4 each)' },
    { n: 'European Express', chips: [['Longest route', 10]] }], r: 'Routes + tickets − missed + 4 per unused station + 10 longest' });
  G('Wingspan', 'sheet', { cats: [{ n: 'Birds' }, { n: 'Bonus cards' }, { n: 'End-of-round goals' }, { n: 'Eggs' }, { n: 'Food on cards' }, { n: 'Tucked cards' }],
    r: '1 point per egg, cached food and tucked card · highest total wins' });
  G('7 Wonders', 'sheet', { cats: [{ n: 'Military', h: 'can be negative' }, { n: 'Coins', div: 3, h: 'enter coins · 3 coins = 1 point' }, { n: 'Wonder' },
    { n: 'Civilian (blue)' }, { n: 'Science (green)', h: 'each symbol count squared + 7 per set of 3' }, { n: 'Commercial (yellow)' }, { n: 'Guilds (purple)' }],
    r: 'Add up all seven categories · highest wins' });
  G('7 Wonders Duel', 'sheet', { cats: [{ n: 'Civilian (blue)' }, { n: 'Science (green)' }, { n: 'Commercial (yellow)' }, { n: 'Guilds (purple)' },
    { n: 'Wonders' }, { n: 'Progress tokens' }, { n: 'Coins', div: 3, h: 'enter coins · 3 coins = 1 point' }, { n: 'Military', chips: [['2', 2], ['5', 5], ['10', 10]] }],
    r: 'Military or science supremacy wins instantly · otherwise most points' });
  G('Cascadia', 'sheet', { cats: ['Bear', 'Elk', 'Salmon', 'Hawk', 'Fox', 'Mountains', 'Forests', 'Prairies', 'Wetlands', 'Rivers', 'Habitat bonuses', 'Nature tokens'].map(n => ({ n })),
    r: 'Wildlife cards + largest habitats + bonuses + nature tokens' });
  G('Kingdomino', 'sheet', { cats: [{ n: 'Properties', h: 'squares × crowns for each area' }, { n: 'Middle Kingdom', chips: [['Castle centered', 10]] }, { n: 'Harmony', chips: [['Full 5×5 grid', 5]] }],
    r: 'Each area scores squares × crowns · optional +10 and +5 bonuses' });
  G('Everdell', 'sheet', { cats: [{ n: 'Card points' }, { n: 'Point tokens' }, { n: 'Prosperity bonuses' }, { n: 'Journey' }, { n: 'Events' }], r: 'Highest total wins' });
  G('Terraforming Mars', 'sheet', { cats: [{ n: 'Terraform rating' }, { n: 'Milestones' }, { n: 'Awards' }, { n: 'Greeneries' }, { n: 'Cities' }, { n: 'Card points' }], r: 'Highest total wins' });
  G('Agricola', 'sheet', { cats: [{ n: 'Fields' }, { n: 'Pastures' }, { n: 'Grain' }, { n: 'Vegetables' }, { n: 'Sheep' }, { n: 'Wild boar' }, { n: 'Cattle' },
    { n: 'Unused spaces', mult: -1, h: 'how many (−1 each)' }, { n: 'Fenced stables', h: '1 each' }, { n: 'Clay rooms', mult: 1, h: 'how many (1 each)' },
    { n: 'Stone rooms', mult: 2, h: 'how many (2 each)' }, { n: 'Family members', mult: 3, h: 'how many (3 each)' }, { n: 'Begging cards', mult: -3, h: 'how many (−3 each)' },
    { n: 'Card points' }, { n: 'Bonus points' }], r: 'Score every category on the scoring pad · highest wins' });
  G('Cartographers', 'sheet', { cats: [{ n: 'Spring' }, { n: 'Summer' }, { n: 'Autumn' }, { n: 'Winter' }], r: 'Each season: two edicts + coins − monster spaces' });
  G('Patchwork', 'sheet', { cats: [{ n: 'Buttons' }, { n: 'Empty squares', mult: -2, h: 'how many (−2 each)' }, { n: '7×7 bonus tile', chips: [['Bonus tile', 7]] }],
    r: 'Buttons − 2 per empty square + 7 for the bonus tile' });
  G('Azul', 'rounds', { r: 'Score as you tile each round · end bonuses: row 2, column 7, color 10' , q: [['Full row', 2], ['Full column', 7], ['All of a color', 10]] });
  G('Carcassonne', 'counter', { steps: [1, 2, 3, 4, 5, 10], unit: 'points', r: 'Score roads, cities, monasteries and farms · highest wins' });
  G('Splendor', 'counter', { target: 15, steps: [1, 2, 3, 4, 5], unit: 'prestige', r: 'First to 15 prestige ends the round' });
  G('King of Tokyo', 'counter', { target: 20, steps: [1, 2, 3], unit: 'stars', r: 'First to 20 victory points (or last monster standing)' });
  G('Dixit', 'counter', { target: 30, steps: [1, 2, 3], unit: 'points', r: 'First to 30 points' });
  G('Root', 'counter', { target: 30, steps: [1, 2, 3], unit: 'VP', r: 'First to 30 victory points' });
  G('Viticulture', 'counter', { target: 20, steps: [1, 2, 3], unit: 'VP', r: 'Reaching 20 VP ends the year' });
  G('Dune: Imperium', 'counter', { target: 10, steps: [1], unit: 'VP', r: 'Reaching 10 VP ends the game' });
  ['Dominion', 'Sagrada', 'Camel Up', 'Small World', 'Lords of Waterdeep', 'Quacks of Quedlinburg', 'Takenoko', 'Scythe',
    'Ark Nova', 'Stone Age', 'Puerto Rico', 'Tokaido', 'Kingdom Builder', 'Sheriff of Nottingham', 'Five Tribes', 'Clank!', 'Castles of Burgundy']
    .forEach(n => G(n, 'sheet', { cats: [{ n: 'Final score' }], r: 'Enter everyone\'s final score · highest wins' }));
  ['Machi Koro', 'Santorini', 'Hive', 'Power Grid', 'Heat: Pedal to the Metal', 'Codenames: Duet']
    .forEach(n => G(n, 'wins', { r: 'Tap the winner of each game' }));

  // ───────────────────────── DICE & TILES ─────────────────────────
  cat = 'dice';

  grp = 'Dice games';
  const up = (n, v) => ({ n, chips: range(0, 5).map(k => [k + '×', k * v]), h: 'add up only the ' + n.toLowerCase(), upper: true });
  G('Yahtzee', 'sheet', { special: 'yahtzee', cats: [up('Ones', 1), up('Twos', 2), up('Threes', 3), up('Fours', 4), up('Fives', 5), up('Sixes', 6),
    { n: '3 of a kind', h: 'total of all 5 dice' }, { n: '4 of a kind', h: 'total of all 5 dice' }, { n: 'Full house', chips: [['Scratch', 0], ['Full house', 25]] },
    { n: 'Small straight', chips: [['Scratch', 0], ['Sm straight', 30]] }, { n: 'Large straight', chips: [['Scratch', 0], ['Lg straight', 40]] },
    { n: 'Yahtzee', chips: [['Scratch', 0], ['Yahtzee', 50]] }, { n: 'Chance', h: 'total of all 5 dice' },
    { n: 'Yahtzee bonus', mult: 100, h: 'how many extra Yahtzees (100 each)' }], r: '13 boxes · upper section 63+ earns 35 · highest total wins' });
  G('Yatzy', 'sheet', { special: 'yatzy', cats: [up('Ones', 1), up('Twos', 2), up('Threes', 3), up('Fours', 4), up('Fives', 5), up('Sixes', 6),
    { n: 'One pair' }, { n: 'Two pairs' }, { n: 'Three of a kind' }, { n: 'Four of a kind' },
    { n: 'Small straight', chips: [['Scratch', 0], ['1-2-3-4-5', 15]] }, { n: 'Large straight', chips: [['Scratch', 0], ['2-3-4-5-6', 20]] },
    { n: 'Full house', h: 'total of all 5 dice' }, { n: 'Chance' }, { n: 'Yatzy', chips: [['Scratch', 0], ['Yatzy', 50]] }],
    r: 'Scandinavian Yahtzee · upper section 63+ earns 50' });
  const farkle = [['Single 1', 100], ['Single 5', 50], ['Three 2s', 200], ['Three 3s', 300], ['Three 4s', 400], ['Three 5s', 500], ['Three 1s', 1000],
    ['Four of a kind', 1000], ['Straight 1–6', 1500], ['Three pairs', 1500]];
  G('Farkle', 'rounds', { target: 10000, rl: 'Turn', r: 'Bank your points each turn · first to 10,000 (check your house values)', q: farkle });
  G('Zilch', 'rounds', { target: 10000, rl: 'Turn', r: 'Farkle\'s cousin · first to 10,000', q: farkle });
  G('Pig (dice)', 'rounds', { target: 100, rl: 'Turn', r: 'Roll and bank · a 1 loses your turn total · first to 100' });
  G('Bunco', 'rounds', { rounds: 6, r: '6 rounds, one per number · 1 per matching die, Bunco 21',
    q: [['Match', 1], ['Three of a kind', 5], ['Bunco', 21]] });
  G('Qwixx', 'sheet', { cats: [{ n: 'Red', tri: true }, { n: 'Yellow', tri: true }, { n: 'Green', tri: true }, { n: 'Blue', tri: true },
    { n: 'Penalties', mult: -5, h: 'how many (−5 each)' }], r: 'Enter marks per row; the app turns them into points (12 marks = 78)' });
  G('Ship, Captain & Crew', 'rounds', { r: 'Get 6, 5, 4, then your cargo is the score · highest wins' });
  G('Shut the Box', 'rounds', { win: 'low', r: 'Your score is the sum of tiles left open · lowest total wins' });
  G('Left Center Right', 'counter', { start: 3, steps: [1], unit: 'chips', r: 'Everyone starts with 3 chips · last one holding chips wins' });
  G('Liar\'s Dice', 'counter', { start: 5, loseAt: 0, steps: [1], unit: 'dice', r: 'Lose a die when you\'re caught · last one with dice wins' });
  G('Tenzi', 'wins', { r: 'First to roll all ten the same' });
  G('Can\'t Stop', 'wins', { r: 'First to claim three columns' });
  G('Roll for It!', 'wins', { r: 'First to 40 points' });

  grp = 'Word games';
  G('Boggle', 'rounds', { r: '3–4 letters 1 · 5 letters 2 · 6 letters 3 · 7 letters 5 · 8+ letters 11',
    q: [['3–4 letters', 1], ['5 letters', 2], ['6 letters', 3], ['7 letters', 5], ['8+ letters', 11]] });
  G('Bananagrams', 'wins', { r: 'First to use all their tiles yells Bananas!' });
  G('Upwords', 'rounds', { rl: 'Turn', r: 'Score every turn · highest wins' });
  G('Scattergories', 'rounds', { rounds: 3, r: '3 rounds · 1 point per unique answer' });

  grp = 'Dominoes & tiles';
  G('Mexican Train', 'rounds', { win: 'low', rounds: 13, names: ['Double 12', 'Double 11', 'Double 10', 'Double 9', 'Double 8', 'Double 7', 'Double 6', 'Double 5', 'Double 4', 'Double 3', 'Double 2', 'Double 1', 'Double blank'],
    r: '13 rounds, double 12 down to blank · pips left in hand · lowest total wins', q: [['Double blank', 50]] });
  G('Chicken Foot', 'rounds', { win: 'low', rounds: 10, names: ['Double 9', 'Double 8', 'Double 7', 'Double 6', 'Double 5', 'Double 4', 'Double 3', 'Double 2', 'Double 1', 'Double blank'],
    r: '10 rounds, double 9 down to blank · lowest total wins', q: [['Double blank', 50]] });
  G('Dominoes (Draw)', 'winner', { target: 100, r: 'Hand winner scores the pips left in everyone else\'s hands · first to 100' });
  G('All Fives (Muggins)', 'counter', { steps: [5, 10, 15, 20], unit: 'points', r: 'Score when the ends add to a multiple of 5' });
  G('Triominos', 'rounds', { target: 400, r: 'Score every play plus bonuses · first to 400',
    q: [['Bridge', 40], ['Hexagon', 50], ['Going out', 25]] });
  G('Qwirkle', 'rounds', { rl: 'Turn', r: 'Score every turn · a Qwirkle scores 12 · going out +6', q: [['Qwirkle', 12], ['Went out', 6]] });
  G('Rummikub', 'rounds', { r: 'Winner scores everyone\'s leftover tiles; others subtract their own · Joker 30', q: [['Joker', 30]] });

  // ───────────────────────── PARTY & YARD ─────────────────────────
  cat = 'party';

  grp = 'Party games';
  G('Apples to Apples', 'counter', { tby: { 4: 8, 5: 7, 6: 6, 7: 5, 8: 4, 9: 4, 10: 4 }, steps: [1], unit: 'cards', r: 'Win green apples · target depends on players' });
  G('Cards Against Humanity', 'counter', { steps: [1], unit: 'cards', r: 'Most Awesome Points wins · play to whatever you like' });
  G('What Do You Meme?', 'counter', { steps: [1], unit: 'cards', r: 'Win caption cards · set your target' });
  G('Telestrations', 'counter', { steps: [1], unit: 'points', r: 'Award points for favorites · highest wins' });
  G('Taboo', 'rounds', { teams: true, r: 'Points for words guessed, minus buzzes' });
  G('Catch Phrase', 'counter', { teams: true, target: 7, steps: [1, 2], unit: 'points', r: 'First team to 7' });
  G('Wavelength', 'counter', { teams: true, target: 10, steps: [1, 2, 3, 4], unit: 'points', r: 'First team to 10' });
  G('Codenames', 'wins', { teams: true, r: 'Find all your agents first · tap the winning team' });
  G('Charades', 'rounds', { teams: true, r: 'A point per correct guess' });
  G('Heads Up!', 'rounds', { r: 'Correct guesses each turn · highest wins' });
  G('Trivia night', 'rounds', { r: 'Points per round · highest wins' });
  G('Werewolf / Mafia', 'wins', { r: 'Village or wolves · tap the winners' });

  grp = 'Yard & sports';
  G('Cornhole', 'rounds', { teams: true, target: 21, r: 'In the hole 3, on the board 1 · cancel scoring · first to 21', q: [['In the hole', 3], ['On the board', 1]] });
  G('Ladder Golf', 'rounds', { target: 21, r: 'Top rung 3, middle 2, bottom 1 · exactly 21 wins', q: [['Top rung', 3], ['Middle rung', 2], ['Bottom rung', 1]] });
  G('Washers', 'rounds', { target: 21, r: 'Cup 3, box 1 · first to 21', q: [['In the cup', 3], ['In the box', 1]] });
  G('Horseshoes', 'rounds', { target: 40, r: 'Ringer 3, closest shoe 1 · first to 40 (casual games often play 21)', q: [['Ringer', 3], ['Closest', 1]] });
  G('Bocce', 'rounds', { teams: true, target: 12, r: '1 point per ball closer than the other team\'s best · first to 12 (some play 13)' });
  G('Mölkky', 'counter', { target: 50, exact: true, bust: 25, steps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], unit: 'points', r: 'Exactly 50 wins · go over and drop back to 25' });
  G('Kubb', 'wins', { teams: true, r: 'Topple the king last' });
  G('Mini golf', 'rounds', { win: 'low', rounds: 18, rl: 'Hole', r: '18 holes · fewest strokes wins' });
  G('Golf', 'rounds', { win: 'low', rounds: 18, rl: 'Hole', r: '18 holes · fewest strokes wins' });
  G('Darts 501', 'counter', { start: 501, target: 0, exact: true, bust: 'revert', steps: [1, 5, 10, 20, 25, 50, 60], unit: 'left', r: 'Count down from 501 · hit exactly 0 · go under and the turn doesn\'t count' });
  G('Ping pong', 'counter', { target: 11, steps: [1], unit: 'points', r: 'First to 11' });
  G('Pickleball', 'counter', { teams: true, target: 11, steps: [1], unit: 'points', r: 'First to 11' });
  G('Spikeball', 'counter', { teams: true, target: 21, steps: [1], unit: 'points', r: 'First to 21' });

  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  L.forEach(x => { x.id = slug(x.n); });

  // Junior versions. Most are race-to-finish games, so they track who won.
  const tap = 'Tap the winner of each game';
  const JR = {
    'uno': ['Uno Junior', 'wins', 'First to play all their cards wins'],
    'skip-bo': ['Skip-Bo Junior', 'wins', 'First to play out their stockpile wins'],
    'monopoly': ['Monopoly Junior', 'wins', 'When someone runs out of money, the richest player wins'],
    'clue': ['Clue Junior', 'wins', 'Solve the mystery first'],
    'scrabble': ['Scrabble Junior', 'rounds', 'Score your words each turn · highest wins', { rl: 'Turn' }],
    'the-game-of-life': ['The Game of Life Junior', 'wins', tap],
    'yahtzee': ['Yahtzee Jr.', 'wins', tap],
    'catan': ['Catan Junior', 'wins', tap],
    'ticket-to-ride': ['Ticket to Ride: First Journey', 'wins', tap],
    'carcassonne': ['My First Carcassonne', 'wins', tap],
    'labyrinth': ['Junior Labyrinth', 'wins', tap],
    'sequence': ['Sequence for Kids', 'wins', tap],
    'blokus': ['Blokus Junior', 'wins', tap],
    'rummikub': ['Rummikub Junior', 'wins', tap],
    'boggle': ['Boggle Jr.', 'wins', tap],
    'scattergories': ['Scattergories Junior', 'rounds', '1 point per answer · highest wins'],
    'taboo': ['Taboo Junior', 'rounds', 'Points for words guessed', { teams: true }],
    'apples-to-apples': ['Apples to Apples Junior', 'counter', 'Win green apples · set your target', { steps: [1], unit: 'cards' }]
  };
  Object.entries(JR).forEach(([id, [n, st, r, extra]]) => {
    const p = L.find(x => x.id === id); if (!p) return;
    const j = Object.assign({ n, s: st, r, c: p.c, g: p.g, win: 'high', id: id + '-junior', parent: id, hidden: true }, extra || {});
    p.jr = j.id; L.push(j);
  });
  window.TALLY_GAMES = L;
  window.TALLY_CATS = [['card', 'Card'], ['board', 'Board'], ['dice', 'Dice & tiles'], ['party', 'Party & yard']];
})();
