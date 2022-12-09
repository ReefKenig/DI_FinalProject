import React, { useState, useEffect } from "react";

const Leaderboard = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    fetch("/highscores")
      .then((response) => (response.status === 200 ? response.json() : null))
      .then((data) => {
        setHighscores(data.highscores);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(highscores);

  return (
    <div>
      <h1>Leaderboard</h1>
      {highscores.map((element, index) => {
        return (
          <h3 key={index}>{`#${index + 1} ${element.username}: ${
            element.highscore
          }`}</h3>
        );
      })}
    </div>
  );
};

export default Leaderboard;
