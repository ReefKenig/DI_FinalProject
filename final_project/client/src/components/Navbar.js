import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "../App";

const Navbar = () => {
  const location = useLocation();
  const [paths, setPaths] = useState([]);
  const { setAccessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register")
      setPaths(["game", "leaderboard", "logout"]);
    else setPaths(["login", "register"]);
  }, [location]);

  const logout = async (e) => {
    if (e.target.id !== "logout") return;
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
      <Stack spacing={2} direction="row" position="fixed">
        {paths.map((path, index) => {
          return (
            <Button
              component={Link}
              to={`/${path}`}
              key={index}
              onClick={logout}
              id={path}
            >
              {path}
            </Button>
          );
        })}
      </Stack>
    </div>
  );
};

export default Navbar;
