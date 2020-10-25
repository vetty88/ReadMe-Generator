/*jshint esversion: 8 */

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([{
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
            name: "user",
            message: "What is your github user name?",

        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"

        }

    ]);
}

function generateMD(answers, licenseBadge) {
    return `

 <!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#answers.project)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [License](#license)
* [Contact](#contact)
* [Creator & Acknowledgements](#acknowledgements)

<h1> ## ${answers.project} </h1>

  ${answers.description}

  Screenshot of Project (Google Chrome): 
  ![Screenshot](./Screen.PNG?raw=true)

  Repo: https://github.com/${answers.user}/${answers.project}

Video of app in action, see file: https://github.com/vetty88/Note-Taker/blob/master/Note%20Taker.mp4


## Installation
To get a local copy up and running follow these simple steps.

${answers.installation}

Prerequisites
This is an example of how to list things you need to use the software and how to install them.

Installation-
  Clone the repo
    git clone https://github.com/${answers.user}/${answers.project}.git
  Install NPM packages
    npm install
    npm inquirer
    npm audit fix
  Then open index.js file in console log and run
    node index.js
  You will be taken through a series of questions (user prompts) which will then lead to the generation of your new readme.md file!


## Usage

This project can be used for ${answers.usage}. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

For more examples, please refer to the Documentation

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Regarding this project I respectfully make the following requests regarding contributions:


${answers.contributing}

Fork the Project
  Create your Feature Branch 
    (git checkout -b feature/AmazingFeature)
  Commit your Changes 
    (git commit -m 'Add some AmazingFeature')
  Push to the Branch 
    (git push origin feature/AmazingFeature)
  Open a Pull Request

## Tests

See the open issues for a list of proposed features (and known issues). Testing completed and any known issues include the following:
 ${answers.tests}
 
## License

${licenseBadge}

## Contact

Your Name - ${answers.email}

Project Link: https://github.com/${answers.user}/${answers.project}

## Creator and Acknowledgements

Github User: ${answers.user}


Yvette Waller 2020
Credits Codebase Author: Monash University/Trilogy Education.

Resources utilised to edit the code:

Monash University ReadMe and Slide Materials Mozilla MDN WebDocs: https://developer.mozilla.org/en-US/ W3 Schools: https://www.w3schools.com/ Stack Overflow: https://www.stackoverflow.com/

;


}


promptUser()
    .then(function(answers, license) {
        // Determine relevant license badge
        const licenseBadge = generateLicenseBadge(answers.license);
        const md = generateMD(answers, licenseBadge);
          return writeFileAsync((answers.project) + "readme.md", md);
    })
    .then(function() {
        console.log("Successfully wrote to readme.md");
    })
    .catch(function(err) {
        console.log(err);

    });

//  / Generates license badge using user's answers from promptUser function
function generateLicenseBadge(license) {
    let badge = "";
    if (license == "Apache") {
        badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (license == "GPL") {
        badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (license == "MIT") {
        badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    }
    return badge;
}