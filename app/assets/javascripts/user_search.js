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

  //検索結果のリセット
  function resetSearchUserResult() {
    $('.user-search-result').empty();
  }

  //検索結果がない場合
  function noneSearchUserResult(user) {
    let html = `<div class="chat-group-user clearfix">
                  該当ユーザーなし
                </div>`;
    $('.user-search-result').append(html);
  }

  //userを検索結果として表示するかを判定する
  function judgeSearchUserResult(users) {
    let user_apended_flag = false;
    //チャットメンバーに追加された名前一覧取得する
    let menber_names = $('.chat-group-user__name').map(function(index, elem){return $(elem).text();}).get();

    users.forEach(function(user) {
      // チャットメンバーに追加されていないユーザーだけを検索結果に加える
      if ($.inArray(user.nickname, menber_names) < 0) {
        appendSearchUserResult(user);
        user_apended_flag = true;
      }
    });
    return user_apended_flag;
  }

  //チャットメンバーに加える
  $(document).on('click', '.chat-group-user__btn--add', function() {
    let nickname = $(this).data('user-nickname');
    let id = $(this).data('user-id');
    $(this).parent().remove();
    let html = `<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${id}">
                  <input name='group[user_ids][]' type='hidden' value="${id}">
                  <p class='chat-group-user__name'>${nickname}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    $('#chat-group-users').append(html);
  });

  //チャットメンバーから除く
  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  });

  //ユーザー検索処理
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
          resetSearchUserResult();
          //検索結果に表示するユーザデータがないかを判定
          if (!((users.length > 0) ? judgeSearchUserResult(users) : false)) {
            noneSearchUserResult();
          }
        })
        .fail(function() {
          alert('ユーザ検索に失敗しました');
        });
      } else if(input.length <= 0) {
        resetSearchUserResult();
      }
    });
  });
});
