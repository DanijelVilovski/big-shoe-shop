import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './EditProduct.css'
import axios from 'axios';

export default function EditProduct(props) {
    
    const [product, setProduct] = useState();
    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();

    const [price, setPrice] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [brand, setBrand] = useState();


    const { id } = useParams();

    useEffect(() => {
        GetProduct();
        GetBrands();
        GetCategories();
    }, [])

    function GetProduct() {
        axios.get('http://localhost:7079/Product/' + id)
            .then(response => {
            setProduct(response.data.transferObject);
            setProduct(response.data.transferObject);
            setName(response.data.transferObject.name);
            setPrice(response.data.transferObject.price);
            setDescription(response.data.transferObject.desc);
            })
            .catch(err => {
            console.log(err)
            }) 
    }

    function GetBrands() {
        axios.get('http://localhost:7079/Brand?PageSize=1000&Page=1')
        .then(response => {
            setBrands(response.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function GetCategories() {
        axios.get('http://localhost:7079/Category?PageSize=1000&Page=1')
            .then(response => {
                setCategories(response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault() 

        var brand = document.getElementById('select-brand-id').value
        var category = document.getElementById('select-category-id').value
        var brandId;
        var categoryId;

        brands.forEach(br => {
            if(br.name === brand) {
                brandId = br.id
            }
        });

        categories.forEach(cat => {
            if(cat.name === category) {
                categoryId = cat.id
            }
        });

        var imageUrl;

        if(selectedImage != null) {
            imageUrl = selectedImage.name
        } else {
            imageUrl = product.imageUrl
        }

        const dataIn = {
            "id": id,
            "categoryId": categoryId,
            "brandId": brandId,
            "name": name,
            "desc": description,
            "price": price,
            "imageUrl": imageUrl
        }
        axios
        .put('http://localhost:7079/Product/editProduct/' + id, dataIn)
        .then(response => {
            console.log(response)
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    }

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="editProduct_container">
            <h3>Edit Product</h3>
            {product && categories && brands ? (
            <div className="card">
                <div className="card-body d-flex">
                    <div className="product-edit-image"> 
                        <input
                            className="form-control"
                            type="file"
                            name="myImage"
                            id="image_input"
                            onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                            }}
                        />
                        <div className="d-flex m-3">
                            <p>New product's image: </p>
                            {selectedImage && (
                                <div>
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <button onClick={() => {
                                    setSelectedImage(null)
                                    document.getElementById('image_input').value = null
                                }} className="btn btn-primary">Remove</button>
                                </div>
                            )}
                        </div>

                        <div className="d-flex m-3">
                            <p>Old product's image: </p>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={`/images/${product.imageUrl}`}
                            />
                        </div>

                    </div>
                    <div className="product-edit-info"> 
                        <form onSubmit={handleSubmit}>
                            <div className="input_row">
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Product name</label>
                                    <input type="text" className="form-control" value={name} id="expMonth-input" onChange={e => setName(e.target.value)} required/>
                                </div>
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Price</label>
                                    <input type="text" className="form-control" value={price} id="expYear-input" onChange={e => setPrice(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="input_row">
                                <div className="form-group input_row_item desc-input">
                                    <label htmlFor="name">Description</label>
                                    <textarea 
                                        id="description-textarea" 
                                        className="form-control" 
                                        value={description}  
                                        rows="7" 
                                        cols="50"
                                        onChange={e => setDescription(e.target.value)}
                                     />
                                </div>
                            </div>

                            <div className="input_row">
                                <div className="form-group select-input">
                                    <label htmlFor="name">Brand</label>
                                    <select className="form-control" id="select-brand-id">
                                        <option>{product.brand.name}</option>
                                        {brands.map(brand => {
                                            return (
                                                <option 
                                                    key={brand.id} 
                                                    value={brand.name} 
                                                    id={brand.id}
                                                >
                                                    {brand.name} 
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group select-input">
                                    <label htmlFor="name">Category</label>
                                    <select className="form-control" id="select-category-id">
                                        <option>{product.category.name}</option>
                                        {categories.map(category => {
                                            return (
                                                <option 
                                                    key={category.id} 
                                                    value={category.name}
                                                    id={category.id}
                                                >
                                                    {category.name} 
                                                </option>
                                            )
                                        })}
                                        
                                    </select>
                                </div>
                            </div>
                            {/* <p>{product.id}</p>
                            <p>{product.name}</p>
                            <p>{product.brand.name}</p>
                            <p>{product.name}</p>
                            <p>{product.name}</p> */}
                            <button className="edit_product_form_button btn btn-danger" type="submit">Update product</button>

                        </form>

                    </div>
                </div>
            </div>
            ) : (
            <p>No product available</p>
            )}
        </div>
    )
}