import React, { useState } from 'react'
import './Cart.css'
import { useEffect } from 'react'
import axios from 'axios';
import { priceFormat } from '../../components/common/priceFormat'
import jwtDecode from 'jwt-decode'
import CartTable from './CartTable';
import ShippingMethods from './ShippingMethods';

export default function Cart() {

    const [isLoading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState(true);
    const [userInfo, setUserInfo] = useState(jwtDecode(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')))
    const [deletedCount, setDeletedCount] = useState(0)
    const [shippingMethods, setShippingMethods] = useState([])
    const [orderId, setOrderId ] = useState()

    const [name, setName ] = useState()
    const [surname, setSurname ] = useState()
    const [email, setEmail ] = useState()
    const [phoneNumber, setPhoneNumber ] = useState()
    const [city, setCity ] = useState()
    const [country, setCountry ] = useState()
    const [address, setAddress ] = useState()
    const [addressNumber, setAddressNumber ] = useState()
    const [apartmentNumber, setApartmentNumber ] = useState()
    const [floor, setFloor ] = useState()
    const [intercom, setIntercom ] = useState()
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

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        getShippingMethods()
        getCartItemsForUser()
    }, [deletedCount])

    const handleDelete = id => {
        axios.delete(`https://localhost:7079/CartItem/${id}`, { headers })
        .then(response => {
            setDeletedCount(deletedCount+1)
            })
            .catch(err => {
            console.log(err)
        });
    }
    
    const getCartItemsForUser = () => {
        axios.get(`https://localhost:7079/Order/userId/${userInfo.UserId}`)
            .then(response => {
                var id = response.data.transferObject.id
                setOrderId(response.data.transferObject.id)
                axios.get(`https://localhost:7079/CartItem/cartItemsForOrder/${id}`)
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
        await axios.get(`https://localhost:7079/ShippingMethod?PageSize=100&Page=1`, { headers })
            .then(response => {
                console.log(response.data.data);
                setShippingMethods(response.data.data);
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

        axios.post('https://localhost:7079/Stripe/pay', response, {headers} )
        .then(response => {
                console.log(response)
                if(response.data === "succeeded"){
                    cartItems.forEach(cartItem => {
                        console.log(cartItem);
                        cartItem.size.inStock = cartItem.size.inStock - cartItem.quantity
                        console.log(cartItem.size)
                        if(cartItem.size.inStock < 0) {
                            return <div>{`There's no ${cartItem.quantity} products in stock`}</div>
                        }
                        const dataIn = {
                            "id": cartItem.size.id,
                            "productId": cartItem.size.productId,
                            "eu": cartItem.size.eu,
                            "us": cartItem.size.us,
                            "uk": cartItem.size.uk,
                            "cm": cartItem.size.cm,
                            "inStock": cartItem.size.inStock
                        }
                        axios.put(`https://localhost:7079/Size/editSize/${cartItem.size.id}`, dataIn, {headers} )
                        .then(response => {console.log(response)})
                        .catch(error => {console.log(error)})
                        cartItem.isDeleted = true
                        axios.put(`https://localhost:7079/CartItem/editCartItem/${cartItem.id}`, cartItem, {headers})
                        .then(response => {console.log(response)})
                        .catch(error => {console.log(error)})
                    });
                    window.location.reload();
                }
                //promeniti status ordera,
                
                    
                console.log(200);
            console.log(response)
        })
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className="cart_container">
            <CartTable cartItems={cartItems} totalPrice={priceFormat(calculateTotalPrice())} handleDelete={handleDelete} />
            <div className="cart_title">Delivery and payment informations</div>
            <hr />
            <form id="purchase_form" onSubmit={handleSubmit}>
                <div className="info_container d-flex">
                    <div className="shipping_container">
                        <div className="cart_title2 me-4">Shipping details </div>
                            <div className="input_row">
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name-input" onChange={e => setName(e.target.value)} required/>
                                </div>
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Surname</label>
                                    <input type="text" className="form-control" id="surname-input" onChange={e => setSurname(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="input_row">
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Email</label>
                                    <input type="text" className="form-control" id="email-input" onChange={e => setEmail(e.target.value)} required/>
                                </div>
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Phone number</label>
                                    <input type="text" className="form-control" id="phone-input" onChange={e => setPhoneNumber(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="input_row">
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Country</label>
                                    <input type="text" className="form-control" id="name-input" onChange={e => setCountry(e.target.value)} required/>
                                </div>
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">City</label>
                                    <input type="text" className="form-control" id="surname-input" onChange={e => setCity(e.target.value)} required/>
                                </div>
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Postal code</label>
                                    <input type="text" className="form-control" id="postalcode-input" onChange={e => setPostalCode(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="input_row">
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Address</label>
                                    <input type="text" className="form-control" id="address-input" onChange={e => setAddress(e.target.value)} required/>
                                </div>
                                <div className="form-group input_row_item">
                                    <label htmlFor="name">Address number</label>
                                    <input type="text" className="form-control" id="addressnumber-input" onChange={e => setAddressNumber(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="input_row">
                                <div className="form-group">
                                    <label htmlFor="name">Floor</label>
                                    <input type="text" className="form-control" id="floor-input" onChange={e => setFloor(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Apartment number</label>
                                    <input type="text" className="form-control" id="apartmentnumber-input" onChange={e => setApartmentNumber(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Intercom</label>
                                    <input type="text" className="form-control" id="intercom-input" onChange={e => setApartmentNumber(e.target.value)} />
                                </div>
                            </div>
                    </div>
                    <div className="delivery_payment_container">
                        <div className="cart_title2">Delivery Method</div>
                        <ShippingMethods shippingMethods={shippingMethods} />

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
                <button className="register_form_button" type="submit">Make purchase</button>
            </form>
            
            
        </div>
    )
}
