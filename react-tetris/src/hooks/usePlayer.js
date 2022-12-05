import { useCallback, useState } from "react";
import { randomTetromino, TETROMINOES } from "../tetrominoes";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOES[0].shape,
    collided: false,
  });

  const rotate = useCallback((matrix, direction) => {
    const rotatedShape = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    if (direction > 0) return rotatedShape.map((row) => row.reverse());
    return rotatedShape.reverse();
  }, []);

  const playerRotate = useCallback(
    (stage, direction) => {
      const clonedPlayer = { ...player };
      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction);

      const pos = clonedPlayer.pos.x;
      let offset = 1;
      while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
        clonedPlayer.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > clonedPlayer.tetromino[0].length) {
          rotate(clonedPlayer.tetromino, -direction);
          clonedPlayer.pos.x = pos;
          return;
        }
      }
      setPlayer(clonedPlayer);
    },
    [player]
  );

  const updatePlayerPos = useCallback(({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
    }));
  }, []);

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
