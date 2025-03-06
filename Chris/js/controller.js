function buyCoke() {
    const price = 25
    if(totalCoinsInserted() < price) return;
    if(totalCoinsInserted() === price) resetCoinsInserted();
    if(totalCoinsInserted() > price) {
        debugger;
        let change = calcChange(price);
        console.log(change);
        let toReturn = [0, 0, 0, 0];
        for(let i = coinsInMachine.length - 1; i >= 0; i--) {
            let count = Math.floor(Number(change) / Number(coinValueFromIndex(i)));

            if(coinsInMachine[i] > 0) {
                if(count > 0) {
                    toReturn[i] += count;
                }
                change %= coinValueFromIndex(i);
                coinsReturned[i] = toReturn[i];
                coinsInMachine[i] -= toReturn[i];
            }
        }
            console.log(toReturn);
    }

    for (let i = 0; i < coinsInserted.length; i++) {
        // if(coinsInserted[i] )
            coinsInMachine[i] += coinsInserted[i];
    }
    console.log("in machine after buy: ",coinsInMachine);
    // for(let coins in coinsInserted) {
    //     coinsInMachine[coins] += coinsInserted[coins];
    // }
    cokesInStore--;
    isCokeInDelivery = true;
    updateView();
}

function insertCoin(value) {
    for (let i = 0; i < coinsInserted.length; i++) {
        // if(coinValueFromIndex(i) === value) incrementDecrementAtIndex(coinsInserted, coinsInMachine, i);
        if(coinValueFromIndex(i) === value) {
            coinsInserted[i]++;
            // coinsInMachine[i]++;
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

    // console.log(change);

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
