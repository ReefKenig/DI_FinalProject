import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { StyledBoard } from "./StyledBoard";

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
    <StyledBoard>
      <h1>Leaderboard</h1>
      {!highscores ? (
        <h3>No highscores to display...</h3>
      ) : (
        <div>
          {highscores.map((element, index) => {
            return (
              <div key={index} className="row">
                <h3 className={`rank${index + 1}`}>{`#${index + 1}`}</h3>
                <h3 className="user">{`${element.username}: ${element.highscore}`}</h3>
              </div>
            );
          })}
        </div>
      )}
    </StyledBoard>
  );
};

export default Leaderboard;
