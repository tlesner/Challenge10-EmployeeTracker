# Challenge10-EmployeeTracker

[![License: MPL 2.0](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MPL-2.0)

## Description

This project is built as a CLI application that manages employees for a company by adding, removing, and updating employees and their roles and departments. It utilizes Node.js, Inquierer and PostgreSQL.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)

## Installation

Run the application locally by doing the following in your terminal:

1. Clone the repository to your local computer.  
    `https://github.com/tlesner/Challenge10-EmployeeTracker`
2. Check that node.js is installed.  
   `node -v`
3. Install dependencies.  
   `npm i`

## Usage
To run the application, open 2 instances of the application in your terminal.

Run the following in the first terminal:
1. Log into postgreSQL. `psql -U postgres`
2. Run `\i src/db/schema.sql;` to create your database and tables.
3. Run `\i src/db/seeds.sql;` to insert initial employees, roles, and departments into the tables.

Run the following in the second terminal:
1. Initialize your applicaiton. `npm run start`

## Contributing

This application was developed by Thomas Lesner. Here are some guidelines on ways to contribute:

# Report a bug fix.

1. Create a new Issue in the GitHub repository.

# Make local changes to push up.

1. Create a new branch (`git checkout -b <your-feature-branch-name>`)
2. Make your changes locally
3. Push the code back to the GitHub repo (`git push origin <your-feature-branch-name>`)
4. Create a pull request to merge your changes

## Tests

The application is working correctly if you you are able to enter all command line prompts without throwing exceptions.

[Click here](https://app.screencastify.com/v2/manage/videos/Bo9QkzCnwiootiXSBOSV) to watch a walkthrough video on how the application works.


## License

The application is covered under [MIT License](https://mit-license.org/#:~:text=The%20MIT%20License%20(MIT)&text=Permission%20is%20hereby%20granted%2C%20free,OTHER%20DEALINGS%20IN%20THE%20SOFTWARE.).  


## Questions

-   GitHub username: [tlesner](https://github.com/tlesner).
-   Reach me at [tjlesner@gmail.com](tjlesner@gmail.com)