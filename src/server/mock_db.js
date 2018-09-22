import uuid from 'uuid/v4';

export const users = [
    { id: 1, public_id: uuid(), name: 'user1', password_hash: 'asdfg', admin: true },
    { id: 2, public_id: uuid(), name: 'user2', password_hash: 'qwert', admin: false },
    { id: 3, public_id: uuid(), name: 'user3', password_hash: 'gfdsa', admin: false }
];

export const todos = [
    { id: 1, text: "Do a thing1", complete: true, user_id: 1 },
    { id: 2, text: "Do a thing2", complete: false, user_id: 1 },
    { id: 3, text: "Do a thing3", complete: false, user_id: 2 },
    { id: 4, text: "Do a thing4", complete: false, user_id: 2 },
    { id: 5, text: "Do a thing5", complete: false, user_id: 3 }
];
