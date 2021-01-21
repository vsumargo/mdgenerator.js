// improting the required modules
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

// creating function to return current Date in DD-MMM-YYYY format
Date.prototype.toShortFormat = function() {

    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];
    
    let day = this.getDate();
    
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];
    
    let year = this.getFullYear();
    
    return `${day}-${monthName}-${year}`;  
}

// creating variable for questions to run by inquirer
const title = [{
        type: 'input',
        name: 'titleHeader',
        message: 'What is the title of this README files?',
}]

const overview = [{
    type: 'input',
    name: 'overviewContent',
    message: 'Please insert text paragraph for the overview content',
}]

const date = new Date();
const currentDate = date.toShortFormat();
const version_history = [
    {
        type: 'input',
        name: 'versionHistory',
        message: 'What is the version of the application?',
        default: `Version 0.0 - ${currentDate}`
    },
    {
        type: 'input',
        name: 'versionHistoryParagraph',
        message: 'Please insert brief explanation about this version',
    }
];

const installation = [
    {
        type: 'number',
        name: 'installationNumber',
        message: 'How many steps of installation methods do you want to have? Max number of steps is 5 (five)',
    },
    {
        type: 'input',
        name: 'installationStepOne',
        message: 'Please enter text for step 1 of installation methods:',
        when: function(answers){
                return answers['installationNumber'] > 0
        }
    },
    {
        type: 'input',
        name: 'installationStepTwo',
        message: 'Please enter text for step 2 of installation methods:',
        when: function(answers){
                return answers['installationNumber'] > 1
        }
    },
    {
        type: 'input',
        name: 'installationStepThree',
        message: 'Please enter text for step 3 of installation methods:',
        when: function(answers){
                return answers['installationNumber'] > 2
        }
    },
    {
        type: 'input',
        name: 'installationStepFour',
        message: 'Please enter text for step 4 of installation methods:',
        when: function(answers){
                return answers['installationNumber'] > 3
        }
    },
    {
        type: 'input',
        name: 'installationStepFive',
        message: 'Please enter text for step 5 of installation methods:',
        when: function(answers){
                return answers['installationNumber'] > 4
        }
    },
]

const how_it_work = [
    {
        type: 'number',
        name: 'howItWorkSteps',
        message: 'How many steps of "How It Works do you want" to have? Max number of steps is 5',
    },
    {
        type: 'input',
        name: 'howItWorkStepOne',
        message: 'Please enter text for step 1 of How It Work:',
        when: function(answers){
                return answers['howItWorkSteps'] > 0
        }
    },
    {
        type: 'input',
        name: 'howItWorkStepTwo',
        message: 'Please enter text for step 2 of How It Work:',
        when: function(answers){
                return answers['howItWorkSteps'] > 1
        }
    },
    {
        type: 'input',
        name: 'howItWorknStepThree',
        message: 'Please enter text for step 3 of How It Work:',
        when: function(answers){
                return answers['howItWorkSteps'] > 2
        }
    },
    {
        type: 'input',
        name: 'howItWorkStepFour',
        message: 'Please enter text for step 4 of How It Work:',
        when: function(answers){
                return answers['howItWorkSteps'] > 3
        }
    },
    {
        type: 'input',
        name: 'howItWorkStepFive',
        message: 'Please enter text for step 5 of How It Work:',
        when: function(answers){
                return answers['howItWorkSteps'] > 4
        }
    },
]

    const screenshoots = [
    {
        type: 'number',
        name: 'numberOfScreenshoot',
        message: 'How many screenshoot do you want to insert? Max number of screenshoot is 3',
    },
    {
        type: 'input',
        name: 'screenshootOneTitle',
        message: 'Please enter text for title of Screenshoot 1:',
        when: function(answers){
                return answers['numberOfScreenshoot'] > 0
        }
    },
    {
        type: 'input',
        name: 'screenshootOneURL',
        message: 'Please enter url or file path for screenshoot 1',
        when: function(answers){
            if(answers.screenshootOneTitle)
                return answers['screenshootOneTitle'] 
        }
    },
    {
        type: 'input',
        name: 'screenshootTwoTitle',
        message: 'Please enter text for title of Screenshoot 2:',
        when: function(answers){
                return answers['numberOfScreenshoot'] > 1
        }
    },
    {
        type: 'input',
        name: 'screenshootTwoURL',
        message: 'Please enter url or file path for screenshoot 2',
        when: function(answers){
            if(answers.screenshootTwoTitle)
                return answers['screenshootTwoTitle']
        }
    },
    {
        type: 'input',
        name: 'screenshootThreeTitle',
        message: 'Please enter text for title of Screenshoot 3:',
        when: function(answers){
                return answers['numberOfScreenshoot'] > 2
        }
    },
    {
        type: 'input',
        name: 'screenshootThreeURL',
        message: 'Please enter url or file path for screenshoot 3',
        when: function(answers){
            if(answers.screenshootThreeTitle)
                return answers['screenshootThreeTitle']
        }
    },
    
]

const links = [
    {
        type: 'input',
        name: 'deployedWebURL',
        message: 'Please enter the url of the deployed web page:',
        
    },
    {
        type: 'input',
        name: 'githubURL',
        message: 'Please enter the url of the github source code:',
    },
]

const contributing = [
    {
        type: 'input',
        name: 'contributingText',
        message: 'Please insert text explaining ways to contribute to this project',
    },
]

const feedback = [
    {
        type: 'input',
        name: 'feedbackText',
        message: 'Please insert text explaining ways to give feedback for this project',
    },
]

const license = [
    {
        type: 'input',
        name: 'licenseUsed',
        message: 'Please type the license used for this project (i.e MIT)',
    },
]

const acknowledgement = [
    {
        type: 'input',
        
        name: 'acknowledgementText',
        message: 'Please insert text for who you want to acknowledge regarding this project',
    },
]


const firstQuestionsArray = [
    {
        type: 'checkbox',
        name: 'contents',
        message: 'Choose which Header to include in the README.md files',
        choices: [
            {name: `title`},
            {name: `overview`},
            {name: 'version_history'},
            {name: 'installation'},
            {name: 'how_it_work'},
            {name: 'screenshoots'},
            {name: 'links'},
            {name: 'contributing'},
            {name: 'feedback'},
            {name: 'license'},
            {name: 'acknowledgement'},
        ]
    },
]
// creating variable for questions to run by inquirer

// creating function to run the inquirer.prompt and insert questions based on user choice
function firstPrompt(){
    return inquirer.prompt(firstQuestionsArray);
}

function secondPrompt(contents2){
    return inquirer.prompt(contents2);
}

// create a function that evaluates the user choices of section/header to include in the README file
// and return the matching questions based on user choice
function evaluateFirstPrompt (contents){
    const secondQuestionsArray = [];
    for (let element of contents){
        element = eval(element);
        secondQuestionsArray.push(...element)
    }
    return secondQuestionsArray;
}


// function to generate the content of the README file
const generateReadMeFile = (inputs) => 
`# ${inputs.titleHeader || ""}

## Overview

${inputs.overviewContent || ""}

## Version History

* **${inputs.versionHistory || ""}
    ${inputs.versionHistoryParagraph || ""}


## Installation Methods

* ${inputs.installationStepOne || ""}

* ${inputs.installationStepTwo || ""}

* ${inputs.installationStepThree || ""}

* ${inputs.installationStepFour || ""}

* ${inputs.installationStepFive || ""}

## How It Works

1. ${inputs.howItWorkStepOne || ""}

2. ${inputs.howItWorkStepTwo || ""}

3. ${inputs.howItWorkStepThree || ""}

4. ${inputs.howItWorkStepFour || ""}

5. ${inputs.howItWorkStepFive || ""}

## Screenshoots

1. ${inputs.screenshootOneTitle || ""}

![${inputs.screenshootOneTitle || ""}](${inputs.screenshootOneURL || ""})

2. ${inputs.screenshootTwoTitle || ""}

![${inputs.screenshootTwoTitle || ""}](${inputs.screenshootTwoURL || ""})

3. ${inputs.screenshootThreeTitle || ""}

![${inputs.screenshootThreeTitle || ""}](${inputs.screenshootThreeURL || ""})

## Links

* [${inputs.titleHeader || ""} Web Page](${inputs.deployedWebURL})

* [${inputs.titleHeader || ""} GitHub Source Code](${inputs.githubURL})

## Contributing

${inputs.contributingText}

## Feedback

${inputs.feedbackText}

## License

License under the ${inputs.licenseUsed} license

## Acknowledgement

${inputs.acknowledgementText}
`;

// Run the script
firstPrompt()
.then(({contents}) => Promise.resolve(evaluateFirstPrompt(contents)))
.then((contents2) => secondPrompt(contents2))
.then((inputs) => writeFileAsync('README.md', generateReadMeFile(inputs)))
.then(() => console.log("Successfully created README file"))
.catch((err) => console.error(err))