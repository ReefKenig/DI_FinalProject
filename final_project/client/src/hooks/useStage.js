import React, { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) => {
      return newStage.reduce((accumulator, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          accumulator.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return accumulator;
        }
        accumulator.push(row);
        return accumulator;
      }, []);
    };

    const updateStage = (prevStage) => {
      // Flush the stage
      const newStage = prevStage.map((row) => {
        return row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell));
      });

      // Draw tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[Math.floor(y + player.pos.y)][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });
      //   Check if there is a collision
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
