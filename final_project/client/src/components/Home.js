import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getUserHighScore = async (user_id) => {
  try {
    const highscore = await axios.get(
      "/userhighscore",
      { params: { user_id: user_id } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return highscore.data.highscore;
  } catch (error) {
    console.log("Error", error);
  }
};

const Home = () => {
  const [token, setToken] = useState({});
  const { accessToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decoded = jwt_decode(accessToken);
      setToken(decoded);
      const expire = decoded.exp;
      const userId = decoded.userId;
      if (expire * 1000 < new Date().getTime()) navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <h1>Home</h1>
      <h4>username: {token.username}</h4>
      <h4>id: {token.userId}</h4>
      <h4>highscore:</h4>
    </div>
  );
};

export default Home;
