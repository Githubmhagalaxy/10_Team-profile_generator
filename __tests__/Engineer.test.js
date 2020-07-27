var Engineer = require('../lib/Engineer');

test('Engineer with name: A, id: 1, email: a@test.com, github username: agithubusername', () => {
    let obj = new Engineer('A', 1, 'a@test.com', 'agithubusername');
    expect(obj.getName()).toBe('A');
    expect(obj.getId()).toBe(1);
    expect(obj.getEmail()).toMatch(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g);
    expect(obj.getGithub()).toBe('agithubusername');
    expect(obj.getRole()).toBe('Engineer');
});