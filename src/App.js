import "./App.css";
import React,{useState} from "react";
import { Row,Container,Image } from "react-bootstrap";

import Gasha from "./component/gashapon/gashapon.js";

function App() {
  
  return (
    <div className="App">
      <Container>
        <h1 className="display-4">
          Fruit Gashapon🍍</h1>
         <Gasha/>
      </Container>
    </div>
  );
}

export default App;