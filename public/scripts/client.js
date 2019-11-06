const createTweetElement = function(obj) {
  const date = new Date(obj.created_at * 1000);
  const markup = `
  <article class="tweet">
    <header>
      <img src="${obj.user.avatars}">
      <h3>${obj.user.name}</h3>
      <a class="handle">${obj.user.handle}</a>
    </header>
    <p class="tweet-text">${obj.content.text}</p>
    <footer>
      <p>${date}</p>
      <p class="icons">Icons</p>
    </footer>
  </article>
  `;
  return markup;
};

$(document).ready(function() {
  const newTweet = $('<article>').addClass('tweet');
});

// TEST CODE
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); 