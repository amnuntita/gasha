import React, { useState, useEffect } from "react";
import { Row,Image } from "react-bootstrap";

const GashaList = (props) => {
  const [dict, setDict] = useState({});
  const [isOpen, setOpen] = useState(false);
  const levels = ["R", "SR", "SSR"];

  let FontAwesome = require("react-fontawesome");

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
                {Object.keys(dict[l]).map(
                  (f) => {
                    return(
                    <p style={{marginRight:2}}>
                      <Image className="icon" src={"/assets/images/"+f.toLowerCase()+".png"}/> 
                     {dict[l][f]}
                    </p>
                    )
                  }
                )}
              </Row>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div style={{ marginLeft: "1em" }}>
      <Row>
        <h5>Items you've collected</h5>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FontAwesome
          className="fa-chevron-circle-down mt-1"
          size="lg"
          name="toggle"
          onClick={() => setOpen(!isOpen)}
          style={{ color: "#1ABC9C " }}
        />
      </Row>
      <br />
      {isOpen ? byLevel() : <p></p>}
    </div>
  );
};

export default GashaList;
