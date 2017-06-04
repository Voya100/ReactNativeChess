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
    selectLanguage: 'Valitse kieli',
    gameSpeed: 'Pelin nopeus',
    maxRounds: 'Maksimikierros',
    reverseBoard: 'Käänteinen lauta',
    languageHelp: 'Sovelluksen käyttämä kieli.',
    gameSpeedHelp: 'Pelinappuloiden nopeus.',
    maxRoundsHelp: 'Monenko siirron jälkeen peli päättyy tasapeliin.',
    reverseBoardHelp: 'Kääntää pelilautaa 90 astetta.',
    customBoard: {
      title: 'Erikoislauta',
      pieceOptions: 'Nappulavaihtoehdot (vedä ja tiputa)',
      board: 'Pelilauta',
      resetToDefault: 'Palauta alkuperäiseksi'
    },
    customBoardHelp: 'Suunnittele oma pelilauta shakkipeliisi! Musta saa samat nappulat kuin valkoinen, mutta käänteisessä järjestyksessä. Muutokset tulevat voimaan, kun aloitat uuden pelin.'
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
    title: 'Ohjeet',
    guide: {
      title: 'Säännöt',
      content: `
Pelin tavoitteena on kaapata vastustajan kuningas. Pelaaja voi kaapata vastustajan nappuloita siirtämällä oman nappulansa samalle ruudulle, minkä jälkeen kaapattu nappula poistetaan pelistä.

Jokainen pelaaja liikkuu vain kerran vuorollaan. Vuoroja ei voi ohittaa, ja valkoinen pelaaja aloittaa aina pelin.

Peli päättyy, jos yksi seuraavista ehdoista toteutuu:
1. Kuningas kaapataan
(erikoislaudoilla: jos kuninkaita on useita, kaikki täytyy kaapata)
2. Pelaaja ei pysty tekemään siirtoa
3. Maksimikierrosmäärä täyttyy
(päättyy tasapeliin, määrää voi säätää asetuksista)

Huomaa, että peli ei automaattisesti estä siirtoja, jotka jättäisivät kuninkaan shakki matti -tilanteeseen, jossa vastapuoli voittaa. Perinteisissä säännöissä tällaiset siirrot ovat kiellettyjä. Tässä tilanteessa mitä todennäkäisimmin häviät pelin, joten pysy tarkkana!
`,
    },
    pawn: {
      title: 'Sotilas',
      content: `
Sotilaat ovat pelin yleisin nappula. Sotilaat voivat liikkua vuorollaan 1 ruudun eteenpäin, jos kyseisessä ruudussa ei ole toista nappulaa. Sotilaat voivat ensimmäisellä siirrollaan vaihtoehtoisesti siirtyä kaksi ruutua eteenpäin, jos tiellä ei ole muita nappuloita.

Sotilaat voiva kaapata vain nappuloita, jotka ovat niiden etuviistossa (ohestalyönti poikkeuksena).

Jos vastustajan sotilas siirtyy 2 ruutua eteenpäin ja päätyy pelaajan sotilaan viereen vaakatasossa, sotilas voi kaapata vastustajan sotilaan ohestalyönti-erikoisliikkeellä. 

Ohestalyönnissä soturi siirtyy etuviistossa vastustajan soturin taakse ja kaappaa sen. Tämä liike täytyy tehdä heti vastustajan siirron jälkeen.

Ylennys on soturin toinen erikoisliike. Kun soturi pääsee laudan toiseen päätyyn, se ylennetään toiseksi nappulaksi. Tässä peliversiossa soturi ylennetään aina kuningattareksi.
`
    },
    rook: {
      title: 'Torni',
      content: `\nTorni voi liikkua vaaka- ja pystysuunnassa kuinka monta ruutua tahansa, mutta ei voi hyppiä toisten ruutujen ylitse.\n\nTorni voi myös tehdä linnoitus-erikoisliikkeen kuninkaan kanssa. Tästä liikkeestä kerrotaan tarkemmin kuningas-osiossa.`
    },
    knight: {
      title: 'Ratsu',
      content: `\nRatsu voi siirtyä mihin tahansa lähimmistä ruuduista, jotka eivät ole vaaka-, pysty- tai viistosuunnassa. Nämä siirrot ovat L-muotoisia: 2 eteen ja 1 vasemmalle/oikealle.\n\nRatsut voivat hyppiä toisten nappuloiden ylitse.`
    },
    bishop: {
      title: 'Lähetti',
      content: `\nLähetti voi liikkua viistosuunnissa kuinka monta ruutua tahansa, mutta ei hyppiä toisten ruutujen ylitse.`
    },
    queen: {
      title: 'Kuningatar',
      content: `\nKuningattarella on samat liikkeet kuin tornilla ja lähetillä (kaikki pysty-, vaaka- ja viistosuunnat).`
    },
    king: {
      title: 'Kuningas',
      content: `
Kuningas on pelin arvokkain nappula - peli päättyy, kun kuningas kaapataan.

Kuningas voi liikkua vuorollaan yhden ruudun mihin tahansa suuntaan.

Kuninkaalla on erikoisliike, linnoitus, jossa kuningas liikkuu 2 ruutua tornia kohti, ja torni siirtyy kuninkaan taakse.

Linnoituksella on seuraavat ehdot:
1. Kuningas ja torni eivät ole liikkuneet pelin aikana, ja ne ovat samalla rivillä.
2. Kuninkaan ja tornin välissä ei ole muita nappuloita.
3. Kuningas ei saa olla matissa (hyökkäyksen kohteena), ja kuningas ei saa mennä ruudun kautta, jossa se olisi hyökkäyksen kohteena.`
    }
  }
}