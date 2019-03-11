json.content @message.content
json.id @message.id
json.created_at time_stamp_format(@message.created_at)
json.image @message.image.url
json.nickname @message.user.nickname
