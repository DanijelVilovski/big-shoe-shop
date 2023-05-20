import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './AdminProducts.css'
import { TiDeleteOutline } from "react-icons/ti"
import { FiEdit3 } from "react-icons/fi"
import { priceFormat } from '../../../components/common/priceFormat'
import EditProduct from './EditProduct';
import { Link } from 'react-router-dom';


export default function AdminProducts() {

    const [products, setProducts] = useState()

    useEffect(() => {
        GetProducts();
    }, [])

    function GetProducts() {
        axios.get('https://localhost:7079/Product?PageSize=20&Page=1')
            .then(response => {
            setProducts(response.data.data);
            })
            .catch(err => {
            console.log(err)
            })
    }

    const editProduct = (product) => {
        return <EditProduct product={product} />
    }

    return (
        <div className="admin_products_container">
            <div className="row">
                <p className="col-sm-1">Id</p>
                <p className="col-sm-2">Name</p>
                <p className="col-sm-2">Brand</p>
                <p className="col-sm-2">Description</p>
                <p className="col-sm-1">In stock</p>
                <p className="col-sm-2">Price</p>
                <p className="col-sm-2">Actions</p>
            </div>
            {products && products.map(product => {
                return (
                    <div key={product.id}>
                        <div className="row">
                            <p className="col-sm-1">{product.id}</p>
                            <p className="col-sm-2">{product.name}</p>
                            <p className="col-sm-2">{product.brand}</p>
                            <p title={product.desc} className="col-sm-2 product_desc">{product.desc}</p>
                            <p className="col-sm-1">{product.inStock}</p>
                            <p className="col-sm-2">{priceFormat(product.price)}</p>
                            <p className="col-sm-2">
                                <Link to={`/admin/products/edit/${product.id}`} state={{ product }}>
                                    <FiEdit3 className="edit_icon" />
                                </Link>
                                <TiDeleteOutline onClick={e => editProduct(product)} className="delete_icon" />
                            </p>
                            
                        </div>
                        <hr />
                    </div>
                    // <Link to={"/product/" + product.id } className="product_card_link">
                    //     <div className="new_product">
                    //         <img src="images/y3_ajatu_run.jpg" className="hot_product_img" alt="" />
                    //         {product.name.toUpperCase()}
                    //         <br></br>
                    //         {priceFormat(product.price)}
                    //     </div>
                    // </Link>
                    
                )
            })}
        </div>
    )
}