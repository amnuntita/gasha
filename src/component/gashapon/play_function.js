import items from "../../store/items.js";
import prob from "../../store/prob.js";

const levels = Object.keys(prob);

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

export default play;
