$(document).ready(function () {

  $('.tweet-field').on('keyup', function (event) {
    event.preventDefault();
    //change you want to see on event .on #ID
    //use jQuery to change the plain node to $
    const $count = $(this).siblings('.counter');
    //use jq function .val() for value
    $count.text(140 - $(this).val().length);
    //this should be the length of text in field

    if ($count.text() < 0) {
      $count.css('color', 'red');
    };
  });
});


/*
change event
keydown event
keyup event
blur event
keypress event
input event*/