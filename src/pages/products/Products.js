import './Products.css';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'
import axios from 'axios';

function Products() {

  const [products, setProducts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState(false)
  const [genderFilter, setGenderFilter] = useState(false)
  const [brandFilter, setBrandFilter] = useState(false)
  const [sizeFilter, setSizeFilter] = useState(false)

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
  axios.get('https://localhost:7079/Product?PageSize=20&Page=1')
    .then(response => {
      setProducts(response.data.data);
    })
    .catch(err => {
      console.log(err)
    })

  axios.get('https://localhost:7079/Brand?PageSize=100&Page=1')
    .then(response => {
      setBrands(response.data.data);
    })
    .catch(err => {
      console.log(err)
    })

  axios.get('https://localhost:7079/Category?PageSize=100&Page=1')
    .then(response => {
      setCategories(response.data.data);
    })
    .catch(err => {
      console.log(err)
    })
    
  }, [])

  const handleCategoryFilter = () => {
    setCategoryFilter(!categoryFilter)
    setGenderFilter(false)
    setBrandFilter(false)
    setSizeFilter(false)
  }

  const handleGenderFilter = () => {
    setGenderFilter(!genderFilter)
    setCategoryFilter(false)
    setBrandFilter(false)
    setSizeFilter(false)
  }

  const handleBrandFilter = () => {
    setBrandFilter(!brandFilter)
    setGenderFilter(false)
    setCategoryFilter(false)
    setSizeFilter(false)
  }

  const handleSizeFilter = () => {
    setSizeFilter(!sizeFilter)
    setGenderFilter(false)
    setBrandFilter(false)
    setCategoryFilter(false)
  }

  return (
    <div className="products_container">
        <div className="filters_container">
          <div className="filters_group1">
            <div onClick={handleCategoryFilter}  className="filter">Category</div>
            <div onClick={handleGenderFilter} className="filter">Gender</div>
            <div onClick={handleBrandFilter} className="filter">Brand</div>
            <div onClick={handleSizeFilter} className="filter">Size</div>
          </div>
          <div className="filters_group2"> 
            <p className="filter_text">Sort by</p>
            <div className="filter">Newest</div>
          </div>
        </div>
        {categoryFilter && <div className="filter_expanded_container">
          {categories.map(category => {
              return (
              <div className="filter_expanded" key={category.id}> 
                <p className="filter_expanded_name">{category.name}</p>
                <input type="checkbox" />
              </div>)
            })}
        </div>}
        {genderFilter && <div className="filter_expanded_container">
          <div className="filter_expanded"> 
            <p className="filter_expanded_name">Male</p>
            <input type="checkbox" />
          </div>
          <div className="filter_expanded"> 
            <p className="filter_expanded_name">Female</p>
            <input type="checkbox" />
          </div>
        </div>}
        {brandFilter && <div className="filter_expanded_container">
          {brands.map(brand => {
              return (
              <div className="filter_expanded" key={brand.id}> 
                <p className="filter_expanded_name">{brand.name}</p>
                <input type="checkbox" />
              </div>)
            })}
        </div>}
        {sizeFilter && <div>
          Size
        </div>}
        <hr></hr>
        
        
        <div className="products_div">
            {products.map(product => {
              return <ProductCard key={product.id} product={product}/>
            })}
        </div>
    </div>
  );
}

export default Products;