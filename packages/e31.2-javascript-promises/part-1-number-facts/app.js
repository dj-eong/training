const num = 21;
const baseURL = "http://numbersapi.com";

const body = document.querySelector('body');

// 1.
axios.get(`${baseURL}/${num}?json`)
    .then(res => console.log(res));

// 2.
const nums = [1, 2, 3, 4];

axios.get(`${baseURL}/${nums}?json`)
    .then(res => {
        for (let num of nums) {
            const li = document.createElement('li');
            li.innerText = res.data[num];
            body.append(li);
        }
        console.log(res);
    });

// 3.
const number = 7;
const numArr = [];

for (let i = 0; i < 4; i++) {
    numArr.push(
        axios.get(`${baseURL}/${number}?json`)
    );
}

Promise.all(numArr)
    .then(numFactsArr => {
        for (res of numFactsArr) {
            const li = document.createElement('li');
            li.innerText = res.data.text;
            body.append(li);
        }
    });