// Kartencontainer und Buttons referenzieren
const cardsContainer = document.getElementById('cards-container');
const generateBtn = document.getElementById('generate-btn');
const calculateBtn = document.getElementById('calculate-btn');
const resultDisplay = document.getElementById('result');

// Funktion: Karten basierend auf der Anzahl generieren
function generateCards(numCards) {
    cardsContainer.innerHTML = ''; // Alte Karten löschen
    const maxNumber = Math.pow(2, numCards) - 1; // Maximalzahl basierend auf Kartenanzahl

    const cards = [];
    for (let i = 0; i < numCards; i++) {
        const cardNumbers = [];
        for (let n = 1; n <= maxNumber; n++) {
            if (n & (1 << i)) {
                cardNumbers.push(n);
            }
        }
        cards.push(cardNumbers);
    }

    // Karten anzeigen
    cards.forEach((cardNumbers, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.cardIndex = index;

        card.innerHTML = `
            <h3>Karte ${index + 1}</h3>
            <p>${cardNumbers.join(', ')}</p>
        `;

        // Klick-Interaktion
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
        });

        cardsContainer.appendChild(card);
    });
}

// Berechnung der Zahl
calculateBtn.addEventListener('click', () => {
    let result = 0;
    const selectedCards = document.querySelectorAll('.card.selected');

    selectedCards.forEach(card => {
        const cardIndex = parseInt(card.dataset.cardIndex, 10);
        result += Math.pow(2, cardIndex);
    });

    resultDisplay.textContent = `Deine gedachte Zahl ist: ${result}`;
});

// Karten generieren, wenn der Benutzer eine Anzahl eingibt
generateBtn.addEventListener('click', () => {
    const numCards = parseInt(document.getElementById('num-cards').value, 10);
    if (numCards < 1 || numCards > 10) {
        alert('Bitte wähle eine Anzahl zwischen 1 und 10.');
        return;
    }
    generateCards(numCards);
});

// Standardmäßig 5 Karten generieren
generateCards(5);
