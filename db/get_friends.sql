select * from helo_users
where user_id != $1 and user_id in (select friend_id from helo_friends
where user_id = $1)