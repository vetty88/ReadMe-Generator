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
      message: "What licence is used?",
      name: "licence",
      choices: [
        "MIT Licence", 
        "Apache Licence", 
        "GPL Licence", 
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

function generateTXT(answers) {
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
${answers.licence}
// Badge

## Contact
${answers.email}

## Creator
${answers.user}`;
}

promptUser()
  .then(function(answers) {
    const txt = generateTXT(answers);

    console.log(answers.project);

    return writeFileAsync((answers.project) + "readme.txt", txt);
  })
  .then(function() {
    console.log("Successfully wrote to readme.txt");
  })
  .catch(function(err) {
    console.log(err);
    
  });
