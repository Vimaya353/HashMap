import { HashMap } from "./hashMap.js";

const test = new HashMap(0.75);

test.set("apple","red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length(),test.capacity);

test.set("apple","green");
test.set("dog","white");
console.log(test.length(),test.capacity);

test.set("moon", "silver");
console.log(test.length(), test.capacity);

test.set("moon", "gold");
console.log(test.get("moon"));       
console.log(test.get("nothing"));   
console.log(test.has("apple"));     
console.log(test.remove("apple"));  
console.log(test.remove("apple"));  
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.length()); 