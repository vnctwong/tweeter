$(() => {

  $('.error').hide();

  function loadTweets() {
    $.get('/tweets', (serverRouteResponseFnc) => {
      renderTweets(serverRouteResponseFnc);
    });
  }

  function clearTweet() {
    $(".tweet-field").val('');
    $(".counter").text(140);
  }

  $('.compose-button').click(function () {
    $('.new-tweet').slideToggle('fast');
    $('.tweet-field').focus();
  });

  function renderTweets(tweetArray) {
    $('.tweet-list').empty()
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
    let tweetCreateTime = (new Date(data.created_at)).toString().slice(16, 33);
    let secondsOld = Math.round(Math.abs((data.created_at - Date.now()) / (1000)));
    let daysSubmitted = secondsOld > 0 ? `${secondsOld} seconds ago` : `Today at ${tweetCreateTime}`;
    // make if statements for seconds > 60, minutes > 60, etc

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

    if ($newTweetSlice.length <= 140 && $newTweetSlice !== '') {
      console.log($newTweet);
      $.post('/tweets', $newTweet)
        .then(function () {
          loadTweets();
          clearTweet();
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

  loadTweets();

  if ($('tweet-list').children().length === 0) {
    const $tempTweet = {
      user: {
        name: 'Hello',
        avatars: {
          small: 'https://vanillicon.com/371d24858ca58a84f17f9dd707c77fd1_50.png'
        },
        created_at: Date.now(),
        handle: 'world'
      },
      content: {
        text: 'Would you like to compose a tweet?'
      }
    }

    renderTweets([$tempTweet]);
  }
});