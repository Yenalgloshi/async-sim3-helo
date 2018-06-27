update helo_users
set first_name = $2,
last_name = $3,
gender  = $4,
hair_color = $5,
eye_color  = $6,
hobby = $7,
birth_day = $8,
birth_month = $9,
birth_year = $10
where user_id = $1
returning *;