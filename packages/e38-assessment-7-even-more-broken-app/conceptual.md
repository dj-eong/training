### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  
  A JWT is a JSON Web Token, a useful way of authenticating and authorizing in web applications and APIs.

- What is the signature portion of the JWT?  What does it do?
  
  The signature portion of the JWT is created by encoding the header and payload, and signing the resulting string using a secret key, ensuring the token to be safe.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  
  Yes.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
  
  When a user makes an account, a JWT token is generated. Each user has a unique token that contains relevant info (e.g. their user ID, username, createdAt date, etc.). Whenever a user logs in, the server verifies if their token info matches.

- Compare and contrast unit, integration and end-to-end tests.
  
  All three are different types of software testing methods, with unit tests being the smallest in scope, testing individual 'units' like functions, in isolation. Integration testing focuses on testing interactions between different units, while end-to-end testing examines the entire application from start to end as a whole.

- What is a mock? What are some things you would mock?
  
  Mocking is primarily used in unit testing, when an object under test may have dependencies on other (complex) objects. To isolate the behavior, you replace other objects by mocks that simulate their behavior.

- What is continuous integration?
  
  Continuous Integration is the practice of merging in small code changes frequently, rather than merging in a large change at the end of a development cycle.

- What is an environment variable and what are they used for?
  
  An environment variable is a value set outside a program that affects the way a process runs. In the context of web development, env variables are commonly used to configure web servers, databases, API keys, etc.

- What is TDD? What are some benefits and drawbacks?
  
  Test Driven Development is the process of writing tests first, then writing only the code necessary to get the tests to pass. It helps developers to focus on completing the task at hand. This allows for faster debugging, better test coverage, and improved code quality, but takes more time, and can lead to developers focusing more on passing tests than delivering the best, simplest solutions.

- What is the value of using JSONSchema for validation?
  
  Using JSONSchema for validation allows for much more quick, efficient, and structured data validation that is easy to set up and maintain.

- What are some ways to decide which code to test?
  
  Deciding which code to test depends on what the code does and what you are looking to test from it. Generally, you should test the API rather than the database.

- What does `RETURNING` do in SQL? When would you use it?
  
  `RETURNING` allows you to get back data from the SQL query you made - it's useful when INSERTING, UPDATING, or DELETING and you want to send back data about the info that was queried.

- What are some differences between Web Sockets and HTTP?
  
  HTTP is a 'heavy' protocol with many things in its headers, as well as being stateless. Web sockets are tiny and stateful, meaning they stay connected. They're often used to tell the browser something has changed, and are ideal for apps requiring real-time, interactive communication, like chat apps or live updates.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

  I preferred using Express. Maybe it's because I learned it second, but it made more sense to me right off the bat, and I like the functionality that middleware provides. I think Flask itself was also great to learn, but I did not really like SQL-Alchemy; I much more preferred creating our own 'ORM' and it made more intuitive sense.
