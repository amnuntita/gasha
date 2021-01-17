import React, { useState } from "react";
import { Row, Image,Spinner } from "react-bootstrap";

import GashaList from "./GashaList.js";

import items from "../../store/items.js";
import prob from "../../store/prob.js";
import dict from "../../store/dict.js";

const Gasha = () => {
  const [result, setResult] = useState(""); //result of gashapon (fruit+rate)
  const [working, setWorking] = useState(false); //working status to disable buttons
  const [select, setSelect] = useState(1); //play 1 time or 10 time
  const [turn, setTurn] = useState(0); //counting turns for playing 10 times
  const [isLoading, setLoad] = useState(false);

  const levels = Object.keys(prob);

  //gashapon functions - random for a level and then for a fruit
  const play = () => {
    let rand = Math.random();
    let i;
    for (i = 0; i < levels.length; i++) {
      let level = levels[i]; //random for levels
      if (rand < prob[level]) {
        return randFruit(level);
      }
      rand -= prob[level];
    }
  };

  const randFruit = (lvl) => {
    const fruits = items[lvl]; // random for fruit in a level by selecting index
    const min = 0;
    const max = fruits.length;
    const rand_index = Math.floor(Math.random() * (max - min) + min);
    return { fruit: fruits[rand_index], level: lvl };
  };

  //onClick function
  async function onClick(t) {
    setWorking(true);
    let i;
    let turn_now = 1;

    if (t === 1) {
      setSelect(1);
    } else {
      setSelect(10);
    }

    for (i = 0; i < t; i++) {
      let res = play();
      setLoad(true)
      await sleep(1500)
      .then(() => {
        setLoad(false)
        return 0
      })
      .then(() => {
        setResult(res);
        setTurn(turn_now); //counting current turn for 10 plays
        dict[res.level][res.fruit] += 1; //dict for storing number of collected fruits by type and rate
        turn_now++;
      });
      if(t === 10){
        await sleep(1000) //wait to display result before rest loading 
      }
    }
    setWorking(false);
  }
  

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const Result = () => {

    const text = result ? "You've got " + result.fruit + " ("+result.level+")": "Let's get started!"
    const src = result ? result.fruit.toLowerCase()+".png": "011-fruits.png"

    if(isLoading){
      return(<div style={{paddingTop:"23vh"}}>
         <Spinner animation="grow" size="xl" variant="warning"/>
      </div>)
    }
    else{
      return(
      <div>
      <h4>
        {text}
      </h4>
      <Image className="fruit"
        src={"/assets/images/" + src}
      />
      {select === 10 ? <p>Turn {turn} /10</p> : <p></p>}
    </div>)
    }

  };

  return (
    <div style={{ justifyContent: "center" }}>
      <div className="result">
      {Result()}
      </div>
      <Row style={{ justifyContent: "center" }}>
        <button className="myButton" onClick={() => onClick(1)} disabled={working}>
          1 time
        </button>
        <button className="myButton" onClick={() => onClick(10)} disabled={working}>
          10 times
        </button>
      </Row>
      <GashaList dict={dict} />
    </div>
  );
};

export default Gasha;