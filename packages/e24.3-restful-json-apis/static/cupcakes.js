const form = document.querySelector('form');

const display = document.querySelector('.cupcakes');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await createCupcake();
    displayCupcakes(await getCupcakes());
    form.reset();
});

async function createCupcake() {
    const flavor = document.querySelector('#flavor');
    const size = document.querySelector('#size');
    const rating = document.querySelector('#rating');
    const image = document.querySelector('#image');
    imageVal = image.value ? image.value : undefined;
    const config = { flavor: flavor.value, size: size.value, rating: rating.value, image: imageVal };
    console.log(config);
    await axios.post('/api/cupcakes', config);
}

async function getCupcakes() {
    response = await axios.get('/api/cupcakes');
    return response.data.cupcakes;
}

function displayCupcakes(cupcakes) {
    display.innerHTML = '';
    for (let cupcake of cupcakes) {
        const cupcakeDisplay = document.createElement('div');
        const cupcakeImage = document.createElement('img');
        cupcakeImage.setAttribute('src', cupcake.image);
        cupcakeImage.setAttribute('height', '300');
        cupcakeDisplay.innerText = `${cupcake.size} ${cupcake.flavor} cupcake, ${cupcake.rating}`;
        cupcakeDisplay.append(cupcakeImage);

        display.append(cupcakeDisplay);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const cupcakes = await getCupcakes();
    displayCupcakes(cupcakes);
});