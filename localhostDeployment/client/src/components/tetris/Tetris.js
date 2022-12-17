import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AppContext } from "../../App";

//Components
import Stage from "../stage/Stage";
import Display from "../display/Display";
import StartButton from "../startButton/StartButton";

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

// Custom Hooks
import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useGameStatus } from "../../hooks/useGameStatus";
import { createStage, checkCollision } from "../../gameHelpers";

const Tetris = () => {
  const [token, setToken] = useState({});
  const { accessToken } = useContext(AppContext);
  const [userId, setUserId] = useState(0);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [userHighscore, setUserHighscore] = useState(0);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decoded = jwt_decode(accessToken);
      setToken(decoded);
      const expire = decoded.exp;
      if (expire * 1000 < new Date().getTime()) navigate("/login");
      else {
        setUserId(decoded.userId);
        getUserHighScore(decoded.userId);
      }
    } catch (error) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const movePlayer = useCallback(
    (direction) => {
      if (!checkCollision(player, stage, { x: direction < 0 ? -1 : 1, y: 0 })) {
        updatePlayerPos({ x: direction, y: 0 });
      }
    },
    [player, stage]
  );

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Change level with every 10 rows cleared
    if (rows >= (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Increase drop speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPos({ x: 0, y: 0.5, collided: false });
    else {
      if (player.pos.y < 0.5) {
        setGameOver(true);
        setDropTime(null);
        postScore(userId, score);
        if (score > userHighscore) setUserHighscore(score);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const getUserHighScore = async (user_id) => {
    try {
      const response = await axios.get(
        "/userhighscore",
        { params: { user_id: user_id } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.highscore) setUserHighscore(response.data.highscore);
    } catch (error) {
      console.log("Error", error);
      setUserHighscore(0);
    }
  };

  const postScore = async () => {
    try {
      const response = await axios.post(
        "/newscore",
        { userId, score },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) console.log("Score saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const dropPlayer = () => {
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37:
          movePlayer(-0.5);
          break;
        case 38:
          playerRotate(stage, 1);
          break;
        case 39:
          movePlayer(0.5);
          break;
        case 40:
          dropPlayer();
          break;
        default:
          break;
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          <Display text={`Username: ${token.username}`} />
          <Display text={`Highscore: ${userHighscore}`} />
          {gameOver ? (
            <Display gameOver={gameOver} text={`Game Over Score: ${score}`} />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level + 1}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
