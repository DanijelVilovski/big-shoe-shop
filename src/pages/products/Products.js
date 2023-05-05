import './Products.css';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'

function Products() {

  const [products, setProduct] = useState([])

  useEffect(() => {
  fetch('https://localhost:7079/Product?PageSize=10&Page=1')
    .then((response) => response.json())
    .then((data) => {
      setProduct(data.data);
    })
    .catch((err) => {
      console.log(err)
    })
    
  }, [])

  return (
    <div className="products_container">
        <div className="filters_container">
            <div className="filter">Filter 1</div>
            <div className="filter">Filter 2</div>
            <div className="filter">Filter 3</div>
            <div className="filter">Filter 4</div>
            <div className="filter">Filter 5</div>
        </div>
        
        <div className="products_div">
            {products.map((product) => {
              return <ProductCard key={product.id} product={product}/>
            })}
        </div>
    </div>
  );
}

export default Products;