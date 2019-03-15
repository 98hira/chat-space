$(function() {
  let pre_input = ""
  $(document).on('turbolinks:load', function(){
    $('#user-search-field').on('keyup', function(event) {
      event.preventDefault();
      let input = $(this).val();
      if (pre_input != input) {
        console.log(input);
        pre_input = input;
      } else {
        console.log("同じだよ");
      }
    });
  });
});
