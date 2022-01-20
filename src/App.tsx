import React, { useState } from "react";
import "./App.less";
import Footer from "./components/Footer";
import { Routes } from "./routes";

function App() {
  return (
    <div className="App" style={{    minHeight: '100vh', justifyContent: 'space-between'}}>
      <div className="AppContainer">
        <Routes />
        
      </div>
      <Footer/>
    </div>
  );
}

export default App;
