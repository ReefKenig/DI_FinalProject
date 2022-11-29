import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOES } from "../tetrominoes";

const Cell = ({ type }) => {
  return <StyledCell type={type} color={TETROMINOES[type].color} />;
};

export default React.memo(Cell);
