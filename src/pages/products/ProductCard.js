import React from 'react'

export default function ProductCard({ product }) {
    return (
        <div className="product">
            {product.name}
            {product.size}
        </div>
    )
}
