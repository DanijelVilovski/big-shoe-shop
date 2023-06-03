import React, { useState } from 'react'
import './Cart.css'
import { priceFormat } from '../../components/common/priceFormat'
import { TiDeleteOutline } from "react-icons/ti"

export default function ShippingMethods(props) {
    return (
        <>
            <label></label>
            <select className="form-control" id="select-shippingmethod-id">
                <option disabled>-Select shipping method-</option>
                {props.shippingMethods.map(shippingMethod => {
                    return (
                        <option 
                            key={shippingMethod.id} 
                            value={shippingMethod.id} 
                            id={shippingMethod.id}
                        >
                            {shippingMethod.name} 
                        </option>
                    )
                })}
            </select>
        </>
    )
}
