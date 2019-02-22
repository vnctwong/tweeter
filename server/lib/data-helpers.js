"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },



    // CODE BELOW CHANGED TO USE MONGO DB
    // BUT CODE ABOVE STILL PUSHING TO TO LOCAL DB



    // Get all tweets in `db`, sorted by newest first 
    getTweets: function (callback) {

      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets); //<--is tweets the right var?
      });

    }

  };
}