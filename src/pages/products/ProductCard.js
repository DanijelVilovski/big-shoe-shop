import React from 'react'
import './ProductCard.css';

export default function ProductCard({ product }) {
    return (
        // <div className="product">
        //     {product.name}
        //     {product.size}
        // </div>
        <div className="new_product">
            <img src="images/y3_ajatu_run.jpg" className="hot_product_img" alt=""/>
            NIKE PATIKE AIR JORDAN 3 RETRO
            28.399,00 RSD
        </div>
    )
}
