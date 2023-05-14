import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'


export default function SingleProduct() {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    const [sizes, setSizes] = useState();
    const [activeSize, setActiveSize] = useState();
    const [userInfo, setUserInfo] = useState({})

    var token = window.localStorage.getItem('LOCAL_STORAGE_TOKEN')
    const { id } = useParams();
    
    let priceFormat = new Intl.NumberFormat('sr-Latn-RS', {
        style: 'currency',
        currency: 'RSD',
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2
    });

    useEffect(() => {
        try {
            setUserInfo(jwtDecode(token))   
        } catch (error) {
        }
    }, [token])

    useEffect(() => {
    axios.get('https://localhost:7079/productSizes?productId=' + id)
        .then(response => {
        setSizes(response.data);
        console.log(response.data);
        })
        .catch(err => {
        console.log(err)
        }) 

    axios.get('https://localhost:7079/Product/' + id)
        .then(response => {
        setProduct(response.data.transferObject);
        setLoading(false);
        console.log(response.data);
        })
        .catch(err => {
        console.log(err)
        })   
    }, [])

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    

    const setActive = size => {
        var all_sizes = document.getElementsByClassName('size');
        for (var i = 0; i < all_sizes.length; ++i) {
            all_sizes[i].classList.remove('active')
            document.getElementById(`size${size}`).classList.add('active');    
        }

        setActiveSize(size)
    }

    const handleAddToCart = () => {
       console.log(activeSize)
       console.log(product) 
    }

    return (
        <div className="single_product_container">
            <div className="single_product_image_div">
                <img src="/images/y3_ajatu_run.jpg" className="single_product_image" clasalt="ddd" />
            </div>
            <div className="single_product_info">
                <div className="single_product_name">{product.brand.name} {product.name.toUpperCase()}</div>
                <div className="single_product_category">{product.category.name}</div>
                <div className="single_product_price">{priceFormat.format(product.price)}</div>
                <div className="single_product_sizes">
                    <div className="choose">Choose size: <b>{activeSize}</b></div>
                    <div className="d-flex sizes">
                        {sizes.map(size => {
                            return (
                                <div 
                                className="size" 
                                id={`size${size.eu}`}
                                key={size.id}
                                title={`Size EU: ${size.eu} Size UK: ${size.uk} Size US: ${size.us} Size in cm: ${size.cm}`}
                                onClick={() => setActive(size.eu)}
                                >
                                    {size.eu} {size.cm}
                                
                                </div>
                            )
                        })}
                    </div>
                </div>
                {token ? <button className="btn add_to_cart_button" onClick={handleAddToCart}>
                    Add to cart
                </button>
                :
                <div className="add_to_cart_not_logged">Log in to be able to add product to cart</div>
                }
            </div>
        </div>
    );
}