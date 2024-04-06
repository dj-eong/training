### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

	Some ways of managing asynchronous code in JavaScript include using callbacks, where you pass a function (callback) as an argument to another function, as well as using Promises and async + await.

- What is a Promise?

	A Promise is an object representing the eventual completion or failure of an asynchronous operation, and its resulting value.

- What are the differences between an async function and a regular function?

	Async and regular functions differ in syntax as well as behavior. Async functions look like regular functions except they have the keyword `async` in front of the function. In terms of behavior, async functions allows for asynchronous behavior, being able to pause certain operations with the `await` keyword.

- What is the difference between Node.js and Express.js?
	
	Node.js is an environment for building server-side event-driven applications using JavaScript. Express.js is a framework based on Node.js for building web applications using principles and approaches of Node. Essentially, Express is a specific framework used for web apps using Node.

- What is the error-first callback pattern?

	Error-First Callback in Node. js is a function which either returns an error object or any successful data returned by the function. The first argument in the function is reserved for the error object. If any error has occurred during the execution of the function, it will be returned by the first argument.

- What is middleware?
  
	Middleware is code that runs in the middle of the request/response cycle. In Express, they are functoins that get access to the `req` and `res` objects and can also call the `next` function.

- What does the `next` function do?

	The `next` function is a callback function that is used to move on to the next appropriate function. Without `next`, your server will stop at a point, unable to continue. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
Each request is hard-coded, and so if you need to add a hundred more users, you would have to add a hundred more lines of code with each line making a request. Creating a list consisting of each user's username would make it so that you can iterate through the list using a loop and make a request with each user. In terms of scalability, if you were to get a hundred more users, you would be able to add their names to the list, and the logic would not have to change; it would still be the same number of lines of code. Below is how I would refactor this function:

```js
async function getUsers(users) {
  const res = [];
  for (user of users) {
	res.push(await $.getJSON(`https://api.github.com/users/${user}`));
  }
  return res;
}
```