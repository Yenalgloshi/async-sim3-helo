SELECT first_name, last_name, profile_img FROM helo_users
WHERE user_id != ($1) AND user_id NOT IN (SELECT friend_id from helo_friends 
WHERE friend_id != ($1) OR user_id != ($1))