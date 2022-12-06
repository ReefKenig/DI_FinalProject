// Imports
import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// Components
import Authentication from "./authentication/Authentication";
import Navbar from "./components/Navbar";
import Tetris from "./components/tetris/Tetris";
import LoginRegisterForm from "./components/LoginRegisterForm";

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState("");
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Tetris />} />
          <Route path="/login" element={<LoginRegisterForm title="Login" />} />
          {/* <Route
            path="/register"
            element={<LoginRegisterForm title="Register" />}
          />
          <Route
            path="/users"
            element={
              <Auth>
                <Users />
              </Auth>
            }
          /> */}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
