insert into helo_users (auth0_id, profile_img ) 
values ( $1, $2 ) returning *;