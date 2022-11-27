CREATE TABLE users
(
	user_id serial NOT NULL PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar(1000) NOT NULL,
	highscore integer NOT NULL DEFAULT 0,
	created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scores
(
	user_id integer NOT NULL,
	score integer NOT NULL
);

select * from users
select * from scores

delete from users
delete from scores

insert into users(username, password) values('reef', 'rk032000');
insert into scores (user_id, score) values(1, 50);