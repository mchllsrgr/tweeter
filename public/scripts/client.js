// HELPER FUNCTIONS
// put individual tweet in article element
const createTweetElement = function(tweet) {
  const date = jQuery.timeago(new Date(tweet.created_at));

  const $header =
  $('<header>')
  .append($('<img>').attr('src', `${tweet.user.avatars}`))
  .append($('<h3>').text(`${tweet.user.name}`))
  .append($('<a>').addClass('handle').text(`${tweet.user.handle}`));

  const $text =
  $('<p>').addClass('tweet-text').text(`${tweet.content.text}`);

  const $footer =
  $('<footer>')
  .append($('<p>').text(`${date}`))
  .append('<p class="icons"><i class="fa fa-flag-o"></i> <i class="fa fa-retweet"></i> <i class="fa fa-heart-o"></i></p>');

  const $tweet =
  $('<article>').addClass('tweet')
  .append($header)
  .append($text)
  .append($footer);

  return $tweet;
};

// loop through array to render tweets
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#feed').prepend($tweet);
  }
};

// fetch tweets from /tweets page
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    success: function(data) {
      renderTweets(data);
    }
  });
};


// nav mobile - turn purple after scrolling past point
const changeNav = function() {
  let currentPosition = $(document).scrollTop();
  if ($(window).width() < 1024) {
    if (currentPosition > 350) {
      $('nav').css('background-color', '#4056A1');
    } else {
      $('nav').css('background-color', 'transparent');
    }
  } else {
    $('nav').css('background-color', '#4056A1');
  }
};


$(document).ready(function() {
  changeNav();
  loadTweets();
  $('.error').slideUp();

  // composing a new tweet
  $(function() {
    $('.new-tweet form').submit(function(event) {
      const $text = $('#new').val();
      event.preventDefault();
      $('.error').slideUp();

      if ($text === '') {
        $('#empty').slideDown();
      } else if ($text.length > 140) {
        $('#long').slideDown();
      } else {
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize()
        })
        .then(loadTweets);
        $('#new').val('');
      }
    });
  });

  // toggle nav - compose
  $('#compose').click(function() {
    $('section.new-tweet').slideToggle('show');
    $('section.new-tweet textarea').focus();
  });

  // nav mobile - detect on scroll and on resize
  $(document).scroll(function() {
    changeNav();
  });

  $(window).resize(function() {
    changeNav();
  });

});