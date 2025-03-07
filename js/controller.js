function buyCoke() {
    const price = 25;

    if (valueFromCoinCounts(coinsInserted) < price) {
        let missingValue = calcChange(price);
        errorMessage = `Ikke nok penger. Du mangler ${Math.abs(missingValue)}kr`; 
        dagIsFeeling='sad';
        updateView()
        return;
    }

    if (valueFromCoinCounts(coinsInserted) > price) {
        let change = calcChange(price);
        change = returnChange(change);
        if(change > 0) {
            errorMessage = 'Not able to return correct amount, money returned';
            coinsReturned = [...coinsInserted];
            resetCoinsInserted();
            updateView();
            return;
        }
    }
    
    updateSaleVariables()

    for (let i = 0; i < coinsInserted.length; i++) {
        coinsInMachine[i] += coinsInserted[i];
    }
    resetCoinsInserted();
    updateView();
}

function returnCoins() {
    if (valueFromCoinCounts(coinsInserted) == 0) return;

    coinsReturned = [...coinsInserted];
    resetCoinsInserted();
    updateView();
}

function updateSaleVariables() {
    cokesInStore--
    isCokeInDelivery = true;
    errorMessage = '';
    dagIsFeeling='happy';
    updateView()
}

function insertCoin(value) {
    let machineReady = isMachineReady();
    
    if (machineReady)
    for (let i = 0; i < coinsInserted.length; i++) {
        if(coinValueFromIndex(i) === value) {
            coinsInserted[i]++;
        }
    }

    updateView();
}

function isMachineReady() {
    if (isCokeInDelivery) {
        errorMessage = 'Jeg tror du har glemt den andre colaen, ta den først.';
        updateView()
        return false; 
    } else if (cokesInStore == 0) {
        errorMessage = 'Beklager maskinen er tom for cola';
        returnCoins();
        updateView()
        return false;
    } else {
        return true;
    }
}

function returnChange(change) {
    const tempCoinsInMachine = [...coinsInMachine];
    const toReturn = [...coinsReturned];

    for (let i = tempCoinsInMachine.length - 1; i >= 0; i--) {
        let coinValue = coinValueFromIndex(i);
        let count = Math.floor(change / coinValue);

        count = Math.min(count, tempCoinsInMachine[i]);
        if (count > 0) {
            toReturn[i] += count;
            change -= count * coinValue;
        }
        if (change <= 0) break;
    }

    if (change <= 0) {
        toReturn.forEach((coin, index) => {
            tempCoinsInMachine[index] -= coin;
        });
        coinsReturned = [...toReturn];
        coinsInMachine = [...tempCoinsInMachine];
    }
    return change;
}

function calcChange(price) {
    let change = 0;
    change = valueFromCoinCounts(coinsInserted) - price;
    return change;
}

function takeCoins() {
    coinsReturned = [0, 0, 0, 0];
    errorMessage = '';
    updateView();
}

function takeCola() {
    if (isCokeInDelivery)
    dagIsFeeling='ecstatic'
    isCokeInDelivery = false;
    errorMessage = '';
    updateView();
}

function resetCoinsInserted() {
    coinsInserted = [0, 0, 0, 0];
}
