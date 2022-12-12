import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
  const [highscores, setHighscores] = useState();
  const [token, setToken] = useState({});
  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decoded = jwt_decode(accessToken);
      setToken(decoded);
      const expire = decoded.exp;
      if (expire * 1000 < new Date().getTime()) navigate("/login");
      else getHighScores();
    } catch (error) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const getHighScores = () => {
    fetch("/highscores")
      .then((response) => (response.status === 200 ? response.json() : null))
      .then((data) => {
        setHighscores(data.highscores);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Leaderboard</h1>
      {!highscores ? (
        <h3>No highscores to display...</h3>
      ) : (
        highscores.map((element, index) => {
          return (
            <h3 key={index}>{`#${index + 1} ${element.username}: ${
              element.highscore
            }`}</h3>
          );
        })
      )}
    </div>
  );
};

export default Leaderboard;
