
import React, { useState, useEffect } from "react";
import Products from './components/Products';
import items from './assets/data/data';
const apikey = 'ebeae708a844d9095555d59d';

function App() {
  const [products, setProducts] = useState(items);
  const [currency, setCurrency] = useState('INR')
  const [multiplier, setmultiplier] = useState(1);
  const [error, setError] = useState(null)

  useEffect(() => {
    getCurrencyMultiplier(currency)
  }, [currency])

  const currencyChangeHandle = (e) => {
    setCurrency(e.target.value)

  }

  const getCurrencyMultiplier = async (currency) => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/INR`)
      const convertor = await response.json();
      const conversionrate = await convertor["conversion_rates"][`${currency}`]
      setmultiplier(conversionrate)
    }
    catch (e) {
      setError(e.message)
    }
  }

  if (error) {
    return <h2>Ugh!! Snap ☹️ {error} . Please check your API Key</h2>
  }
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our Products</h2>
          <div className="underline"></div>
          <select name="" id="" className="currency" onChange={currencyChangeHandle}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <Products items={products} multiplier={multiplier} currency={currency} />
      </section>
    </main>
  );
}

export default App;
