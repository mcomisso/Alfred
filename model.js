'use strict';

// Import library
let MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


// Connection URL
let MONGO_URL = process.env.MONGO_CONNECTION;
// Use connect method to connect to the server


/************************
* MESSAGES
* */

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
};

exports.createNewUserFromMsg = function (msg) {
    console.log(msg);
    const tuser = msg.from;
};



/*******************
* MOVIES
* */

exports.numberOfMovies = function() {



    return 10;
};

exports.saveMovieFromMsg = function(msg) {
    console.log(msg);

    // Get actual user object
    const user = msg.from;

};

exports.fetchRandomMovie = function (msg) {
    // Retrieve a random movie
};

exports.toggleSeenStatus = function (msg) {
    // Toggle seen status
};

exports.deleteMovieAtIndex = function (msg) {
    // Remove
};