// 1.
async function getCard() {
    const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`);
    console.log(res.data.cards[0].value + " of " + res.data.cards[0].suit);
}

getCard();

// 2.
async function getTwoCards() {
    const cards = [];
    const res1 = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`);
    cards.push(res1.data.cards[0].value + " of " + res1.data.cards[0].suit);
    const res2 = await axios.get(`https://deckofcardsapi.com/api/deck/${res1.data.deck_id}/draw/?count=1`);
    cards.push(res2.data.cards[0].value + " of " + res2.data.cards[0].suit);

    for (let card of cards) {
        console.log(card);
    }
}

getTwoCards();

// 3.
async function makeANewDeck() {
    const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    return res.data.deck_id;
}

document.addEventListener('DOMContentLoaded', async function () {
    const deck = await makeANewDeck();

    const button = document.querySelector('button');
    const div = document.querySelector('div');

    button.addEventListener('click', async function () {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);

            const img = document.createElement('img');
            img.setAttribute('src', `${res.data.cards[0].image}`);
            div.prepend(img);
        }
        catch (err) {
            console.log('No more cards');
        }
    });
});
