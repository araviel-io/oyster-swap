import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import "./App.less";
import Footer from "./components/Footer";
import { Routes } from "./routes";
import Image from './assets/bghaiki.svg';

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPositionY: "458px",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <div className="App" style={{ minHeight: '100vh', justifyContent: 'space-between' }}>
        <div className="AppContainer">
          <Routes />

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
