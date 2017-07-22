'use strict';

const Realm = require('realm');

class Reminder {}
Reminder.schema = {
    name: 'Reminder',
    properties: {
        id: 'int',
        text: 'string',
        date: 'date',
    }
};

class User {}
User.schema = {
    name: 'User',
    properties: {
        name: 'string',
        chatId: 'int',
        reminders: {type: 'list', objectType: 'Reminder'},
    }
};


let realm = new Realm({schema: [User, Reminder]});


module.exports = realm;