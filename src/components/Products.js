import React from 'react';
import './Products.css'

const Products = ({ items, multiplier, currency }) => {
    return (
        <div className="section-center">
            {
                items.map((product) => {
                    const { id, title, img, desc, price } = product;
                    const updatedPrices = (multiplier * price).toFixed(2);
                    return (
                        <article key={id} className="product">
                            <img src={img} alt={title} className="photo" />
                            <div className="product-info">
                                <header>
                                    <h4>{title}</h4>
                                    <h4 className="price">{currency === "INR" ? "₹" : "$"}{updatedPrices}</h4>
                                </header>
                                <p className="product-text">{desc}</p>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default Products;