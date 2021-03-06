$(function() {
  let message_update_time = -1;

  function buildMessageHTML(message) {
    add_image = (message.image) ? `<p class='main-messages__message__image'><img src="${message.image}"></p>` : '';
    html = `
    <div class='main-messages__message' data-id="${message.id}" >
      <div class='main-messages__message__user-info'>
        <p class='main-messages__message__user-info__talker'>
         ${message.nickname}
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
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(send_message) {
      let html = buildMessageHTML(send_message);
      $('.main-messages').append(html);
      $('.new_message')[0].reset();
      $(".main-form__send").prop("disabled", false);
      $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight},'slow');
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });

  $(document).on('turbolinks:load', function() {
    if (message_update_time > 0) {clearInterval(message_update_time);}
    message_update_time = (location.href.match(/\/groups\/\d+\/messages/)) ? setInterval(message_update, 5000) : -1;
  });

  function message_update() {
    let lastMessageId = $('.main-messages__message').last().data('id');

    $.ajax({
      type: "GET",
      url: location.href,
      dataType: 'json',
      data: {message_id: lastMessageId},
    })
    .done(function(new_messages){
      let insertHTML = ''
      new_messages.forEach(function(message){
        insertHTML += buildMessageHTML(message);
        $('.main-messages').append(insertHTML);
      });
    })
    .fail(function(){
      alert("自動メッセージ取得に失敗しました")
    });
  }
});
