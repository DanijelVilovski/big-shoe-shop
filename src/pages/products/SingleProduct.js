import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'
import { priceFormat } from '../../components/common/priceFormat'

export default function SingleProduct() {
    const [isLoading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [sizes, setSizes] = useState();
    const [activeSize, setActiveSize] = useState();
    const [userInfo, setUserInfo] = useState({})

    var token = window.localStorage.getItem('LOCAL_STORAGE_TOKEN')
    const { id } = useParams();
    
    useEffect(() => {
        try {
            setUserInfo(jwtDecode(token))   
        } catch (error) {
        }
    }, [token])

    useEffect(() => {
    axios.get('https://localhost:7079/Size/productSizes?productId=' + id)
        .then(response => {
        setSizes(response.data);
        })
        .catch(err => {
        console.log(err)
        }) 

    axios.get('https://localhost:7079/Product/' + id)
        .then(response => {
        setProduct(response.data.transferObject);
        setLoading(false);
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
        if(activeSize == undefined){
            alert("Please choose size first! TOASTERTOASTERTOASTER" )
        } else {
            var cartSizeId = 0;
            sizes.forEach(size => {
                if(size.eu === activeSize)
                    cartSizeId = size.id            
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            axios.get(`https://localhost:7079/Order/userId/${userInfo.UserId}`)
            .then(response => {
                axios.post('https://localhost:7079/CartItem/addCartItem', {
                orderId: JSON.stringify(response.data.transferObject.id),
                productId: product.id,
                sizeId: cartSizeId,
                quantity: quantity,
                isDeleted: false
                }, config)
                .then(response => {
                    alert("Successfully added to cart!")
                })
                .catch(function (error) {
                    console.log(error);
                });
            })
            .catch(err => {
            console.log(err)
            }) 
        }
    }

    return (
        <div className="single_product_container">
            <div className="single_product_image_div">
                <img src="/images/y3_ajatu_run.jpg" className="single_product_image" clasalt="ddd" />
            </div>
            <div className="single_product_info">
                <div className="single_product_name">{product.brand.name} {product.name.toUpperCase()}</div>
                <div className="single_product_category">{product.category.name}</div>
                <div className="single_product_price">{priceFormat(product.price)}</div>
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
                {token ? 
                <div className="buttons">
                    <input className="input_quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                    <button className="btn add_to_cart_button" onClick={handleAddToCart}>Add to cart</button>
                </div>
                
                :
                <div className="add_to_cart_not_logged">Log in to be able to add product to cart</div>
                }
            </div>
        </div>
    );
}