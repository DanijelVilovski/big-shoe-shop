import React, { useState } from 'react'
import './Cart.css'
import { useEffect } from 'react'
import axios from 'axios';
import { priceFormat } from '../../components/common/priceFormat'
import { TiDeleteOutline } from "react-icons/ti"
import jwtDecode from 'jwt-decode'

export default function Cart() {

    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState(true);
    const [userInfo, setUserInfo] = useState(jwtDecode(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')))
    const [deletedCount, setDeletedCount] = useState(0)
    const [orderId, setOrderId ] = useState()

    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN'))

    useEffect(() => {
        getCartItemsForUser()
    }, [])

    useEffect(() => {   
        axios.get(`https://localhost:7079/CartItem/cartItemsForOrder/${orderId}`)
            .then(response => {
            setCartItems(response.data.transferObject);
            setLoading(false);
            })
            .catch(err => {
            console.log(err)
            })
    }, [deletedCount])

    const getCartItemsForUser = () => {
        console.log(userInfo.UserId)
        axios.get(`https://localhost:7079/Order/userId/${userInfo.UserId}`)
            .then(response => {
                setOrderId(response.data.transferObject.id)
                axios.get(`https://localhost:7079/CartItem/cartItemsForOrder/${response.data.transferObject.id}`)
                    .then(response => {
                    setCartItems(response.data.transferObject);
                    setLoading(false);
                    })
                    .catch(err => {
                    console.log(err)
                    })
            })
            .catch(err => {
            console.log(err)
            })
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    const handleDelete = id => {
        console.log(token);
        const headers = { 
            Authorization : `Bearer ${token}`,
        };
        axios.delete(`https://localhost:7079/CartItem/${id}`, { headers })
        .then(response => {
            setDeletedCount(deletedCount+1)
            console.log(JSON.stringify(response))
            })
            .catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="cart_container">
            <div className="cart_title">Cart</div>
            <div className="row header">
                <div className="col-sm-2">Product</div>
                <div className="col-sm-2">Price</div>
                <div className="col-sm-2">Discount</div>
                <div className="col-sm-2">Price with discount</div>
                <div className="col-sm-1">Quantity</div>
                <div className="col-sm-1">Total</div>
                <div className="col-sm-2">Action</div>
            </div>
            {cartItems.map(cartItem => {
                            return (
                                <div 
                                className="row body" 
                                id={`cartItem${cartItem.id}`}
                                key={cartItem.id}
                                >
                                    <div className="col-sm-2">{cartItem.product.name} <br /> Size: {cartItem.size.eu}</div>
                                    <div className="col-sm-2">{priceFormat(cartItem.product.price)}</div>
                                    <div className="col-sm-2">0,00%</div>
                                    <div className="col-sm-2">{priceFormat(cartItem.product.price)}</div>
                                    <div className="col-sm-1">{cartItem.quantity}</div>
                                    <div className="col-sm-1">{priceFormat(cartItem.product.price * cartItem.quantity)}</div>
                                    <div className="col-sm-2" onClick={e => handleDelete(cartItem.id)}><TiDeleteOutline className="delete_icon" /></div>
                                </div>
                            )
                        })}
        </div>
    )
}
