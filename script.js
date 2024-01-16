let selectedCard = null;
const a = [1, 2, 3, 4, 5, 6, 7];
const b = [8, 9, 10, 11, 12, 13, 14];
const c = [15, 16, 17, 18, 19, 20, 21];
let loop = 0;

const instructionPopup = document.getElementById("instructionPopup");
const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const resultPopup = document.getElementById("resultPopup");

startButton.addEventListener("click", () => {
    instructionPopup.style.display = "none";
});

function selectCard(card) {
    if (selectedCard) {
        document.getElementById(`card${selectedCard.toUpperCase()}`).classList.remove('selected');
    }
    selectedCard = card;
    document.getElementById(`card${card.toUpperCase()}`).classList.add('selected');
    continueButton.removeAttribute('disabled');
}

continueButton.addEventListener('click', () => {
    if (selectedCard) {
        let d;
        if (selectedCard === 'a') {
            d = b.concat(a, c);
        } else if (selectedCard === 'b') {
            d = a.concat(b, c);
        } else if (selectedCard === 'c') {
            d = a.concat(c, b);
        }

        let j = 0;
        a.length = 0;
        b.length = 0;
        c.length = 0;

        for (let x = 0; x < 7; x++) {
            a.push(d[j]);
            b.push(d[j + 1]);
            c.push(d[j + 2]);
            j += 3;
        }

        loop++;

        if (loop === 3) {
            document.getElementById('popupBigCard').textContent = 'Your guessed number is: ' + b[3];
            resultPopup.style.display = 'flex';
        } else {
            document.getElementById(`card${selectedCard.toUpperCase()}`).classList.remove('selected');
            selectedCard = null;

            document.getElementById('cardA').textContent = a.join(', ');
            document.getElementById('cardB').textContent = b.join(', ');
            document.getElementById('cardC').textContent = c.join(', ');

            continueButton.setAttribute('disabled', true);
        }
    }
});

document.getElementById('replayButton').addEventListener('click', () => {
    loop = 0;
    selectedCard = null;
    document.getElementById('cardA').textContent = a.join(', ');
    document.getElementById('cardB').textContent = b.join(', ');
    document.getElementById('cardC').textContent = c.join(', ');
    continueButton.setAttribute('disabled', true);
    resultPopup.style.display = 'none';
    document.getElementById('cardA').classList.remove('selected');
    document.getElementById('cardB').classList.remove('selected');
    document.getElementById('cardC').classList.remove('selected');
    instructionPopup.style.display = "flex";
});

window.onload = function () {
    if (performance.navigation.type === 1) {
        // Page is refreshed, don't show congratulations message
        resultPopup.style.display = 'none';
    }
};