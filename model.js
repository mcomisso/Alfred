'use strict';

// Import library
let MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


// Connection URL
let MONGO_URL = process.env.MONGO_CONNECTION;
// Use connect method to connect to the server

var insertMessage = function (db, message, callback) {
    var collection = db.collection('messages');
    collection.insertOne(message, function (err, result) {
        assert.equal(err, null);

        callback(result);
    });

};

// FUNCTIONS

exports.saveMessage = function (msg) {
    MongoClient.connect(MONGO_URL, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");


        insertMessage(db, msg, function() {
            db.close();
        });
    });
};

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
