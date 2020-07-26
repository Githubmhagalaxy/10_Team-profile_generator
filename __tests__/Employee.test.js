var Employee = require('../lib/Employee');


test('Employee with name: A, id: 1, email: a@test.com', () => {
    let obj = new Employee('A', 1, 'a@test.com');
    expect(obj.getName()).toBe('A');
    expect(obj.getId()).toBe(1);
    expect(obj.getEmail()).toMatch(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g);
    expect(obj.getRole()).toBe('Employee');
});