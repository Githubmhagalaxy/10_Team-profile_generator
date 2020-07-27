var Employee = require('./Employee.js');

class Intern extends Employee {
    school;
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return 'Intern';
    }

    getSchool() {
        return this.school;
    }
}


module.exports = Intern;