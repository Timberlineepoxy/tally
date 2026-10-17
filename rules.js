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
  },
  // ───── Batch 3: family card games ─────
  'nertz': {
    sections: [
      { h: 'What you need', p: 'One standard 52-card deck per player, each with a different back. 2 or more players (bigger groups can pair up as partners).' },
      { h: 'Setup', li: ['Each player deals their own Nertz pile: 13 cards, 12 face down with the top one face up.', 'Next to it, deal 4 work piles of one face-up card each.', 'Hold the rest of your deck as your stock.'] },
      { h: 'Playing (everyone at once, no turns)', li: ['Aces go in the middle. Anyone can build on any Ace pile, up in the same suit to the King.', 'On your work piles, build down in alternating colors (red on black). You can move a card with everything on top of it.', 'Fill an empty work pile from your Nertz pile, your stock or another work pile.', 'Flip your stock 3 cards at a time onto a waste pile. The top waste card can be played. When the stock runs out, turn the waste pile over.', 'Use only one hand at a time.'] },
      { h: 'End of a round', p: 'When you empty your Nertz pile, call "Nertz!" and everyone stops.' },
      { h: 'Scoring', p: '+1 for every one of your cards in the middle piles. −2 for every card left in your Nertz pile.' },
      { h: 'How to win', p: 'First to 100 wins.' }
    ],
    links: [['Nertz rules (pagat.com)', 'https://www.pagat.com/patience/nerts.html']]
  },

  'dutch-blitz': {
    sections: [
      { h: 'What you need', p: 'The Dutch Blitz set: 4 decks of 40 cards (numbers 1–10 in red, blue, yellow and green), one deck per player. 2–4 players.' },
      { h: 'Setup', li: ['Deal 3 Post piles face up in a row (5 with 2 players).', 'To the right, deal the Blitz pile: 10 cards, face up on top.', 'Hold the rest face down.'] },
      { h: 'Playing (everyone at once)', li: ['Any 1 you can see must go to the middle to start a Dutch pile.', 'Dutch piles build up from 1 to 10 in one color. Anyone can play on any of them.', 'On your Post piles, build down, alternating boy and girl cards.', 'When a Post pile is empty, fill it from your Blitz pile.', 'Flip your hand 3 at a time onto your Wood pile. The top card can be played. Don\'t shuffle when you turn it back over.', 'One card at a time, with one hand.'] },
      { h: 'End of a round', p: 'When you play your last Blitz card, shout "Blitz!" and everyone stops.' },
      { h: 'Scoring', p: '+1 for each card you put in the Dutch piles. −2 for each card left in your Blitz pile.' },
      { h: 'How to win', p: 'First to 75 wins. If more than one player passes 75 in the same round, the highest score wins.' }
    ],
    links: [['Dutch Blitz rules (UltraBoardGames)', 'https://www.ultraboardgames.com/dutch-blitz/game-rules.php']]
  },

  'racko': {
    sections: [
      { h: 'What you need', p: 'The Rack-O cards (1–60) and racks. 2 players use cards 1–40, 3 players use 1–50, 4 players use all 60.' },
      { h: 'Setup', li: ['Deal 10 cards each. Put each card in your rack as it comes, starting from the back slot (50) and working to the front slot (5). Don\'t rearrange them.', 'Flip one card to start the discard pile; the rest is the draw pile.'] },
      { h: 'On your turn', li: ['Take the top discard (you must put it in your rack), or draw from the pile (put it in your rack or discard it).', 'The new card replaces one card in your rack, and that card goes on the discard pile.'] },
      { h: 'Going Rack-O', p: 'When your rack goes from lowest at the front to highest at the back, call "Rack-O!" and the round ends.' },
      { h: 'Scoring', li: ['Rack-O: 75 points (5 for each card plus 25).', 'Everyone else: 5 points for each card in order, counting from the front slot until the order breaks.', 'Bonus option: the Rack-O player scores extra for a run of numbers in a row: 3 cards +50, 4 cards +100, 5 cards +200, 6 or more +400.'] },
      { h: 'How to win', p: 'First to 500 wins.' }
    ],
    links: [['Rack-O rules (UltraBoardGames)', 'https://www.ultraboardgames.com/rack-o/game-rules.php']]
  },

  'mille-bornes': {
    sections: [
      { h: 'What you need', p: 'The Mille Bornes deck: distance cards, hazards, remedies and safeties. 2–6 players (4 or 6 play as teams).' },
      { h: 'Setup', p: 'Deal 6 cards each. The rest is the draw pile.' },
      { h: 'On your turn', li: ['Draw one card, then play one card or discard. You always end your turn with 6 cards.', 'You need a Roll (green light) card showing before you can play distance cards.', 'Play hazards on other players to stop them; they need the matching remedy, and then a Roll card again.'] },
      { h: 'Hazards, remedies and safeties', li: ['Accident → Repairs (safety: Driving Ace)', 'Out of Gas → Gasoline (safety: Extra Tank)', 'Flat Tire → Spare Tire (safety: Puncture Proof)', 'Stop → Roll (safety: Right of Way, also called Emergency Vehicle)', 'Speed Limit (only 50-mile cards) → End of Limit (safety: Right of Way)', 'A safety protects you for the rest of the round, and you get another turn after playing it.'] },
      { h: 'Coup fourré', p: 'If someone plays a hazard on you and you hold its safety, play the safety right away and shout "Coup fourré!" You block it, draw a card and take the next turn.' },
      { h: 'End of a round', p: 'The round ends when someone reaches exactly 1,000 miles (or 700 in shorter games). You can only play 2 of the 200-mile cards per round.' },
      { h: 'Scoring', li: ['Miles you drove.', 'Each safety played: 100. All 4 safeties: 300 more. Each coup fourré: 300.', 'Finishing the trip: 400. No 200-mile cards used: 300. Finishing after the draw pile ran out: 300. Going to 1,000 after calling an extension: 200. Opponent had no miles at all (shutout): 500.'] },
      { h: 'How to win', p: 'First to 5,000 points wins.' }
    ],
    links: [['Mille Bornes rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/mille-bornes/']]
  },

  'pit': {
    sections: [
      { h: 'What you need', p: 'The Pit deck: 9 cards of each commodity, plus the Bull, the Bear and a bell. 3–8 players.' },
      { h: 'Setup', p: 'Use one commodity per player and deal 9 cards each. Leave out the Bull and Bear for the basic game.' },
      { h: 'Trading (everyone at once)', li: ['When the bell rings, the market is open.', 'Hold out 1–4 cards of the same commodity face down and shout how many: "Two! Two! Two!"', 'Trade with anyone calling the same number. Don\'t say what the cards are.'] },
      { h: 'Cornering', p: 'When you have all 9 cards of one commodity, ring the bell and shout "Corner on Wheat!" (or whatever it is). You score that commodity\'s value, printed on the cards.' },
      { h: 'Bull and Bear (optional)', li: ['Shuffle them in. Two players will get 10 cards.', 'Holding either one when someone else corners costs 20 points (40 for both).', 'The Bull is wild: 8 of a commodity plus the Bull is a corner. All 9 plus the Bull is a double corner.'] },
      { h: 'How to win', p: 'First to 500 wins.' }
    ],
    note: 'Different editions have different commodities and point values. Use the values printed on your cards.',
    links: [['Pit rules (UltraBoardGames)', 'https://www.ultraboardgames.com/pit/game-rules.php']]
  },

  'flip-7-with-a-vengeance': {
    sections: [
      { h: 'What you need', p: 'The Flip 7: With a Vengeance deck: 108 cards, numbers 0–13 (as many of each as its number, plus one 0), minus modifiers, and action cards.' },
      { h: 'A round', li: ['Everyone gets one card. Then, in turn, each player hits (takes another card) or stays.', 'Get a number you already have and you bust: 0 points this round.', 'Get 7 different numbers and the round ends right away, with a 15-point bonus.'] },
      { h: 'Special number cards', li: ['The Zero: your score becomes 0 unless you get a Flip 7, so you\'ll want to keep hitting.', 'Lucky 13: you can have two 13s without busting (a third busts you).', 'Unlucky 7: throw away all your other number and modifier cards; you keep just the 7.'] },
      { h: 'Modifier cards', p: '−2, −4, −6, −8, −10 and ÷2. Play them on any player who hasn\'t busted. They can\'t take a score below 0 and don\'t count toward Flip 7.' },
      { h: 'Action cards', li: ['Give an action to any player, even yourself.', 'Just One More: they take one more card, then stay.', 'Flip Four: they take the next 4 cards (they can bust).', 'Discard: remove a card from any player\'s row.', 'Steal: take a card from a player who hasn\'t busted.', 'Swap: swap two cards between two players who haven\'t busted.'] },
      { h: 'Brutal mode (optional)', p: 'Scores can go below 0, modifiers can hit busted players, and on a Flip 7 you can take 15 off another player instead of adding 15.' },
      { h: 'How to win', p: 'First to 200 ends the game. The highest score wins.' }
    ],
    links: [['Rules (Board Game Arena)', 'https://en.doc.boardgamearena.com/Gamehelpflipsevenwithavengeance']]
  },

  'dragonwood': {
    sections: [
      { h: 'What you need', p: '64 Adventurer cards (red backs), 42 Dragonwood cards (green backs) and 6 special dice (faces 1, 2, 2, 3, 3, 4). 2–4 players.' },
      { h: 'Setup', li: ['Take the 2 dragons out of the Dragonwood deck and shuffle it.', 'Remove 12 cards (2 players), 10 (3 players) or 8 (4 players).', 'Shuffle the dragons into the bottom half.', 'Lay 5 Dragonwood cards face up: this is the landscape.', 'Deal 5 Adventurer cards to each player.'] },
      { h: 'On your turn (pick one)', li: ['Reload: draw 1 Adventurer card. Your hand limit is 9.', 'Capture: pick a creature or enhancement in the landscape and attack it with cards from your hand. Roll one die for each card.'] },
      { h: 'Attacks', li: ['Strike: cards in a row, like 3-4-5 (any colors).', 'Stomp: cards with the same number.', 'Scream: cards of the same color.', 'A single card counts as any attack. Up to 6 dice.'] },
      { h: 'Capturing', li: ['If your dice total (plus enhancement bonuses) reaches the number for that attack, you capture it.', 'Creatures go in your pile for points. Enhancements stay in front of you and help later attacks.', 'If you miss, discard one card from your hand.', 'Events happen to everyone right away. Refill the landscape to 5.'] },
      { h: 'End of the game', p: 'The game ends when both dragons are captured, or when the Adventurer deck has run out twice (everyone gets one last turn).' },
      { h: 'Scoring', p: 'Add up the points on your creatures. The player with the most creatures gets 3 bonus points (2 each if tied). The highest total wins.' }
    ],
    links: [['Dragonwood rules (Board Game Arena)', 'https://en.doc.boardgamearena.com/Gamehelpdragonwood']]
  },

  'cabo': {
    sections: [
      { h: 'What you need', p: 'The Cabo deck (cards 0 to 13). 2–5 players.' },
      { h: 'Setup', li: ['Deal 4 cards face down in a row in front of each player. Don\'t look.', 'Before the round starts, look at any 2 of your cards once. Then remember them!', 'Your cards can\'t change places during the round.', 'Flip one card to start the discard pile.'] },
      { h: 'On your turn (pick one)', li: ['Draw from the pile. Swap it for one of your cards (discard the old one), or discard it. If it\'s a power card, you can use its power when you discard it.', 'Take the top discard and swap it for one of your cards.', 'Call "Cabo!" (see below).'] },
      { h: 'Power cards (only when drawn from the pile)', li: ['7 or 8, Peek: look at one of your own cards.', '9 or 10, Spy: look at one card of another player\'s.', '11 or 12, Swap: swap one of your cards with another player\'s, without looking.'] },
      { h: 'Matching cards', p: 'You can swap 2, 3 or 4 of your cards that are the same number for the one card you drew. If they don\'t actually match, show them, put them back, and discard the drawn card.' },
      { h: 'Calling Cabo', li: ['When you think you have the lowest total, call "Cabo" instead of drawing.', 'Everyone else gets one more turn, then all cards are flipped.', 'The lowest total scores 0; everyone else scores their total.', 'If the Cabo caller isn\'t lowest, they score their total plus a 5-point penalty.', 'Two 12s and both 13s at the end of a round: you score 0 and everyone else gets 50.'] },
      { h: 'How to win', p: 'If your total hits exactly 100, it drops to 50 (once per game). The game ends when someone goes over 100, and the lowest total wins.' }
    ],
    note: 'Older editions used a 10-point penalty and other small changes. These are the current official rules.',
    links: [['How to play (official Cabo site)', 'https://www.cabogame.com/how-to-play']]
  },

  'sushi-go': {
    sections: [
      { h: 'What you need', p: 'The Sushi Go! deck (108 cards). 2–5 players.' },
      { h: 'Setup', p: 'Deal 10 cards each with 2 players, 9 with 3, 8 with 4, 7 with 5.' },
      { h: 'Playing a round', li: ['Everyone picks one card from their hand and puts it face down. Everyone flips at once.', 'Pass the rest of your hand to the left. Pick again.', 'Keep going until all the cards are played. Then score.'] },
      { h: 'Scoring', li: ['Maki rolls: most roll icons 6, second most 3.', 'Tempura: each pair 5.', 'Sashimi: each set of 3 is 10.', 'Dumplings: 1, 2, 3, 4, 5 or more score 1, 3, 6, 10, 15.', 'Nigiri: squid 3, salmon 2, egg 1. On a wasabi, triple it.', 'Chopsticks: later, swap them back into your hand to play 2 cards in one turn.'] },
      { h: 'Rounds and pudding', li: ['Play 3 rounds. Discard everything except pudding between rounds.', 'At the end, most pudding +6, fewest pudding −6 (no penalty with 2 players).'] },
      { h: 'How to win', p: 'Most points after 3 rounds. Ties go to the player with more pudding.' }
    ],
    links: [['Sushi Go! rules (UltraBoardGames)', 'https://www.ultraboardgames.com/sushi-go/game-rules.php']]
  },

  'sushi-go-party': {
    sections: [
      { h: 'What you need', p: 'The Sushi Go Party! box: lots of card types, menu tiles, a score board and pawns. 2–8 players.' },
      { h: 'Pick a menu', p: 'Choose a ready-made menu from the box, or build your own: nigiri always, plus 1 roll, 3 appetizers, 2 specials and 1 dessert. Only those cards go in the deck.' },
      { h: 'Setup', li: ['Deal 10 cards each with 2–3 players, 9 with 4–5, 8 with 6–7, 7 with 8.', 'Desserts are added a few at a time each round.'] },
      { h: 'Playing', p: 'Same as Sushi Go!: everyone picks a card, flips together, passes left, and repeats until hands are empty. Play 3 rounds and move your pawn on the board to score.' },
      { h: 'Scoring changes', li: ['Each card type shows how it scores on its menu tile.', 'Ties for maki and pudding give everyone tied the full points.', 'With 6–8 players, maki scores 6, 4 and 2 for first, second and third.'] },
      { h: 'How to win', p: 'Most points after 3 rounds. Ties go to the player with more dessert cards.' }
    ],
    links: [['Sushi Go Party! rules (UltraBoardGames)', 'https://www.ultraboardgames.com/sushi-go/sushi-go-party.php']]
  },

  '6-nimmt': {
    sections: [
      { h: 'What you need', p: '104 cards numbered 1–104, each with bullheads (penalty points) on it. 2–10 players.' },
      { h: 'Setup', p: 'Deal 10 cards each. Turn 4 cards face up to start 4 rows.' },
      { h: 'Playing', li: ['Everyone picks one card and puts it face down. Flip them all at once.', 'Place cards from lowest to highest.', 'Each card goes on the row whose last card is the closest lower number.', 'If your card would be the 6th card in a row, take the 5 cards in that row. Your card starts the row over.', 'If your card is lower than every row, take any row you choose. Your card starts it over.'] },
      { h: 'Bullheads', p: 'Each card you take is worth its bullheads: most cards are 1, cards ending in 5 are 2, multiples of 10 are 3, doubles like 11 or 22 are 5, and 55 is 7.' },
      { h: 'How to win', p: 'After 10 cards, count bullheads and deal again. When someone reaches 66, the fewest bullheads wins.' }
    ],
    links: [['6 Nimmt! rules (UltraBoardGames)', 'https://www.ultraboardgames.com/6-nimmt/game-rules.php']]
  },

  'no-thanks': {
    sections: [
      { h: 'What you need', p: '33 cards numbered 3–35 and 55 chips. 3 or more players.' },
      { h: 'Setup', li: ['Give each player 11 chips. Keep your chips hidden.', 'Shuffle the cards and take out 9 without looking. Play with the other 24.'] },
      { h: 'Playing', li: ['Flip the top card.', 'On your turn, either take the card (plus any chips on it), or say "No thanks!" and put one chip on it. Then it\'s the next player\'s turn.', 'If you have no chips, you must take the card.', 'Whoever takes a card flips the next one and goes again.'] },
      { h: 'Scoring', li: ['Each card counts its number.', 'A run of numbers in a row only counts the lowest one (17-18-19-20 counts as 17).', 'Each chip you have left takes off 1 point.'] },
      { h: 'How to win', p: 'When all 24 cards are taken, the lowest score wins.' }
    ],
    links: [['No Thanks! rules (UltraBoardGames)', 'https://www.ultraboardgames.com/no-thanks/game-rules.php']]
  },

  'lost-cities': {
    sections: [
      { h: 'What you need', p: 'The Lost Cities board and 60 cards in 5 colors (expedition cards 2–10 and wager cards). 2 players.' },
      { h: 'Setup', p: 'Deal 8 cards each. The rest is the draw pile.' },
      { h: 'On your turn', li: ['First play one card: add it to your own row of that color (it must be higher than the last card there), or discard it onto that color\'s spot on the board.', 'Then draw one card from the draw pile or the top of any discard pile (not the one you just discarded).', 'Wager cards can only start a row, before any numbers.'] },
      { h: 'End of a round', p: 'The round ends when the last card is drawn from the draw pile.' },
      { h: 'Scoring each color', li: ['Add up the cards and subtract 20 (it costs 20 to start an expedition).', 'Multiply by 2, 3 or 4 if you played 1, 2 or 3 wagers.', 'A row with 8 or more cards gets 20 more after that.', 'Colors you never started score 0.'] },
      { h: 'How to win', p: 'Play 3 rounds. The highest total wins.' }
    ],
    links: [['Lost Cities rules (UltraBoardGames)', 'https://www.ultraboardgames.com/lost-cities/game-rules.php']]
  },

  'love-letter': {
    sections: [
      { h: 'What you need', p: 'The Love Letter cards and tokens. 2–4 players with the classic deck (newer editions add cards and allow more players).' },
      { h: 'Setup', li: ['Shuffle and put one card face down without looking. With 2 players, also set 3 cards aside face up.', 'Everyone draws one card.'] },
      { h: 'On your turn', p: 'Draw a card, then play one of your 2 cards face up and do what it says, even if it hurts you.' },
      { h: 'The cards (classic deck)', li: ['8 Princess (1): if you play or discard her, you\'re out of the round.', '7 Countess (1): you must play her if your other card is the King or Prince.', '6 King (1): trade hands with another player.', '5 Prince (2): choose any player (even yourself) to discard their hand and draw a new card.', '4 Handmaid (2): nobody can target you until your next turn.', '3 Baron (2): compare hands with another player in secret. Lower card is out.', '2 Priest (2): look at another player\'s hand.', '1 Guard (5): name a card (not Guard). If that player has it, they\'re out.'] },
      { h: 'Winning a round', p: 'The round ends when only one player is left, or the deck runs out (highest card wins; if tied, highest total of played cards). The winner gets a token.' },
      { h: 'How to win', p: 'Classic deck: 7 tokens with 2 players, 5 with 3, 4 with 4.' }
    ],
    note: 'Newer editions have a bigger deck (with a Spy and a Chancellor) and need different token counts. Use the card that came in your box.',
    links: [['Love Letter rules (UltraBoardGames)', 'https://www.ultraboardgames.com/love-letter/game-rules.php']]
  },

  'skull': {
    sections: [
      { h: 'What you need', p: 'Each player has 4 cards (3 roses and 1 skull) and a mat. 3–6 players.' },
      { h: 'Starting a round', p: 'Everyone secretly puts one card face down on their mat.' },
      { h: 'On your turn', li: ['Add one more card face down on your pile, or start a challenge.', 'To challenge, say how many cards you think you can flip without hitting a skull.', 'Going around, each player raises the number or passes. The highest bid becomes the challenger.'] },
      { h: 'Flipping', li: ['The challenger flips their own pile first, top card first.', 'Then they flip from the top of other players\' piles until they reach their number.', 'All roses: they win the challenge and flip their mat over.', 'A skull: they lose one of their cards for good (the skull\'s owner picks it at random if it was someone else\'s skull). Lose all 4 and you\'re out.'] },
      { h: 'How to win', p: 'Win 2 challenges, or be the last player left.' }
    ],
    links: [['Skull rules (UltraBoardGames)', 'https://www.ultraboardgames.com/skull-and-roses/game-rules.php']]
  },

  'munchkin': {
    sections: [
      { h: 'What you need', p: 'The Munchkin cards (a Door deck and a Treasure deck) and a die. 3–6 players.' },
      { h: 'Setup', p: 'Everyone starts at level 1. Deal 4 Door and 4 Treasure cards to each player.' },
      { h: 'On your turn', li: ['Kick open the door: flip the top Door card. A monster means fight; a curse hits you right away; anything else goes in your hand.', 'If you didn\'t fight, either fight a monster from your hand (looking for trouble) or take another Door card into your hand (loot the room).', 'Charity: end with 5 cards or fewer. Give extras to the lowest-level player.'] },
      { h: 'Fighting', li: ['Your strength is your level plus your gear and bonuses. Beat the monster\'s level to win. Ties go to the monster.', 'Win: go up a level (sometimes 2) and take its treasures.', 'You can ask one player to help, and bribe them with treasure.', 'Losing? Run away: roll 5 or 6 to escape. Fail, and the monster\'s Bad Stuff happens to you.', 'Other players can play cards to make your fight harder.'] },
      { h: 'Selling', p: 'On your turn, sell items worth 1,000 gold to go up one level. You can\'t sell your way to level 10.' },
      { h: 'How to win', p: 'The first player to reach level 10 wins, and that last level has to come from killing a monster.' }
    ],
    links: [['Munchkin rules (UltraBoardGames)', 'https://www.ultraboardgames.com/munchkin/game-rules.php']]
  },

  'coup': {
    sections: [
      { h: 'What you need', p: '15 character cards (3 each of Duke, Assassin, Captain, Ambassador, Contessa) and coins. 2–6 players.' },
      { h: 'Setup', p: 'Deal 2 cards face down to each player. These are your 2 lives (influence). Everyone takes 2 coins.' },
      { h: 'On your turn (pick one action)', li: ['Income: take 1 coin.', 'Foreign aid: take 2 coins (a Duke can block it).', 'Coup: pay 7 coins and a player loses a life. It can\'t be stopped. With 10 or more coins you must coup.', 'Duke, Tax: take 3 coins.', 'Assassin: pay 3 coins and a player loses a life (a Contessa blocks it).', 'Captain: steal 2 coins from a player (a Captain or Ambassador blocks it).', 'Ambassador: draw 2 cards, keep any 2 of your cards, put 2 back.'] },
      { h: 'Bluffing and challenges', li: ['You can claim any character, even one you don\'t have.', 'Anyone can challenge you. If you can\'t show the card, you lose a life. If you can, the challenger loses a life, and you shuffle your card back and draw a new one.', 'Blocks can be challenged too.'] },
      { h: 'Losing a life', p: 'Turn one of your cards face up. When both are face up, you\'re out.' },
      { h: 'How to win', p: 'Be the last player with a card still face down.' }
    ],
    links: [['Coup rules (UltraBoardGames)', 'https://www.ultraboardgames.com/coup/game-rules.php']]
  },

  'exploding-kittens': {
    sections: [
      { h: 'What you need', p: 'The Exploding Kittens deck. 2–5 players.' },
      { h: 'Setup', li: ['Take out the Exploding Kittens and Defuse cards.', 'Deal 4 cards to each player, then give everyone 1 Defuse.', 'Shuffle Exploding Kittens back in: one fewer than the number of players. Add the spare Defuses too.'] },
      { h: 'On your turn', li: ['Play as many cards as you want (or none).', 'Then end your turn by drawing one card.', 'Draw an Exploding Kitten and you\'re out, unless you play a Defuse. Then put the Kitten back anywhere in the pile, secretly.'] },
      { h: 'The cards', li: ['Attack: end your turn without drawing; the next player takes 2 turns.', 'Skip: end your turn without drawing.', 'Favor: another player gives you a card of their choice.', 'Shuffle: shuffle the draw pile.', 'See the Future: look at the top 3 cards.', 'Nope: stop any action (except a Kitten or Defuse). Play it any time, even on someone else\'s turn.', 'Cat cards: a matching pair steals a random card from another player.'] },
      { h: 'How to win', p: 'The last player who hasn\'t exploded wins.' }
    ],
    links: [['Exploding Kittens rules (UltraBoardGames)', 'https://www.ultraboardgames.com/exploding-kittens/game-rules.php']]
  },

  'taco-cat-goat-cheese-pizza': {
    sections: [
      { h: 'What you need', p: '64 cards. 3–8 players.' },
      { h: 'Setup', p: 'Deal all the cards face down. Don\'t look.' },
      { h: 'Playing', li: ['Take turns flipping your top card into the middle while saying the next word: "Taco, Cat, Goat, Cheese, Pizza", then start over.', 'When the card matches the word you said, everyone slaps the pile. The last hand down takes the whole pile.'] },
      { h: 'Gesture cards', li: ['Gorilla: beat your chest, then slap.', 'Narwhal: put your hands together over your head like a horn, then slap.', 'Groundhog: slap the table with both hands, then slap the pile.', 'Wrong move or last to slap: you take the pile.'] },
      { h: 'How to win', p: 'When you\'re out of cards, keep going. You win by being the first to correctly slap the next match.' }
    ],
    links: [['Rules (UltraBoardGames)', 'https://www.ultraboardgames.com/taco-cat-goat-cheese-pizza/game-rules.php']]
  },

  'sleeping-queens': {
    sections: [
      { h: 'What you need', p: '79 cards: 12 Queens, Kings, Knights, Dragons, Sleeping Potions, Wands, Jesters and number cards. 2–5 players.' },
      { h: 'Setup', p: 'Lay the 12 Queens face down in the middle. Deal 5 cards each.' },
      { h: 'On your turn (do one thing, then draw back to 5)', li: ['King: wake up a sleeping Queen and keep her.', 'Knight: steal another player\'s Queen. They can block it with a Dragon.', 'Sleeping Potion: put another player\'s Queen back to sleep. They can block it with a Wand.', 'Jester: flip the top card. A power card goes in your hand and you go again. A number: count around the table from you; that player wakes a Queen.', 'Or discard: one card (draw 1), a pair of the same number (draw 2), or a math equation like 2 + 3 = 5 (draw that many).'] },
      { h: 'Special Queens', li: ['Rose Queen: wake her and you also wake one more Queen.', 'Cat Queen and Dog Queen don\'t get along. You can\'t have both.', 'Each Queen\'s points are printed on her card.'] },
      { h: 'How to win', li: ['2–3 players: first to 5 Queens or 50 points.', '4–5 players: first to 4 Queens or 40 points.', 'If all Queens are awake first, the most points wins.'] }
    ],
    links: [['Sleeping Queens rules (UltraBoardGames)', 'https://www.ultraboardgames.com/sleeping-queens/game-rules.php']]
  },
  // ───── Batch 4: more card games ─────
  'uno-attack': {
    sections: [
      { h: 'What you need', p: 'The UNO Attack! cards and the card launcher (3 C batteries). 2–10 players.' },
      { h: 'Setup', p: 'Deal 7 cards each. Load the rest into the launcher, take one out to start the discard pile, and close the lid.' },
      { h: 'On your turn', li: ['Match the top card by color, number or symbol, or play a Wild.', 'Can\'t play? Press the launcher once. Take whatever shoots out (even cards stuck halfway). If nothing comes out, your turn is over.'] },
      { h: 'Special cards', li: ['Discard All: discard every card in your hand of that color.', 'Hit 2: the next player presses the launcher twice, takes what comes out, and loses their turn.', 'Wild Attack-Attack: pick a color and any player. They press the launcher twice and take what comes out.', 'Skip and Reverse: same as UNO.', 'Older boxes also have Trade Hands, Wild All Hit and Wild Hit Fire.'] },
      { h: 'UNO!', p: 'Say "UNO" when you play your second-to-last card. If you\'re caught, press the launcher twice.' },
      { h: 'Scoring and winning', li: ['First out wins the round and scores everyone else\'s cards.', 'Number cards are their number. Skip, Reverse and Hit 2 are 20. Discard All and Trade Hands are 30. Wilds are 50.', 'First to 500 wins.'] }
    ],
    links: [['UNO Attack rules (unorules.com)', 'https://www.unorules.com/uno-attack-rules/']]
  },

  'uno-show-em-no-mercy': {
    sections: [
      { h: 'What you need', p: 'The UNO Show \'Em No Mercy deck: 168 cards. 2–6 players.' },
      { h: 'Setup', p: 'Deal 7 cards each. Flip cards to start the discard pile until you get a number card.' },
      { h: 'On your turn', li: ['Match the top card by color, number or symbol.', 'Can\'t play? Keep drawing until you get a card you can play, then play it.'] },
      { h: 'Stacking', p: 'If someone hits you with a Draw card, you can play a Draw card of your own to pass it on, and the penalty adds up. Whoever can\'t (or won\'t) stack draws the whole total.' },
      { h: 'Special cards', li: ['Draw 2 and Draw 4 (colored): the next player draws and loses their turn.', 'Skip: the next player loses their turn. Skip Everyone: you go again.', 'Reverse: play changes direction.', 'Discard All: discard all your cards of that color.', 'Wild Draw 6 and Wild Draw 10: the next player draws 6 or 10 and loses their turn.', 'Wild Reverse Draw 4: reverse direction, then the next player draws 4.', 'Wild Color Roulette: the next player names a color and flips cards until they hit it, keeping them all.', 'Play a 7: swap hands with any player. Play a 0: everyone passes their hand to the next player.'] },
      { h: 'The Mercy rule', p: 'Anyone with 25 or more cards is out of the game.' },
      { h: 'How to win', li: ['Get rid of all your cards, or be the last player left.', 'Optional scoring: number cards their number, colored action cards 20, Wilds 50, plus 250 for each player knocked out by the Mercy rule. First to 1,000 wins.'] }
    ],
    note: 'Rule sites disagree on stacking: some say your Draw card has to match or beat the total so far, others say it only has to match or beat the last card played. Agree before you start.',
    links: [['No Mercy rules (unorules.com)', 'https://www.unorules.com/uno-show-em-no-mercy-rules/']]
  },

  'dos': {
    sections: [
      { h: 'What you need', p: 'The DOS deck: 108 cards (numbers in 4 colors, Wild DOS and Wild # cards). 2–4 players.' },
      { h: 'Setup', p: 'Deal 7 cards each. Turn 2 cards face up in the middle. This is the Center Row.' },
      { h: 'Matching (by number)', li: ['Single match: play a card with the same number on a Center Row card (any color).', 'Double match: play two cards that add up to a Center Row card\'s number.', 'Each Center Row card can take one match. You can match as many Center Row cards as you can in one turn.', 'Wild DOS counts as a 2 of any color. Wild # counts as any number in its own color.'] },
      { h: 'Color bonuses', li: ['If your match is also the same color: add one card from your hand to the Center Row at the end of your turn.', 'If a double match is the same color: also make every other player draw 1.'] },
      { h: 'End of your turn', li: ['Matched cards go to the discard pile. Refill the Center Row to 2 cards, then add any bonus cards.', 'Can\'t match anything? Draw 1. If you still can\'t match, put a card from your hand in the Center Row.'] },
      { h: 'DOS!', p: 'Say "DOS" when you have 2 cards left. If someone says it first, draw 2.' },
      { h: 'Scoring and winning', li: ['First out wins the round and scores everyone else\'s cards: numbers are their number, Wild DOS 20, Wild # 40.', 'First to 200 wins.'] }
    ],
    links: [['DOS rules (unorules.com)', 'https://www.unorules.com/dos-rules/']]
  },

  'contract-rummy': {
    sections: [
      { h: 'What you need', p: 'Two standard decks plus Jokers (one Joker fewer than the number of players). Best with 4 players, 3–5 work.' },
      { h: 'The 7 contracts', li: ['1. Two groups of 3', '2. One group of 3 + one run of 4', '3. Two runs of 4', '4. Three groups of 3', '5. Two groups of 3 + one run of 4', '6. One group of 3 + two runs of 4', '7. Three runs of 4, using all your cards (no discard)', 'A group is 3 of the same rank. A run is 4 or more in a row in one suit.', 'Deal 10 cards in rounds 1–3 and 12 cards in rounds 4–7.'] },
      { h: 'On your turn', li: ['Draw from the pile or take the top discard, then discard one card.', 'When you have the round\'s contract, lay it down (exactly the contract, once per round).', 'On later turns, you can add cards to anyone\'s melds.'] },
      { h: '"May I?"', p: 'When a player draws from the pile instead of taking the discard, anyone else can ask to buy the discard. They take it plus one penalty card from the pile.' },
      { h: 'Scoring and winning', li: ['When someone goes out, everyone else scores their leftover cards: number cards their number, J/Q/K 10, Aces 15, Jokers 15.', 'After 7 rounds, the lowest total wins.'] }
    ],
    note: 'Contract Rummy has lots of family versions (Liverpool, Shanghai, May I?) with different contracts, buy limits and card values. Put yours in House rules.',
    links: [['Contract Rummy rules (pagat.com)', 'https://www.pagat.com/rummy/ctrummy.html']]
  },

  'canasta': {
    sections: [
      { h: 'What you need', p: 'Two standard decks plus 4 Jokers (108 cards). 4 players in 2 teams, partners across from each other.' },
      { h: 'Setup', p: 'Deal 11 cards each. Turn one card up to start the discard pile; the rest is the stock.' },
      { h: 'Wild cards and threes', li: ['Jokers and 2s are wild.', 'Red 3s: put them down right away and draw a replacement. Worth 100 each (800 for all four), but minus if your team hasn\'t melded.', 'Black 3s: discarding one stops the next player from taking the pile.'] },
      { h: 'On your turn', li: ['Draw from the stock, or take the whole discard pile (see below).', 'Meld: 3 or more cards of the same rank. Each meld needs at least 2 real cards and no more than 3 wilds.', 'Your team\'s first meld must add up to at least 50 points (90 once your team has 1,500; 120 at 3,000).', 'Discard one card.'] },
      { h: 'Taking the pile', li: ['You can take the pile if you can meld its top card with cards from your hand.', 'If there\'s a wild card in the pile, it\'s frozen: you need two real matching cards from your hand.'] },
      { h: 'Canastas and going out', li: ['A canasta is a meld of 7 or more. Natural (no wilds): 500 bonus. Mixed: 300 bonus.', 'You can only go out once your team has at least one canasta. Going out is worth 100.'] },
      { h: 'Scoring', p: 'Add your melded cards and bonuses, minus cards left in hand. Jokers 50, Aces and 2s 20, 8–King 10, 4–7 and black 3s 5.' },
      { h: 'How to win', p: 'First team to 5,000 wins.' }
    ],
    links: [['Canasta rules (pagat.com)', 'https://www.pagat.com/rummy/canasta.html']]
  },

  'hand-and-foot': {
    sections: [
      { h: 'What you need', p: 'One more deck than the number of players (each with 2 Jokers). Usually 4 players in 2 teams.' },
      { h: 'Setup', p: 'Each player gets two piles: a "hand" and a "foot" (13 cards each in the standard version). Play your hand first, then pick up your foot.' },
      { h: 'Melds', li: ['Melds are 3 to 7 cards of the same rank (Aces down to 4s). A 7-card meld is a "pile" (book).', 'Jokers and 2s are wild. There must be at least twice as many real cards as wilds.', 'Your team\'s first meld each round must reach: 50 points (round 1), 90 (round 2), 120 (round 3), 150 (round 4).'] },
      { h: 'On your turn', li: ['Draw 2 from the stock, or take the top 7 of the discard pile (you need 2 matching cards in hand to meld the top card).', 'Meld what you can, then discard one card.', 'Red 3s: lay them down and replace them. Black 3s block the next player from the pile.'] },
      { h: 'Going out', li: ['Your team needs a set number of finished piles, usually two clean, two dirty and one all-wild.', 'Your partner must have started their foot, and you ask them first.'] },
      { h: 'Scoring', li: ['Clean pile 500, dirty pile 300, wild pile 1,500, going out 100.', 'Red 3s +100 each (−100 if still in your hand or foot).', 'Cards: Jokers 50, 2s and Aces 20, 8–King 10, 4–7 and black 3s 5. Cards left in hand count against you.'] },
      { h: 'How to win', p: 'After 4 rounds, the highest team total wins.' }
    ],
    note: 'Hand and Foot has more house versions than almost any card game (11 or 13 card piles, different book scores, different going-out rules). Put your family\'s version in House rules.',
    links: [['Hand and Foot rules (pagat.com)', 'https://www.pagat.com/rummy/handfoot.html']]
  },

  'quiddler': {
    sections: [
      { h: 'What you need', p: 'The Quiddler deck: 118 letter cards, including double-letter cards (QU, IN, ER, CL, TH). 1–8 players.' },
      { h: 'Rounds', p: '8 rounds. Deal 3 cards in round 1, then one more each round, up to 10 cards in round 8.' },
      { h: 'On your turn', li: ['Draw from the pile or take the top discard, then discard one card.', 'You\'re trying to use your cards to spell words. Each word needs at least 2 cards. No names, abbreviations or hyphenated words.'] },
      { h: 'Going out', li: ['When you can use all your cards but one in words, lay them down and discard the last card.', 'Everyone else gets one last turn, then lays down what words they can.'] },
      { h: 'Scoring', li: ['Add up the points printed on the cards in your words. Subtract cards you couldn\'t use (a round can\'t go below 0).', 'Bonuses: 10 for the longest word and 10 for the most words (no bonus if tied).'] },
      { h: 'How to win', p: 'After 8 rounds, the highest total wins.' }
    ],
    links: [['Quiddler rules (UltraBoardGames)', 'https://www.ultraboardgames.com/quiddler/game-rules.php']]
  },

  'monopoly-deal': {
    sections: [
      { h: 'What you need', p: 'The Monopoly Deal deck: property, wild property, money, rent and action cards. 2–5 players.' },
      { h: 'Setup', p: 'Deal 5 cards each. The youngest player goes first.' },
      { h: 'On your turn', li: ['Draw 2 cards (5 if your hand was empty).', 'Play up to 3 cards: money and action cards into your bank, properties in front of you, or action cards for their effect.', 'End with no more than 7 cards in your hand.'] },
      { h: 'Rent and paying', li: ['Rent cards charge rent for one of your property colors. The more properties you have in that color, the higher the rent.', 'The player paying chooses what to pay with: money, banked cards or properties. Cards in your hand don\'t count.', 'If you can\'t pay it all, pay what you have. You\'re never out of the game.'] },
      { h: 'Action cards', li: ['Deal Breaker: take a whole finished set from a player.', 'Sly Deal: steal one property (not from a finished set).', 'Forced Deal: swap one of your properties for one of theirs (not from a finished set).', 'Just Say No: cancel an action played on you. Another Just Say No cancels that.', 'Debt Collector: one player pays you $5M.', 'It\'s My Birthday: everyone pays you $2M.', 'Pass Go: draw 2 more cards.', 'Double the Rent: play with a rent card to double it.', 'House and Hotel: add to a finished set for more rent (not railroads or utilities).'] },
      { h: 'How to win', p: 'The first player with 3 finished property sets of different colors wins.' }
    ],
    links: [['Monopoly Deal rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/monopoly-deal/']]
  },

  'sequence': {
    sections: [
      { h: 'What you need', p: 'The Sequence board, 104 cards and chips in 3 colors. 2–12 players; with more than 3, play in teams (up to 3 teams).' },
      { h: 'Setup', p: 'Deal cards: 7 each with 2 players, 6 with 3–4, 5 with 6, 4 with 8–9, 3 with 10–12.' },
      { h: 'On your turn', li: ['Play a card from your hand and put a chip on one of the two matching spaces on the board.', 'Draw a card.', 'If both spaces for a card are already covered, it\'s a dead card: show it, discard it and draw a new one.'] },
      { h: 'Jacks', li: ['Two-eyed Jacks are wild: put your chip on any open space.', 'One-eyed Jacks remove one opponent\'s chip (not one in a finished Sequence).'] },
      { h: 'Making a Sequence', li: ['A Sequence is 5 of your chips in a row: across, up and down, or diagonal.', 'The 4 corners are free spaces that count for everyone.', 'No coaching your teammates!'] },
      { h: 'How to win', p: 'With 2 players or 2 teams, make 2 Sequences. With 3 players or teams, make 1.' }
    ],
    links: [['Sequence rules (UltraBoardGames)', 'https://www.ultraboardgames.com/sequence/game-rules.php']]
  },

  'spot-it': {
    sections: [
      { h: 'What you need', p: '55 round cards with 8 symbols each. Any two cards share exactly one matching symbol. 2–8 players.' },
      { h: 'How it works', p: 'Find the one symbol two cards have in common and call it out first. The box has several mini-games. Here are the main ones.' },
      { h: 'The Tower', p: 'Everyone starts with one card face down; the rest of the deck sits face up in the middle. Spot the match between your top card and the middle card, call it, and take the middle card onto your pile. When the deck is gone, most cards wins.' },
      { h: 'The Well', p: 'Deal out all the cards except one, which goes face up in the middle. Spot the match between your top card and the middle card, call it, and put your card on the middle. First to get rid of all their cards wins.' },
      { h: 'Hot Potato', p: 'Each round, everyone gets one card. Spot a match with another player\'s card and put yours on top of theirs. The player stuck with all the cards loses the round.' },
      { h: 'Poisoned Gift', p: 'Like The Tower, but you give the middle card to another player when you spot a match with their card. When the deck runs out, fewest cards wins.' },
      { h: 'Triplet', p: 'Lay out 9 cards. Find a symbol on 3 of them, call it, and take those 3. Most cards wins.' }
    ],
    links: [['Spot It! mini-games (UltraBoardGames)', 'https://www.ultraboardgames.com/spot-it/mini-games.php']]
  },

  'blink': {
    sections: [
      { h: 'What you need', p: 'The Blink deck: 60 cards with shapes in different colors and counts. 2 players.' },
      { h: 'Setup', li: ['Split the deck into two equal draw piles, one per player.', 'Each player puts their top card face down in the middle, side by side.', 'Each player draws a hand of 3.'] },
      { h: 'Playing (no turns, as fast as you can)', li: ['Flip the two middle cards at the same time.', 'Play a card from your hand onto either middle pile if it matches the top card by color, shape or number of shapes.', 'One card at a time, with one hand. Refill your hand to 3 from your draw pile.', 'If nobody can play, each player flips their top draw-pile card onto a middle pile.'] },
      { h: 'How to win', p: 'The first player to get rid of all their cards (hand and draw pile) wins.' }
    ],
    links: [['Blink rules (UltraBoardGames)', 'https://www.ultraboardgames.com/blink/game-rules.php']]
  },

  'cover-your-assets': {
    sections: [
      { h: 'What you need', p: 'The Cover Your Assets deck: asset cards (each with a dollar value printed on it) and Gold and Silver wild cards. 2–6 players.' },
      { h: 'Setup', p: 'Deal 5 cards each with 2–3 players, 4 with 4–6. Flip one card to start the discard pile.' },
      { h: 'On your turn (do one thing)', li: ['Make a pair from your hand (two matching assets, or one asset and a wild) and put it on your stack.', 'Make a pair with the top discard and a matching card from your hand.', 'Challenge another player for their top set (see below).', 'Discard one card.', 'Then draw back up to your hand size.'] },
      { h: 'Your stack', li: ['Each new pair goes on top of your stack, turned crosswise.', 'Only the top pair can be stolen. Your bottom pair is always safe.'] },
      { h: 'Challenges', li: ['To steal, show a card that matches another player\'s top pair (or a wild).', 'They can answer with a matching card or wild, and you go back and forth.', 'Whoever plays the last card wins the pair and every card played, and puts it on their stack.', 'Two wilds can never be a pair by themselves.'] },
      { h: 'How to win', p: 'When the draw pile runs out, keep playing until hands are empty. Add up the value of your stack. First to $1,000,000 over several rounds wins.' }
    ],
    links: [['Cover Your Assets rules (UltraBoardGames)', 'https://www.ultraboardgames.com/cover-your-assets/game-rules.php']]
  },

  'unstable-unicorns': {
    sections: [
      { h: 'What you need', p: 'The Unstable Unicorns deck. 2–8 players.' },
      { h: 'Setup', li: ['Everyone puts one Baby Unicorn in their Stable (the cards in front of you). The other Baby Unicorns go in the Nursery.', 'Deal 5 cards each.', 'The player wearing the most colors goes first.'] },
      { h: 'On your turn', li: ['1. Beginning: use any "beginning of turn" effects in your Stable.', '2. Draw 1 card.', '3. Action: play 1 card, or draw 1 more card.', '4. End: discard down to 7 cards.'] },
      { h: 'The cards', li: ['Basic Unicorns: no powers. Magical Unicorns: special powers.', 'Magic: one-time effect, then discard.', 'Upgrades help a Stable; Downgrades hurt one.', 'Instant cards (like Neigh): play any time to stop another card from being played.', 'Baby Unicorns only come out from other cards.'] },
      { h: 'How to win', p: 'Be the first with 7 Unicorns in your Stable (6 with 6–8 players). Baby Unicorns count. If the deck runs out, the game ends with no winner, unless your family reshuffles.' }
    ],
    links: [['Unstable Unicorns rules (UltraBoardGames)', 'https://www.ultraboardgames.com/unstable-unicorns/game-rules.php']]
  },

  'here-to-slay': {
    sections: [
      { h: 'What you need', p: 'Hero, Item, Magic, Modifier and Challenge cards, 6 Party Leaders, 15 Monsters and 2 dice. 2–6 players.' },
      { h: 'Setup', p: 'Everyone picks a Party Leader. Deal 5 cards each. Turn 3 Monsters face up.' },
      { h: 'On your turn: 3 action points', li: ['Draw a card: 1 point.', 'Play a Hero, Item or Magic card: 1 point.', 'Roll to use a Hero\'s ability: 1 point (you get one free roll when you first play a Hero).', 'Attack a Monster: 2 points.', 'Discard your hand and draw 5: 3 points.', 'Modifier and Challenge cards are free.'] },
      { h: 'Rolling and challenges', li: ['Roll 2 dice. Meet the number on the Hero to use its ability.', 'Modifier cards add or subtract from anyone\'s roll.', 'When someone plays a Hero, Item or Magic card, you can challenge it: both roll, and if you tie or beat them, their card is discarded.'] },
      { h: 'Monsters', p: 'Your party must meet the Monster\'s requirements to attack it. Roll its slay number or higher to slay it and keep its power. Roll its fight-back number and you take its penalty.' },
      { h: 'How to win', p: 'Slay 3 Monsters, or end your turn with heroes of all 6 classes in your party (your Party Leader counts).' }
    ],
    links: [['Here to Slay rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/here-to-slay/']]
  },

  'fluxx': {
    sections: [
      { h: 'What you need', p: 'A Fluxx deck. 2–6 players.' },
      { h: 'Setup', p: 'Put the Basic Rules card in the middle: draw 1, play 1. Deal 3 cards each. There\'s no Goal at the start.' },
      { h: 'On your turn', p: 'Draw as many cards as the rules say, then play as many as the rules say. Then follow any Hand Limit or Keeper Limit in play.' },
      { h: 'The cards', li: ['New Rule: changes the rules right away (like Draw 3 or Play 2). If it clashes with an older rule, the old one goes.', 'Goal: what it takes to win. A new Goal replaces the old one.', 'Keeper: put it in front of you. Most Goals need certain Keepers.', 'Action: do it once, then discard.', 'Some versions have Creepers, which usually stop you from winning.'] },
      { h: 'How to win', p: 'Whoever matches the current Goal wins right away, even on someone else\'s turn.' }
    ],
    links: [['Fluxx rules (UltraBoardGames)', 'https://www.ultraboardgames.com/fluxx/game-rules.php']]
  },

  'bang': {
    sections: [
      { h: 'What you need', p: 'Role cards, character cards, the play deck and bullet tokens. 4–7 players.' },
      { h: 'Roles', li: ['Sheriff (face up): wipe out the Outlaws and the Renegade.', 'Deputies (secret): help the Sheriff.', 'Outlaws (secret): kill the Sheriff.', 'Renegade (secret): be the last one alive.', '4 players: Sheriff, Renegade, 2 Outlaws. 5: add a Deputy. 6: 3 Outlaws. 7: 2 Deputies and 3 Outlaws.'] },
      { h: 'Setup', p: 'Everyone gets a character with a special ability. Your life (bullets) is shown on your character; the Sheriff gets 1 extra. Draw as many cards as your life.' },
      { h: 'On your turn', li: ['Draw 2 cards.', 'Play any cards you like, but only 1 BANG! per turn.', 'Discard down to your current life.'] },
      { h: 'Key cards', li: ['BANG!: shoot a player within your weapon\'s range. They lose 1 life unless they play a Missed!', 'Beer: get 1 life back.', 'Weapons let you shoot farther. Mustang makes you harder to reach. Scope lets you reach farther.'] },
      { h: 'Getting knocked out', li: ['At 0 life you\'re out (unless you play a Beer right then). Show your role.', 'Whoever knocks out an Outlaw draws 3 cards.', 'If the Sheriff knocks out a Deputy, the Sheriff loses all their cards.'] },
      { h: 'How to win', li: ['Sheriff and Deputies win when all Outlaws and the Renegade are gone.', 'Outlaws win when the Sheriff dies.', 'The Renegade wins only by being the last player standing.'] }
    ],
    links: [['BANG! rules (UltraBoardGames)', 'https://www.ultraboardgames.com/bang/game-rules.php']]
  },

  'throw-throw-burrito': {
    sections: [
      { h: 'What you need', p: 'The cards and 2 squishy burritos. 2–6 players.' },
      { h: 'Playing (no turns)', li: ['Everyone keeps a hand of 5 cards and plays at the same time.', 'Draw from your own pile, and pass cards you don\'t want face down onto the pile of the player to your left.', 'Collect sets of 3 matching cards.'] },
      { h: 'Scoring sets', li: ['A set of 3 matching cards: 1 point.', 'A set of 3 burrito cards: 2 points, and it starts a battle.'] },
      { h: 'Burrito battles', li: ['Brawl: the players on your left and right grab burritos and throw at each other.', 'War: everyone except you grabs a burrito and throws.', 'Duel: pick two players. They stand back to back, step apart, turn and throw.', 'Get hit and you take a bruise: −1 point.'] },
      { h: 'How to win', p: 'Count points after each round. Most points after 2 rounds wins. A tie is settled with a sudden-death duel.' }
    ],
    note: 'Rule sites disagree on whether War has one loser or two, and whether you win by total points or by winning rounds. Check your rulebook.',
    links: [['Throw Throw Burrito rules (GameRules.com)', 'https://gamerules.com/rules/throw-throw-burrito/']]
  },

  'jaipur': {
    sections: [
      { h: 'What you need', p: '55 cards (goods and camels), goods tokens, bonus tokens, a camel token and 3 Seals of Excellence. 2 players.' },
      { h: 'Setup', li: ['Put 3 camels face up in the market. Deal 5 cards each, then add 2 more cards to the market so it has 5.', 'Move any camels in your hand into a herd in front of you.'] },
      { h: 'On your turn: take OR sell', li: ['Take: one good from the market, or all the camels, or swap several of your cards (goods or camels) for the same number of market goods. Refill the market.', 'Sell: sell any number of one type of good. Take that many tokens, starting with the most valuable.', 'Diamonds, gold and silver must be sold at least 2 at a time.', 'Hand limit: 7 cards (camels don\'t count).'] },
      { h: 'Bonuses', li: ['Selling 3 cards earns a 3-card bonus token, 4 cards a 4-card bonus, 5 or more a 5-card bonus.', 'Most camels at the end of the round: 5 points.'] },
      { h: 'End of a round', p: 'A round ends when 3 types of goods tokens are gone, or the market can\'t be refilled. The richer player wins a Seal of Excellence.' },
      { h: 'How to win', p: 'First to 2 Seals of Excellence wins.' }
    ],
    links: [['Jaipur rules (UltraBoardGames)', 'https://www.ultraboardgames.com/jaipur/game-rules.php']]
  },

  'snap': {
    sections: [
      { h: 'What you need', p: 'A standard deck (or a Snap deck). 2 or more players.' },
      { h: 'Setup', p: 'Deal out all the cards face down. Don\'t look.' },
      { h: 'Playing', li: ['Take turns flipping your top card face up onto your own pile.', 'When the top cards of any two piles match (same number or picture), shout "Snap!"', 'The first to shout wins both piles and puts them under their stack.', 'Shout Snap when there\'s no match and you give each other player a card.'] },
      { h: 'How to win', p: 'The player who wins all the cards wins.' }
    ]
  },

  'memory': {
    sections: [
      { h: 'What you need', p: 'A set of matching pairs (a Memory game, or a deck of cards using pairs). 1 or more players.' },
      { h: 'Setup', p: 'Shuffle the cards and lay them all face down in a grid.' },
      { h: 'On your turn', li: ['Flip any 2 cards face up.', 'If they match, keep the pair and go again.', 'If they don\'t, flip them back face down where they were. Next player\'s turn.', 'Try to remember where everything is!'] },
      { h: 'How to win', p: 'When all pairs are found, the player with the most pairs wins.' }
    ]
  },
  // ───── Batch 5: the rest of the card games ─────
  'spades-cutthroat': {
    sections: [
      { h: 'How it\'s different', p: 'Cutthroat Spades is regular Spades with no partners: everyone plays for themselves. 3 or 4 players.' },
      { h: 'Playing', li: ['Deal out the cards (13 each with 4 players; with 3 players, deal 17 each and leave one card out).', 'Everyone bids how many tricks they\'ll win. Bidding 0 is nil.', 'Follow suit if you can. Spades always win over other suits, and can\'t be led until one has been played.'] },
      { h: 'Scoring', li: ['Make your bid: 10 per trick bid, plus 1 for each extra trick (a bag).', 'Miss it: lose 10 per trick bid. Every 10 bags costs 100.', 'Nil: +100 if you take no tricks, −100 if you take any.', 'Tally works this out when you enter bids and tricks.'] },
      { h: 'How to win', p: 'First to 500 wins.' }
    ],
    links: [['Spades rules (pagat.com)', 'https://www.pagat.com/auctionwhist/spades.html']]
  },

  'oh-hell': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck, Aces high. 3–7 players.' },
      { h: 'The hands', p: 'Deal 10 cards each with 3–5 players (8 with 6, 7 with 7). Each hand deals one fewer card, down to 1, then back up again.' },
      { h: 'Trump', p: 'After the deal, turn up the next card. Its suit is trump for that hand.' },
      { h: 'Bidding', li: ['Starting left of the dealer, everyone says how many tricks they\'ll win. 0 is allowed.', 'The dealer bids last and can\'t make the bids add up to the number of cards dealt, so somebody has to miss.'] },
      { h: 'Playing tricks', p: 'Follow suit if you can. If you can\'t, play anything. The highest trump wins, or the highest card of the suit led.' },
      { h: 'Scoring', p: 'Win exactly your bid: 10 plus your bid. Miss it by any amount: 0. (A popular version gives 1 per trick plus 10 for an exact bid.)' },
      { h: 'How to win', p: 'Highest total after the last hand wins.' }
    ],
    note: 'Oh Hell has lots of scoring systems. Tally uses "10 plus your bid". If your family scores differently, type each round\'s points in directly.',
    links: [['Oh Hell rules (pagat.com)', 'https://www.pagat.com/exact/ohhell.html']]
  },

  'wizard': {
    sections: [
      { h: 'What you need', p: 'The Wizard deck: 60 cards, 52 numbered cards in 4 colors plus 4 Wizards and 4 Jesters. 3–6 players.' },
      { h: 'Rounds', p: 'Round 1 deals 1 card each, round 2 deals 2, and so on until the deck runs out: 20 rounds with 3 players, 15 with 4, 12 with 5, 10 with 6.' },
      { h: 'Trump', p: 'Turn up the next card. A Jester means no trump. A Wizard means the dealer picks trump. In the last round there\'s no trump.' },
      { h: 'Bidding', p: 'Starting left of the dealer, everyone says how many tricks they\'ll win.' },
      { h: 'Playing tricks', li: ['Follow suit if you can. Wizards and Jesters can be played any time.', 'The first Wizard played wins the trick. Otherwise the highest trump, then the highest card of the suit led.', 'Jesters always lose (unless only Jesters are played).'] },
      { h: 'Scoring', li: ['Exactly right: 20 plus 10 per trick won.', 'Wrong: lose 10 for each trick you were off.'] },
      { h: 'How to win', p: 'Highest total after the last round wins.' }
    ],
    links: [['Wizard rules (UltraBoardGames)', 'https://www.ultraboardgames.com/wizard/game-rules.php']]
  },

  'skull-king': {
    sections: [
      { h: 'What you need', p: 'The Skull King deck: 4 suits of numbered cards (black is trump) plus Pirates, Mermaids, Escapes, the Skull King and a Tigress (or Scary Mary in older boxes). 2–8 players.' },
      { h: 'Rounds and bidding', p: '10 rounds: deal 1 card in round 1 up to 10 in round 10. Everyone bids at the same time: say "Yo-ho-ho!" and show fingers for your bid (a fist for 0).' },
      { h: 'Playing tricks', li: ['Follow the suit led if you play a numbered card. Special cards can be played any time.', 'Black cards beat the other suits.', 'Pirates beat all numbered cards (and Mermaids).', 'The Skull King beats Pirates. A Mermaid beats the Skull King.', 'Escape always loses. The Tigress is played as a Pirate or an Escape; you choose.'] },
      { h: 'Scoring', li: ['Bid right (1 or more): 20 per trick.', 'Bid wrong: lose 10 per trick you were off.', 'Bid 0 and take nothing: 10 × the round number. Bid 0 and take any tricks: lose 10 × the round number.', 'Bonuses only count when your bid is right: +30 for each Pirate your Skull King captures. Other bonuses (a Mermaid catching the Skull King, capturing 14s) depend on your box, so check your rulebook.'] },
      { h: 'How to win', p: 'Highest total after 10 rounds wins.' }
    ],
    note: 'The older and newer Skull King boxes differ (Scary Mary vs Tigress, some bonus values). Use your box\'s bonuses; Tally adds whatever you type in the Bonus box.',
    links: [['Skull King rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/skull-king/']]
  },

  'rage': {
    sections: [
      { h: 'What you need', p: 'The Rage deck: colored number cards plus Rage action cards.' },
      { h: 'Rounds', p: '10 rounds: deal 10 cards in round 1, then 9, down to 1 card in round 10. The leftover pile sets trump: flip its top card (skip action cards).' },
      { h: 'Bidding', p: 'In turn, starting left of the dealer, everyone bids how many tricks they\'ll win (0 up to the cards in hand).' },
      { h: 'Playing tricks', li: ['Follow suit if you can. If you can\'t, play anything, including an action card.', 'Highest trump wins, otherwise the highest card of the suit led.'] },
      { h: 'Rage cards', li: ['Out Rage: no trump for the rest of the round (until a Change Rage).', 'Change Rage: pick a new trump color.', 'Wild Rage: name a color. It\'s the highest card of that color.', 'Bonus Rage: whoever wins the trick gets +5.', 'Mad Rage: whoever wins the trick gets −5.'] },
      { h: 'Scoring', p: '+1 per trick you win, +10 if you got your bid exactly (+5 for correctly bidding 0), plus or minus 5 for Bonus and Mad Rage cards you took. A missed bid just gets no bonus.' },
      { h: 'How to win', p: 'Highest total after 10 rounds wins.' }
    ],
    links: [['Rage rules (UltraBoardGames)', 'https://www.ultraboardgames.com/rage/game-rules.php']]
  },

  'pinochle': {
    sections: [
      { h: 'What you need', p: 'A Pinochle deck: 48 cards, two each of A, 10, K, Q, J, 9 in every suit. The 10 ranks just below the Ace. 4 players in 2 teams.' },
      { h: 'Bidding', li: ['Deal 12 cards each.', 'Starting left of the dealer, bid in steps of 10, from 250. Pass and you\'re out of the bidding.', 'If everyone else passes, the dealer has to take it at 250.', 'The winner names trump. Their partner passes them 4 cards, and they pass 4 back.'] },
      { h: 'Meld (lay down your combos)', li: ['Run in trump (A-10-K-Q-J): 150.', 'Royal marriage (trump K-Q): 40. Other marriage (K-Q same suit): 20.', 'Pinochle (Jack of diamonds + Queen of spades): 40. Double pinochle: 300.', 'Aces around (one Ace of each suit): 100. Kings around: 80. Queens: 60. Jacks: 40. (Double sets score 10 times more.)', 'Nine of trump (dix): 10.'] },
      { h: 'Playing tricks', li: ['Follow suit if you can, and beat the card that\'s winning if you can.', 'No card of that suit? You must trump if you can.', 'Counters: every A, 10 and K you win is worth 10, plus 10 for the last trick (250 total).'] },
      { h: 'Scoring', li: ['If the bidding team\'s meld plus counters reaches their bid, they score all of it.', 'If not, they "go set" and lose the amount they bid.', 'The other team keeps their meld if they take at least one counter.'] },
      { h: 'How to win', p: 'First team to 1,500 wins.' }
    ],
    note: 'Pinochle varies a lot from family to family (meld values, minimum bid, passing cards). Put yours in House rules.',
    links: [['Pinochle rules (pagat.com)', 'https://www.pagat.com/marriage/pinmain.html']]
  },

  'rook': {
    sections: [
      { h: 'What you need', p: 'A Rook deck: 4 colors numbered 1–14 plus the Rook bird card. 4 players in 2 teams.' },
      { h: 'Setup (Kentucky Rook)', p: 'Take out the 2s, 3s and 4s. Deal 10 cards each and put 5 in the middle as the nest.' },
      { h: 'Bidding', li: ['Bid in steps of 5, starting at 100. Pass and you\'re out.', 'The winner takes the nest, puts back 5 cards (no point cards), and names trump.'] },
      { h: 'Card order and points', li: ['High to low: 1, 14, 13 … 5. The Rook is the highest trump.', 'Points: 1s are 15, 14s and 10s are 10, 5s are 5, the Rook is 20. 180 in all.'] },
      { h: 'Playing tricks', p: 'Follow color if you can; otherwise play anything. The Rook counts as a trump.' },
      { h: 'Scoring', p: 'Make your bid and you score what you took. Miss it and you lose the bid. The other team always scores what they took.' },
      { h: 'How to win', p: 'First team to 500 wins.' }
    ],
    note: 'The Rook box\'s own tournament rules are a bit different (1s also removed, 9 cards each, bids from 70, play to 300). Use whichever your family plays.',
    links: [['Rook rules (pagat.com)', 'https://www.pagat.com/kt5/rook.html']]
  },

  'bid-whist': {
    sections: [
      { h: 'What you need', p: 'A standard deck plus 2 Jokers (big and little). 4 players in 2 teams.' },
      { h: 'Setup', p: 'Deal 12 cards each. The last 6 go face down as the kitty.' },
      { h: 'Bidding', li: ['One time around. Each bid is a number from 3 to 7 (books over 6) plus "uptown" (high cards win), "downtown" (low cards win) or "no trump".', 'No trump beats the same number uptown or downtown.', 'If the first three pass, the dealer must bid.', 'The winner takes the kitty, discards 6 (these count as their first book) and names trump.'] },
      { h: 'Card order', li: ['Uptown: big Joker, little Joker, A, K … 2.', 'Downtown: big Joker, little Joker, A, 2, 3 … K.'] },
      { h: 'Playing', p: 'Follow suit if you can. If you can\'t, trump or throw off. Highest trump wins, or the best card of the suit led.' },
      { h: 'Scoring', li: ['Each book over 6 is 1 point.', 'Make your bid and you score what you took. Miss it and you lose the bid. No trump bids count double.'] },
      { h: 'How to win', p: 'First team to 7 (or the other team falls to −7).' }
    ],
    links: [['Bid Whist rules (pagat.com)', 'https://www.pagat.com/auctionwhist/bidwhist.html']]
  },

  'whist': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 4 players in 2 teams, partners across from each other.' },
      { h: 'Setup', p: 'Deal 13 cards each. The dealer\'s last card is turned face up: its suit is trump.' },
      { h: 'Playing', p: 'The player left of the dealer leads. Follow suit if you can; if not, play anything. Highest trump wins, otherwise the highest card of the suit led.' },
      { h: 'Scoring', li: ['The team that wins more tricks scores 1 point for each trick over 6.', 'Optional honors: holding all four of the trump A, K, Q, J scores 4; three of them scores 2.'] },
      { h: 'How to win', p: 'First to 7 in American whist (5 in British whist).' }
    ],
    links: [['Whist rules (pagat.com)', 'https://www.pagat.com/whist/whist.html']]
  },

  '500-five-hundred': {
    sections: [
      { h: 'What you need', p: 'A 43-card deck: black suits 5 to Ace, red suits 4 to Ace, plus 1 Joker. 4 players in 2 teams.' },
      { h: 'Setup', p: 'Deal 10 cards each and 3 face down as the kitty.' },
      { h: 'Bidding', li: ['Bid how many tricks (6–10) and a trump suit or No Trumps. Suits rank: No Trumps, Hearts, Diamonds, Clubs, Spades.', 'Misère (lose every trick, playing alone) and Open Misère are special bids.', 'The winner takes the kitty and discards 3.'] },
      { h: 'Card order', p: 'The Joker is highest, then the Jack of trump (right bower), then the other Jack of the same color (left bower), then A, K, Q, 10 …' },
      { h: 'Scoring', li: ['Bid values: 6 Spades 40, 6 Clubs 60, 6 Diamonds 80, 6 Hearts 100, 6 No Trumps 120. Each extra trick bid adds 100 (10 No Trumps is 520).', 'Misère 250, Open Misère 500.', 'Make it: score the bid. Miss it: lose the bid.', 'The other team gets 10 per trick they win.', 'Win all 10 tricks: at least 250.'] },
      { h: 'How to win', p: 'Reach 500 by making a bid. Fall to −500 and you lose.' }
    ],
    links: [['500 rules (pagat.com)', 'https://www.pagat.com/euchre/500.html']]
  },

  'pitch': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 4 players in 2 teams.' },
      { h: 'Bidding', li: ['Deal 6 cards each.', 'One time around: bid 2, 3, 4 or "smudge" (all four points and every trick).', 'The dealer can steal the bid by matching it. If everyone passes, the dealer must bid 2.', 'The bidder\'s first card played sets trump.'] },
      { h: 'The 4 points', li: ['High: the highest trump played.', 'Low: whoever wins the lowest trump played.', 'Jack: whoever wins the Jack of trump.', 'Game: most card points in tricks won (A 4, K 3, Q 2, J 1, 10 counts 10).'] },
      { h: 'Scoring', p: 'Make your bid and you score the points you took. Miss it and you go back (lose) the amount you bid. The other team always scores what they took.' },
      { h: 'How to win', p: 'First to 21, but only at the end of a hand where you made your bid.' }
    ],
    links: [['Pitch rules (pagat.com)', 'https://www.pagat.com/allfours/pitch.html']]
  },

  'smear': {
    sections: [
      { h: 'What it is', p: 'Smear is Wisconsin\'s version of Pitch, and every town plays it a little differently.' },
      { h: 'Common differences from Pitch', li: ['Jokers may be added as low trumps, worth 1 point to whoever takes them.', 'The other Jack of the same color ("jick" or off-jack) is often a trump, worth 1 point.', 'Low goes to the player who held the lowest trump.', 'Players may discard and draw after bidding.'] },
      { h: 'Playing', p: 'Bid for the points, the bidder sets trump, and you play tricks like Pitch: high, low, jack, game, plus any extra points your version uses.' },
      { h: 'How to win', p: 'Usually first to 21 (some groups play to 15 or 52).' }
    ],
    note: 'Because Smear changes so much from table to table, write your version in House rules so everyone plays the same way.',
    links: [['Smear rules (pagat.com)', 'https://www.pagat.com/allfours/schmier.html']]
  },

  'sheepshead': {
    sections: [
      { h: 'What you need', p: '32 cards (7 through Ace). 3–5 players (5 is most common).' },
      { h: 'Trump order', p: 'There are 14 trumps: all the Queens, then all the Jacks (clubs, spades, hearts, diamonds), then the diamonds A, 10, K, 9, 8, 7. Other suits go A, 10, K, 9, 8, 7.' },
      { h: 'Card points', p: 'Ace 11, 10 is 10, King 4, Queen 3, Jack 2. 120 points in all.' },
      { h: 'The deal and the picker', li: ['With 5 players, deal 6 cards each and 2 face down as the blind.', 'Starting left of the dealer, each player can pick up the blind. The picker buries 2 cards (their points count for the picker).', 'The picker\'s partner is whoever holds the Jack of diamonds (or the picker calls an Ace, depending on your table).'] },
      { h: 'Winning a hand', li: ['The picker\'s side needs 61 or more.', 'Lose with 30–59: pay 1. Under 30 (schneider): pay 2. No tricks: pay 3.', 'If the picker\'s side loses, they pay double.', 'If nobody picks, play "leasters": fewest points wins.'] }
    ],
    note: 'Sheepshead table rules vary a lot (calling an Ace vs Jack of diamonds, doublers, cracking). Put yours in House rules.',
    links: [['Sheepshead rules (pagat.com)', 'https://www.pagat.com/schafk/shep.html']]
  },

  'bridge': {
    sections: [
      { h: 'The basics', p: 'Bridge is a deep game with a long rulebook. This is just the overview to get started.' },
      { h: 'Setup', p: '4 players in 2 teams, partners across from each other. Deal all 52 cards, 13 each.' },
      { h: 'The auction', li: ['Starting with the dealer, players bid. A bid is a number (tricks over 6) and a suit or No Trump, like "2 hearts" (8 tricks with hearts as trump).', 'Suits rank: No Trump, spades, hearts, diamonds, clubs.', 'You can also pass, double or redouble. Three passes in a row ends it; the last bid is the contract.'] },
      { h: 'Playing', li: ['The declarer plays both their hand and their partner\'s. The partner\'s cards (dummy) go face up.', 'Follow suit if you can. Highest trump wins, or the highest card of the suit led.'] },
      { h: 'Scoring (basics)', li: ['Each trick bid and made over 6: clubs and diamonds 20, hearts and spades 30, No Trump 40 for the first then 30.', '100 of these points makes a game. Win 2 games for the rubber.', 'Miss your contract and the other team scores for each trick you fell short.'] }
    ],
    links: [['Bridge rules (pagat.com)', 'https://www.pagat.com/auctionwhist/bridge.html'], ['Learn to play (ACBL)', 'https://www.acbl.org/learn_page/how-to-play-bridge/']]
  },

  'casino': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2–4 players (4 can play as partners).' },
      { h: 'Setup', p: 'Deal 4 cards to each player and 4 face up on the table. When everyone runs out, deal 4 more each (none to the table) until the deck is gone.' },
      { h: 'On your turn (play one card)', li: ['Capture: take table cards that match your card, or groups that add up to it (Ace 1, number cards their number). Face cards only capture the same face card.', 'Build: add your card to table cards to make a total you can capture next turn, and call it ("building 8").', 'Trail: just put a card face up on the table.'] },
      { h: 'End of a hand', p: 'Whoever made the last capture takes any cards left on the table.' },
      { h: 'Scoring (11 points a hand)', li: ['Most cards 3. Most spades 1.', 'Big Casino (10 of diamonds) 2. Little Casino (2 of spades) 1.', 'Each Ace 1.', 'Many families also give 1 for each sweep (clearing the whole table).'] },
      { h: 'How to win', p: 'First to 21 wins.' }
    ],
    links: [['Casino rules (pagat.com)', 'https://www.pagat.com/fishing/casino.html']]
  },

  'thirty-one-scat': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck and 3 lives (tokens) per player. 2–9 players.' },
      { h: 'Card values', p: 'Ace 11, face cards 10, others their number. Your score is the total of cards in one suit. The best hand is 31: an Ace and two 10-point cards of the same suit.' },
      { h: 'On your turn', li: ['Deal 3 cards each and start a discard pile.', 'Draw from the pile or the discard pile, then discard one.', 'Or knock instead of drawing: everyone else gets one more turn, then all hands are shown.'] },
      { h: 'Losing lives', li: ['After a knock, the lowest hand loses a life. If the knocker is lowest, they lose 2.', 'If you get 31, show it right away: everyone else loses a life.'] },
      { h: 'How to win', p: 'When you\'re out of lives you\'re out. The last player left wins.' }
    ],
    links: [['Thirty-One rules (pagat.com)', 'https://www.pagat.com/draw/scat.html']]
  },

  'blackjack-chips': {
    sections: [
      { h: 'Using Tally', p: 'Tally keeps track of everyone\'s chips. Tap a player\'s number to add or subtract their winnings.' },
      { h: 'The basics', li: ['Card values: number cards are their number, face cards 10, Aces 1 or 11.', 'Everyone bets, then gets 2 cards. The dealer gets 2 cards, one face up.', 'Take more cards ("hit") or stop ("stand"). Go over 21 and you bust and lose your bet.', 'The dealer must hit until they have 17 or more.', 'Closer to 21 than the dealer wins your bet back plus the same again. A 2-card 21 (blackjack) usually pays 3 to 2.'] },
      { h: 'How to win', p: 'Whoever has the most chips when you stop wins.' }
    ],
    note: 'Home blackjack rules (doubling down, splitting, who deals) vary. Agree before you start.'
  },

  'poker-chips': {
    sections: [
      { h: 'Using Tally', p: 'Tally keeps track of everyone\'s chip stack. Tap a player\'s number to add or subtract after each hand. You\'re out at 0.' },
      { h: 'Hand rankings (best to worst)', li: ['Royal flush (A-K-Q-J-10, same suit)', 'Straight flush (5 in a row, same suit)', 'Four of a kind', 'Full house (3 of a kind + a pair)', 'Flush (5 of the same suit)', 'Straight (5 in a row)', 'Three of a kind', 'Two pair', 'One pair', 'High card'] },
      { h: 'Texas Hold\'em in short', li: ['Everyone gets 2 cards face down. Bet.', '3 shared cards are turned up (the flop). Bet.', 'A 4th shared card (the turn). Bet. A 5th (the river). Bet.', 'Make your best 5-card hand from your 2 cards and the 5 shared cards. Best hand left in wins the pot.'] },
      { h: 'How to win', p: 'Last player with chips wins, or the most chips when you stop.' }
    ]
  },

  'spite-and-malice': {
    sections: [
      { h: 'What you need', p: 'Two standard decks. 2 players (more can play with extra decks).' },
      { h: 'Setup', p: 'Deal each player a pay-off pile of 20 cards, face down with the top card face up, and a hand of 5. The rest is the stock.' },
      { h: 'On your turn', li: ['Draw back up to 5.', 'Play onto the center piles: they start with an Ace and go up to Queen. Kings are wild.', 'You can play from your hand, the top of your pay-off pile, or the top of your 4 side piles.', 'Empty your hand? Draw 5 more and keep going.', 'End your turn by putting a card from your hand onto one of your side piles.'] },
      { h: 'How to win', p: 'The first player to play the last card of their pay-off pile wins.' }
    ],
    links: [['Spite and Malice rules (pagat.com)', 'https://www.pagat.com/patience/spitemal.html']]
  },

  'durak': {
    sections: [
      { h: 'What you need', p: '36 cards (6 through Ace). 2–6 players.' },
      { h: 'Setup', p: 'Deal 6 cards each. Turn up the next card: its suit is trump. Put the rest crosswise on top of it.' },
      { h: 'Attacking and defending', li: ['The attacker plays a card at the defender (the player on their left).', 'The defender beats it with a higher card of the same suit, or any trump.', 'Other players can add more attack cards that match a number already played (up to 6 cards).', 'If the defender beats everything, the cards are thrown away and the defender attacks next.', 'If not, the defender picks them all up and loses their turn to attack.', 'After each round, everyone draws back up to 6.'] },
      { h: 'How it ends', p: 'There\'s no winner, only a loser. Players drop out as they run out of cards. The last one holding cards is the durak (the fool).' }
    ],
    links: [['Durak rules (pagat.com)', 'https://www.pagat.com/beating/podkidnoy_durak.html']]
  },

  'speed-spit': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 2 players.' },
      { h: 'Setup (Speed)', li: ['Each player gets a 15-card draw pile and a 5-card hand.', 'In the middle: two 10-card side piles on the ends, and two cards face down between them.'] },
      { h: 'Playing (no turns)', li: ['Flip the two middle cards together.', 'Play cards from your hand that are one higher or one lower than either middle card (Ace and King connect).', 'One hand, one card at a time. Refill your hand to 5 from your draw pile.', 'When both players are stuck, flip new middle cards from the side piles.'] },
      { h: 'How to win', p: 'The first player to get rid of all their cards wins.' }
    ],
    note: 'Spit is the same idea with 5 piles laid out in front of each player instead of a hand.',
    links: [['Speed and Spit rules (pagat.com)', 'https://www.pagat.com/patience/spit.html']]
  },

  'cheat-i-doubt-it': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 3–10 players.' },
      { h: 'Setup', p: 'Deal out all the cards.' },
      { h: 'On your turn', li: ['Play one or more cards face down and say what they are. The ranks go in order: Aces, then 2s, then 3s, up to Kings, then back to Aces.', 'You can lie about what you played.'] },
      { h: 'Calling cheat', li: ['Anyone can shout "Cheat!" (or "I doubt it!").', 'Flip the cards over. If they were all what the player said, the challenger picks up the whole pile.', 'If any were wrong, the player who lied picks it up.'] },
      { h: 'How to win', p: 'The first player to get rid of all their cards (and survive a challenge on their last play) wins.' }
    ],
    links: [['Cheat rules (pagat.com)', 'https://www.pagat.com/beating/cheat.html']]
  },

  'pig-card-game': {
    sections: [
      { h: 'What you need', p: 'One set of 4 matching cards per player (like four Aces, four Kings…). 3–13 players.' },
      { h: 'Playing', li: ['Deal 4 cards each.', 'Everyone at once passes one card face down to the left and picks up the card from the right.', 'Keep passing until someone has 4 of a kind.'] },
      { h: 'Touch your nose!', li: ['When you get 4 of a kind, quietly touch your nose.', 'Everyone else touches their nose as soon as they notice.', 'The last one to touch their nose loses the round and gets a letter: P, then I, then G.'] },
      { h: 'How to win', p: 'Spell PIG and you\'re out. The last player still in wins.' }
    ],
    links: [['Pig rules (pagat.com)', 'https://www.pagat.com/passing/pig.html']]
  },

  'president': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 4–7 players. 2s are highest, then A, K, Q … down to 3.' },
      { h: 'Playing', li: ['Deal out all the cards.', 'The leader plays a single card or a set of the same rank (like a pair of 7s).', 'Going around, each player plays a higher card or set of the same size, or passes.', 'When everyone passes, the last player to play leads again with anything.'] },
      { h: 'Ranks', li: ['The first player out is the President, the second the Vice-President, and the last is the Scum.', 'Next round, the Scum deals and gives their best card to the President, who gives back any card they don\'t want.'] },
      { h: 'How to win', p: 'Play as many rounds as you like. A common way to score: 2 points for President, 1 for Vice-President, first to 11.' }
    ],
    note: 'President has tons of house rules (four of a kind flips the order, 2s clear the pile, and more). Put yours in House rules.',
    links: [['President rules (pagat.com)', 'https://www.pagat.com/climbing/president.html']]
  },

  'kemps': {
    sections: [
      { h: 'What you need', p: 'A standard 52-card deck. 4 players in 2 teams (or more in teams).' },
      { h: 'Before you start', p: 'Each team secretly agrees on a signal (like a wink) that means "I have four of a kind."' },
      { h: 'Playing (no turns)', li: ['Deal 4 cards each and 4 face up in the middle.', 'Anyone can swap cards from their hand for middle cards, one-for-one, as fast as they like.', 'When nobody wants any, the dealer clears the middle and deals 4 new cards.'] },
      { h: 'Calling', li: ['"Kemps!": you think your partner has four of a kind. Right, and the other team gets a letter. Wrong, and your team gets one.', '"Stop Kemps!": you think an opponent has four of a kind. Right, and their team gets a letter. Wrong, and yours does.'] },
      { h: 'How to win', p: 'The first team to spell K-E-M-P-S loses. In Tally, tap the winning team each game.' }
    ],
    links: [['Kemps rules (pagat.com)', 'https://www.pagat.com/commerce/kemps.html']]
  },

  'magic-the-gathering': {
    sections: [
      { h: 'Using Tally', p: 'Tally tracks everyone\'s life. Everyone starts at 20; tap the buttons as you take damage or gain life. You\'re out at 0.' },
      { h: 'The basics', li: ['Each player has their own deck (at least 60 cards) and draws 7 to start.', 'Your turn: untap your cards, draw a card, play one land and cast spells, attack, then cast more spells.', 'Lands make mana, which pays for your spells.', 'Creatures attack; the other player can block with their creatures.'] },
      { h: 'How to win', li: ['Bring your opponent to 0 life.', 'Or they have to draw from an empty deck.', 'Or they get 10 poison counters.'] }
    ],
    note: 'Magic has a very long rulebook. This is just the basics.',
    links: [['How to play (Wizards of the Coast)', 'https://magic.wizards.com/en/how-to-play']]
  },

  'magic-commander': {
    sections: [
      { h: 'Using Tally', p: 'Tally tracks everyone\'s life. Everyone starts at 40.' },
      { h: 'How Commander is different', li: ['Your deck is exactly 100 cards: 99 plus your commander, a legendary creature.', 'Only one copy of each card (except basic lands).', 'Every card has to match your commander\'s colors.', 'Your commander starts face up in the command zone. You can cast it from there; each time after the first costs 2 more.', 'Usually 3–5 players, everyone against everyone.'] },
      { h: 'How to win', li: ['Bring everyone else to 0 life.', 'A player who takes 21 combat damage from the same commander loses.', 'Plus the normal Magic ways to lose.'] }
    ],
    note: 'Track commander damage on the side, or in House rules notes.',
    links: [['Commander format (Wizards of the Coast)', 'https://magic.wizards.com/en/formats/commander']]
  },

  'pok-mon-tcg': {
    sections: [
      { h: 'Using Tally', p: 'Tally tracks Prize cards taken. Tap +1 each time you Knock Out a Pokémon and take a Prize card.' },
      { h: 'The basics', li: ['Each player has a 60-card deck and draws 7 to start.', 'One Active Pokémon fights; up to 5 more wait on your Bench.', 'Attach Energy cards to your Pokémon to pay for their attacks.', 'Pokémon can evolve once they\'ve been in play for a turn.', 'Each time you Knock Out an opponent\'s Pokémon, take one of your 6 Prize cards.'] },
      { h: 'How to win', li: ['Take all your Prize cards.', 'Or your opponent has no Pokémon left in play.', 'Or your opponent can\'t draw a card at the start of their turn.'] }
    ],
    links: [['Learn to play (Pokémon)', 'https://tcg.pokemon.com/en-us/learn/']]
  },

  'yu-gi-oh': {
    sections: [
      { h: 'Using Tally', p: 'Tally tracks Life Points. Everyone starts at 8,000. Use the 100, 500 and 1,000 buttons, or tap a number to type any amount.' },
      { h: 'The basics', li: ['Each player has a 40–60 card deck and draws 5 to start.', 'Your turn: draw, then summon monsters and play Spell and Trap cards, then battle, then end.', 'Monsters attack your opponent\'s monsters, or attack directly if they have none.'] },
      { h: 'How to win', li: ['Bring your opponent\'s Life Points to 0.', 'Or they have to draw from an empty deck.'] }
    ],
    links: [['Official rulebook (Konami)', 'https://www.yugioh-card.com/en/rulebook/']]
  },

  'disney-lorcana': {
    sections: [
      { h: 'Using Tally', p: 'Tally tracks lore. Tap + whenever you quest. First to 20 wins.' },
      { h: 'The basics', li: ['Each player has a deck of at least 60 cards (one or two ink colors, no more than 4 of a card) and draws 7.', 'Once per turn, you can put a card with the ink symbol face down in your inkwell. Each card in your inkwell gives you 1 ink to spend.', 'Play characters, items and actions by paying ink.', 'Characters quest to earn lore, or challenge your opponent\'s characters.'] },
      { h: 'How to win', p: 'The first player to 20 lore wins.' }
    ],
    links: [['Rules and resources (Disney Lorcana)', 'https://www.disneylorcana.com/en-US/resources']]
  },

  'flesh-and-blood': {
    sections: [
      { h: 'Using Tally', p: 'Tally tracks your hero\'s life. Change the starting life on the setup screen to match your hero (it\'s printed on the hero card).' },
      { h: 'The basics', li: ['Your hero card shows your starting life and your intellect (how many cards you draw up to at the end of your turn).', 'Pay for cards by "pitching" other cards from your hand for resources.', 'Attack with action cards and weapons. Defend with the cards in your hand.', 'At the end of your turn, draw back up to your intellect.'] },
      { h: 'How to win', p: 'Bring your opponent\'s hero to 0 life.' }
    ],
    links: [['Quickstart rules (Flesh and Blood)', 'https://legacy.fabtcg.com/en/learn-to-play/quickstart-rules/']]
  },

  'uno-junior': {
    sections: [
      { h: 'What you need', p: 'The UNO Junior deck: 56 cards with animals, numbers and colors. 2–4 players.' },
      { h: 'Three levels', li: ['Beginner: take out all the action cards.', 'Intermediate: add Skip, Reverse and Wild.', 'Advanced: use all 56 cards, including Draw One and Draw Two.'] },
      { h: 'Setup', p: 'Deal 5 cards each. Flip one card to start the discard pile.' },
      { h: 'On your turn', li: ['Match the top card by color, number or animal.', 'Can\'t match? Draw one card. If it matches, you can play it.', 'Skip, Reverse, Draw One and Draw Two work like in UNO. Wild lets you pick the color.', 'Say "UNO!" when you have one card left, or draw 2 if someone catches you.'] },
      { h: 'How to win', p: 'The first player to play all their cards wins.' }
    ],
    links: [['UNO Junior rules (unorules.com)', 'https://www.unorules.com/uno-junior-rules/']]
  },

  'skip-bo-junior': {
    sections: [
      { h: 'What you need', p: 'The Skip-Bo Junior deck: 80 number cards and 16 Wild "?" cards.' },
      { h: 'Setup', p: 'Deal each player a stockpile of 10 cards, face down. Flip the top card face up. The youngest player goes first.' },
      { h: 'On your turn', li: ['The dealer gives you 3 cards face up as your hand.', 'Build piles in the middle: start with a 1 or a Wild, then go up one at a time to 10. Up to 4 piles, shared by everyone.', 'Play from your stockpile or your hand. When you play your top stockpile card, flip the next one.', 'Wild "?" cards can be any number.', 'Keep playing until you can\'t.'] },
      { h: 'How to win', p: 'The first player to empty their stockpile wins. You don\'t have to empty your hand.' }
    ],
    links: [['Skip-Bo Junior rules (UltraBoardGames)', 'https://www.ultraboardgames.com/skip-bo/junior.php']]
  },

  'sequence-junior': {
    sections: [
      { h: 'What you need', p: 'The Sequence for Kids board (animal pictures), the animal cards and chips. 2–4 players.' },
      { h: 'Setup', p: 'Everyone picks a chip color. Deal 3 cards each.' },
      { h: 'On your turn', li: ['Play a card and put one of your chips on a matching animal on the board.', 'Draw a new card.', 'The corners are free spaces for everyone.'] },
      { h: 'How to win', p: 'The first player to get 4 chips in a row (across, up and down, or diagonal) wins.' }
    ],
    note: 'Some boxes have special cards (like a unicorn that lets you go anywhere or remove a chip). Check your box.',
    links: [['Sequence for Kids rules (Official Game Rules)', 'https://officialgamerules.org/game-rules/sequence-for-kids/']]
  }
};
