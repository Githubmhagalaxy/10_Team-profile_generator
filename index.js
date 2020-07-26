const inquirer = require('inquirer');
var fs = require('fs');
const generateHtml = require('./src/generateHtml');
var Manager = require('./lib/Manager.js');
var Intern = require('./lib/Intern');
var Engineer = require('./lib/Engineer');

var answers = {
    managers: [],
    engineers: [],
    interns: []
};

var ids = new Set();

(async () => {
    try {
        let managerAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "Input manager name",
            },
            {
                type: 'input',
                name: 'id',
                message: "Input manager employee ID",
                validate: input => {
                    if(ids.has(input)) {
                        return 'You need to provide a unique ID';
                    }
                    ids.add(input);
                    return true;
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "Input manager email address",
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "Input manager office number",
                validate: input => {
                    if(input.length === 10) {
                        return true;
                    }
                    return "office number must have 10 numbers";
                }
            }
        ]);
        answers.managers.push(new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber));
        await ask();
        let html = generateHtml(answers);
        writeHTMLFile(html);
    } catch (e) {
        console.error(e.message);
    }
})();

const ask = async () => {
    try {
        let data = await inquirer.prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What do you want to do?',
                choices: [
                    'Add an engineer',
                    'Add an intern',
                    'Finish team'
                ]
            },
            {
                type: 'input',
                name: 'name',
                message: 'Input name',
                when: answers => {
                    return (answers.menu !== "Finish team");
                }
            },
            {
                type: 'input',
                name: 'id',
                message: 'Input ID',
                when: answers => {
                    return (answers.menu !== "Finish team");
                },
                validate: input => {
                    if(ids.has(input)) {
                        return 'You need to provide a unique ID';
                    }
                    ids.add(input);
                    return true;
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'Input email',
                when: answers => {
                    return (answers.menu !== "Finish team");
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Input engineer github username',
                when: answers => {
                    return (answers.menu !== "Finish team" && answers.menu === "Add an engineer");
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'Input intern school',
                when: answers => {
                    return (answers.menu !== "Finish team" && answers.menu === "Add an intern");
                }
            }
        ]);
        switch (data.menu) {
            case "Add an engineer":
                answers.engineers.push(new Engineer(data.name, data.id, data.email, data.github));
                await ask();
                break;
            case "Add an intern":
                answers.interns.push(new Intern(data.name, data.id, data.email, data.school));
                await ask();
                break;
            case "Finish team":
                return;
            default:
                return;
        }
    } catch (e) {
        console.error(e.message);
    }
};

const writeHTMLFile = (data) => {
    fs.writeFile('./dist/index.html', data, err => {
        if(err) console.error(err.message);
    });
};