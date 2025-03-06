function buyCoke() {
    const price = 25
    if(totalCoinsInserted() < price) return;
    if(totalCoinsInserted() === price) resetCoinsInserted();
    if(totalCoinsInserted() > price) {

        let change = calcChange(price);
        change = returnChange(price, change);
        if(change > 0) {
            errorMessage = 'Not able to return correct amount, money returned';
            coinsReturned = [...coinsInserted];
            resetCoinsInserted();
            updateView();
            return;
        }

    }

    coinsInserted.forEach((_, index) => {
        coinsInMachine[index] += coinsInserted[index]
    });


    resetCoinsInserted();
    cokesInStore--;
    isCokeInDelivery = true;
    updateView();
}

function insertCoin(value) {
    for (let i = 0; i < coinsInserted.length; i++) {
        if(coinValueFromIndex(i) === value) {
            coinsInserted[i]++;
        }
    }
    updateView();
}

function returnCoins() {
    if(isCoinsInsertedEmpty()) return;

    coinsInserted.forEach((_, index) => {
        coinsInMachine[index] -= coinsInserted[index];
    });

    coinsReturned = [...coinsInserted];
    resetCoinsInserted();
    updateView();
}

function isCoinsInsertedEmpty() {
    return coinsInserted.every((coin) => coin === 0);
}

function totalCoinsInserted() {
    let total = 0;
    coinsInserted.forEach((_, index) => {
        total += coinsInserted[index] * coinValueFromIndex(index);
    });
    return total;
}

function returnChange(price, change) {
    const tempCoinsInMachine = [...coinsInMachine];
    const toReturn = [...coinsReturned];


    for(let i = tempCoinsInMachine.length - 1; i >= 0; i--) {
        let coinValue = coinValueFromIndex(i);
        let count = Math.floor(Number(change) / coinValue);

        count = Math.min(count, tempCoinsInMachine[i]);
        if(count > 0) {
            toReturn[i] += count;
            change -= count * coinValue;
        }
        if(change <= 0) break;
    }

    toReturn.forEach((coin, index) => {
        if(coin > 0) {
            coinsReturned = [...toReturn];
            coinsInMachine[index] -= coin;
        }
    })

    return change;
}

function calcChange(price) {
    let change = 0;
    change = totalCoinsInserted() - price;
    return change;
}

function takeCoins() {
    coinsReturned = [0, 0, 0, 0];
    updateView();
}

function takeCola() {
    isCokeInDelivery = false;
    updateView();
}

function resetCoinsInserted() {
    coinsInserted = [0, 0, 0, 0];
}
