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
}

// fetch tweets from /tweets page
const loadTweets = function() {
  $.ajax('/tweets');
};

$(document).ready(function() {
  renderTweets(data);

  $(function() {
    $('.new-tweet form').submit(function(event) {
      event.preventDefault();
      $.ajax({ 
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      });
    });
  });

});





// TEST CODE
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]