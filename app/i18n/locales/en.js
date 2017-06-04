export default {  
  id: 'English',
  chessName: 'Chess',
  game: {
    title: 'Game',
    whitesTurn: "White's turn",
    blacksTurn: "Black's turn",
    white: 'White',
    black: 'Black',
    round: 'Round',
    gameHasEnded: 'Game has ended',
    pieces: {
      one: '1 piece',
      other: '{{count}} pieces'
    },
    newGame: 'New game',
    gameMode: {
      title: 'Game mode',
      playerVsComputer: 'Player vs Computer',
      localMultiplayer: 'Local multiplayer',
      computerVsComputer: 'Computer vs Computer'
    },
    victory: {
      changeGameMode: 'Change game mode',
      whiteWins: 'White wins!',
      blackWins: 'Black wins!',
      itsATie: 'It\'s a tie!'
    }
  },
  settings: {
    title: 'Settings',
    generalSettings: 'General settings',
    language: 'Language',
    selectLanguage: 'Select language',
    gameSpeed: 'Game speed',
    maxRounds: 'Max rounds',
    reverseBoard: 'Reverse board',
    languageHelp: 'Language used in the app.',
    gameSpeedHelp: 'Speed at which game pieces move.',
    maxRoundsHelp: 'How many rounds a game can last before it ends in a tie.',
    reverseBoardHelp: 'Turns the board by 90 degrees.',
    customBoard: {
      title: 'Custom board',
      pieceOptions: 'Piece options (drag and drop)',
      board: 'Board',
      resetToDefault: 'Reset to default'
    },
    customBoardHelp: 'Set a customized board with pieces of your choice. The pieces you set will also be set for black player, but in reversed order. Changes take effect when you start a new game.'
  },
  statistics: {
    title: 'Statistics',
    wins: 'Wins',
    losses: 'Losses',
    ties: 'Ties',
    roundAverage: 'Round average',
    resetStatistics: 'Reset statistics',
    resetWarning: 'Warning: This will erase all of your statistic information.\nAre you sure?',
    resetConfirmation: 'Yes, reset my statistics',
    resetDenial: 'No, I want to keep my statistics'
  },
  help: {
    title: 'Help',
    guide: {
      title: 'Guide',
      content: `
The goal of the game is to capture the enemy king. A player captures an enemy piece by moving their piece to their square, after which the captured piece is removed from the game.

Each player does always one move each turn. Skipping isn't possible, and the white player always starts the game.

The game will end if one of the following conditions is met:
1. The king is captured
(with custom boards: if there are multiple kings, all must be captured)
2. Player doesn't have any legal moves left
3. Maximum rounds is reached
(ends in tie - can be configured in the settings)

Note that the game won't automatically prevent you from doing moves that leave the king in check mate, which would be an illegal move in the traditional rules. You will most likely lose the game if you do make a move like this, so stay sharp!`,
    },
    pawn: {
      title: 'Pawn',
      content: `
Pawns are the most common piece in the game. Pawns can move 1 square forward on their turn if the square isn't occupied by another piece. On their first move they can alternatively move 2 squares.

Pawns can normally only capture pieces that are on diagonal squares in front of them.

If an enemy pawn moves next to pawn (horizontally) by moving 2 squares, pawn can capture it with en passant special move. In en passant pawn moves diagonally behind the enemy pawn and captures it. This must be done right after the opponent's move.

Promotion is pawn's second special move. When a pawn reaches the other end of the board, it is automatically promoted to queen.
`
    },
    rook: {
      title: 'Rook',
      content: `\nRooks can move horizontally and vertically to any direction any number of squares, but can't jump over other pieces.\n\nRooks can also do a 'castling' special move with the king (more info in king section).`
    },
    knight: {
      title: 'Knight',
      content: `\nKnights can move to any of the closest squares that aren't horizontal, vertical or diagonal. Their moves form L shape: 2 forward and 1 left/right.\n\nKnights can jump over other pieces.`
    },
    bishop: {
      title: 'Bishop',
      content: `\nBishops can move diagonally to any direction any number of squares, but can't jump over other pieces.`
    },
    queen: {
      title: 'Queen',
      content: `\nQueens have same moves as rooks and bishops (all horizontal, vertical and diagonal squares).`
    },
    king: {
      title: 'King',
      content: `
King is the most valuable piece - once the king is captured, the game ends.

King can move one square to any direction.

King also has a special move, castling, which moves the king 2 steps towards a rook and moves the rook behind the king. 
\nCastling has following conditions:
1. King and rook must have not moved during the game (and must be on same row).
2. There can't be any pieces between the king and the rook.
3. The king must not be in check, and king must not pass through a tile that could be attacked by enemy player on their next turn. `
    }
  }
};