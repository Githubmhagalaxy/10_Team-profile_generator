var Intern = require('../lib/Intern');


test('Intern with name: A, id: 1, email: a@test.com, school: aschool', () => {
    let obj = new Intern('A', 1, 'a@test.com', 'aschool');
    expect(obj.getName()).toBe('A');
    expect(obj.getId()).toBe(1);
    expect(obj.getEmail()).toMatch(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g);
    expect(obj.getSchool()).toBe('aschool');
    expect(obj.getRole()).toBe('Intern');
});