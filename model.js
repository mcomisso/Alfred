'use strict';

// Import library
const mongo = require('mongodb');

// SCHEMA DEFINITION
const ReminderSchema = {
    name: 'Reminder',
    primaryKey: 'id',
    properties: {
        id: 'int',
        chatId: 'int',
        text: 'string',
        date: 'date',
    }
};

const UserSchema = {
    name: 'User',
    primaryKey: 'chatId',
    properties: {
        chatId: 'int',
        first_name: 'string',
        last_name: 'string',
        username: 'string',
        reminders: {type: 'list', objectType: 'Reminder'},
    }
};



// FUNCTIONS

exports.listRemindersForUser = function (chatId) {
    let user = this.findUserFromChatId(chatId);

};

exports.findUserFromChatId = function (chatId) {
    // var users = realm.objects('User').filtered('chatId = ' + chatId);
    // return users[0];
};

exports.createReminder = function (chatId, message, date) {
    const user = this.findUserFromChatId(chatId);
    // try {
    //     realm.write(() => {
    //         realm.create('Reminder', {
    //             id: chatId,
    //             text: message,
    //             date: date,
    //         });
    //     });
    // } catch (e) {
    //     console.error(e.message);
    // }
};

exports.createNewUserFromMsg = function (msg) {
    console.log(msg);

    const tuser = msg.from;

    // try {
    //     realm.write(() => {
    //
    //         // Create or update user
    //         realm.create('User', {
    //             first_name: tuser.first_name,
    //             last_name: tuser.last_name,
    //             username: tuser.username,
    //             chatId: tuser.id
    //         }, true);
    //     });
    // } catch (e) {
    //     console.error(e.message);
    // }

};
