const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "project",
      message: "What is the title of your project??"
    },
    {
      type: "input",
      name: "description",
      message: "What does your project do? i.e: how would you describe it?"
    },
    {
      type: "input",
      name: "installation",
      message: "how do you install your project? what programs did you use to create and run this project?"
    },
    {
      type: "input",
      name: "usage ",
      message: "What is your project used for? what is an ideal application?"
    },
    {
      type: "input",
      name: "contributing",
      message: "What are your instructions for gitHub users who would like to pull and/or make changes to this project?"
    },
    {
      type: "input",
      name: "tests",
      message: "What testing did you do, are their any known issues with this version of the project",

    },
    {
      type: "checkbox",
      message: "What license is used?",
      name: "license",
      choices: [
        "MIT", 
        "Apache", 
        "GPL", 
      ]
    },
    {
      type: "input",
      name: "github user",
      message: "What is your github user name?",

    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?"

    }



  ]);
};

function generateMD(answers, licenseBadge) {
  return `
## ${answers.project}

  ${answers.description}

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributing

${answers.contributing}

## Tests
${answers.tests}


## License
${answers.license}

## Contact
${answers.email}

## Creator
${answers.user}`;
}

// Generates license badge using user's answers from promptUser function
function generateLicenseBadge(license) {
  let badge = ""
  if (license === "Apache") {
    badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
 } else if (license === "GPL") {
    badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  } else if (license === "MIT") {
    badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  }
  return badge;
}

promptUser()
  .then(function(answers, license) {
    const md = generateMD(answers);
     // Determine relevant license badge
     const licenseBadge = generateLicenseBadge(answers.license);

    console.log(answers.project);

    return writeFileAsync((answers.project) + "readme.md", md);
  })
  .then(function() {
    console.log("Successfully wrote to readme.md");
  })
  .catch(function(err) {
    console.log(err);
    
  });

//   Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: github_username, repo, twitter_handle, email

// Built With
// Getting Started
// To get a local copy up and running follow these simple steps.

// Prerequisites
// This is an example of how to list things you need to use the software and how to install them.

// npm
// npm install npm@latest -g
// Installation
// Clone the repo
// git clone https://github.com/github_username/repo.git
// Install NPM packages
// npm install
// Usage
// Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

// For more examples, please refer to the Documentation

// Roadmap
// See the open issues for a list of proposed features (and known issues).

// Contributing
// Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

// Fork the Project
// Create your Feature Branch (git checkout -b feature/AmazingFeature)
// Commit your Changes (git commit -m 'Add some AmazingFeature')
// Push to the Branch (git push origin feature/AmazingFeature)
// Open a Pull Request
// License
// Distributed under the MIT License. See LICENSE for more information.

// Contact
// Your Name - @twitter_handle - email

// Project Link: https://github.com/github_username/repo

// Acknowledgements


// <!-- PROJECT LOGO -->
// <br />
// <p align="center">
//   <a href="https://github.com/github_username/repo">
//     <img src="images/logo.png" alt="Logo" width="80" height="80">
//   </a>

//   <h3 align="center">YOUR_TITLE</h3>

//   <p align="center">
//     YOUR_SHORT_DESCRIPTION
//     <br />
//     <a href="https://github.com/github_username/repo"><strong>Explore the docs »</strong></a>
//     <br />
//     <br />
//     <a href="https://github.com/github_username/repo">View Demo</a>
//     ·
//     <a href="https://github.com/github_username/repo/issues">Report Bug</a>
//     ·
//     <a href="https://github.com/github_username/repo/issues">Request Feature</a>
//   </p>
// </p>



// <!-- TABLE OF CONTENTS -->
// ## Table of Contents

// * [About the Project](#about-the-project)
//   * [Built With](#built-with)
// * [Getting Started](#getting-started)
//   * [Prerequisites](#prerequisites)
//   * [Installation](#installation)
// * [Usage](#usage)
// * [Roadmap](#roadmap)
// * [Contributing](#contributing)
// * [License](#license)
// * [Contact](#contact)
// * [Acknowledgements](#acknowledgements)



// <!-- ABOUT THE PROJECT -->
// ## About The Project

// [![Product Name Screen Shot][product-screenshot]](https://example.com)

// Here's a blank template to get started:
// **To avoid retyping too much info. Do a search and replace with your text editor for the following:**
// `github_username`, `repo`, `twitter_handle`, `email`


// ### Built With

// * []()
// * []()
// * []()



// <!-- GETTING STARTED -->
// ## Getting Started

// To get a local copy up and running follow these simple steps.

// ### Prerequisites

// This is an example of how to list things you need to use the software and how to install them.
// * npm
// ```sh
// npm install npm@latest -g
// ```

// ### Installation
 
// 1. Clone the repo
// ```sh
// git clone https://github.com/github_username/repo.git
// ```
// 2. Install NPM packages
// ```sh
// npm install
// ```



// <!-- USAGE EXAMPLES -->
// ## Usage

// Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

// _For more examples, please refer to the [Documentation](https://example.com)_



// <!-- ROADMAP -->
// ## Roadmap

// See the [open issues](https://github.com/github_username/repo/issues) for a list of proposed features (and known issues).



// <!-- CONTRIBUTING -->
// ## Contributing

// Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

// 1. Fork the Project
// 2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
// 3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
// 4. Push to the Branch (`git push origin feature/AmazingFeature`)
// 5. Open a Pull Request



// <!-- LICENSE -->
// ## License

// Distributed under the MIT License. See `LICENSE` for more information.



// <!-- CONTACT -->
// ## Contact

// Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

// Project Link: [https://github.com/github_username/repo](https://github.com/github_username/repo)



// <!-- ACKNOWLEDGEMENTS -->
// ## Acknowledgements

// * []()
// * []()
// * []()





