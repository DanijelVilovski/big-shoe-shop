import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './AdminProducts.css'
import { TiDeleteOutline } from "react-icons/ti"
import { FiEdit3 } from "react-icons/fi"
import { IoIosAddCircleOutline } from "react-icons/io"
import { priceFormat } from '../../../components/common/priceFormat'
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

    const deleteProduct = id => {
        axios.delete(`https://localhost:7079/Product/${id}`)
            .then(response => {
                window.location.reload();
                return alert(response.data.message)
            })
            .catch(err => {
                return alert(err.message)
            })
        
    }

    return (
        <div className="admin_products_container">
            <h3 className="manage-products-title">Manage Products</h3>
            <div className="d-flex justify-content-end">
                <Link to={`/admin/products/add`}>
                    <button className="btn btn-primary manage-products-add-btn">
                        <IoIosAddCircleOutline className="add_icon" /> Add new product
                    </button>
                </Link>
            </div>
            <div className="row">
                <p className="col-sm-1">Id</p>
                <p className="col-sm-2">Brand</p>
                <p className="col-sm-2">Name</p>
                <p className="col-sm-4">Description</p>
                <p className="col-sm-2">Price</p>
                <p className="col-sm-1">Actions</p>
            </div>
            {products && products.map(product => {
                return (
                    <div key={product.id}>
                        <div className="row">
                            <p className="col-sm-1">{product.id}</p>
                            <p className="col-sm-2">{product.brand.name}</p>
                            <p className="col-sm-2">{product.name}</p>
                            <p title={product.desc} className="col-sm-4 product_desc">{product.desc}</p>
                            <p className="col-sm-2">{priceFormat(product.price)}</p>
                            <p className="col-sm-1">
                                <Link to={`/admin/products/edit/${product.id}`} state={{ product }}>
                                    <FiEdit3 className="edit_icon" />
                                </Link>
                                <TiDeleteOutline onClick={e => deleteProduct(product.id)} className="delete_icon" />
                            </p>
                            
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}