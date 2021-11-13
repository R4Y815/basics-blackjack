// 1. Deck is shuffled.
// 2. User clicks Submit to deal cards.
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// 4. The cards are displayed to the user.
// 5.The user decides whether to hit or stand, using the submit button to submit their choice.
//6. The user's cards are analysed for winning or losing conditions.
//7. The computer decides to hit or stand automatically based on game rules.
//8/ The game either ends or continues.

//GLOBAL ASSIGNMENTS
var deck = "";
var shuffledDeck = "";
var dealtHands = "";

var computerHand = [];
var computerFullHandDisplay = [];
var computerGameHandDisplay = [];

var numberOfPlayers = 0;
var playerIndex = 0;

var playerHand = [];
var playerHandDisplay = [];
var playerBank = 100;
var playerWager = 0;

var playerSplitHand1 = [];
var playerSplitHand2 = [];
var playerSplitHand1Display = [];
var playerSplitHand2Display = [];

var playersStandardHandMemory = [];
var playersBankRollMemory = [];
var bankRollDisplay = [];
var removedEntries = [];

var roundCount = 1;
var currentGameStage = "input number of players";

// HELPER FUNCTIONS

//HELPER FN: GENERATING RANDOM NUMBERS FORARRAY
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

//HELPER FN: FOR SHUFFLING
var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }
  return cards;
};

//HELPER FN: GENERATING A CARD DECK
var makeDeck = function () {
  var deck = [];
  //make 52 cards
  //rank 1-13 (1-10 and jack, queen, king and ace) - innermost loop?
  //1-4 suits hearts diamonds, clubs,spades -outtermost loop?

  //Outermost loop for suits
  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitsEmoji = ["♥", "♦", "♣", "♠"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = suitsEmoji[suitIndex];

    //innermost loop for rank
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var valueNumber = rankCounter;

      //rank 1, 11, 12, 13 are not number cards
      if (cardName == 1) {
        cardName = "ace";
        valueNumber = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        valueNumber = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        valueNumber = 10;
      } else if (cardName == 13) {
        cardName = "king";
        valueNumber = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        suitEmoji: currentEmoji,
        rank: rankCounter,
        value: valueNumber,
      };

      deck.push(card);
      rankCounter = rankCounter + 1;
    }

    suitIndex = suitIndex + 1;
  }
  return deck;
};

//HELPER FN: DEALING CARDS
var deal2StartCardsToPlayer = function () {
  var cardCount = 0;
  while (cardCount < 2) {
    playerHand.push(shuffledDeck.pop());
    cardCount += 1;
  }

  //=== TEST BLOC BELOW ================
  /*
  playerHand = [];
  playerHand = [
    {
      name: "ace",
      suit: "hearts",
      suitEmoji: "♥",
      rank: 1,
      value: 11,
    },
    {
      name: "ace",
      suit: "diamonds",
      suitEmoji: "♦",
      rank: 14,
      value: 11,
    } ,
    {
      name: "ace",
      suit: "clubs",
      suitEmoji: "♣",
      rank: 27,
      value: 11,
    },
    {
      name: "ace",
      suit: "spades",
      suitEmoji: "♠",
      rank: 27,
      value: 11,
    },
    {
      name: "queen",
      suit: "hearts",
      suitEmoji: "♥",
      rank: 12,
      value: 10,
    },
    {
      name: "6",
      suit: "hearts",
      suitEmoji: "♥",
      rank: 6,
      value: 6,
    },
  ];
*/
  //=== TEST BLOC ABOVE================
  return;
};

var deal2StartCardsToComputer = function () {
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  var cardCount = 0;
  while (cardCount < 2) {
    computerHand.push(shuffledDeck.pop());
    cardCount += 1;
  }
  return;
};

//HELPER FN: DEALING CARDS TO SPLIT HAND
var splitPlayerHand = function (gamersHand) {
  playerSplitHand1.push(gamersHand.pop());
  playerSplitHand2.push(gamersHand.pop());

  playerSplitHand1.push(shuffledDeck.pop());
  playerSplitHand2.push(shuffledDeck.pop());

  playerSplitHand1Display = displayCards(playerSplitHand1);
  playerSplitHand2Display = displayCards(playerSplitHand2);
  return;
};

//HELPER FN: SHOWING CARDS FROM AN ARRAY OF OBJECTS
var displayCards = function (gamersHand) {
  var cardDisplay = [];
  var count = 0;
  while (count < gamersHand.length) {
    cardDisplay.push(
      "<br>" +
        "Card " +
        (count + 1) +
        ": " +
        gamersHand[count].name +
        " of " +
        gamersHand[count].suitEmoji
    );
    count += 1;
  }
  return cardDisplay;
};

//HELPER FN:
//HIDING THE CARD BELOW
var hidefirstCardinHand = function (gamersHandDisplay) {
  var firstCardHidden = gamersHandDisplay;
  //load array into local function.
  firstCardHidden[0] = "Card 1: placed face down";

  return firstCardHidden;
};

//MINI Helper Function: Diplaying Dealer cards to player
var displayDealerCardsToPlayer = function (computer) {
  var computerHandFullDisplay = displayCards(computerHand);
  computerGameHandDisplay = hidefirstCardinHand(computerHandFullDisplay);

  return computerGameHandDisplay;
};
//MINI Helper Function: Displaying Player Cards to Player --
var displaySingleHandPlayerCardsToPlayer = function () {
  var playerHandDisplay = displayCards(playerHand);

  return playerHandDisplay;
};

//HELPER FN: READ AND COUNT NUMBER OF ACES IN A HAND
var aceCount = function (gamersHand) {
  var count = 0;
  var aceCount = 0;
  while (count < gamersHand.length) {
    if (gamersHand[count].name == "ace") {
      aceCount += 1;
    }
    count += 1;
  }
  return aceCount;
};

//HELPER FN: SUM OF VALUE OF NON-ACE CARDS in HAND
var nonAceSum = function (gamersHand) {
  var count = 0;
  var nonAceTotalValue = 0;
  while (count < gamersHand.length) {
    if (gamersHand[count].name != "ace") {
      nonAceTotalValue += gamersHand[count].value;
    }
    count += 1;
  }
  return nonAceTotalValue;
};

//HELPER FN: CALCULATE TOTAL STRENGTH OF A HAND
//-- have to account for ace value and number of cards
// 1st if: 0-1 Ace, sumNonAce < 10 pts, Ace = 11pts
// 2nd if: > 1 Aces, sumNonAce <= 9 pts, 1st Ace = 11pts, following Aces = 1 pt
// 3rd if: >= 1 Aces, sumNonAce >= 11pts, all Aces = 1 pt.
var sumOfCardsValue = function (gamersHand) {
  var totalValue = 0;
  var count = 0;
  while (count < gamersHand.length) {
    totalValue = Number(totalValue) + Number(gamersHand[count].value);
    count += 1;
  }

  if (
    aceCount(gamersHand) <= 1 &&
    nonAceSum(gamersHand) >= 0 &&
    nonAceSum(gamersHand) <= 10
  ) {
    totalValue += 0;
  } else if (
    aceCount(gamersHand) > 1 &&
    gamersHand.length >= 2 &&
    nonAceSum(gamersHand) <= 9
  ) {
    totalValue = totalValue - (aceCount(gamersHand) - 1) * 10;
  } else if (aceCount(gamersHand) >= 1 && nonAceSum(gamersHand) > 9) {
    totalValue = totalValue - aceCount(gamersHand) * 10;
  }
  return totalValue;
};

//HELPER FN: Computer Reading Player's Hand except for player's last card
var sumOfPlayerCardsVisible = function (gamersHand) {
  var playerFaceUpCards = gamersHand.slice(1);
  var sumofFaceUpCards = 0;
  var count = 0;
  while (count < playerFaceUpCards.length) {
    sumofFaceUpCards =
      Number(sumofFaceUpCards) + Number(playerFaceUpCards[count].value);
    count += 1;
  }

  if (
    aceCount(playerFaceUpCards) <= 1 &&
    nonAceSum(playerFaceUpCards) >= 0 &&
    nonAceSum(playerFaceUpCards) <= 10
  ) {
    sumofFaceUpCards += 0;
  } else if (
    aceCount(playerFaceUpCards) > 1 &&
    playerFaceUpCards.length >= 2 &&
    nonAceSum(playerFaceUpCards) <= 9
  ) {
    sumofFaceUpCards =
      sumofFaceUpCards - (aceCount(playerFaceUpCards) - 1) * 10;
  } else if (
    aceCount(playerFaceUpCards) >= 1 &&
    nonAceSum(playerFaceUpCards) > 9
  ) {
    sumofFaceUpCards = sumofFaceUpCards - aceCount(playerFaceUpCards) * 10;
  }
  return sumofFaceUpCards;
};

//HELPER FUNCTION TO TRANSFER MEM

var storeStandardHand = function (playerHand, playerBank, playerWager) {
  var playerCardsValue = sumOfCardsValue(playerHand);
  var showHand = displayCards(playerHand);
  var playerData = {
    playerNumber: playerIndex,
    hand: playerHand,
    display: showHand,
    value: playerCardsValue,
    bank: Number(playerBank),
    wager: Number(playerWager),
  };
  playersStandardHandMemory.push(playerData);
  return;
};

//GAME STAGES BELOW

//STAGE: Reply after receiving no. of players input
var numberOfPlayersInput = function (numOfPlayers) {
  numberOfPlayers = numOfPlayers;
  playerIndex += 1;
  deal2StartCardsToComputer();
  //------TEST BLOC ⬇ to control Computer's cards
  /*  computerHand = [
    {
      name: "ace",
      suit: "spades",
      suitEmoji: "♠",
      rank: 40,
      value: 11,
    },
    {
      name: 10,
      suit: "hearts",
      suitEmoji: "♥",
      rank: 10,
      value: 10,
    },
  ]; */
  //------TEST BLOC ⬆ to control Computer's cards
  var replyNumberOfPlayers = ` There are ${numberOfPlayers} players playing.
   <br>The computer will be the dealer. 
   <br><br>Player ${playerIndex}, please place your bet.<br><br>
   `;
  currentGameStage = "collect Player's bet";
  return replyNumberOfPlayers;
};

//STAGE: Asking player (>1) after player 1 to place their bets.

var stagePre01AskNextPlayerToPlaceBet = function (input) {
  playerIndex += 1;
  var askNextPlayerToPlaceBet = `Player ${playerIndex}, please place your bet.<br><br> `;

  currentGameStage = "collect Player's bet";
  return askNextPlayerToPlaceBet;
};

//STAGE: Confirmation to Player of their bets placed.
var stage01RespondToBetPlacement = function (wagerAmount) {
  playerWager = wagerAmount;
  if (roundCount > 1) {
    playerBank = playersBankRollMemory[playerIndex - 1]["bank"];
  }

  playerBank = playerBank - wagerAmount;

  var confirmationOfBetsPlaced = `Player ${playerIndex}, 
 <br>current wager  =  $${playerWager}
 <br>Amount left = $${playerBank}
 <br><br>
 <i>Player ${playerIndex}, please click "Submit" to continue.</i>`;
  currentGameStage = "deal cards to player and house";

  return confirmationOfBetsPlaced;
};

//STAGE: Deal cards to designated Player Index
var stage02dealCards = function () {
  deal2StartCardsToPlayer();
  playerHandDisplay = displayCards(playerHand);
  var showPlayerAndDealerCardsMsg = `<b>Player ${playerIndex}'s hand</b>:${displaySingleHandPlayerCardsToPlayer()}
<br><br>
 <b>Computer's hand</b>:
 <br>${displayDealerCardsToPlayer()}
 <br><br>
 Player ${playerIndex}, do you wish to hit, stand or split? 
 <br> Input: 
 <br> 👉 type 'h' to hit;
 <br> 👉 type 's' to stand;
 <br> 👉 type 't' to split.
 <br><br>  (<i>You may only split your hand if you have two cards of the same rank:
 <br> Card 1: 2 of ♥
 <br> Card 2: 2 of ♣</i>)`;

  currentGameStage = "player makes response alpha";
  return showPlayerAndDealerCardsMsg;
};

//GAME LOGIC: FOR PLAYER ACTION ALPHA PHASE
var stage03RespondToPlayerChoiceAlpha = function (playerChoice) {
  if (playerChoice.toLowerCase() == "h") {
    playerHand.push(shuffledDeck.pop());
    responseAlphaMsg = `<b>Player ${playerIndex}'s hand</b>:${displaySingleHandPlayerCardsToPlayer()}
    <br><br>
    <b>Computer's hand</b>:
    <br>${displayDealerCardsToPlayer()}
    <br><br>Player ${playerIndex}, you chose to "hit" and drew a ${
      playerHand[playerHand.length - 1].name
    } of ${playerHand[playerHand.length - 1].suitEmoji}
    <br><br> Do you wish to hit ('h') or stand('s') or split ('t')? `;
    currentGameStage = "player makes response alpha";
  } else if (playerChoice.toLowerCase() == "s") {
    storeStandardHand(playerHand, playerBank, playerWager);

    if (playerIndex < numberOfPlayers) {
      var nextPlayerIndex = playerIndex + 1;
      responseAlphaMsg = `<b>Player ${playerIndex}'s hand</b>:${displaySingleHandPlayerCardsToPlayer()}&nbsp&nbsp➡${sumOfCardsValue(
        playerHand
      )}pts
      <br><br>
      <b>Computer's hand</b>:
      <br>${displayDealerCardsToPlayer()}.
      <br><br>Player ${playerIndex}, you chose to "stand". 
      <br><br>
      It is now Player ${nextPlayerIndex}'s turn.
      <br> Please pass the controls and screen to Player ${nextPlayerIndex}, who will then click 'Submit' to continue. `;
      playerHand = [];
      playerHandDisplay = [];
      playerWager = 0;
      playerBank = 100;
      currentGameStage = "ask next player to place bet";
    } else if (playerIndex == numberOfPlayers) {
      responseAlphaMsg = `<b>Player ${playerIndex}'s hand</b>:${displaySingleHandPlayerCardsToPlayer()}
      &nbsp&nbsp➡${sumOfCardsValue(playerHand)}pts.
      <br><br>
      <b>Computer's hand</b>:
      <br>${displayDealerCardsToPlayer()}.
      <br><br>Player ${playerIndex}, you chose to "stand". 
      <br><br>
      All players have completed placing their hands. 
      <br><br>
      Computer will play its hand.`;
      currentGameStage = "Computer's turn";
    }
  } else if (playerChoice.toLowerCase() == "t") {
    if (playerHand[0].name == playerHand[1].name) {
      playerBank = playerBank - playerWager; //wager is subtracted 1 more time
      splitPlayerHand(playerHand);
      responseAlphaMsg = ` You chose to split your hand.
      <br>You will have to double your bet/wager. 
      <br><br><b>Player ${playerIndex} Split Hand #1</b>: 
      ${displayCards(playerSplitHand1)}&nbsp&nbsp➡${sumOfCardsValue(
        playerSplitHand1
      )}pts 
      <br><br><b>Player ${playerIndex} Split Hand #2</b>:
      ${displayCards(playerSplitHand2)}&nbsp&nbsp➡${sumOfCardsValue(
        playerSplitHand2
      )}pts
      <br><br>Bet for Split Hand 1 = $${playerWager}
      <br>Bet for Split Hand 2 = $${playerWager}
      <br>Amount Left = $${playerBank}
      <br><br>Computer's hand:
      <br>${displayDealerCardsToPlayer()}
      <br><br>Player ${playerIndex} do you wish to hit ('h') or stand('s')?`;
      currentGameStage = "player makes response beta";
    } else if (playerHand[0].name != playerHand[1].name) {
      responseAlphaMsg = `Player ${playerIndex}, your hand is made up of 2 different cards. <br>You cannot split your hand into two. <br>Please make  different choice. 
      <br><br>Player ${playerIndex}'s hand:${displaySingleHandPlayerCardsToPlayer()}
      <br><br>
      Computer's hand:
      <br>${displayDealerCardsToPlayer()}
      <br><br>
      Player ${playerIndex}, do you wish to hit, stand or split? 
      <br> Input: 
      <br>  👉 type 'h' to hit, or 
      <br>  👉 type 's' to stand`;
      currentGameStage = "player makes response alpha";
    }
  }

  return responseAlphaMsg;
};

//GAME LOGIC FOR PLAYER ACTIONS BETA PHASE
var stage3BplayerChoiceBeta = function (playerHitOrStand) {
  if (playerHitOrStand.toLowerCase() == "h") {
    playerSplitHand1.push(shuffledDeck.pop());
    playerSplitHand2.push(shuffledDeck.pop());
    playerSplitHand1Display = displayCards(playerSplitHand1);
    playerSplitHand2Display = displayCards(playerSplitHand2);
    responseBetaMsg = `You chose to "hit". 
    <br><br>You drew a ${
      playerSplitHand1[playerSplitHand1.length - 1].name
    } of ${playerSplitHand1[playerSplitHand1.length - 1].suitEmoji} and a ${
      playerSplitHand2[playerSplitHand2.length - 1].name
    } of ${playerSplitHand2[playerSplitHand2.length - 1].suitEmoji} 
    <br><br> 
      <b>Player ${playerIndex} Split Hand 1</b>: 
      ${displayCards(playerSplitHand1)}&nbsp&nbsp➡${sumOfCardsValue(
      playerSplitHand1
    )}pts
      
      <br><br><b>Player ${playerIndex} Split Hand 2</b>:
      ${displayCards(playerSplitHand2)}&nbsp&nbsp➡${sumOfCardsValue(
      playerSplitHand2
    )}pts
      <br>
      <br>Bet for Split Hand 1 = ${playerWager}
      <br>Bet for Split Hand 2 = ${playerWager}
      <br>Amount Left = $${playerBank}
      <br>
      <br><b>Computer's hand</b>:
      <br>${displayDealerCardsToPlayer()}
    <br><br>Player ${playerIndex} do you wish to continue to hit('h') or stand('s')? `;
    currentGameStage = "player makes response beta";
  } else if (playerHitOrStand.toLowerCase() == "s") {
    storeStandardHand(playerSplitHand1, playerBank, playerWager);
    storeStandardHand(playerSplitHand2, playerBank, playerWager);

    if (playerIndex < numberOfPlayers) {
      var nextPlayerIndex = playerIndex + 1;
      responseBetaMsg = `<b>Player ${playerIndex} Split Hand 1</b>: 
      ${displayCards(playerSplitHand1)}&nbsp&nbsp➡${sumOfCardsValue(
        playerSplitHand1
      )}pts
      <br>
      <br><b>Player ${playerIndex} Split Hand 2</b>:
      ${displayCards(playerSplitHand2)}&nbsp&nbsp➡${sumOfCardsValue(
        playerSplitHand2
      )}pts
      <br>
      <br><b>Computer's hand</b>:
      <br>${displayDealerCardsToPlayer()}
      <br>
      <br>Player ${playerIndex}, you chose to "stand". 
      <br>
      <br>
      It is now Player ${nextPlayerIndex}'s turn.
      <br> 
      Please pass the controls and screen to Player ${nextPlayerIndex}, who will then click 'Submit' to continue.`;
      playerHand = [];
      playerHandDisplay = [];
      playerWager = 0;
      playerBank = 100;
      currentGameStage = "ask next player to place bet";
    } else if (playerIndex == numberOfPlayers) {
      responseBetaMsg = `<b>Player ${playerIndex} Split Hand 1</b>: 
      ${displayCards(playerSplitHand1)}&nbsp&nbsp➡${sumOfCardsValue(
        playerSplitHand1
      )}pts
      <br>
      <br><b>Player ${playerIndex} Split Hand 2</b>:
      ${displayCards(playerSplitHand2)}&nbsp&nbsp➡${sumOfCardsValue(
        playerSplitHand2
      )}pts
      <br>
      <br><b>Computer's hand</b>:
      <br>${displayDealerCardsToPlayer()}
      <br>
      <br>Player ${playerIndex}, you chose to "stand". 
      <br>
      <br> 
      Computer will play its hand.
      <br>
      <br>Please click "Submit" to continue`;
      currentGameStage = "Computer's turn";
    }
  }
  return responseBetaMsg;
};

//===============> for computer to decide how to react

//does player wish to hit or stand?
//how should Computer react?
//is computer reaction carried out here? Or use helper function?
//1) hit when total points < 11 when card count = 2
//2) hit when total points < 21 when card count = 3
//(dependent on what cards are out already? possible to code?)

//WHEN IS ACE 1 OR 11?
// when strength = 20 , third card ace should be 1
// when strength < or = 10 , next ace in hand should be 11
// if first 4 cards are 2 , 5th card as an ace can be an 11.

//what about ace in hand?

//==========> how to solve multiplayer issue?
// create new Global variable for multiplayer
// add step to clean out currentPlayerCaches when swapping over
// add step to add in additional stages when more than 1 player enters

// =========> how to hide first card of dealrcomp?
// 1) second display function but start count from
//  index = 1, so the first card is not shown

//HELPER FN: COMPUTER LOGIC FOR ACTION //TO HIT OR TO STAND
var stage04computerLogic = function () {
  var computerResponse = "";

  if (
    (sumOfCardsValue(computerHand) < 11 && computerHand.length < 3) ||
    (sumOfCardsValue(computerHand) <= sumOfPlayerCardsVisible(playerHand) &&
      sumOfCardsValue(computerHand) < 14) ||
    sumOfCardsValue(computerHand) < 16
  ) {
    computerHand.push(shuffledDeck.pop());
    console.log("Computer Hand " + displayCards(computerHand));
    computerResponse = ` The Computer chooses to hit.
                         <br>It has drawn ${
                           computerHand[computerHand.length - 1].name
                         } of ${
      computerHand[computerHand.length - 1].suitEmoji
    }<br><br>
    Computer's hand:<br>${displayDealerCardsToPlayer()}`;
    currentGameStage = "Computer's turn";
  } else {
    computerResponse = `The Computer chooses to stand.
  <br><br>
  Computer's hand: 
  <br>${displayDealerCardsToPlayer()}  `;
    currentGameStage = "Round Conclusion";
  }

  var nextInstruction = `<br><br>Please click "Submit" to continue...`;

  return computerResponse + nextInstruction;
};

var stage05Conclusion = function (input) {
  // use playersStandardHandMemory to retrieve everything
  // because 1 player may have a split hand and others dont,
  // have to try to run judging of split hand together with normal hands
  // take note of player Index
  // allow output to display multiple times ?
  // or does person closest to blackjack win?
  // closest to blackjack with least nmber of cards?
  //

  // issues with playerHand != []?
  var totalOutputMsg = "";
  var count = 0;
  while (count < playersStandardHandMemory.length) {
    var payOut = playersStandardHandMemory[count]["wager"];
    var winner = "";
    var conclusionMsg = "";
    var winnings = "";

    if (
      playersStandardHandMemory[count]["hand"].length == 2 &&
      playersStandardHandMemory[count]["value"] == 21 &&
      (sumOfCardsValue(computerHand) != 21 ||
        (sumOfCardsValue(computerHand) == 21 && computerHand.length > 2))
    ) {
      winner = "player";
      conclusionMsg = `Player ${playersStandardHandMemory[count]["playerNumber"]} won - ♥♦Blackjack♣♠ ! Computer Lost`;
    } else if (
      playersStandardHandMemory[count]["hand"].length > 2 &&
      playersStandardHandMemory[count]["value"] == 21 &&
      sumOfCardsValue(computerHand) != 21
    ) {
      winner = "player";
      conclusionMsg = `Player ${playersStandardHandMemory[count]["playerNumber"]} won - 21pts! Computer Lost`;
    } else if (
      (playersStandardHandMemory[count]["value"] != 21 ||
        (playersStandardHandMemory[count]["value"] == 21 &&
          playersStandardHandMemory[count]["hand"].length > 2)) &&
      sumOfCardsValue(computerHand) == 21 &&
      computerHand.length == 2
    ) {
      winner = "computer";
      conclusionMsg = `Computer won - ♥♦Blackjack♣♠ ! Player ${playersStandardHandMemory[count]["playerNumber"]} Lost`;
    } else if (
      computerHand.length > 2 &&
      sumOfCardsValue(computerHand) == 21 &&
      playersStandardHandMemory[count]["value"] != 21
    ) {
      winner = "computer";
      conclusionMsg = `Computer won - 21pts! Player ${playersStandardHandMemory[count]["playerNumber"]} Lost`;
    } else if (
      playersStandardHandMemory[count]["value"] < 21 &&
      sumOfCardsValue(computerHand) > 21
    ) {
      winner = "player";
      conclusionMsg = `Computer BUST (exceeded 21 pts) <b>Player ${playersStandardHandMemory[count]["playerNumber"]} WON!</b>`;
    } else if (
      playersStandardHandMemory[count]["value"] > 21 &&
      sumOfCardsValue(computerHand) < 21
    ) {
      winner = "computer";
      conclusionMsg = `Player ${playersStandardHandMemory[count]["playerNumber"]} BUST (exceeded 21 pts).`;
    } else if (
      playersStandardHandMemory[count]["value"] == 21 &&
      sumOfCardsValue(computerHand) == 21
    ) {
      winner = "double blackjack";
      conclusionMsg = `Computer and Player ${playersStandardHandMemory[count]["playerNumber"]} both got blackjack!`;
    } else if (
      playersStandardHandMemory[count]["value"] ==
        sumOfCardsValue(computerHand) &&
      sumOfCardsValue(computerHand) < 21
    ) {
      winner = "tie";
      conclusionMsg = `Computer and Player ${playersStandardHandMemory[count]["playerNumber"]} both tied at same score! `;
    } else if (
      playersStandardHandMemory[count]["value"] > 21 &&
      sumOfCardsValue(computerHand) > 21
    ) {
      winner = "no winners";
      conclusionMsg = `Computer and Player ${playersStandardHandMemory[count]["playerNumber"]} both BUST. No winners`;
    } else if (
      21 - playersStandardHandMemory[count]["value"] <
      21 - sumOfCardsValue(computerHand)
    ) {
      winner = "player";
      conclusionMsg = `Player ${playersStandardHandMemory[count]["playerNumber"]} won (closer to 21pts)`;
    } else if (
      21 - playersStandardHandMemory[count]["value"] >
      21 - sumOfCardsValue(computerHand)
    ) {
      winner = "computer";
      conclusionMsg = `Computer Won, (closer to 21pts). Player ${playersStandardHandMemory[count]["playerNumber"]} Lost.`;
    }

    var showPlayerHand = playersStandardHandMemory[count]["display"];
    var showAllHandsMsg = "";

    if (winner == "player" || winner == "tie") {
      showAllHandsMsg = `<b> Player ${playersStandardHandMemory[count]["playerNumber"]}'s hand</b>:${showPlayerHand}&nbsp&nbsp➡${playersStandardHandMemory[count]["value"]}pts
     <br>`;
    } else if (winner == "computer" || winner == "no winners") {
      showAllHandsMsg = `
     <b>Player ${playersStandardHandMemory[count]["playerNumber"]}'s hand</b>: ${showPlayerHand}&nbsp&nbsp➡${playersStandardHandMemory[count]["value"]}pts
     <br>`;
    } else if (winner == "double blackjack") {
      showAllHandsMsg = `<b>Player ${playersStandardHandMemory[count]["playerNumber"]}'s hand</b>: <i>${showPlayerHand}</i>&nbsp&nbsp➡${playersStandardHandMemory[count]["value"]}pts
     <br>`;
    }

    if (winner == "player") {
      playersStandardHandMemory[count]["bank"] =
        Number(playersStandardHandMemory[count]["bank"]) +
        Number(playersStandardHandMemory[count]["wager"]) +
        Number(payOut);
      winnings = `<br>Player ${
        playersStandardHandMemory[count]["playerNumber"]
      } wins total payout of $${
        Number(payOut) + Number(playersStandardHandMemory[count]["wager"])
      } 
    <br> Player ${playersStandardHandMemory[count]["playerNumber"]} bank: $${
        playersStandardHandMemory[count]["bank"]
      }<br><br>`;
    } else if (winner == "computer") {
      winnings = `<br>Player ${playersStandardHandMemory[count]["playerNumber"]} loses the wager/bet of $${playersStandardHandMemory[count]["wager"]} for this hand.
    <br> Player ${playersStandardHandMemory[count]["playerNumber"]} bank: $${playersStandardHandMemory[count]["bank"]}<br><br>`;
    } else if (winner == "tie") {
      playersStandardHandMemory[count]["bank"] =
        Number(playersStandardHandMemory[count]["bank"]) +
        Number(playersStandardHandMemory[count]["wager"]);
      winnings = `<br>Player ${playersStandardHandMemory[count]["playerNumber"]} ties with Computer with no Blackjack, 
      <br>wager/bet of $${playersStandardHandMemory[count]["wager"]} for this hand is returned.
      <br> Player ${playersStandardHandMemory[count]["playerNumber"]} bank: $${playersStandardHandMemory[count]["bank"]}<br><br>`;
    } else if (winner == "no winners") {
      playersStandardHandMemory[count]["bank"] =
        winnings = `<br>As both Player ${playersStandardHandMemory[count]["playerNumber"]} and Computer busts, 
      <br>wager/bet of $${playersStandardHandMemory[count]["wager"]} is returned.
      <br> Player ${playersStandardHandMemory[count]["playerNumber"]} bank: $${playersStandardHandMemory[count]["bank"]}<br><br>`;
    } else if (winner == "double blackjack") {
      playersStandardHandMemory[count]["bank"] =
        Number(playersStandardHandMemory[count]["bank"]) +
        Number(playersStandardHandMemory[count]["wager"]);
      winnings = `<br>Player ${playersStandardHandMemory[count]["playerNumber"]} ties with Computer with Blackjack, 
      <br>wager/bet of $${playersStandardHandMemory[count]["wager"]} is returned.
       <br> Player ${playersStandardHandMemory[count]["playerNumber"]} bank: $${playersStandardHandMemory[count]["bank"]}<br><br>`;
    }

    //============BELOW CODE ERROR, HAVE TO ACCUMULATE OUTPUTS // /// USING ARRAY STACK
    totalOutputMsg =
      totalOutputMsg +
      showAllHandsMsg +
      "=======================================<br>" +
      conclusionMsg +
      winnings;
    //============BELOW for transferring split hand bankroll to next split hand for same player:

    if (count + 1 <= playersStandardHandMemory.length - 1) {
      if (
        playersStandardHandMemory[count]["playerNumber"] ==
        playersStandardHandMemory[count + 1]["playerNumber"]
      ) {
        playersStandardHandMemory[count + 1]["bank"] =
          playersStandardHandMemory[count]["bank"];
        console.log(
          "Player " +
            playersStandardHandMemory[count]["playerNumber"] +
            " bank = " +
            playersStandardHandMemory[count]["playerNumber"]
        );
      }
    }
    //============ABOVE for transferring split hand bankroll to next split hand for same player:

    count += 1;
  }

  //========================================================

  var revealDealerHandMsg = `<b>Computer/Dealer's Hand</b>:
                         ${displayCards(computerHand)}
                         &nbsp&nbsp➡${sumOfCardsValue(computerHand)}pts
                         <br><br>`;

  var nextInstruction = `<br>
  <br> To play the next round with the same player, please enter "n" and click Submit.
  <br> To start a new game with different players or different numbers of players, please reload the page.`;

  currentGameStage = "Transfer Scores";
  return revealDealerHandMsg + totalOutputMsg + nextInstruction;
};

//GAMESTAGE FN: TRANSFER BANKROLL details to next game and

var stage06ScoreTallyTransfer = function (input) {
  var stage06OutputMessage = "";
  // if Else to manage inputs
  if (input.toLowerCase() == "n") {
    var count = 0;
    //remove double entries of playerMems due to split hands:
    while (count < playersStandardHandMemory.length) {
      if (count + 1 <= playersStandardHandMemory.length - 1) {
        if (
          playersStandardHandMemory[count]["playerNumber"] ==
          playersStandardHandMemory[count + 1]["playerNumber"]
        ) {
          removedEntries = playersStandardHandMemory.splice(count, 1);
        }
      }
      count += 1;
    }

    //transferring playerIndex Number and bankroll data
    //Make use of this loop to collate bankroll display.
    var newCount = 0;
    while (newCount < playersStandardHandMemory.length) {
      var playerBankRollData = {
        playerNumber: playersStandardHandMemory[newCount]["playerNumber"],
        bank: playersStandardHandMemory[newCount]["bank"],
      };
      playersBankRollMemory.push(playerBankRollData);
      bankRollDisplay =
        bankRollDisplay +
        `<br>
     <br><b>Player ${playersBankRollMemory[newCount]["playerNumber"]}'s bank</b>: $${playersBankRollMemory[newCount]["bank"]}`;
      newCount += 1;
    }

    playerIndex = 0;
    playersStandardHandMemory = [];
    playerWager = 0;
    roundCount += 1;
    computerHand = [];
    deal2StartCardsToComputer();
    currentGameStage = "ask next player to place bet";
    stage06OutputMessage = ` Current Standing: 
      ${bankRollDisplay}
      <br>
      <br>Round ${roundCount} will begin.
      <br>
      <br>Please click submit to continue`;
  } else if (input.toLowerCase != "n" || Number.isNaN(input) == false) {
    currentGameStage = "Transfer Scores";
    stage06OutputMessage = `Please only input on 'n' to start the next round with the same players, or, 
    <br> reload the page to start a new game and reset scores.`;
  }

  return stage06OutputMessage;
};

//MAIN FUNCTION
var main = function (input) {
  var myOutputValue = "X";
  var placeBetImage = `<img src ="https://c.tenor.com/0i8aBMgQAVcAAAAC/jason-mantzoukas-betting.gif"/>`;

  var dealCardsImage = `<img src = "https://c.tenor.com/PP-nTUuRb2oAAAAC/%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%87%E0%A4%AC%E0%A4%BE%E0%A4%9F%E0%A4%A8%E0%A4%BE-utkarsh.gif"/>`;
  var hitOrStandImage = `<img src = "https://c.tenor.com/UT6ESaPjyQYAAAAC/degenerate-matt-damon.gif"/>`;

  var computerTurnImage = `<img src = "https://c.tenor.com/JJe3fkQ2JPIAAAAC/math-thinking.gif"/>`;

  var roundConclusionImage = `<img src = "https://c.tenor.com/EWRvErYGzPUAAAAC/bugs-bunny-looney-tunes.gif"/>`;

  if (currentGameStage == "input number of players") {
    numberOfPlayers = input;
    myOutputValue = numberOfPlayersInput(input) + placeBetImage;
  } else if (currentGameStage == "ask next player to place bet") {
    myOutputValue = stagePre01AskNextPlayerToPlaceBet(input) + placeBetImage;
  } else if (currentGameStage == "collect Player's bet") {
    myOutputValue = stage01RespondToBetPlacement(input) + dealCardsImage;
  } else if (currentGameStage == "deal cards to player and house") {
    myOutputValue = stage02dealCards() + hitOrStandImage;
  } else if (currentGameStage == "player makes response alpha") {
    myOutputValue = stage03RespondToPlayerChoiceAlpha(input);
  } else if (currentGameStage == "player makes response beta") {
    myOutputValue = stage3BplayerChoiceBeta(input) + hitOrStandImage;
  } else if (currentGameStage == "Computer's turn") {
    myOutputValue = stage04computerLogic() + computerTurnImage;
  } else if (currentGameStage == "Round Conclusion") {
    myOutputValue = stage05Conclusion(input) + roundConclusionImage;
  } else if (currentGameStage == "Transfer Scores") {
    myOutputValue = stage06ScoreTallyTransfer(input);
  }

  return myOutputValue;
};

//Afterthoughts, on hidesight, I got too stuckup and mired with the issue of how to store
// individual player details and present them in the current game and missed out on
// just allowing user to be able to call up the user memory using simple '1', '2' '3' index.
// To improve on:
// -> how to keep variable player's bankroll and allow user to call this up in next games
// -> idea = use Player Index as same key between playersStoreMem for card Hand details but
//    separate list of objects for bank and wager details.
