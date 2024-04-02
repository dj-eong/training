# Broken App Issues

- No package.json file. The node package manager was never initialized, and the required technologies (express & axios) were never installed. I created a package.json file with the required dependencies indicated.
- No error handling. I added an error handler that would return in json format the proper error code and message.
- API request logic in node route. I refactored the code, moving the external API request logic into a helper function for better readability.
- Incorrect and outdated syntax. The `/` route was coded as a POST request when it should have been a GET request. I also updated all variable declarations of `var` and even `let` to `const` whenever possible.
- Inefficiency. The original logic used unnecessary space and runtime, looping through the list of devs twice and creating two arrays to store dev info. I improved the code to iterate through the dev list once and store only the necessary info into one array.