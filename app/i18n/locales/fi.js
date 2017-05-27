export default {  
  id: 'Suomi',
  chessName: 'Shakki',
  game: {
    title: 'Peli',
    whitesTurn: "Valkoisen vuoro",
    blacksTurn: "Mustan vuoro",
    white: 'Valkoinen',
    black: 'Musta',
    round: 'Kierros',
    gameHasEnded: 'Peli päättynyt',
    pieces: {
      one: '1 nappula',
      other: '{{count}} nappulaa'
    },
    newGame: 'Uusi peli',
    gameMode: {
      title: 'Pelimoodi',
      playerVsComputer: 'Pelaaja vs Tietokone',
      localMultiplayer: 'Paikallinen moninpeli',
      computerVsComputer: 'Tietokone vs Tietokone'
    },
    victory: {
      changeGameMode: 'Vaihda pelimoodia',
      whiteWins: 'Valkoinen voitti!',
      blackWins: 'Musta voitti!',
      itsATie: 'Tasapeli!'
    }
  },
  settings: {
    title: 'Asetukset',
    generalSettings: 'Yleisasetukset',
    language: 'Kieli',
    selectLanguage: 'Valitse kieli'
  },
  statistics: {
    title: 'Tilastot',
    wins: 'Voitot',
    losses: 'Tappiot',
    ties: 'Tasapelit',
    roundAverage: 'Kierroskeskiarvo',
    resetStatistics: 'Reset tilastotiedot',
    resetWarning: 'Varoitus: Tämä poistaa kaikki tilastotietosi.\nOletko varma?',
    resetConfirmation: 'Kyllä, resetoi tietoni',
    resetDenial: 'Ei, haluan säilyttää tietoni'
  },
  help: {
    title: 'Ohjeet'
  }
};