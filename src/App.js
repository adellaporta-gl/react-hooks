import ReactDOM from "react-dom";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { FaStar } from "react-icons/fa";
import { useInput } from "./useInput";
import { CarContext, useCountries } from ".";

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
// useState: Start Rating
function StarRating() {
  const [selectedStars, setSelectedStars] = useState(0);
  const createArray = (length) => { return [...Array(length)] };
  return createArray(5).map((n, i) => { return <Star key={i} selected={selectedStars > i} onSelected={() => setSelectedStars(i + 1)} /> });
}
function Star({ selected, onSelected }) {
  return (
    <FaStar
      style={selected ? { "color": "red" } : { "color": "gray" }}
      onClick={onSelected}
    ></FaStar>
  );
}

// useEffect
function UserAdminComponent() {
  const [name, setName] = useState("Andrés");
  const [admin, setAdmin] = useState(false);
  useEffect(() => { document.title = "useEffect => name" }, [name]);
  useEffect(() => { document.title = "useEffect => admin" }, [admin]);
  return (
    <div>
      <p style={{ backgroundColor: "red", color: "black", padding: "2em" }}>
        Click the below buttons and check the document title to see how useEffect is reacting to these state variables changes
      </p>
      <p>`Congratulations {name}`</p>
      <button onClick={() => setName(name === "Maximiliano" ? "Andrés" : "Maximiliano")}>Change name</button>
      <button onClick={() => setAdmin(!admin)}>Change admin</button>
      <p>{admin ? "is an admin" : "is not an admin"}</p>
    </div>
  );
}
// useEffect to fetch data
function GithubUsers() {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]); // as we don't want an initial value we passed in an empty array 
  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(jsonResponse => {
        console.log("jsonResponse:", jsonResponse);
        if (jsonResponse.message) {
          setErrorMessage(jsonResponse.message);
          console.log("errorMessage: ", errorMessage)
        } else {
          setData(jsonResponse);
        }
      }).catch((reason) => {
        console.log("reason");
        console.log(reason.message);
      });
  }, []);
  if (data.length > 0) {
    return (
      <div>
        <ul>
          {data.map(user => <li key={user.id}>{user.id}</li>)}
        </ul>
      </div>
    );
  }
  return (
    <div style={{ fontSize: "2em", color: "red", fontWeight: "bold" }}>
      No users to display!
      <br />
      {errorMessage}
    </div>

  );
}

// useReducer
function reducerFunction(state, action) {
  return { counter: state.counter + action.newValue }
}
function initFunction(initialValue) {
  return { counter: initialValue }
}
function ClickToAddNumber() {
  const INITIAL_VALUE = 0;
  const NUMBER_TO_ADD = 22;
  const [number, setNumber] = useReducer((prevNumber, newNumber) => {
    console.log("prevNumber: ", prevNumber);
    console.log("newNumber: ", newNumber);
    return prevNumber + newNumber;
  }, INITIAL_VALUE);
  const numberStyle = {
    fontSize: "2em",
    padding: "2em",
    border: "2px solid black"
  };
  const [anotherNumber, setAnotherNumber] = useReducer(reducerFunction, { counter: INITIAL_VALUE });
  return (
    <div>
      <p style={numberStyle} onClick={() => setNumber(10)}>{number}</p>
      <h3>Click the following button to add {NUMBER_TO_ADD}:</h3>
      <button style={numberStyle} onClick={() => setAnotherNumber({ "newValue": NUMBER_TO_ADD })}>{anotherNumber.counter}</button>
    </div>
  );
}

// useRef for uncontrolled form componenent
function UncontrolledForm() {
  const sound = useRef("");
  const color = useRef("");
  const submitForm = (syntheticEvent) => {
    syntheticEvent.preventDefault();
    const soundValue = sound.current.value;
    const colorValue = color.current.value;
    alert(`Sound: ${soundValue} - Color ${colorValue}`);
    sound.current.value = "";
    color.current.value = "#000000";
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" ref={sound} />
        <input type="color" ref={color} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// useState for controlled form componenent
function ControlledForm() {
  const [sound, setSound] = useState("");
  const [color, setColor] = useState("#000000");
  const changeSound = (syntheticEvent) => {
    setSound(syntheticEvent.target.value);
  }
  // const changeColor = (syntheticEvent) => {
  //   setColor(syntheticEvent.target.value);
  // }
  const submitForm = (syntheticEvent) => {
    syntheticEvent.preventDefault();
    alert(`Sound ${sound} - Color ${color}`);
    setSound("");
    setColor("#000000");
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" value={sound} onChange={changeSound} />
        <input type="color" value={color} onChange={(syntheticEvent) => setColor(syntheticEvent.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// reusing logic from custom hook
function FormWithCustomHook() {
  const [soundInputProps, resetSoundInput] = useInput("");
  const [colorInputProps, resetColorInput] = useInput("#000000");
  const handleSubmit = (syntheticEvent) => {
    syntheticEvent.preventDefault();
    alert(`Sound is ${soundInputProps.value} and Color is ${colorInputProps.value}`);
    resetSoundInput();
    resetColorInput();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" {...soundInputProps} />
        <input type="color" {...colorInputProps} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// placing data in context
function PlacingCarCompaniesFromContext() {
  const carCompaniesArray = useContext(CarContext);
  return (
    <div>
      <ul>
        {carCompaniesArray.map(
          (carCompany) => <li key={carCompany.id}>{carCompany.id} - {carCompany.name} ({carCompany.country})</li>
        )}
      </ul>
    </div>
  );
}

// using custom context hook
function CountriesCustomHook() {
  const contextProvidedCountries = useCountries();
  return (
    <div>
      <ul>
        {contextProvidedCountries.map((country) => <li key={country.id}>{country.name} use {country.currency} as currency</li>)}
      </ul>
    </div>
  );
}

export default function App() {
  const [useStateConcept] = useState("This is the value of the initial 'useStateConcept' variable using 'useState'");
  return (
    <div>
      <h1>Using useState</h1>
      <p>Mi name is <FirstNameComponent cValue="Andrés" /> <LastNameComponent cValue="Della Porta" /></p>
      <p>{useStateConcept}</p>
      <hr />
      <StarRating />
      <hr />
      <h1>Using useEffect</h1>
      <p>
        useEffect: allow us to perform side effects, like printing in the console.
        By default it runs for each render or update.
        To avoid this behaviour we can pass in a dependency array as a 2nd argument in order to tell React when to call useEffect function
      </p>
      <h3>Example:</h3>
      <code>
        {'useEffect(() => { firstArg_function}, [dependencyArray] })'}
      </code>
      <p>{'this is telling React to run the function "firstArg_function" whenever some of the state variables of the "dependencyArray" is changed'}</p>
      <hr />
      <UserAdminComponent />
      <hr />
      <h3>Importance of the dependency array argument</h3>
      <p>If we don't pass in a dependency array, useEffect will be called infinite times, thus we have passed in an empty array</p>
      <GithubUsers />
      <h1>Using useReducer</h1>
      <ClickToAddNumber />
      <hr />
      <h1>Using useRef</h1>
      <h3>Uncontrolled form component</h3>
      <UncontrolledForm />
      <h3>Controlled form component</h3>
      <ControlledForm />
      <hr />
      <h1>Reusing logic with custom hook</h1>
      <FormWithCustomHook />
      <hr />
      <h1>Context data: place and retrieve car companies</h1>
      <PlacingCarCompaniesFromContext />
      <hr />
      <h1>Custom hook for context</h1>
      <CountriesCustomHook />
    </div>
  );
}