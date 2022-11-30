-- Users table
CREATE TABLE users
(
	user_id serial NOT NULL PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar(1000) NOT NULL,
	created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Scores table
CREATE TABLE scores
(
	user_id integer REFERENCES users(user_id),
	score integer NOT NULL
);

-- General SELECT queries
SELECT * FROM users
SELECT * FROM scores

-- General DELETE queries
DELETE FROM users
DELETE FROM scores

-- General DROP queries
DROP TABLE scores
DROP TABLE users

-- Select all scores of a given user_id in descending order
SELECT score FROM scores WHERE user_id = <user_id> ORDER BY score DESC;

-- Select the top 3 highest scores
SELECT MAX(score) AS highscore, user_id FROM scores GROUP BY user_id  ORDER BY highscore DESC LIMIT 3;

-- Select highest score of a given user_id
SELECT MAX(score) FROM scores WHERE user_id = <user_id>;

-- INSERT queries example
INSERT INTO users(username, password) VALUES('reef', '123456');
INSERT INTO scores (user_id, score) VALUES(1, 200);