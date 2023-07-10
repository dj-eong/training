### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?

    RESTful routing maps HTTP methods (GET, POST, PATCH, DELETE) and CRUD actions (Create, Read, Update, Destroy) together to create a standardized way of making routes.

- What is a resource?

    An API resource allows methods to reference its data.

- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?

    Including routes to render a form that creates a new user is not typically part of a JSON API because JSON APIs are designed to decouple the backend from the frontend. Instead, the frontend is responsible for rendering forms and capturing user input.

- What does idempotent mean? Which HTTP verbs are idempotent?

    In the context of APIs, "idempotent" refers to a property of an operation or request where making multiple identical requests has the same effect as making a single request. GET, PUT, and DELETE are idempotent.

- What is the difference between PUT and PATCH?

    The main difference between the PUT and PATCH methods in HTTP is how they are used for updating or modifying resources. PUT is used to completely replace an entire resource, whereas PATCH allows for partial updates.

- What is one way encryption?

    One way encryption, AKA hashing, encrypts data into a string of characters. A good hash should be irreversible.

- What is the purpose of a `salt` when hashing a password?

    The purpose of a 'salt' is to enhance the security when hashing a password. A salt is a random value that is combined with the password before hashing.

- What is the purpose of the Bcrypt module?

    The Bcrypt module is a library used for password hashing and secure password storage.

- What is the difference between authorization and authentication?

    Authorization is the process of granting access to specific things based on the user's permissions. Authentication is the process of verifying the identity of a user. A user is first authenticated, and then given access, or 'authorized', to certain things afterwards.