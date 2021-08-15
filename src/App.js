
import React, { useState, useEffect } from "react";
import Products from './components/Products';
import items from './assets/data/data';
import Categories from "./components/Categories";
const apikey = '';

const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function App() {
  const [products, setProducts] = useState(items);
  const [currency, setCurrency] = useState('INR')
  const [multiplier, setmultiplier] = useState(1);
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === 'all') {
      setProducts(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setProducts(newItems);
  };

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
    return <h2>Ugh!! Snap ☹️ . Please check your API Key and try again</h2>
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
        <Categories categories={categories} filterItems={filterItems} />
        <Products items={products} multiplier={multiplier} currency={currency} />
      </section>
    </main>
  );
}

export default App;
