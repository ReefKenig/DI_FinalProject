// Imports
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// Components
import Authentication from "./authentication/Authentication";
import Navbar from "./components/Navbar";

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState("");
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App"></div>
    </AppContext.Provider>
  );
}

export default App;
