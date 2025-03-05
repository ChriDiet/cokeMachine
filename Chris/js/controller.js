function buyCoke() {
    const price = 25
    if(totalCoinsInserted() < price) return;
    if(totalCoinsInserted() === price) resetCoinsInserted();
    if(totalCoinsInserted() > price) {

    }

    cokesInStore--;
    isCokeInDelivery = true;
    updateView();
}

function insertCoin(value) {
    for (let i = 0; i < coinsInserted.length; i++) {
        // if(coinValueFromIndex(i) === value) incrementDecrementAtIndex(coinsInserted, coinsInMachine, i);
        if(coinValueFromIndex(i) === value) {
            coinsInserted[i]++;
            coinsInMachine[i]++;
        }
    }

    updateView();
}

function returnCoins() {
    if(isCoinsInsertedEmpty()) return;

    coinsInserted.forEach((coin, index) => {
        coinsInMachine[index] -= coinsInserted[index];
    });

    coinsReturned = [...coinsInserted];
    resetCoinsInserted();
    // coinsInserted = [0, 0, 0, 0];
    updateView();
}

function isCoinsInsertedEmpty() {
    return coinsInserted.every((coin) => coin === 0);
}

function totalCoinsInserted() {

    // let initVal = 0;
    // return coinsInserted.reduce((acc, cur, i) => {
    //      return acc + (cur * coinValueFromIndex(i));
    // }, initVal);

    let total = 0;
    coinsInserted.forEach((coin, index) => {
        total += coinsInserted[index] * coinValueFromIndex(index);
    });
    return total;
}

function returnChange(toReturn) {

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
