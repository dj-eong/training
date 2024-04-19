Potential bugs:
- registering without sufficient data leads to uncaught error, require in user model register method
- uncaught error when logging in with incorrect credentials, should return 401

- BUG #1: logging in with incorrect credentials crashes the server
- BUG #2*: registering without sufficient data leads to uncaught error *(NOT REALLY A BUG)
- BUG #3: /users/ route reveals too much user info including email and phone
- BUG #4: cannot patch data as the correctly logged-in user
- BUG #5: when patching user info, user can update non-allowed fields like admin status or password
- BUG #6: not verifying if the JWT's have the right signature/secret key
- BUG #7: returns empty JSON when making GET request to /users/:non-existing-username instead of error