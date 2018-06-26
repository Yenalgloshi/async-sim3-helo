insert into helo_users (auth0_id ) 
values ( $1 ) returning *;