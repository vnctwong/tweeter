$(() => {

  $('.error').hide();

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

    let fullname = data.user.name;
    let username = data.user.handle;
    let tweetSubmitted = data.content.text;
    let tweetCreateTime = new Date(data.created_at);
    let daysSubmitted = tweetCreateTime.toDateString();

    //formart article you want to send out
    $('<header>').addClass('tweet-container-header').appendTo($tweet);
    $('<img>', {
      id: 'image',
      src: data.user.avatars.small,
    }).addClass('avatar').appendTo($tweet.children('header'));

    $('<span>').addClass('full-name').text(fullname).appendTo($tweet.children('header'));
    $('<span>').addClass('user-name').text(username).appendTo($tweet.children('header'));

    $('<div>').addClass('tweet-submitted').text(tweetSubmitted).appendTo($tweet);

    $('<footer>').addClass('tweet-container-footer').appendTo($tweet);
    $('<span>').addClass('days-submitted').text(daysSubmitted).appendTo($tweet.children('footer'));
    $('<input>', {
      type: 'image',
      src: '/images/refresh.png',
      class: 'icons',
    }).appendTo($tweet.children('footer'));
    $('<input>', {
      type: 'image',
      src: '/images/heart.png',
      class: 'icons',
    }).appendTo($tweet.children('footer'));
    $('<input>', {
      type: 'image',
      src: '/images/flag.png',
      class: 'icons',
    }).appendTo($tweet.children('footer'));


    console.log($tweet);
    return $tweet;
  }

  $('.new-tweet').on('submit', (event) => {
    event.preventDefault();
    const $newTweet = $('.tweet-field').serialize();
    const $newTweetSlice = $newTweet.slice(5);

    if ($newTweetSlice.length < 140 && $newTweetSlice !== '') {
      console.log($newTweet);
      $.post('/tweets', $newTweet)
        .then(() => {
          loadTweets();

        })
        .fail((err) => {
          console.log(err);
        });

    } else if ($newTweetSlice.length > 140) {
      $('.error').text('Text length exceeds 140 characters');
      $('.error').fadeIn(500);
      $('.error').fadeOut(4000);
    } else {
      $('.error').text('Text field empty');
      $('.error').fadeIn(500);
      $('.error').fadeOut(4000);
    };

  });

  $('.compose-button').click(function () {
    $('.new-tweet').slideToggle('fast');
    $('.tweet-field').focus();
  });

  loadTweets();
});