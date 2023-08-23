// 1.
axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    .then(res => {
        console.log(res.data.cards[0].value + " of " + res.data.cards[0].suit);
    });

// 2.
const cards = [];
axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    .then(res => {
        cards.push(res.data.cards[0].value + " of " + res.data.cards[0].suit);
        return axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`);
    })
    .then(res => {
        cards.push(res.data.cards[0].value + " of " + res.data.cards[0].suit);
        for (let card of cards) {
            console.log(card);
        }
    });

// 3.
let deck = '';
axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(res => {
    deck = res.data.deck_id;
});

const button = document.querySelector('button');
const div = document.querySelector('div');
button.addEventListener('click', function () {
    axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
        .then(res => {
            const img = document.createElement('img');
            img.setAttribute('src', `${res.data.cards[0].image}`);
            div.prepend(img);
        })
        .catch(err => console.log('No more cards'));
});