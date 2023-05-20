import React, { useState } from 'react'
import './Cart.css'
import { priceFormat } from '../../components/common/priceFormat'
import { TiDeleteOutline } from "react-icons/ti"

export default function ShippingMethods(props) {
    return (
        <>
            {props.shippingMethods.map(shippingMethod => {
                return (
                    <div className="form-check" key={shippingMethod.id}>
                        <label className="form-check-label" htmlFor="shipping-method-">{shippingMethod.name}</label>
                        <input className="form-check-input" type="radio" name="exampleRadios" id={`shipping-method-${shippingMethod.id}`} value="option1" />
                    </div>
                )
            })}
        </>
    )
}
