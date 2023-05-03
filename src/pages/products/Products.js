import './Products.css';
import React, { useState, useEffect } from 'react';

function Products() {

  const [products, setProduct] = useState("")

  useEffect(() => {
  fetch('https://localhost:7079/Product?PageSize=50&Page=1')
    .then((response) => response.json())
    .then((data) => {
      setProduct(data);
    })
    .catch((err) => {
      console.log(err)
    })
}, [])

  return (
    <div className="products_container">
        {console.log("Div " + products)} 
        <div className="filters_container">
            <div className="filter">Filter 1</div>
            <div className="filter">Filter 2</div>
            <div className="filter">Filter 3</div>
            <div className="filter">Filter 4</div>
            <div className="filter">Filter 5</div>
        </div>
        <div className="products_div">
            <div className="product">1</div>
            {products.data.map((product) => {
              return <div key={product.id} className="product">
                {product.name}
                {product.size}
                </div>
            })}
        </div>
    </div>
  );
}

export default Products;