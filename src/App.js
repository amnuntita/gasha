import "./App.css";
import React, { useState } from "react";
import { Row, Container, Image } from "react-bootstrap";

import Gasha from "./component/gashapon/gashapon.js";

function App() {
  const credit = (
    <div className="credit">
      Icons made by{" "}
      <a
        href="https://www.flaticon.com/authors/smalllikeart"
        title="smalllikeart"
      >
        smalllikeart
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </div>
  );
  return (
    <div className="App">
      <Container>
        <h1 className="display-4">Fruit Gashapon🍍</h1>
        <Gasha />
      </Container>
      {credit}
    </div>
  );
}

export default App;
