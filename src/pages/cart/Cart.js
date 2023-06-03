import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Cart.css'
import { priceFormat } from '../../components/common/priceFormat'
import jwtDecode from 'jwt-decode'
import CartTable from './CartTable';
import ShippingMethods from './ShippingMethods';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PaymentElement} from '@stripe/react-stripe-js';

export default function Cart() {

    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState(true);
    const [userInfo, setUserInfo] = useState(jwtDecode(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')))
    const [deletedCount, setDeletedCount] = useState(0)
    const [shippingMethods, setShippingMethods] = useState([])
    const [orderId, setOrderId ] = useState()
    const [order, setOrder ] = useState()
    const [userAddress, setUserAddress] = useState()
    const [user, setUser] = useState()

    const [name, setName ] = useState()
    const [surname, setSurname ] = useState()
    const [email, setEmail ] = useState()
    const [phoneNumber, setPhoneNumber ] = useState()
    const [city, setCity ] = useState()
    const [country, setCountry ] = useState()
    const [address, setAddress ] = useState()
    const [addressNumber, setAddressNumber ] = useState()
    const [postalCode, setPostalCode ] = useState()

    const [cardNumber, setCardNumber] = useState()
    const [cvc, setCvc] = useState()
    const [expMonth, setExpMonth] = useState()
    const [expYear, setExpYear] = useState()

    var totalPrice = 0
    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN'))
    const headers = { 
        Authorization : `Bearer ${token}`,
        
    };

    const successfully_added = () => {
        toast.success('Order successfully created!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    }

    const quantity_error = (message) => {
        toast.error(message, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    }

    useEffect(() => {
        getShippingMethods()
        getCartItemsForUser()
        getUserAddress()
        getUser()
    }, [deletedCount])

    const handleDelete = id => {
        axios.delete(`http://localhost:7079/CartItem/${id}`, { headers })
        .then(response => {
            setDeletedCount(deletedCount+1)
            })
            .catch(err => {
            console.log(err)
        });
    }
    
    const getCartItemsForUser = () => {
        axios.get(`http://localhost:7079/Order/userId/${userInfo.UserId}`)
            .then(response => {
                var id = response.data.transferObject.id
                console.log(response.data.transferObject)
                setOrder(response.data.transferObject)
                setOrderId(response.data.transferObject.id)
                axios.get(`http://localhost:7079/CartItem/cartItemsForOrder/${id}`)
                    .then(response => {
                    setCartItems(response.data.transferObject);
                    setLoading(false);
                    })
                    .catch(err => {
                    console.log(err)
                    })
            })
            .catch(err => {
            console.log(err)
            })
    }

    async function getShippingMethods(){
        await axios.get(`http://localhost:7079/ShippingMethod?PageSize=100&Page=1`, { headers })
            .then(response => {
                setShippingMethods(response.data.data);
            })
            .catch(err => {
            console.log(err)
            })
    }

    async function getUser(){
        await axios.get(`http://localhost:7079/User/${userInfo.UserId}`, { headers })
            .then(response => {
                setName(response.data.transferObject.firstName);
                setSurname(response.data.transferObject.lastName);
                setPhoneNumber(response.data.transferObject.phone);
                setEmail(response.data.transferObject.email);
                setUser(response.data.transferObject)
            })
            .catch(err => {
            console.log(err)
            })
    }

    const getUserAddress = () => {
        axios.get(`http://localhost:7079/UserAddress/useraddress/${userInfo.UserId}`)
            .then(response => {
                setCity(response.data.transferObject.city)
                setCountry(response.data.transferObject.country)
                setPostalCode(response.data.transferObject.postalCode)
                setAddress(response.data.transferObject.address)
                setAddressNumber(response.data.transferObject.addressNumber)
                setUserAddress(response.data.transferObject)
            })
            .catch(err => {
            console.log(err)
            })
    }

    const calculateTotalPrice = () => {
        cartItems.forEach(cartItem => {
            totalPrice += cartItem.product.price * cartItem.quantity
        });
        return totalPrice;
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        const response = {
            "cardNumber": cardNumber,
            "month": expMonth,
            "year": expYear,
            "cvc": cvc,
            "orderId": orderId,
            "amount": totalPrice,
            "name": name,
            "surname": surname,
            "email": email,
            "phone": phoneNumber,
            "shippingAddress": address + " " + addressNumber,
            "shippingCity": city,
            "shippingCountry": country,
            "shippingPostalCode": postalCode,
        }
        //proveravamo kolicinu
        cartItems.forEach(cartItem => {
            console.log(cartItem);
            cartItem.size.inStock = cartItem.size.inStock - cartItem.quantity
            console.log(cartItem.size)
            if(cartItem.size.inStock < 0) {
                return quantity_error(`There's no ${cartItem.quantity} ${cartItem.product.name} of size ${cartItem.size.eu} in stock`)
            }
            else {
                const dataIn = {
                    "id": cartItem.size.id,
                    "productId": cartItem.size.productId,
                    "eu": cartItem.size.eu,
                    "us": cartItem.size.us,
                    "uk": cartItem.size.uk,
                    "cm": cartItem.size.cm,
                    "inStock": cartItem.size.inStock
                }
                axios.put(`http://localhost:7079/Size/editSize/${cartItem.size.id}`, dataIn, {headers} )
                .then(response => {console.log(response)})
                .catch(error => {return toast(error.message)})
                cartItem.isDeleted = true
                axios.put(`http://localhost:7079/CartItem/editCartItem/${cartItem.id}`, cartItem, {headers})
                .then(response => {console.log(response)})
                .catch(error => {return toast(error.message)}) 
            }          
        });
        axios.post('http://localhost:7079/Stripe/pay', response, {headers} )
        .then(response => {
            console.log(response)
            if(response.data === "succeeded"){
                var shippingMethodId = document.getElementById('select-shippingmethod-id').value;
                const orderDataIn = {
                    "id": order.id,
                    "userId": userInfo.UserId,
                    "orderDate": order.orderDate,
                    "shippingMethodId": shippingMethodId,
                    "orderStatusId": 6,
                }
                console.log(orderDataIn)

                axios.put(`http://localhost:7079/Order/editOrder/${order.id}`, orderDataIn, {headers})
                    .then(response => {console.log("DJ: " + response)})
                    .catch(error => {console.log(error)})
                
                successfully_added()
                //window.location.reload();

                axios.post('http://localhost:7079/Order/addOrder', {
                        userId: userInfo.UserId,
                        orderDate: new Date(),
                        shippingMethodId: 1,
                        orderStatusId: 1
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }          
        })
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className="cart_container">
                <ToastContainer />
                <CartTable cartItems={cartItems} totalPrice={priceFormat(calculateTotalPrice())} handleDelete={handleDelete} />
                <div className="cart_title">Delivery and payment informations</div>
                <hr />
                {cartItems && shippingMethods && userAddress && user ? (
                    <form id="purchase_form" onSubmit={handleSubmit}>
                        <div className="info_container d-flex">
                            <div className="shipping_container">
                                <div className="cart_title2 me-4">Shipping details </div>
                                    <div className="input_row">
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name-input" value={name} onChange={e => setName(e.target.value)} required/>
                                        </div>
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Surname</label>
                                            <input type="text" className="form-control" id="surname-input" value={surname} onChange={e => setSurname(e.target.value)} required/>
                                        </div>
                                    </div>
                                    <div className="input_row">
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Email</label>
                                            <input type="text" className="form-control" id="email-input" value={email} onChange={e => setEmail(e.target.value)} required/>
                                        </div>
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Phone number</label>
                                            <input type="text" className="form-control" id="phone-input" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                                        </div>
                                    </div>
                                    <div className="input_row">
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Country</label>
                                            <input type="text" className="form-control" id="name-input" value={country} onChange={e => setCountry(e.target.value)} required/>
                                        </div>
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">City</label>
                                            <input type="text" className="form-control" id="surname-input" value={city} onChange={e => setCity(e.target.value)} required/>
                                        </div>
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Postal code</label>
                                            <input type="text" className="form-control" id="postalcode-input" value={postalCode} onChange={e => setPostalCode(e.target.value)} required/>
                                        </div>
                                    </div>
                                    <div className="input_row">
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Address</label>
                                            <input type="text" className="form-control" id="address-input" value={address} onChange={e => setAddress(e.target.value)} required/>
                                        </div>
                                        <div className="form-group input_row_item">
                                            <label htmlFor="name">Address number</label>
                                            <input type="text" className="form-control" id="addressnumber-input" value={addressNumber} onChange={e => setAddressNumber(e.target.value)} required/>
                                        </div>
                                    </div>
                            </div>
                            <div className="delivery_payment_container">
                                <div className="cart_title2">Delivery Method</div>
                                    <label></label>
                                    <select className="form-control" id="select-shippingmethod-id">
                                        <option disabled>-Select shipping method-</option>
                                        {shippingMethods.map(shippingMethod => {
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
                                <div className="cart_title2">Payment Details</div>

                                <div className="input_row">
                                    <div className="form-group input_row_item">
                                        <label htmlFor="name">Card number</label>
                                        <input type="text" className="form-control" id="cardNumber-input" onChange={e => setCardNumber(e.target.value)} required/>
                                    </div>
                                    <div className="form-group input_row_item">
                                        <label htmlFor="name">Cvc</label>
                                        <input type="text" className="form-control" id="cvc-input" onChange={e => setCvc(e.target.value)} required/>
                                    </div>
                                </div>

                                <div className="input_row">
                                    <div className="form-group input_row_item">
                                        <label htmlFor="name">Exp. month</label>
                                        <input type="text" className="form-control" id="expMonth-input" onChange={e => setExpMonth(e.target.value)} required/>
                                    </div>
                                    <div className="form-group input_row_item">
                                        <label htmlFor="name">Exp. year</label>
                                        <input type="text" className="form-control" id="expYear-input" onChange={e => setExpYear(e.target.value)} required/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {cartItems.length != 0 ? (<button className="register_form_button btn btn-danger" type="submit">Make purchase</button>) : "" }
                        
                    </form>
                ) : (
                <p>No product available</p>
                )}
            
        </div>
    )
}
