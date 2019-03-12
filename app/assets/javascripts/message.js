$(function() {
  function buildMessageHTML(message) {
    let add_image = '';
    if (message.image) {
      add_image = `<p class='main-messages__message__image'><img src="${message.image}"></p>`;
    }
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
    .done(function(data) {
      let html = buildMessageHTML(data);
      $('.main-messages').append(html);
      $('.new_message')[0].reset();
      $(".main-form__send").prop("disabled", false);
      $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight},'slow');
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });


  // $(function() {
  //   setInterval(update, 5000);
  // )};
  $("body").click(function(){
    update();
  });

  function update() {
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
