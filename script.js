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
var computerCardsValue = 0;
var computerFullHandDisplay = [];
var computerGameHandDisplay = [];
var computerBank = 100;
var computerWager = 0;

var numberOfPlayers = 0;
var playerIndex = 0;

var playerHand = [];
var playerHandDisplay = []; //<======??
var playerCardsValue = 0;
var playerBank = 100;
var playerWager = 0;

var playerSplitHand1 = [];
var playerSplitHand2 = [];
var playerSplitHand1Str = 0;
var playerSplitHand2Str = 0;
var playerSplitHand1Display = [];
var playerSplitHand2Display = [];

var playersStandardHandMemory = [];
var playersSplitHandMemory = [];

var handMode = "single";

var currentGameStage = "input number of players";
var nextGameStage = " "; //====> NEED TO CONFIRM!

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
var dealBeginningCards = function () {
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);

  var cardCount = 0;
  while (cardCount < 2) {
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
    cardCount += 1;
  }
  /*
  //=== TEST BLOC BELOW ================
  playerHand = [];
  playerHand = [
    {
      name: "ace",
      suit: "hearts",
      suitEmoji: "♥",
      rank: 1,
      value: 11,
    }
    {
      name: "ace",
      suit: "diamonds",
      suitEmoji: "♦",
      rank: 14,
      value: 11,
    }  
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
      name: "5",
      suit: "hearts",
      suitEmoji: "♥",
      rank: 5,
      value: 5,
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

//HELPER FN: DEALING CARDS TO SPLIT HAND
var splitPlayerHand = function (gamersHand) {
  if (playerHand.length == 2 && playerHand[0].name == playerHand[1].name) {
    playerSplitHand1.push(gamersHand.pop());
    playerSplitHand2.push(gamersHand.pop());

    playerSplitHand1.push(shuffledDeck.pop());
    playerSplitHand2.push(shuffledDeck.pop());

    playerSplitHand1Display = displayCards(playerSplitHand1);
    playerSplitHand2Display = displayCards(playerSplitHand2);
  }

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
  firstCardHidden[0] = "Card 1: placed face down.";

  return firstCardHidden;
};
//mini Helper Function: Diplaying Dealer cards to player

var displayDealerCardsToPlayer = function () {
  computerFullHandDisplay = displayCards(computerHand);
  computerGameHandDisplay = hidefirstCardinHand(computerFullHandDisplay);

  return computerGameHandDisplay;
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
  } else if (aceCount(gamersHand) >= 1 && nonAceSum(gamersHand) >= 11) {
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
    nonAceSum(playerFaceUpCards) >= 11
  ) {
    sumofFaceUpCards = sumofFaceUpCards - aceCount(playerFaceUpCards) * 10;
  }
  return sumofFaceUpCards;
};

//HELPER FUNCTION TO TRANSFER MEM

var storeStandardHand = function (
  playerHand,
  playerHandDisplay,
  playerCardsValue,
  playerBank,
  playerWager
) {
  var playerData = {
    hand: playerHand,
    handDisplay: playerHandDisplay,
    value: playerCardsValue,
    bank: playerBank,
    wager: playerWager,
  };
  playersStandardHandMemory.push(playerData);
  return;
};

//GAME STAGES BELOW

//STAGE: Reply after receiving no. of players input
var numberOfPlayersInput = function (numOfPlayers) {
  numberOfPlayers = numOfPlayers;
  playerIndex += 1;

  var replyNumberOfPlayers = ` There are ${numberOfPlayers} playing.
   <br>The computer will be the dealer. 
   <br><br>Player ${playerIndex},please place your bet.
   `;
  currentGameStage = "collect Player's bet";
  return replyNumberOfPlayers;
};

//STAGE: Ask Player to place their bet.
var stage01RespondToBetPlacement = function (wagerAmount) {
  playerWager = wagerAmount;
  playerBank = playerBank - wagerAmount;

  var confirmationOfBetsPlaced = `Player ${playerIndex}, 
 <br>current wager  =  $${playerWager}
 <br>Amount left = $${playerBank}`;
  currentGameStage = "deal cards to player and house";
  return confirmationOfBetsPlaced;
};

//STAGE: Deal cards to designated Player Index
var stage02dealCards = function () {
  dealBeginningCards();
  playerHandDisplay = displayCards(playerHand);
  var showPlayerAndDealerCardsMsg = `Player ${playerIndex}'s hand:${playerHandDisplay}
<br><br>
 Computer's hand:
 <br>${displayDealerCardsToPlayer()}.
 <br><br>
 Do you wish to hit, stand or split? 
 <br><i>to hit, type "h" in input;
 <br> to stand, type "s" in input;
 <br> to split your hand, type "t" in input.</i>`;

  currentGameStage = "player makes response alpha";
  return showPlayerAndDealerCardsMsg;
};

//GAME LOGIC: FOR PLAYER ACTION ALPHA PHASE
var stage03RespondToPlayerChoiceAlpha = function (playerChoice) {
  if (playerChoice.toLowerCase() == "h") {
    playerHand.push(shuffledDeck.pop());
    responseAlphaMsg = `You chose to "hit". 
    <br><br>You drew a ${playerHand[playerHand.length - 1].name} of ${
      playerHand[playerHand.length - 1].suitEmoji
    }
    <br><br> The cards you have in your hand now are: 
    ${playerHandDisplay}
    <br><br> Do you wish to hit ('h') or stand('s') or split ('t')? `;
    currentGameStage = "player makes response alpha";
  } else if (playerChoice.toLowerCase() == "s") {
    responseAlphaMsg = `You chose to "stay". 
    <br><br> The cards you have in your hand now are: 
    ${playerHandDisplay}
    <br><br>
    Computer will play its hand.`;
    currentGameStage = "Computer's turn";
    // stage = "computerTurn";
  } else if (playerChoice.toLowerCase() == "t") {
    splitPlayerHand();
    playerBank = playerBank - playerWager;
    playerWager = 2 * playerWager;
    responseAlphaMsg = ` You chose to split your hand.
    <br><br> Your split hands: 
    <br> Split Hand #1: 
    ${playerSplitHand1Display}
    <br> Split Hand #2:
    ${playerSplitHand2Display}<br>
    You have to double your wager. 
    <br>Current Wager = $${playerWager}
    <br>Amount Left = $${playerBank}
    <br><br> Do you wish to hit ('h') or stand('s') or split ('t')? `;
    currentGameStage = "player makes response beta";
  }

  return responseAlphaMsg;
};

//GAME LOGIC FOR PLAYER ACTIONS BETA PHASE
var stage3BplayerChoiceBeta = function (playerHitOrStand) {
  if (playerHitOrStand.toLowerCase() == "h") {
    playerSplitHand1.push(shuffledDeck.pop());
    playerSplitHand2.push(shuffledDeck.pop());
    playerSplitHand1Display = displayCards(playerSplitHand1);
    playerSplitHand2Display = playerSplitHand2;
    responseBetaMsg = `You chose to "hit". 
    <br><br>You drew a ${
      playerSplitHand1[playerSplitHand1.length - 1].name
    } of ${playerSplitHand1[playerSplitHand1.length - 1].suitEmoji} and a ${
      playerSplitHand2[playerSplitHand2.length - 1].name
    } of ${playerSplitHand2[playerSplitHand2.length - 1].suitEmoji} 
    <br><br> The cards you have in your hand now are: 
    ${displayCards(playerHand)}
    <br><br> Do you wish to continue to hit('h') or stand('s')? `;
    currentGameStage = "player makes response beta";
  } else if (playerHitOrStand.toLowerCase() == "s") {
    responseBetaMsg = `You chose to "stay". 
    <br><br> The cards you have in your hand now are: 
    ${displayCards(playerHand)}
    <br><br> 
    Computer will play its hand`;
    currentGameStage = "Computer's turn";
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

//HELPER FN: COMPUTER LOGIC FOR ACTION
var stage04computerLogic = function () {
  var computerResponse = "";

  if (
    (playerHand.length == 2 &&
      (playerHand[1].name == "ace" || playerHand[1].value == 10) &&
      sumOfCardsValue(computerHand) <= 21 &&
      sumOfCardsValue(computerHand) > 16) ||
    (sumOfCardsValue(computerHand) <= 21 &&
      sumOfCardsValue(computerHand) > 16 &&
      sumOfPlayerCardsVisible(playerHand) <= 9) ||
    sumOfPlayerCardsVisible(playerHand) > 21 ||
    (computerHand.length == 3 && sumOfCardsValue(computerHand > 16))
  ) {
    computerResponse = `The Computer chooses to stand.
  <br><br>
  Computer's hand: ${displayDealerCardsToPlayer}  `;
    currentGameStage = "Round Conclusion";
  } else {
    computerHand.push(shuffledDeck.pop());
    computerResponse = ` The Computer chooses to hit.
                         <br>It has drawn ${
                           computerHand[computerHand.length - 1].name
                         } of ${
      computerHand[computerHand.length - 1].suitEmoji
    }<br><br>
    Computer's hand: ${displayDealerCardsToPlayer}`;
    currentGameStage = "Computer's turn";
  }

  return computerResponse;
};

var stage05Conclusion = function () {
  var payOut = playerWager;
  var winner = "";
  // issues with playerHand != []?
  if (
    playerHand != [] &&
    sumOfCardsValue(playerHand) == 21 &&
    sumOfCardsValue(computerHand) != 21
  ) {
    winner = "player";
    ConclusionMsg = `Player ${playerIndex} won by blackjack! Computer Lost`;
  }

  if (
    playerHand != [] &&
    sumOfCardsValue(playerHand) != 21 &&
    sumOfCardsValue(computerHand) == 21
  ) {
    winner = "computer";
    ConclusionMsg = `Computer won by blackjack! Player ${playerIndex} Lost`;
  }

  if (
    playerHand != [] &&
    sumOfCardsValue(playerHand) < 21 &&
    sumOfCardsValue(computerHand) > 21
  ) {
    winner = "player";
    ConclusionMsg = `Computer BUST ( exceeded 21 pts)Player ${playerIndex} won!`;
  }

  if (
    playerHand != [] &&
    sumOfCardsValue(playerHand) > 21 &&
    sumOfCardsValue(computerHand) < 21
  ) {
    winner = "computer";
    ConclusionMsg = `Player ${playerIndex} Bust (exceeded 21 pts), Computer won!`;
  }

  if (
    playerHand != [] &&
    sumOfCardsValue(playerHand) == 21 &&
    sumOfCardsValue(computerHand) == 21
  ) {
    winner = "tie";
    ConclusionMsg = `Computer and Player ${playerIndex} both got blackjack!`;
  }

  if (
    playerHand != [] &&
    sumOfCardsValue(playerHand) > 21 &&
    sumOfCardsValue(computerHand) > 21
  ) {
    winner = "no winners";
    ConclusionMsg = `Computer and Player ${playerIndex} both BUST. No winners`;
  }

  if (
    playerHand != [] &&
    21 - sumOfCardsValue(playerHand) < 21 - sumOfCardsValue(computerHand)
  ) {
    winner = "player";
    ConclusionMsg = `Player ${playerIndex} won (closest to 21pts)`;
  }

  if (
    playerHand != [] &&
    21 - sumOfCardsValue(playerHand) > 21 - sumOfCardsValue(computerHand)
  ) {
    winner = "player";
    ConclusionMsg = `Computer Won, (closest to 21pts).Player ${playerIndex} Lost.`;
  }

  var showComputerHand = computerFullHandDisplay;
  var showPlayerHand = playerHandDisplay;

  if ((winner = "player")) {
    playerBank = playerBank + playerWager + payOut;
    winnings = `Player ${playerIndex} wins ${payOut}
    <br> Player ${playerIndex} bank = $${playerBank}`;
  } else if ((winner = "computer")) {
    playerBank = playerBank - payOut;
    winnings = `Player ${playerIndex} loses ${payOut}
    <br> Player ${playerIndex} bank = $${playerBank}`;
  }

  return (
    conclusionMsg +
    showComputerHand +
    showPlayerHand +
    winnings +
    nextInstruction
  );
};

//

//MAIN FUNCTION
var main = function (input) {
  var startingMessage = `There will be ${input} players playing this round. <br>Each player will take turns to receive and read their dealt hands, make their wager.<br> At the end of each player's turn, no more actions can be made. <br> Once all players have finished their actions. The dealer will play its hand.`;
  var myOutputValue = "X";

  if (currentGameStage == "input number of players") {
    numberOfPlayers = input;
    myOutputValue = numberOfPlayersInput(input);
  } else if (currentGameStage == "collect Player's bet") {
    myOutputValue = stage01RespondToBetPlacement(input);
  } else if (currentGameStage == "deal cards to player and house") {
    myOutputValue = stage02dealCards();
  } else if (currentGameStage == "player makes response alpha") {
    myOutputValue = stage03RespondToPlayerChoiceAlpha(input);
  } else if (currentGameStage == "player makes response beta") {
    myOutputValue = stage3BplayerChoiceBeta(input);
  } else if ((currentGameStage = "Computer's turn")) {
    myOutputValue = stage04computerLogic();
  } else if ((currentGameStage = "Round Conclusion")) {
    myOutputValue = stage05Conclusion;
  }

  return myOutputValue;
};
