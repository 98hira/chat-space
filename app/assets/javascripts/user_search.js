$(function() {
  let pre_input = ""

  //userを検索結果に加える
  function appendSearchUserResult(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.nickname}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-nickname="${user.nickname}">追加</a>
                </div>`;
    $('.user-search-result').append(html);
  }

  //userを検索結果として表示するかを判定する
  function judgeSearchUserResult(users) {
    //チャットメンバーに追加された名前一覧取得する
    let menber_names = $('.chat-group-user__name').map(function(index, elem){return $(elem).text();}).get();

    users.forEach(function(user) {
      // チャットメンバーに追加されていないユーザーだけを検索結果に加える
      if ($.inArray(user.nickname, menber_names) < 0) {
        appendSearchUserResult(user);
      }
    });
  }

  $(document).on('turbolinks:load', function(){
    $('#user-search-field').on('keyup', function(event) {
      event.preventDefault();
      let input = $(this).val();
      if ((input.length > 0) && (pre_input != input)) {
        pre_input = input;
        $.ajax({
          url: '/users',
          type: 'GET',
          dataType: 'json',
          data: {keyword: input},
        })
        .done(function(users) {
          $('.user-search-result').empty();
          if (users.length > 0) {
            judgeSearchUserResult(users);
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
