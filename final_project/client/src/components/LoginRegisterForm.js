import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "../App";

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
        console.log("response->", response);
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
        console.log(response.data.token);
        if (response.status === 200) {
          setAccessToken(response.data.token);
          navigate("/");
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
        <h3>{props.title}</h3>
      </div>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete={"off"}>
        <TextField
          sx={{ m: 1 }}
          variant="outlined"
          id="username"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* TODO: make field password so text will be hidden */}
        <TextField
          sx={{ m: 1 }}
          variant="outlined"
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleClick}>
        {props.title}
      </Button>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
