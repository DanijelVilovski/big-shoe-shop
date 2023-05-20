import React, { useState } from 'react'
import './Cart.css'
import { priceFormat } from '../../components/common/priceFormat'
import { TiDeleteOutline } from "react-icons/ti"

export default function Cart(props) {
    return (
        <>
            <div className="cart_title">Cart</div>
            <hr />
            <div className="row header">
                <div className="col-sm-2">Product</div>
                <div className="col-sm-2">Price</div>
                <div className="col-sm-2">Discount</div>
                <div className="col-sm-2">Price with discount</div>
                <div className="col-sm-1">Quantity</div>
                <div className="col-sm-1">Total</div>
                <div className="col-sm-2">Action</div>
            </div>
            {props.cartItems.map(cartItem => {
                return (
                    <div 
                    className="row body" 
                    id={`cartItem${cartItem.id}`}
                    key={cartItem.id}
                    >
                        <div className="col-sm-2">{cartItem.product.brand.name} {cartItem.product.name} <br /> Size: {cartItem.size.eu}</div>
                        <div className="col-sm-2">{priceFormat(cartItem.product.price)}</div>
                        <div className="col-sm-2">0,00%</div>
                        <div className="col-sm-2">{priceFormat(cartItem.product.price)}</div>
                        <div className="col-sm-1">{cartItem.quantity}</div>
                        <div className="col-sm-1">{priceFormat(cartItem.product.price * cartItem.quantity)}</div>
                        <div className="col-sm-2"><TiDeleteOutline onClick={e => props.handleDelete(cartItem.id)} className="delete_icon" /></div>
                    </div>
                )
            })}
            <div className="total_price_div">Total: {props.totalPrice}</div>    
        </>
    )
}
