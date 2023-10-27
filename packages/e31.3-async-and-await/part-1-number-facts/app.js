const baseURL = "http://numbersapi.com";
const num = 7;

const body = document.querySelector('body');

// 1.
async function getNumFact(num) {
    const res = await axios.get(`${baseURL}/${num}?json`);
    console.log(res.data.text);
    return res.data.text;
}

getNumFact(num);

// 2.
const nums = [1, 2, 3, 5, 10];

async function getNumsFacts(nums) {
    const res = await axios.get(`${baseURL}/${nums}?json`);
    for (let num of nums) {
        const li = document.createElement('li');
        li.innerText = res.data[num];
        body.append(li);
    }
    return res.data.text;
}

getNumsFacts(nums);

// 3.
async function getFourNumFacts(num) {
    const numPromises = [];
    for (let i = 0; i < 4; i++) {
        numPromises.push(axios.get(`${baseURL}/${num}?json`));
    }
    const resArr = await Promise.all(numPromises);
    for (res of resArr) {
        const li = document.createElement('li');
        li.innerText = res.data.text;
        body.append(li);
    }
}

getFourNumFacts(7);