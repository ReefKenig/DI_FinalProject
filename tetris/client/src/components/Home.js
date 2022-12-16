import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userHighscore, setUserHighscore] = useState(0);
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
      getUserHighScore(userId);
    } catch (error) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const getUserHighScore = async (user_id) => {
    try {
      const response = await axios.get(
        "/userhighscore",
        { params: { user_id: user_id } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserHighscore(response.data.highscore);
    } catch (error) {
      console.log("Error", error);
      setUserHighscore(0);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <h4>username: {token.username}</h4>
      <h4>highscore: {userHighscore}</h4>
    </div>
  );
};

export default Home;
