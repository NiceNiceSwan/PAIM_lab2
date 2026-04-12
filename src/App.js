import logo from './logo.svg';
import './App.css';
import React from "react";
import {render} from "react-dom";

import {GitHubUser} from "./components/GitHubUser";

function App() {
  return (
    <div>
      <GitHubUser login="mdsumner"/>
    </div>
  );
}

export default App;



