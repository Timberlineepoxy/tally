// How-to-play rules, written in our own words (not copied from rulebooks).
// Each game: sections of { h: heading, p: paragraph, li: [list items] }, an optional `note`
// for anything the published rules leave unclear, and `links` to fuller or official rules.
window.TALLY_RULES = {
  'uno-golf': {
    sections: [
      { h: 'What you need', p: 'The UNO Golf deck (112 cards: number cards 0–6 in four colors, plus Skip, Reverse, Draw 2 and Double Draw 2). 2–8 players.' },
      { h: 'Setup', li: ['Deal 6 cards face down to each player.', 'Lay yours out in a grid: 2 rows of 3, face down. Turn any one of them face up.', 'Put the rest face down as the draw pile and turn the top card over to start the discard pile (if it\'s an action card, turn another).', 'The player left of the dealer goes first.'] },
      { h: 'On your turn', p: 'Take one card, either from the draw pile or the top of the discard pile.', li: ['From the draw pile, you can swap it into your grid (the card you replace goes face up on the discard pile), or throw it away and flip one of your face-down cards.', 'From the discard pile, you must swap it into your grid.', 'Any card you swap in goes in face up.'] },
      { h: 'Clearing columns', p: 'A column is the 2 cards on top of each other. If both cards match by number or by color, you can clear them both onto the discard pile. That column now scores nothing.' },
      { h: 'Action cards', p: 'An action only happens if it\'s left on top of the discard pile when your turn ends. In your grid it\'s just points.', li: ['Skip: the next player loses their turn.', 'Reverse: play changes direction.', 'Draw 2: the next player adds 2 face-down cards to their grid as a new column and loses their turn.', 'Double Draw 2: either 2 players each add a 2-card column, or 1 player adds 4 cards (2 columns). Nobody loses a turn.'] },
      { h: 'UNO and the end of a hole', li: ['Say "UNO!" when you have one face-down card left. Get caught and you add 2 face-down cards as a new column.', 'The hole ends when someone has every card in their grid face up. Everyone flips their cards and clears any matching columns.', 'Add up what\'s left: number cards count their number, action cards count the points printed in their corner.'] },
      { h: 'How to win', p: 'Play 9 holes. The lowest total wins.' }
    ],
    note: 'The published rules don\'t list the action cards\' points, so use the number printed in the corner of each card. They also don\'t say whether others get one last turn when a hole ends. Decide that as a house rule.',
    links: [['Full rules (Geeky Hobbies)', 'https://www.geekyhobbies.com/uno-golf-rules/']]
  },

  'kings-in-the-corner': {
    sections: [
      { h: 'What you need', p: 'One standard 52-card deck. 2–4 players.' },
      { h: 'Setup', li: ['Deal 7 cards to each player.', 'Put the rest face down in the middle.', 'Turn 4 cards face up, one on each side of the deck (top, bottom, left, right). These are the starting piles.', 'The 4 corners between them stay empty for Kings.'] },
      { h: 'On your turn', li: ['Draw one card from the deck first.', 'Then play as many cards as you want:', 'Build down in order with alternating colors, like a red 9 on a black 10.', 'A King can only go in an empty corner, and starts a new pile there.', 'You can move a whole pile onto another pile if its bottom card fits (one lower, opposite color).', 'If one of the 4 side spots is empty, you can put any card there.', 'Your turn ends when you can\'t or don\'t want to play any more.'] },
      { h: 'How to win', p: 'The first player to get rid of all their cards wins.' }
    ],
    note: 'Some families score leftover cards as penalty points (for example 10 for a King, 1 for anything else) and play several rounds. Add that as a house rule if you like.'
  },

  'garbage-trash': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. With 3 or more players, shuffle 2 decks together.' },
      { h: 'Setup', li: ['Deal each player 10 cards face down in 2 rows of 5, without looking.', 'These are your spots Ace through 10: the top row is Ace–5, the bottom row is 6–10.', 'The rest of the cards are the draw pile. Flip the top one to start the discard pile.'] },
      { h: 'On your turn', li: ['Take the top card of the draw pile or the discard pile.', 'If it\'s an Ace–10 and that spot is still face down, put it there face up. Pick up the face-down card that was there and keep going with it.', 'Jacks are wild. Put one in any spot that\'s still face down.', 'If you later get the real card for a spot with a Jack in it, you can swap it in and use the Jack somewhere else.', 'Your turn ends when you get a card you can\'t use: a Queen, a King, or a number whose spot is already filled. Discard it.'] },
      { h: 'How to win', li: ['The first player with all 10 spots face up wins the round.', 'Next round, the winner gets one fewer card (9 spots, then 8...), and everyone else stays where they were.', 'The first player to win a round with just 1 card wins the game.'] }
    ],
    note: 'Garbage has lots of family versions (Kings wild instead of Jacks, or no wilds at all). Put yours in House rules.'
  },

  'uno-all-wild': {
    sections: [
      { h: 'What you need', p: 'The UNO All Wild! deck (112 cards, every one of them wild). 2–10 players.' },
      { h: 'Setup', li: ['Deal 7 cards to each player.', 'Put the rest face down as the draw pile and flip the top card to start the discard pile.', 'The player left of the dealer goes first.'] },
      { h: 'On your turn', p: 'Every card is wild, so you can play any card from your hand. Its action happens right away.' },
      { h: 'What the cards do', li: ['Wild: no action.', 'Wild Reverse: play changes direction.', 'Wild Skip: the next player loses their turn.', 'Wild Skip Two: the next 2 players lose their turns.', 'Wild Draw Two: the next player draws 2 and loses their turn.', 'Wild Draw Four: the next player draws 4 and loses their turn.', 'Wild Targeted Draw Two: pick any player to draw 2. They don\'t lose their turn.', 'Wild Forced Swap: pick another player and trade your whole hands. You have to swap, even if it hurts you.', 'You can\'t stack draw cards to pass them on.'] },
      { h: 'UNO', p: 'Say "UNO!" when you\'re down to one card. If someone catches you before the next player\'s turn starts, draw 2.' },
      { h: 'Scoring and winning', li: ['The round ends when someone plays their last card.', 'They score the cards left in everyone else\'s hands: plain Wild 20, every action card 50.', 'First to 500 points wins.'] }
    ],
    note: 'The rules don\'t say whether the very first card turned over does its action, or how Wild Skip Two works with only 2 players. Agree on those before you start.',
    links: [['Card list and details (Geeky Hobbies)', 'https://www.geekyhobbies.com/uno-all-wild-card-game-review-and-rules/']]
  },

  'skip-bo': {
    sections: [
      { h: 'What you need', p: 'The Skip-Bo deck: 144 cards numbered 1–12 plus 18 Skip-Bo wild cards. 2–6 players.' },
      { h: 'Setup', li: ['Deal each player a stockpile, face down: 30 cards with 2–4 players, 20 cards with 5 or more.', 'Turn the top card of your stockpile face up.', 'The rest of the cards are the draw pile.', 'In the middle, up to 4 shared building piles. They start empty.'] },
      { h: 'On your turn', li: ['Draw until you have 5 cards in your hand.', 'Play cards onto the building piles in order, 1 up to 12. Only a 1 or a Skip-Bo can start a pile.', 'You can play from your hand, from the top of your stockpile, or from the top of your discard piles.', 'Skip-Bo cards are wild and count as any number.', 'If you play all 5 cards from your hand, draw 5 more and keep going.', 'End your turn by putting one card from your hand onto one of your discard piles. You can have up to 4.'] },
      { h: 'Full piles', p: 'When a building pile reaches 12, take it away. A new pile can start in its spot. When the draw pile runs out, shuffle the finished piles to make a new one.' },
      { h: 'How to win', p: 'The first player to play every card from their stockpile wins.' },
      { h: 'Scoring (optional)', p: 'The winner scores 25 points, plus 5 for every card left in the other players\' stockpiles. First to 500 wins the match.' }
    ],
    links: [['Official instructions (Mattel PDF)', 'https://service.mattel.com/instruction_sheets/42050.pdf']]
  },

  'poopy-diapers': {
    sections: [
      { h: 'What we know', li: ['A card game by Dadland Games for 2–10 players, ages 7 and up, about 10–30 minutes.', 'The goal: change the most diapers by nap time.', 'You earn points by changing diapers and lose points when they\'re dirty.', 'Special cards include Blowouts (soil an opponent\'s clean diaper), Grandma Jean (an extra set of hands) and Prune Juice. There are more surprise cards in the deck.'] },
      { h: 'Scoring in Tally', p: 'Type each player\'s points at the end of the game. The most points wins.' }
    ],
    note: 'The full rules aren\'t published anywhere online that I could reach, so this only covers what the publisher says. Type the rules from the box into House rules, and they\'ll show here every time.',
    links: [['Game page', 'https://on-boardgaming.com/products/poopy-diapers-the-card-game']]
  },

  'yahtzee': {
    sections: [
      { h: 'What you need', p: '5 dice and a score sheet for each player. Tally\'s Yahtzee sheet works as the score sheet.' },
      { h: 'On your turn', li: ['Roll all 5 dice. You get up to 3 rolls.', 'After each roll, keep any dice you like and roll the rest again.', 'After your last roll, you must fill in one empty box on your sheet. If nothing fits, put a 0 in a box (a "scratch").', 'Everyone gets 13 turns, one for each box.'] },
      { h: 'Upper section', li: ['Ones through Sixes: add up only the dice showing that number.', 'Bonus: if those 6 boxes add up to 63 or more, you get 35 extra points.'] },
      { h: 'Lower section', li: ['3 of a kind: at least 3 dice the same. Score the total of all 5 dice.', '4 of a kind: at least 4 the same. Score the total of all 5 dice.', 'Full house: 3 of one number and 2 of another. 25 points.', 'Small straight: 4 in a row, like 2-3-4-5. 30 points.', 'Large straight: 5 in a row. 40 points.', 'Yahtzee: all 5 dice the same. 50 points.', 'Chance: any roll. Score the total of all 5 dice.'] },
      { h: 'Extra Yahtzees', li: ['If you already have 50 in your Yahtzee box, each extra Yahtzee earns a 100-point bonus.', 'You still have to fill a box with that roll: first the matching upper box (five 4s go in Fours).', 'If that\'s already filled, use any lower box. Full house and the straights score their full points.', 'If all of those are filled too, put a 0 in an open upper box.', 'If your Yahtzee box has a 0, extra Yahtzees don\'t earn the bonus.'] },
      { h: 'How to win', p: 'After 13 turns, add everything up, including the bonuses. The highest total wins.' }
    ]
  },

  'sorry': {
    sections: [
      { h: 'What you need', p: 'The Sorry! board, the Sorry! card deck, and pawns in each player\'s color. 2–4 players.' },
      { h: 'Setup', p: 'Each player puts their pawns in their Start. Shuffle the cards and put them face down.' },
      { h: 'On your turn', li: ['Draw one card and do what it says. If you can move, you have to, even if it hurts you. If you can\'t move, your turn is over.', 'In the newest version, any card that moves forward can bring a pawn out of Start. In the classic version, only a 1 or a 2 can.'] },
      { h: 'The cards', li: ['1, 3, 5, 8, 12: move one pawn forward that many spaces.', '2: move forward 2. In the classic version you also draw again.', '4: move one pawn backward 4.', '7: move forward 7, or split the 7 between two pawns (like 4 and 3).', '10: move forward 10, or backward 1.', '11: move forward 11, or swap places with any opponent\'s pawn on the open track.', 'Sorry!: take a pawn from your Start and put it on an opponent\'s pawn, sending theirs back to their Start. In the newest version, you can move one pawn forward 4 instead.'] },
      { h: 'Bumping and slides', li: ['You can jump over any pawn. Land on an opponent\'s pawn and it goes back to its Start.', 'You can\'t land on your own pawn.', 'Land exactly on the start of a slide (the triangle) and you slide to the end. Every pawn in the way goes back to its Start, even your own.', 'In the classic rules you only slide on slides that aren\'t your color. Some newer rule sheets say it differently, so check your box.'] },
      { h: 'Safety zone and Home', li: ['Only your pawns can go into your colored safety zone, and nobody can bump them there.', 'You can\'t go into it moving backward, but you can back out of it.', 'You have to reach Home by exact count.'] },
      { h: 'How to win', p: 'The first player to get all their pawns Home wins. That\'s 3 pawns in the newest version and 4 in the classic one.' }
    ],
    note: 'There are two common versions. The newer box has 3 pawns each and a stronger Sorry! card; the classic box has 4 pawns. Follow whichever box you own.',
    links: [['Official instructions (Hasbro)', 'https://instructions.hasbro.com/en-us/instruction/sorry-game']]
  },

  'crazy-eights': {
    sections: [
      { h: 'What you need', p: 'One standard 52-card deck. 2–7 players.' },
      { h: 'Setup', li: ['With 2 players, deal 7 cards each. With 3 or more, deal 5 each.', 'Put the rest face down as the draw pile and flip the top card to start the discard pile. If it\'s an 8, bury it in the deck and flip another.'] },
      { h: 'On your turn', li: ['Play one card that matches the top card\'s suit or number, like a 5 on a 5 or a heart on a heart.', 'Eights are wild. Play one any time, and name the suit the next player has to match.', 'If you can\'t play, draw from the pile until you can. If the pile runs out, pass.'] },
      { h: 'Winning a round', p: 'The first player out of cards wins the round. They score the cards left in everyone else\'s hands: each 8 is 50, Kings, Queens and Jacks are 10, Aces are 1, and other cards are their number.' },
      { h: 'Winning the game', p: 'Play rounds until someone reaches the target you agree on (set it on the setup screen).' }
    ],
    note: 'Many families only draw one card when they can\'t play, instead of drawing until they can. Pick one and put it in House rules.'
  },

  'i-need-a-new-butt': {
    sections: [
      { h: 'What you need', p: 'The board, the Butt Popper (it has a color die and an action die inside), 4 movers, 24 butt tiles, 4 Butt Holder cards and 12 New Butt! cards. 2–4 players.' },
      { h: 'Setup', li: ['Put the Butt Popper on the board. Put one tile, face down, on each space.', 'Everyone picks a mover, puts it on the start space of the same color, and takes that color\'s Butt Holder card.', 'Deal New Butt! cards: 2 each with 3–4 players, 3 each with 2 players.', 'Put the leftover New Butt! cards face up next to the board.', 'Whoever said the word "butt" last goes first.'] },
      { h: 'On your turn', li: ['Press the Butt Popper, then do what the action die shows:', 'Two arrows: you may move either way around the board this turn.', 'Circle arrows: swap any two tiles on the board, then move.', 'Face: peek at any tile. If it matches a leftover card beside the board, put it on that card. If not, put it back face down.', 'Then move to the next space of the color you rolled. You can only stop on a space that has a tile and no player on it.', 'If no space of that color works, pick any color.'] },
      { h: 'Collecting butts', li: ['Flip the tile on the space you landed on.', 'If it\'s a cheek for one of your New Butt! cards, put it on your Butt Holder.', 'If it matches a leftover card, put it on that card. Otherwise put it back face down.', 'Each butt needs both of its cheeks.'] },
      { h: 'How to win', p: 'The first player to finish all their New Butt! cards wins.' }
    ],
    links: [['Full rules (Geeky Hobbies)', 'https://www.geekyhobbies.com/i-need-a-new-butt-the-game-rules/']]
  },
  // ───── Batch 2: card games ─────
  'uno': {
    sections: [
      { h: 'What you need', p: 'An UNO deck: 108 cards in red, blue, green and yellow, numbers 0–9 plus Skip, Reverse, Draw Two, Wild and Wild Draw Four. 2–10 players. Newer decks have a few extra special Wilds you can take out.' },
      { h: 'Setup', li: ['Deal 7 cards to each player.', 'Put the rest face down as the draw pile and flip the top card to start the discard pile.', 'The player left of the dealer goes first, and play goes clockwise.'] },
      { h: 'On your turn', li: ['Play one card that matches the top card by color, number or symbol, or play a Wild.', 'If you can\'t play (or don\'t want to), draw one card. If it can be played, you may play it right away. Otherwise your turn is over.', 'No stacking: you can\'t answer a Draw Two with your own Draw Two to pass it on.'] },
      { h: 'Action cards', li: ['Skip: the next player loses their turn.', 'Reverse: play changes direction. With 2 players it works like a Skip.', 'Draw Two: the next player draws 2 and loses their turn.', 'Wild: you pick the color to play next.', 'Wild Draw Four: you pick the color, and the next player draws 4 and loses their turn. You may only play it if you have no card of the current color.'] },
      { h: 'Challenging a Wild Draw Four', p: 'The player hit by it can challenge. The player who played it shows their hand to the challenger. If it was played illegally, they draw the 4 instead. If it was legal, the challenger draws 6.' },
      { h: 'The first card', li: ['Draw Two: the first player draws 2 and is skipped.', 'Skip: the first player is skipped.', 'Reverse: the dealer goes first and play goes the other way.', 'Wild: the first player picks the color.', 'Wild Draw Four: shuffle it back in and flip another.'] },
      { h: 'UNO!', p: 'Say "UNO!" when you\'re down to one card. If someone catches you before the next player starts their turn, draw 2.' },
      { h: 'Scoring and winning', li: ['The first player out of cards wins the round.', 'They score everyone else\'s leftover cards: number cards are their number, Skip/Reverse/Draw Two are 20, Wild and Wild Draw Four are 50.', 'First to 500 wins.'] }
    ],
    links: [['UNO rules (unorules.com)', 'https://www.unorules.com/']]
  },

  'uno-flip': {
    sections: [
      { h: 'What you need', p: 'The UNO Flip! deck: 112 cards with a Light side and a Dark side. 2–10 players.' },
      { h: 'Setup', li: ['Deal 7 cards each. Hold them with the Light side facing you.', 'The draw pile sits Light side down (so the Dark side shows on top). Flip the first discard Light side up.', 'You always start on the Light side.'] },
      { h: 'On your turn', p: 'Just like UNO: match the top card by color, number or symbol, or play a Wild. If you can\'t, draw one card and you may play it.' },
      { h: 'Light side cards', li: ['Draw One: the next player draws 1 and loses their turn.', 'Skip and Reverse: same as UNO.', 'Wild: pick the color.', 'Wild Draw Two: pick the color, and the next player draws 2 and loses their turn. Only legal if you have no card of the current color.', 'Flip: flip everything to the Dark side (see below).'] },
      { h: 'Dark side cards', li: ['Draw Five: the next player draws 5 and loses their turn.', 'Skip Everyone: everyone else is skipped, so you go again.', 'Reverse and Wild: same as on the Light side.', 'Wild Draw Color: pick a color. The next player keeps drawing until they get that color, keeps them all, and loses their turn.', 'Flip: flip everything back to the Light side.'] },
      { h: 'How Flip works', li: ['A Flip card can only go on its own color or on another Flip.', 'When it\'s played, flip the discard pile, the draw pile and every player\'s hand over to the other side.', 'Now match the new top card of the discard pile.'] },
      { h: 'Challenges', li: ['Wild Draw Two: if it was played illegally, the player draws 2 instead. If it was legal, the challenger draws 4.', 'Wild Draw Color: if it was illegal, the player draws until they get the color. If it was legal, the challenger draws until the color, plus 2 more.'] },
      { h: 'Scoring and winning', li: ['The first player out wins the round and scores everyone else\'s cards on the side that was showing when the round ended.', 'Number cards are their number. Draw One 10. Draw Five, Reverse, Skip and Flip 20. Skip Everyone 30. Wild 40. Wild Draw Two 50. Wild Draw Color 60.', 'First to 500 wins.', 'Say "UNO!" at one card or draw 2 if you\'re caught.'] }
    ],
    links: [['UNO Flip rules (unorules.com)', 'https://www.unorules.com/uno-flip-rules/']]
  },

  'phase-10': {
    sections: [
      { h: 'What you need', p: 'The Phase 10 deck: 108 cards (numbers 1–12 in four colors, 8 Wilds and 4 Skips). 2–6 players.' },
      { h: 'The 10 phases', li: ['1. Two sets of 3', '2. One set of 3 + one run of 4', '3. One set of 4 + one run of 4', '4. One run of 7', '5. One run of 8', '6. One run of 9', '7. Two sets of 4', '8. 7 cards of one color', '9. One set of 5 + one set of 2', '10. One set of 5 + one set of 3', 'A set is cards with the same number (any colors). A run is numbers in order (any colors).'] },
      { h: 'Setup', p: 'Deal 10 cards each. The rest is the draw pile; flip the top card to start the discard pile. The deal passes left each hand.' },
      { h: 'On your turn', li: ['Draw one card, from the draw pile or the top of the discard pile.', 'If you have your whole phase, lay it down. You can only lay down one phase per hand, and you have to do them in order.', 'After your phase is down, you can "hit": add cards to any phase on the table (yours or someone else\'s) that fit it.', 'End your turn by discarding one card.'] },
      { h: 'Wilds and Skips', li: ['A Wild can stand for any number or color. Each set or run needs at least one real card. Once played, a Wild stays put.', 'A Skip is discarded to make a player of your choice lose their next turn. It can never be picked up from the discard pile.'] },
      { h: 'End of a hand', li: ['The first player to get rid of all their cards ends the hand.', 'Everyone who laid down their phase moves to the next one. Anyone who didn\'t tries the same phase again.', 'Everyone else adds up the cards left in their hand: 1–9 are 5 points, 10–12 are 10 points, Skip 15, Wild 25. Lower is better.'] },
      { h: 'How to win', p: 'The first player to finish Phase 10 wins. If more than one finishes it in the same hand, the lowest total score wins. Tap "phase?" for each player when you add a round in Tally.' }
    ],
    links: [['Phase 10 rules (UltraBoardGames)', 'https://www.ultraboardgames.com/phase-10/game-rules.php']]
  },

  'five-crowns': {
    sections: [
      { h: 'What you need', p: 'The Five Crowns deck: 116 cards in 5 suits (stars, hearts, clubs, spades, diamonds), 3 through King, plus 6 Jokers. 1–7 players.' },
      { h: 'Rounds and wild cards', li: ['There are 11 rounds. Round 1 deals 3 cards each, round 2 deals 4, and so on up to 13 in the last round.', 'Jokers are always wild.', 'The card that matches the number dealt is also wild: 3s in round 1, 4s in round 2, up to Kings in round 11.'] },
      { h: 'On your turn', li: ['Draw the top card of the draw pile or the discard pile.', 'Discard one card.', 'You\'re trying to arrange your whole hand into books and runs.', 'A book is 3 or more of the same rank. A run is 3 or more in a row in the same suit. Wilds can fill in anywhere.'] },
      { h: 'Going out', li: ['When your whole hand fits into books and runs, lay them down and discard your last card.', 'Everyone else gets one more turn to lay down what they can.', 'You can\'t add to other players\' books or runs.'] },
      { h: 'Scoring', p: 'Count only the cards left over: number cards are their number, Jack 11, Queen 12, King 13, Jokers 50, and that round\'s wild card 20. The player who went out scores 0.' },
      { h: 'How to win', p: 'After round 11, the lowest total wins.' }
    ],
    links: [['Five Crowns rules (UltraBoardGames)', 'https://www.ultraboardgames.com/five-crowns/game-rules.php']]
  },

  'rummy-500': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck (2 decks for 5 or more players). 2–8 players.' },
      { h: 'Setup', p: 'Deal 13 cards each with 2 players, 7 each with more. The rest is the draw pile. Flip one card to start the discard pile, and spread the discards out so everyone can see every card.' },
      { h: 'On your turn', li: ['Draw the top card of the draw pile, or take any card from the discard pile. If you take one from deeper in the pile, you also take every card above it, and you must use the card you picked right away in a meld.', 'Lay down melds if you can: sets (3 or 4 of the same rank) or runs (3 or more in a row in the same suit).', 'You can also add cards to any meld already on the table, even someone else\'s. Those points are yours.', 'End by discarding one card.'] },
      { h: 'End of a round', p: 'The round ends when someone plays or discards their last card, or the draw pile runs out.' },
      { h: 'Scoring', li: ['Add up the cards you laid on the table, then subtract the cards left in your hand.', 'Aces are 15 (or 1 when used low in A-2-3), face cards and 10s are 10, other cards are their number.'] },
      { h: 'How to win', p: 'First to 500 points wins.' }
    ],
    links: [['Rummy 500 rules (pagat.com)', 'https://www.pagat.com/rummy/500rum.html']]
  },

  'gin-rummy': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2 players.' },
      { h: 'Setup', p: 'Deal 10 cards each. Flip one card to start the discard pile; the rest is the draw pile.' },
      { h: 'On your turn', li: ['Draw from the draw pile or take the top discard.', 'Discard one card.', 'You\'re trying to put your cards into melds: sets (3 or 4 of a kind) or runs (3 or more in a row in the same suit).', 'Cards not in a meld are "deadwood". Aces count 1, face cards 10, others their number.'] },
      { h: 'Knocking', li: ['When your deadwood adds up to 10 or less, you can knock: lay down your hand and discard.', 'Your opponent lays down their melds and can add their deadwood onto your melds.', 'If your deadwood is lower, you score the difference.', 'If theirs is the same or lower, that\'s an undercut: they score the difference plus a 25-point bonus.'] },
      { h: 'Gin', p: 'If all 10 cards are in melds (no deadwood), that\'s gin. You score your opponent\'s deadwood plus a 25-point bonus, and they can\'t add onto your melds.' },
      { h: 'How to win', p: 'First to 100 points wins.' }
    ],
    note: 'Some families give 20 for gin and 10 for an undercut, or add game bonuses. Put yours in House rules.'
  },

  'hearts': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. Best with 4 players.' },
      { h: 'Setup and passing', li: ['Deal all the cards out (13 each with 4 players).', 'Before each hand, pass 3 cards: to the left, then the right, then across, then no pass, then repeat.'] },
      { h: 'Playing tricks', li: ['Whoever has the 2 of clubs leads it to start.', 'Everyone plays one card. Follow the suit that was led if you can; if you can\'t, play anything.', 'The highest card of the suit that was led wins the trick, and that player leads next.', 'You can\'t lead a heart until a heart has been played on another suit (hearts are "broken"), unless you have only hearts left.', 'Many families don\'t allow hearts or the Queen of spades on the very first trick.'] },
      { h: 'Scoring', li: ['Each heart you take is 1 point. The Queen of spades is 13.', 'Shooting the moon: if you take every heart and the Queen of spades, you score 0 and everyone else gets 26.', 'Points are bad.'] },
      { h: 'How to win', p: 'When someone reaches 100, the game ends and the lowest score wins.' }
    ],
    links: [['Hearts rules (pagat.com)', 'https://www.pagat.com/reverse/hearts.html']]
  },

  'spades': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 4 players in 2 teams, partners sitting across from each other.' },
      { h: 'Bidding', li: ['Deal all 13 cards each.', 'Everyone bids how many tricks they think they\'ll win. Partners\' bids add up to the team\'s bid.', 'Bidding 0 is "nil": you\'re betting you won\'t win a single trick.'] },
      { h: 'Playing tricks', li: ['Follow the suit that was led if you can. If you can\'t, play anything, including a spade.', 'Spades always beat the other suits. Otherwise the highest card of the suit led wins.', 'You can\'t lead spades until a spade has been played on another suit, unless you have only spades.'] },
      { h: 'Scoring', li: ['Make your team\'s bid: 10 points per trick bid, plus 1 for each extra trick (a "bag").', 'Miss it: lose 10 points per trick bid.', 'Every 10 bags you collect costs 100 points.', 'Nil: +100 if you take no tricks, −100 if you take any.', 'Tally works all of this out when you enter bids and tricks.'] },
      { h: 'How to win', p: 'First team to 500 wins.' }
    ],
    links: [['Spades rules (pagat.com)', 'https://www.pagat.com/auctionwhist/spades.html']]
  },

  'euchre': {
    sections: [
      { h: 'What you need', p: '24 cards: 9, 10, J, Q, K and A of each suit. 4 players in 2 teams, partners across from each other.' },
      { h: 'Setup', p: 'Deal 5 cards each. Put the last 4 in the middle and turn the top one face up.' },
      { h: 'Picking trump', li: ['Starting left of the dealer, each player can tell the dealer to "pick it up" (that suit becomes trump) or pass.', 'If someone orders it up, the dealer takes the card and discards one.', 'If everyone passes, turn the card down. Going around again, each player can name a different suit as trump, or pass.', 'The team that picks trump are the "makers". A maker can choose to "go alone", and their partner sits out the hand.'] },
      { h: 'Card ranks', li: ['The Jack of trump is the highest card (the right bower).', 'The other Jack of the same color is second highest (the left bower) and counts as trump.', 'Then the trump Ace, King, Queen, 10, 9.'] },
      { h: 'Playing tricks', p: 'The player left of the dealer leads. Follow suit if you can; if you can\'t, play a trump or anything. The highest trump wins, or the highest card of the suit led if no trump was played.' },
      { h: 'Scoring', li: ['Makers win 3 or 4 tricks: 1 point.', 'Makers win all 5: 2 points.', 'Alone and win all 5: 4 points.', 'Makers win fewer than 3: they\'re "euchred" and the other team gets 2 points.'] },
      { h: 'How to win', p: 'First team to 10 wins.' }
    ],
    links: [['Euchre rules (pagat.com)', 'https://www.pagat.com/euchre/euchre.html']]
  },

  'go-fish': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2–6 players.' },
      { h: 'Setup', p: 'Deal 7 cards each with 2–3 players, 5 each with more. Spread the rest face down in a "pond".' },
      { h: 'On your turn', li: ['Ask one player for a rank you already have, like "Do you have any 7s?"', 'If they do, they give you all of them and you ask again.', 'If not, they say "Go fish!" and you draw one card. If you happen to draw what you asked for, show it and go again. Otherwise your turn ends.', 'When you get all 4 of a rank (a "book"), lay it down.'] },
      { h: 'How to win', p: 'When all 13 books are made, the player with the most books wins.' }
    ],
    links: [['Go Fish rules (pagat.com)', 'https://www.pagat.com/quartet/gofish.html']]
  },

  'old-maid': {
    sections: [
      { h: 'What you need', p: 'A standard deck with one Queen taken out (or an Old Maid deck). 2 or more players.' },
      { h: 'Setup', p: 'Deal all the cards. Everyone puts down any pairs they have.' },
      { h: 'On your turn', li: ['Fan out your cards face down and let the player on your right draw one without looking.', 'Then you draw one from the player on your left.', 'If it makes a pair, put the pair down.'] },
      { h: 'How it ends', p: 'Players drop out as they run out of cards. The last player stuck with the odd Queen is the Old Maid and loses. In Tally, tap the winner (or track who got stuck).' }
    ],
    links: [['Old Maid rules (pagat.com)', 'https://www.pagat.com/passing/oldmaid.html']]
  },

  'war': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2 players.' },
      { h: 'Setup', p: 'Deal out the whole deck face down so each player has a stack.' },
      { h: 'Playing', li: ['Both players flip their top card at the same time.', 'The higher card takes both, and they go on the bottom of the winner\'s stack. Aces are high.', 'If the cards tie, it\'s war: each player puts 3 cards face down and one face up. The higher face-up card takes the whole pile. If they tie again, do another war.'] },
      { h: 'How to win', p: 'The player who wins all the cards wins. For a shorter game, set a timer and the most cards wins.' }
    ],
    links: [['War rules (pagat.com)', 'https://www.pagat.com/war/war.html']]
  },

  'spoons': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck and spoons: one fewer spoon than players. 3 or more players.' },
      { h: 'Setup', p: 'Put the spoons in the middle where everyone can reach. Deal 4 cards each. The dealer keeps the rest of the deck.' },
      { h: 'Playing', li: ['The dealer draws a card, keeps it or not, and passes one card face down to the left.', 'Everyone picks up the card passed to them, keeps one, and passes one left. Keep it moving fast. You must always hold exactly 4.', 'The last player discards to a pile.'] },
      { h: 'Grabbing spoons', li: ['When you have 4 of a kind, grab a spoon. You can be sneaky about it.', 'As soon as anyone takes a spoon, everyone grabs one.', 'The player left without a spoon gets a letter (S, then P, then O...) or is out, depending on how your family plays.'] },
      { h: 'How to win', p: 'Take out one spoon each round. The last player still in wins.' }
    ]
  },

  'slapjack': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2–8 players.' },
      { h: 'Setup', p: 'Deal out the whole deck face down. Don\'t look at your cards.' },
      { h: 'Playing', li: ['Take turns flipping your top card onto a pile in the middle. Flip it away from you so everyone sees it at the same time.', 'When a Jack shows up, slap it! The first hand on it wins the whole pile and puts it under their stack.', 'Slap a card that isn\'t a Jack and you give a card to the player who played it.', 'If you run out of cards, you get one more chance: slap the next Jack to get back in. Miss it and you\'re out.'] },
      { h: 'How to win', p: 'The player who wins all the cards wins.' }
    ],
    links: [['Slapjack rules (pagat.com)', 'https://www.pagat.com/war/slapjack.html']]
  },

  'egyptian-ratscrew': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2 or more players.' },
      { h: 'Setup', p: 'Deal out the whole deck face down. Don\'t look at your cards.' },
      { h: 'Playing', li: ['Take turns flipping your top card face up onto a pile in the middle.', 'When an Ace or face card comes up, the next player has to play a face card or Ace within a number of tries: 4 for an Ace, 3 for a King, 2 for a Queen, 1 for a Jack.', 'If they do, the next player has to answer that card.', 'If they run out of tries, the player who played the last face card or Ace wins the pile.'] },
      { h: 'Slapping', li: ['Anyone can slap the pile to win it when there\'s a double (two of the same rank in a row, like 5-5) or a sandwich (same rank with one card between, like 5-K-5).', 'Slap at the wrong time and you put a card face down under the pile.', 'If you run out of cards, you can still slap your way back in.'] },
      { h: 'How to win', p: 'The player who wins all the cards wins.' }
    ],
    note: 'Families add lots of other slap rules (top and bottom match, King-Queen "marriage", 10s that add up). Agree before you start and put them in House rules.'
  },

  'golf-card-game': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck (2 decks for 5 or more players). 2 or more players.' },
      { h: 'Setup', li: ['Deal 6 cards face down to each player in 2 rows of 3. Don\'t look.', 'Each player turns 2 of their cards face up.', 'The rest is the draw pile. Flip one to start the discard pile.'] },
      { h: 'On your turn', li: ['Take the top card of the draw pile or the discard pile.', 'Swap it for any one of your 6 cards, face up or face down, and discard the card you replaced face up.', 'If you drew from the draw pile and don\'t want it, you can just discard it.'] },
      { h: 'End of a hole', p: 'When someone has all 6 cards face up, everyone else gets one more turn. Then everyone flips their cards and scores.' },
      { h: 'Scoring', li: ['Ace 1, 2 is minus 2, 3–10 are their number, Jacks and Queens 10, Kings 0.', 'Two of the same card in a column cancel out and score 0.'] },
      { h: 'How to win', p: 'Play 9 holes. The lowest total wins.' }
    ],
    note: 'Some families play with 4 cards instead of 6, or don\'t let you flip a card when you discard. Put your way in House rules.',
    links: [['Golf rules (pagat.com)', 'https://www.pagat.com/draw/golf.html']]
  },

  'skyjo': {
    sections: [
      { h: 'What you need', p: 'The Skyjo deck: 150 cards worth −2 to 12. 2–8 players.' },
      { h: 'Setup', li: ['Deal 12 cards face down to each player in a grid: 3 rows by 4 columns.', 'Each player turns 2 of their cards face up.', 'The rest is the draw pile. Flip one to start the discard pile.', 'In the first round, the player whose 2 face-up cards add up highest goes first. After that, whoever ended the last round goes first.'] },
      { h: 'On your turn', li: ['Take the top discard and swap it for any card in your grid (face up or face down). The replaced card goes face up on the discard pile.', 'Or draw from the draw pile, then either swap it in the same way, or discard it and turn one of your face-down cards face up.'] },
      { h: 'Columns', p: 'If a column has 3 face-up cards that are all the same number, discard the whole column.' },
      { h: 'End of a round', li: ['When someone has all their cards face up, everyone else gets one more turn.', 'Then flip all cards and add up each grid.', 'If the player who ended the round doesn\'t have the lowest score, their score for that round is doubled (only if it\'s above 0).'] },
      { h: 'How to win', p: 'When anyone reaches 100 points, the game ends. The lowest total wins.' }
    ],
    links: [['Skyjo rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/skyjo/']]
  },

  'flip-7': {
    sections: [
      { h: 'What you need', p: 'The Flip 7 deck: 94 cards. Number cards 0–12 (twelve 12s, eleven 11s, down to one 1, and one 0), modifier cards (+2, +4, +6, +8, +10 and ×2), and action cards (Freeze, Flip Three, Second Chance). 3 or more players.' },
      { h: 'A round', li: ['The dealer gives everyone one card face up. Action cards happen right away.', 'Then, going around, each player either hits (takes another card) or stays (stops and keeps what they have).', 'Keep going until everyone has stayed or busted.'] },
      { h: 'Busting', p: 'If you get a number you already have, you bust and score 0 for the round. Modifier cards never bust you.' },
      { h: 'Action cards', li: ['Freeze: give it to a player still in the round. They have to stay right now and keep their points.', 'Flip Three: give it to a player. They take the next 3 cards, one at a time, and can bust along the way.', 'Second Chance: keep it. It saves you from one bust: discard it and the duplicate card. You can only hold one; if you get another, give it to someone.'] },
      { h: 'Flip 7', p: 'If you get 7 different number cards, the round ends right away and you get a 15-point bonus.' },
      { h: 'Scoring', li: ['Add up your number cards.', 'If you have ×2, double that total.', 'Then add your + modifiers, and the 15 bonus if you got Flip 7.'] },
      { h: 'How to win', p: 'At the end of a round, if anyone has 200 or more, the highest total wins.' }
    ],
    note: 'Rule sites disagree on whether you can hand Freeze or Flip Three to a player who has already stayed. Most say only to players still in the round.',
    links: [['Flip 7 rules (Board Game Arena)', 'https://en.doc.boardgamearena.com/Gamehelpflipseven']]
  },

  'happy-salmon': {
    sections: [
      { h: 'What you need', p: 'The Happy Salmon deck: each player gets a set of cards in their own color. 3–8 players.' },
      { h: 'The 4 actions', li: ['High Five: slap hands.', 'Pound It: bump fists.', 'Switcheroo: trade places with the other player (take your cards with you).', 'Happy Salmon: slap each other\'s forearms, like a fish flopping, a few times.'] },
      { h: 'Playing', li: ['Everyone holds their cards face down. On "go", everyone flips their top card at the same time.', 'Shout your card\'s action and look for someone who has the same one.', 'When you find a match, do the action together, then both discard those cards and flip your next one.', 'Only 2 players can match at a time.', 'If you can\'t find a match, you can move your card to the bottom of your stack.'] },
      { h: 'How to win', p: 'The first player to get rid of all their cards shouts "FIN-ished!" and wins.' }
    ],
    links: [['Happy Salmon rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/happy-salmon/']]
  },

  'cribbage': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck and a cribbage board with pegs. 2 players (3–4 can play too).' },
      { h: 'The deal', li: ['Deal 6 cards each.', 'Each player puts 2 cards face down into the "crib". The crib belongs to the dealer.', 'The other player cuts the deck and the dealer turns up the top card (the "starter"). If it\'s a Jack, the dealer pegs 2.'] },
      { h: 'The play (pegging)', li: ['Starting with the non-dealer, take turns playing one card face up, calling out the running total. The total can\'t go over 31.', 'Card values: Ace 1, face cards 10, others their number.', 'Peg as you play: total of 15 is 2, exactly 31 is 2, a pair is 2, three of a kind 6, four of a kind 12, and a run of 3 or more is 1 per card.', 'If you can\'t play without going over 31, say "Go". The other player keeps playing, and whoever plays the last card gets 1 (or 2 for exactly 31).', 'Then the count starts over at 0 until all cards are played.'] },
      { h: 'The show (counting hands)', li: ['The non-dealer counts first, then the dealer, then the dealer counts the crib. Each uses the starter card too.', 'Each combination adding to 15: 2. Each pair: 2. Each run of 3 or more: 1 per card.', 'Flush: all 4 hand cards the same suit is 4 (5 if the starter matches too). The crib only counts a flush if all 5 match.', 'The Jack in your hand of the same suit as the starter ("his nobs"): 1.'] },
      { h: 'How to win', p: 'The first player to 121 wins, even in the middle of a hand. Deal passes back and forth each hand.' }
    ],
    links: [['Cribbage rules (pagat.com)', 'https://www.pagat.com/adders/crib6.html']]
  }
};
