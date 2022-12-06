import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "../App";

const Navbar = () => {
  const { setAccessToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.delete(
        "/logout",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("logout=>", response);
      if (response.status === 200 || response.status === 204) {
        setAccessToken(null);
        navigate("/login");
      }
    } catch (error) {
      console.log("An error occured...\n", error);
      navigate("/login");
    }
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button component={Link} to={"/login"}>
          Login
        </Button>
        <Button component={Link} to={"/register"}>
          Register
        </Button>
        <Button component={Link} to={"/account"}>
          Account
        </Button>
        <Button component={Link} to={"/"}>
          Tetris
        </Button>
        <Button component={Link} to={"/leaderboard"}>
          Leaderboard
        </Button>
        <Button onClick={logout}>Logout</Button>
      </Stack>
    </div>
  );
};

export default Navbar;
