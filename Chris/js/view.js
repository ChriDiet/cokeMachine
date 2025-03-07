function updateView() {
    document.getElementById('app').innerHTML = /*HTML*/`
        ${getAutomatHtml()}         
        <div class="errorMsg">
            ${errorMessage}
        </div>

        <div class="bottomRow">
            <div class="buttons">
                <div class="putteInn">
                    <p>Putte inn:</p>
                    ${getImgButtonsHtml()}
                </div>
                <div class="actionButtons">
                    ${getActionButtonsHtml()}
                </div>
            </div>
        
            <div class="dag">
                ${getDagDrawingHtml()}
            </div>
        </div>
        `;
}

function getAutomatHtml () {
    return /*HTML*/`
    <div class="flexVertical">
        <div class="flexHorizontal">
            <div class="automat">
                <h1>Cola-automat - pris: 25kr</h1>
                <div class="innmat">
                    ${getCoinsHtml(coinsInMachine)}
                    <div class="cokes">
                        ${repeatImgDivHtml('coke', 'cola', cokesInStore)}
                    </div>
                    <div class="kundeMynt">
                        <div>
                            <strong>Mynter lagt inn: ${valueFromCoinCounts(coinsInserted)}kr
                            ${getCoinsHtml(coinsInserted)}</strong>
                        </div>
                        <div>
                            <strong>Mynter tilbake: ${valueFromCoinCounts(coinsReturned)}kr
                            ${getCoinsHtml(coinsReturned)}</strong>
                        </div>
                    </div>
                </div>
            </div>  
            <div class="utkast">
            ${repeatImgDivHtml('coke', 'getCoke', isCokeInDelivery ? 1 : 0)}
        </div>
    </div>
    `;
}

function getDagDrawingHtml() {
    return /*HTML*/`
        <img src="../img/${dagIsFeeling}.svg"/>`;
}

function getCoinsHtml(coinCounts) {
    return /*HTML*/`
        <div class="coins">
            <div>${repeatImgDivHtml('coin', 'coin1', coinCounts[0])}</div>
            <div>${repeatImgDivHtml('coin', 'coin5', coinCounts[1])}</div>
            <div>${repeatImgDivHtml('coin', 'coin10', coinCounts[2])}</div>
            <div>${repeatImgDivHtml('coin', 'coin20', coinCounts[3])}</div>            
        </div>
    `;
}

function repeatImgDivHtml(cssClass, image, count) {
    return /*HTML*/`<div class="${cssClass}"><img src="../img/${image}.svg"/></div>`.repeat(count);
}

function getImgButtonsHtml() {
    let coinValues = [1, 5, 10, 20];
    let imgButtonsHtml = '';

    for (let i = 0; i < coinValues.length; i++) {
        imgButtonsHtml += `<img src="../img/coin${coinValues[i]}.svg" onclick="insertCoin(${coinValues[i]})"/>`; 
    }
    return imgButtonsHtml;
}

function getActionButtonsHtml() {
    let buttonLabels = ['Angre','Ta myntene','Kjøpe Cola','Ta Cola'];
    let onclickFunctions = ['returnCoins()','takeCoins()','buyCoke()','takeCola()'];
    let actionButtonsHtml = '';

    for (let i = 0; i < buttonLabels.length; i++) {
        actionButtonsHtml += `<button onclick="${onclickFunctions[i]}">${buttonLabels[i]}</button>`; 
    }
    return actionButtonsHtml;
}