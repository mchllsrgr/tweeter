// HELPER FUNCTIONS
// put individual tweet in article element
const createTweetElement = function(tweet) {
  const date = jQuery.timeago(new Date(tweet.created_at));
  const markup = `
  <article class="tweet">
    <header>
      <img src="${tweet.user.avatars}">
      <h3>${tweet.user.name}</h3>
      <a class="handle">${tweet.user.handle}</a>
    </header>
    <p class="tweet-text">${tweet.content.text}</p>
    <footer>
      <p>${date}</p>
      <p class="icons">Icons</p>
    </footer>
  </article>
  `;
  return markup;
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


$(document).ready(function() {
  loadTweets();

  $(function() {
    $('.new-tweet form').submit(function(event) {
      const $text = $('#new');
      event.preventDefault();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      })
      .then(loadTweets());
      $text.val('').focus();
    });
  });

});