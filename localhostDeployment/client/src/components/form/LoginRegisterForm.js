import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { StyledButton, StyledTitle, StyledError } from "./StyledForm";
import { AppContext } from "../../App";

const LoginRegisterForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setAccessToken } = useContext(AppContext);

  const handleClick = async () => {
    if (props.title === "Register") {
      try {
        const response = await axios.post(
          "/register",
          {
            username,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setAccessToken(response.data.token);
          navigate("/login");
        }
      } catch (e) {
        setMessage(e.response.data.msg);
      }
    } else {
      try {
        const response = await axios.post(
          "/login",
          {
            username,
            password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data.token);
          setAccessToken(response.data.token);
          navigate(`/game`);
        }
      } catch (e) {
        setMessage(e.response.data.msg);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <StyledTitle>{props.title}</StyledTitle>
      </div>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete={"off"}>
        <TextField
          sx={{ m: 1, input: { color: "#458cf7" } }}
          variant="outlined"
          InputLabelProps={{ style: { color: "white" } }}
          id="username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          sx={{ m: 1, input: { color: "#458cf7" } }}
          variant="outlined"
          InputLabelProps={{ style: { color: "white" } }}
          id="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <StyledButton variant="contained" onClick={handleClick}>
        {props.title}
      </StyledButton>
      <div>
        <StyledError>{message}</StyledError>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
