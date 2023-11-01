import ReactDOM from "react-dom";
import { useState } from "react";
import "./App.css";
import { FaStar } from "react-icons/fa";

// example using props
function LastNameComponent(props) {
  return (
    <span className="lastName">{props.cValue}</span>
  );
}
// example using props names => this is posible as props is just an Object => try it in the console 
function FirstNameComponent({ cValue }) {
  return (
    <span className="firstName">{cValue}</span>
  );
}
// Rating with stars
function Star({ selected, onSelected }) {
  return (
    <FaStar
      style={selected ? { "color": "red" } : { "color": "gray" }}
      onClick={onSelected}
    ></FaStar>
  );
}
function StarRating() {
  const [selectedStars, setSelectedStars] = useState(0);
  const createArray = (length) => { return [...Array(length)] };
  return createArray(5).map((n, i) => { return <Star key={i} selected={selectedStars > i} onSelected={() => setSelectedStars(i + 1)} /> });
}

export default function App() {
  const [useStateConcept] = useState("This is the value of the initial 'name' variable using 'useState'");
  return (
    <div>
      <p>Mi name is <FirstNameComponent cValue="Andrés" /> <LastNameComponent cValue="Della Porta" /></p>
      <h3>useState Concept</h3><hr />
      <p>{useStateConcept}</p>
      <StarRating />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));