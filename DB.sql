CREATE TABLE users
(
	user_id serial NOT NULL PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar(1000) NOT NULL,
	created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scores
(
	user_id integer REFERENCES users(user_id),
	score integer NOT NULL
);

select MAX(score) as highscore, user_id from scores group by user_id  order by highscore desc limit 3;

select * from users
select * from scores

delete from users
delete from scores

drop table scores
drop table users

insert into users(username, password) values('reef', 'rk032000');
insert into users(username, password) values('anon', '123456');
insert into users(username, password) values('aaa', '123');
insert into scores (user_id, score) values(1, 200);
insert into scores (user_id, score) values(2, 300);
insert into scores (user_id, score) values(2, 40);
insert into scores (user_id, score) values(3, 10);
insert into scores (user_id, score) values(3, 90);