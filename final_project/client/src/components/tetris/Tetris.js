import React, { useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const params = useParams();

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
      console.log("increase level");
      setLevel((prev) => prev + 1);
      // Increase drop speed
      console.log(`new drop speed: ${1000 / (level + 2) + 200}`);
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPos({ x: 0, y: 0.5, collided: false });
    else {
      if (player.pos.y < 0.5) {
        console.log("game over");
        setGameOver(true);
        setDropTime(null);
        postScore(params.userId, score);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const postScore = async (user_id, score) => {
    try {
      await axios.post(
        "/newscore",
        { user_id, score },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
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
