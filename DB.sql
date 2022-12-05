-- Users table
CREATE TABLE users
(
	user_id serial PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar(1000) NOT NULL,
	created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Scores table
CREATE TABLE scores
(
	score_id serial PRIMARY KEY,
	user_id integer REFERENCES users(user_id),
	score integer NOT NULL
);

-- General SELECT queries
SELECT * FROM users;
SELECT * FROM scores;

-- General DELETE queries
DELETE FROM users;
DELETE FROM scores;

-- General DROP queries
DROP TABLE scores;
DROP TABLE users;

-- Select highest score of user ID
SELECT MAX(score)
FROM scores
WHERE user_id = <user_id>;

-- Select the top 3 highest scores
SELECT MAX(score) AS highscore, user_id
FROM scores
GROUP BY user_id
ORDER BY highscore DESC
LIMIT 3;

-- INSERT queries example
INSERT INTO users(username, password)
VALUES('reef', '123456');
INSERT INTO scores(user_id, score)
VALUES(1, 200);
INSERT INTO scores(user_id, score)
VALUES(1, 200);
INSERT INTO scores(user_id, score)
VALUES(2, 80);
INSERT INTO scores(user_id, score)
VALUES(3, 450);
INSERT INTO scores(user_id, score)
VALUES(2, 780);
INSERT INTO scores(user_id, score)
VALUES(1, 100);
INSERT INTO scores(user_id, score)
VALUES(1, 260);