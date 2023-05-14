import './ProductCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {

    let priceFormat = new Intl.NumberFormat('sr-Latn-RS', {
        style: 'currency',
        currency: 'RSD',
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2
    });

    return (
        <Link to={"/product/" + product.id } className="product_card_link">
            <div className="new_product">
                <img src="images/y3_ajatu_run.jpg" className="hot_product_img" alt="" />
                {product.name.toUpperCase()}
                <br></br>
                {priceFormat.format(product.price)}
            </div>
        </Link>
    )
}
