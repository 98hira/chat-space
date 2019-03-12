json.id @message.id
json.nickname @message.user.nickname
json.created_at time_stamp_format(@message.created_at)
json.content @message.content
json.image @message.image.url
