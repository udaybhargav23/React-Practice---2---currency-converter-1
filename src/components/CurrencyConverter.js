import React, { useState, useEffect } from 'react';
import '../styles/CurrencyConverter.css';

export default function CurrencyConverter() {
   const [currency1, setCurrency1] = useState('USD');
   const [currency2, setCurrency2] = useState('INR');
   const [input1, setInput1] = useState(0);
   const [input2, setInput2] = useState(0);

   const [country, setCountry] = useState({});

   const getData = async () => {
      await fetch(
         'http://api.exchangeratesapi.io/v1/latest?access_key=078d9e5e57022ff888b806d78c4b5381&format=1'
      )
         .then((response) => response.json())
         .then((data) => {
            setCountry({ ...data.rates });
         });
   };

   function calculateCurrency1() {
      const c1 = country[currency1];
      const c2 = country[currency2];
      const res = (input1 * c2) / c1 || 0;
      setInput2(res.toFixed(2));
   }

   function calculateCurrency2() {
      const c1 = country[currency1];
      const c2 = country[currency2];
      const res = (input2 * c1) / c2 || 0;
      setInput1(res.toFixed(2));
   }

   function changeCurrency1(event) {
      setCurrency1(event.target.value);
      calculateCurrency1();
   }

   function changeCurrency2(event) {
      setCurrency2(event.target.value);
      calculateCurrency2();
   }

   function handleInput1(e) {
      setInput1(parseFloat(e.target.value) || 0);
      calculateCurrency1();
   }

   function handleInput2(e) {
      setInput2(parseFloat(e.target.value) || 0);
      calculateCurrency2();
   }

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className="main">
         <h1>Currency Converter</h1>
         <div className="row">
            <div className="row-1">
               <select value={currency1} onChange={changeCurrency1}>
                  {Object.keys(country).map(
                     (c, index) =>
                        c !== currency2 && (
                           <option key={c + index} value={c}>
                              {c}
                           </option>
                        )
                  )}
               </select>
               <input type="number" value={input1} onChange={handleInput1} />
            </div>
            <div className="row-2">
               <select value={currency2} onChange={changeCurrency2}>
                  {Object.keys(country).map(
                     (c, index) =>
                        c !== currency1 && (
                           <option key={c + index} value={c}>
                              {c}
                           </option>
                        )
                  )}
               </select>
               <input type="number" value={input2} onChange={handleInput2} />
            </div>
         </div>
      </div>
   );
}
