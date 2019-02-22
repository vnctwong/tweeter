$(() => {

  function loadTweets() {
    $.get('/tweets', (serverRouteResponseFnc) => {
      renderTweets(serverRouteResponseFnc);
    });
  }

  function renderTweets(tweetArray) {
    // loops through tweets
    for (var e = 0; e < tweetArray.length; e++) {
      // calls createTweetElement
      // for each tweet
      let $tweet = createTweetElement(tweetArray[e]);
      // takes return value and appends it to the tweets container
      $('.tweet-list').prepend($tweet)
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
    $('<span>').addClass('full-name').text(fullname).appendTo($tweet.children('header'));
    $('<span>').addClass('user-name').text(username).appendTo($tweet.children('header'));
    $('<div>').addClass('tweet-submitted').text(tweetSubmitted).appendTo($tweet);
    $('<footer>').addClass('tweet-container-footer').appendTo($tweet);
    $('<span>').addClass('days-submitted').text(daysSubmitted).appendTo($tweet.children('footer'));
    console.log($tweet);
    return $tweet;
  }

  //location of submit
  $('.new-tweet').on('submit', (event) => {
    //overides normal route
    event.preventDefault();
    //define data reload object, serialize?
    const $newTweet = $('.tweet-field').serialize();
    //on 'success?' ajax reqs data + callback
    console.log($newTweet)
    const $newTweetSlice = $newTweet.slice(5);

    if ($newTweetSlice.length < 140 && $newTweetSlice !== '') {
      $.post('/tweets', $newTweet)
        .then(() => {
          loadTweets();

        })
        .fail((err) => {
          console.log(err);
        });

    } else if ($newTweetSlice.length > 140) {
      alert('Text length exceeds 140 characters');

    } else if (!$newTweetSlice) {
      alert('Text field empty');
    }

  });

  $('.compose-button').click(function () {
    $('.new-tweet').slideToggle('fast');
    $('.tweet-field').focus();
  });

  loadTweets();
});