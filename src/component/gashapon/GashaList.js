import React, { useState, useEffect } from "react";
import {Row} from "react-bootstrap";

const GashaList = (props) => {
  const [dict, setDict] = useState({});
  const [isOpen, setOpen] = useState(false);
  const levels = ["R", "SR", "SSR"];

  let FontAwesome = require('react-fontawesome');

  useEffect(() => {
    setDict(props.dict);
  }, [props.dict]);

  const byLevel = () => {
    if (dict) {
      //console.log(lvl, dict[lvl])
      return (
        <div>
          {levels.map((l) => {
            return (
              <Row>
                <h5>{l}</h5>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {JSON.stringify(dict[l])}
              </Row>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div style={{marginLeft:"1em"}}>
      <Row>
        Items you've collected
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FontAwesome className="fa-chevron-circle-down mt-1" size="lg" name="toggle" onClick={()=>setOpen(!isOpen)} />
      </Row>
      <br/>
      {isOpen ? byLevel() : <p></p>}
      
    </div>
  );
};

export default GashaList;
