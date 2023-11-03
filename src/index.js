import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


export const CarContext = createContext();
const carCompanies = [
  { id: 1, name: "Volkswagen", country: "GERMANY" },
  { id: 2, name: "BMW", country: "GERMANY" },
  { id: 3, name: "Audi", country: "GERMANY" },
  { id: 4, name: "Nissan", country: "JAPAN" },
  { id: 5, name: "Renault", country: "FRANCE" }
]
export const CountryContext = createContext();
export const useCountries = () => useContext(CountryContext);
const countries = [
  { id: 1, name: "Argentina", currency: "ARS" },
  { id: 2, name: "Germany", currency: "EUR" },
  { id: 3, name: "United States", currency: "USD" }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <CountryContext.Provider value={countries}>
    <CarContext.Provider value={carCompanies}>
      <App />
    </CarContext.Provider>
  </CountryContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
