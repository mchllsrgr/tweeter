$(document).ready(function() {

  $('form textarea').keyup(function() {
    let input = $(this).val();
    let length =  140 - input.length;
    $(this).siblings('.counter').text(length);

    if (length < 0) {
      $(this).siblings('.counter').addClass('longTweet');
    }
    

  });

});