import React, { useState } from "react";
import { Row, Image, Spinner } from "react-bootstrap";

import GashaList from "./gasha_list.js";

import dict from "../../store/dict.js";
import deco from "../../store/deco.js";

import play from "./play_function.js";

const Gasha = () => {
  const [result, setResult] = useState(false); //result of gashapon (object with fruit and level attribute)
  const [working, setWorking] = useState(false); //working status to disable buttons while playing
  const [select, setSelect] = useState(false); //play 1 time or 10 time
  const [turn, setTurn] = useState(0); //counting turns for playing 10 times
  const [isLoading, setLoad] = useState(false);

  //onClick function
  async function onClick(t) {
    setWorking(true);
    let i;
    let turn_now = 1;

    for (i = 0; i < t; i++) {
      let res = play();
      setLoad(true);
      await sleep(1500)
        .then(() => {
          setLoad(false);
          return 0;
        })
        .then(() => {
          setResult(res);
          setTurn(turn_now); //counting current turn for 10 plays
          dict[res.level][res.fruit] += 1; //dict for storing number of collected fruits by type and rate
          turn_now++;
        });
      if (t === 10) {
        await sleep(1000); //wait to display result before next loading
      }
    }
    setWorking(false);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const Result = () => {


    if (isLoading) {
      return (
        <div style={{ paddingTop: "23vh" }}>
          <Spinner animation="grow" variant="warning" />
        </div>
      );
    } else {

      const fruit = result.fruit
      const level = result.level

      const text = result? "You've got " + fruit + " (" + level + ")":"Let's get started!";
      const src = result? fruit.toLowerCase() + ".png":"011-fruits.png";
      const color = result? deco[level][fruit]:"";
      const box_color_list = {"R":"#F1C40F","SR":"#CB4335","SSR":"#3498DB"}

      const box_color = box_color_list[level]
      const box = result? <div className="rate-box" style={{backgroundColor:box_color}}>{level}</div>:"";


      return (
        <div>
          <h4>{text}</h4>
          <div className="fruit-card" style={{ backgroundColor: color }}>
            <Image className="fruit" src={"/assets/images/" + src} />
            {box}
          </div>
          {select === 10 ? <p>Turn {turn} /10</p> : <p></p>}
        </div>
      );
    }
  };



  return (
    <div style={{ justifyContent: "center" }}>
      <div className="fruit-parent">{Result()}</div>
      <Row style={{ justifyContent: "center" }}>
        <button
          className="myButton"
          onClick={() => {
            onClick(1)
            setSelect(1)
          }}
          disabled={working}
        >
          1 time
        </button>
        <button
          className="myButton"
          onClick={() => {
            onClick(10)
            setSelect(10)
          }}
          disabled={working}
        >
          10 times
        </button>
      </Row>
      <GashaList dict={dict} />
    </div>
  );
};

export default Gasha;
