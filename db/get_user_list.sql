select user_id, first_name, last_name, profile_img from helo_users 
where user_id != $1
-- limit 12 offset 0;