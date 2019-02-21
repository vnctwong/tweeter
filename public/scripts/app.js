$(document).ready(function () {

  const data = [{
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets(tweetArray) {
    // loops through tweets
    for (let i = 0; i < tweetArray.length; i++) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweetArray[i]);
      // takes return value and appends it to the tweets container
      $('.tweet-list').append($tweet)
    }
  }

  function createTweetElement(data) {
    let $tweet = $('<article>').addClass('tweet-container');

    //define <h>avatar, fullname, username, tweet-submitted, <f>days-submitted
    let avatar = data.user.avatars.small;
    let fullname = data.user.name;
    let username = data.user.handle;
    let tweetSubmitted = data.content.text
    let daysSubmitted = data.created_at

    //formart article you want to send out
    $('<header>').addClass('tweet-container-header').appendTo($tweet);
    $('<img>', {
      id: 'image',
      src: avatar,
    }).addClass('avatar').appendTo($tweet.children('header'));
    $('<span>').addClass('fullName').text(fullname).appendTo($tweet.children('header'));
    $('<span>').addClass('username').text(username).appendTo($tweet.children('header'));
    $('<div>').addClass('tweet-submitted').text(tweetSubmitted).appendTo($tweet);
    $('<footer>').addClass('tweet-container-footer').appendTo($tweet);
    $('<span>').addClass('days-submitted').text(daysSubmitted).appendTo($tweet.children('footer'));
    console.log($tweet);
    return $tweet;
  }

  renderTweets(data)
});