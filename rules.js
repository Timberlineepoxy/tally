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
  }
};
