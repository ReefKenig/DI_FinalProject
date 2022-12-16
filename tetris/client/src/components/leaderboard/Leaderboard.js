import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { StyledBoard, StyledRank } from "./StyledBoard";

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
      <h1>
        <span style={{ color: "rgb(36, 95, 223)" }}>L</span>
        <span style={{ color: "rgb(80, 227, 230)" }}>E</span>
        <span style={{ color: "rgb(223, 217, 36)" }}>A</span>
        <span style={{ color: "rgb(227, 78, 78)" }}>D</span>
        <span style={{ color: "rgb(48, 211, 56)" }}>E</span>
        <span style={{ color: "rgb(132, 61, 198)" }}>R</span>
        <span style={{ color: "rgb(223, 173, 36)" }}>B</span>
        <span style={{ color: "rgb(36, 95, 223)" }}>O</span>
        <span style={{ color: "rgb(80, 227, 230)" }}>A</span>
        <span style={{ color: "rgb(223, 217, 36)" }}>R</span>
        <span style={{ color: "rgb(227, 78, 78)" }}>D</span>
      </h1>
      {!highscores ? (
        <h3>No highscores to display...</h3>
      ) : (
        <div>
          {highscores.map((element, index) => {
            return (
              <StyledRank key={index} className="row">
                <h3 id={`rank${index + 1}`}>{`#${index + 1}`}</h3>
                <h3 className="user">{`${element.username}: `}</h3>
                <h3 className="score">{`${element.highscore}`}</h3>
              </StyledRank>
            );
          })}
        </div>
      )}
    </StyledBoard>
  );
};

export default Leaderboard;
