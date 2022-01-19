import React, { useState } from "react";
import "./App.less";
import { Routes } from "./routes";

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Routes />
      </div>
    </div>
  );
}

export default App;
