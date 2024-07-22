// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

let [honda, tesla] = cars;

let {speedStats : {zeroToSixty : hondaTopSpeed}} = honda;
let {speedStats : {topSpeed : teslaTopSpeed}} = tesla;

let {coloursByPopularity : [a, hondaTopColour]} = honda;
let {coloursByPopularity : [teslaTopColour]} = tesla;


ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Color</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
