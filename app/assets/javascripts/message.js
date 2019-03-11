$(function() {
  // function buildMessageHTML(message){
  //    render @messages;
  // }
  $('.new_message').on('submit', function(e) {
    // return;
    e.preventDefault();
    var formData = new FormData(this);
    console.log(formData);
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
      // buildMessageHTML(); かり
      console.log("respons data");
      console.log(data);
      // var html = buildHTML(data);
      // $('.todos').append(html);
      $('.new_message')[0].reset();
      $(".main-form__send").prop("disabled", false);
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });
});
