$(function() {
  let pre_input = ""

  $(document).on('turbolinks:load', function(){
    $('#user-search-field').on('keyup', function(event) {
      event.preventDefault();
      var input = $(this).val();
      if ((input.length > 0) && (pre_input != input)) {
        pre_input = input;
        console.log(input);
        $.ajax({
          url: '/users',
          type: 'GET',
          dataType: 'json',
          data: {keyword: input},
        })
        .done(function(users) {
          $('.user-search-result').empty();
          if (users.length >= 0) {
            users.forEach(function(user) {
              console.log(user);
            });
          } else {
            console.log("該当ユーザーなし");
          }
        })
        .fail(function() {
          console.log("ユーザ検索に失敗しました");
        })
        .always(function() {
        });
      }
    });
  });
});
