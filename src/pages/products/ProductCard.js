import './ProductCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { priceFormat } from '../../components/common/priceFormat'

export default function ProductCard({ product }) {
    
    return (
        <Link to={"/product/" + product.id } className="product_card_link">
            <div className="new_product">
                <img src={`images/${product.imageUrl}`} className="hot_product_img" alt="" />
                {product.name.toUpperCase()}
                <br></br>
                {priceFormat(product.price)}
            </div>
        </Link>
    )
}
