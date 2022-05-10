let cards = []
let dealerCards = []

let sum = 0
let dealerSum = 0

let hasBlackJack = false
let isAlive = false
let standed = false
let win = false

let player = {
    name: "Player",
    chips: 100
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function renderGame() {
    let message = ""
    let messageEl = document.getElementById("message-el")
    let sumEl = document.getElementById("sum-el")
    let cardsEl = document.getElementById("cards-el")
    let dealerEl = document.getElementById("dealer-el")
    let dealerSumEl = document.getElementById("dealerSum-el")
    // let sumEl = document.querySelector("#sum-el")
    // let sumEl = document.querySelector("body")

    if (sum < 21) {
        message = "Do you want to draw another card?"
    } else if (sum === 21) {
        message = "BLACKJACK"
        hasBlackJack = true
        // document.getElementById("btn").innerHTML = "FDSFD"
    } else { 
        message = "Sorry- you're out of the game."
        isAlive = false
    }

   sumEl.textContent = "Sum: " + sum

   let cardsMsg = "Cards: "
   for (let i = 0; i < cards.length; i++) {
       cardsMsg += cards[i] + " "
   }
   cardsEl.textContent = cardsMsg

   let dealerMsg = "Dealer: "
   let dealerSumMsg = "DealerSum: "
   if (!standed) {
        dealerMsg += dealerCards[0] + " x"
        dealerSumMsg += "?"
        dealerEl.textContent = dealerMsg
        dealerSumEl.textContent = dealerSumMsg
   } else {
        for (let i = 0; i < dealerCards.length; i++) {
            dealerMsg += dealerCards[i] + " "
        }
        dealerSumMsg += dealerSum

        dealerEl.textContent = dealerMsg
        dealerSumEl.textContent = dealerSumMsg
        
        if (win) {
            message = "Congrats! You Won!"
        } else {
            message = "Better luck next time!"
        }
   }
   
   messageEl.textContent = message
   playerEl.textContent = player.name + ": $" + player.chips
//    for (let i = 0; i < dealerCards.length - 1; i++) {
//        dealerMsg += " x"
//    }
}

function startGame() {
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let dealerFirstCard = getRandomCard();
    let dealerSecondCard = getRandomCard();
    
    standed = false;
    cards = [firstCard, secondCard]
    dealerCards = [dealerFirstCard, dealerSecondCard]
    sum = firstCard + secondCard
    dealerSum = dealerFirstCard + dealerSecondCard
    isAlive = true;

    renderGame()
}

function getRandomCard() {
    let n = Math.floor(Math.random()*13) + 1

    if (n===1) {
        return 11
    } else if (n > 10) {
        return 10
    } else {
        return n
    }
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let nextCard = getRandomCard()
        cards.push(nextCard)

        sum += nextCard
        renderGame()
    } 
}

function stand() {
    
    while (dealerSum < 17) {
        let newCard = getRandomCard()
        dealerCards[dealerCards.length] = newCard
        dealerSum += newCard
    }
    standed = true
    if (dealerSum < sum || dealerSum > 21) {
        win = true
        player.chips += 10
    } else {
        player.chips -= 10
    }
 
    renderGame()
}




  


