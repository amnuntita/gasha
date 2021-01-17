import items from "./items.js";

const levels = ["R",'SR','SSR']

let dict = {}
function makeDict(){
    levels.forEach((l) => {
      let lvl_dict = {};
      let fruits = items[l]
      fruits.forEach(
        (f) => {
            lvl_dict[f] = 0
        }
      );
      dict[l] = lvl_dict
    });
}
makeDict();

export default dict;