function buyCoke() {
    let cokePrice = 25;
    console.log(`Buying coke... Inserted: ${totalCoinsInserted()}kr, Price: ${cokePrice}kr`);


    if (cokesInStore > 0 && totalCoinsInserted() >= cokePrice) {
        cokesInStore--;
        isCokeInDelivery = true;
        moveCoins(coinsInserted, coinsInMachine);
        let leftover = totalCoinsInserted() - cokePrice;
        console.log("Leftover after buy:", leftover);
        if (leftover > 0) {
            returnChange(leftover);
        }
        updateView();
        console.log(`Coke purchased. Remaining stock: ${cokesInStore}`);
    } else {

        console.log(cokesInStore === 0
            ? "No cokes left."
            : `Not enough money. Need ${cokePrice - totalCoinsInserted()}kr more.`
        );
    }
}


function returnChange(amount) {

    for (let i = 3; i >= 0; i--) {

        while (amount >= coinValueFromIndex(i) && coinsInMachine[i] > 0) {
            amount -= coinValueFromIndex(i);
            coinsInMachine[i]--;
            coinsReturned[i]++;
        }
    }

    console.log("coinsInMachine after change:", coinsInMachine);
    console.log("coinsReturned after change:", coinsReturned);
}


function insertCoin(value) {
    let index = getCoinIndex(value);

    if (index !== -1 && customerWallet[index] > 0) {
        customerWallet[index]--;
        coinsInserted[index]++;
        console.log(`Inserted: ${value}kr | Wallet: ${formatCoinArray(customerWallet)} | Deposit: ${formatCoinArray(coinsInserted)}`);
        updateView();
    } else {
        console.log(`Cannot insert ${value}kr. Not enough in wallet.`);
    }
}

function returnCoins() {
    moveCoins(coinsInserted, customerWallet);
    updateView();
    console.log("Coins returned.");
}

function takeCoins() {
    moveCoins(coinsReturned, customerWallet);
    updateView();
    console.log("Coins taken.");
}

function totalCoinsInserted() {
    return valueFromCoinCounts(coinsInserted);
}

function moveCoins(source, target) {
    for (let i = 0; i < source.length; i++) {
        target[i] += source[i];
        source[i] = 0;
    }
}

function getCoinIndex(value) {
    return [1, 5, 10, 20].indexOf(value);
}

function formatCoinArray(array) {
    return ["1kr", "5kr", "10kr", "20kr"].map((label, i) => `${label}: ${array[i]}`).join(" | ");
}

function takeCoke() {
    if (isCokeInDelivery) {
        isCokeInDelivery = false;
        customerCokes++;
        updateView();
        console.log("Coke taken.");
    } else {
        console.log("No coke to take.");
    }
}

function drinkCoke() {
    if (customerCokes > 0) {
        customerCokes--;
        updateView();
        console.log("Coke consumed. Remaining:", customerCokes);
    } else {
        console.log("No Coke left to drink.");
    }
}