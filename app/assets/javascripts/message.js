$(function() {
  function buildMessageHTML(message) {
    var add_image = "";
    if (message.image) {
      add_image = `<p class="main-messages__message____image"><img src="${message.image}"></p>`;
    }
    html = `
    <div class='main-messages__message'>
      <div class='main-messages__message__user-info'>
        <p class='main-messages__message__user-info__talker'>
         ${message.user_name}
        </p>
        <p class='main-messages__message__user-info__date'>
         ${message.created_at}
        </p>
        <p class='main-messages__message__text'>
          ${message.content}
        </p>
      </div>
      ${add_image}
    </div>`;
    return html;
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildMessageHTML(data);
      $('.main-messages').append(html);
      $('.new_message')[0].reset();
      $(".main-form__send").prop("disabled", false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });
});
