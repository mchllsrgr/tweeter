$(document).ready(function() {

  $('form textarea').keyup(function() {
    let input = $(this).val();
    let length =  140 - input.length;
    $(this).siblings('.counter').text(length);
  });

});