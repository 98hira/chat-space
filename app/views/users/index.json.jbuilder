json.array! @users do |user|
  json.nickname user.nickname
  json.id user.id
end
