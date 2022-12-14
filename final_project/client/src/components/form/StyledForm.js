import styled from "styled-components";

export const StyledTitle = styled.h3`
  font-family: Pixel, Arial, Helvetica, sans-serif;
  color: #458cf7;
  font-weight: normal;
`;

export const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  border-radius: 20px;
  border: none;
  color: white;
  background: #262626;
  opacity: 0.75;
  transition: 0.3s;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1.1rem;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const StyledError = styled.p`
  font-size: 1.1rem;
  color: red;
  font-family: Pixel, Arial, Helvetica, sans-serif;
`;
