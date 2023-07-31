/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    evt.preventDefault();
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const year = document.querySelector('#year');
    const color = document.querySelector('#color');
    const data = {
        name: name.value,
        email: email.value,
        year: year.value,
        color: color.value
    };
    resp = await axios.post('/api/get-lucky-num', data);
    handleResponse(resp);
    document.querySelector('#lucky-form').reset();
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    const results = document.querySelector('#lucky-results');
    results.innerHTML = '';
    const messages = document.querySelectorAll('b');
    for (let message of messages) {
        message.innerText = '';
    }
    const hasErrors = Object.keys(resp.data?.errors || {}).length > 0;
    if (!hasErrors && resp.data?.year?.year?.length == 0) {
        results.innerHTML = 'something went wrong';
        return;
    } else if (hasErrors) {
        for (let error in resp.data.errors) {
            const errorMsg = document.querySelector(`#${error}-err`);
            errorMsg.innerHTML = `${resp.data.errors[error]}`;
        }
    } else {
        results.innerHTML = `<p>Your lucky number is ${resp.data.num.num} (${resp.data.num.fact})</p>
        <p>Your birth year (${resp.data.year.year}) fact is ${resp.data.year.fact}</p>`;
    }
}


$("#lucky-form").on("submit", processForm);
