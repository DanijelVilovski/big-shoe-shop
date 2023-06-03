import React, { useState, useEffect } from 'react'
import './Profile.css'
import axios from 'axios';
import jwtDecode from 'jwt-decode'

export default function Profile() {

    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN'))

    const [name, setName ] = useState()
    const [surname, setSurname ] = useState()
    const [email, setEmail ] = useState()
    const [phoneNumber, setPhoneNumber ] = useState()
    const [city, setCity ] = useState()
    const [country, setCountry ] = useState()
    const [address, setAddress ] = useState()
    const [addressNumber, setAddressNumber ] = useState()
    const [postalCode, setPostalCode ] = useState()
    const [userInfo, setUserInfo] = useState(jwtDecode(token))

    const [userAddress, setUserAddress] = useState()
    const [user, setUser] = useState()

    const headers = { 
        Authorization : `Bearer ${token}`,
        
    };

    useEffect(() => {
        GetAddress();
        GetUser();
    }, [])

    async function GetAddress(){
        await axios.get(`https://localhost:7079/UserAddress/useraddress/${userInfo.UserId}`, { headers })
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

    async function GetUser(){
        await axios.get(`https://localhost:7079/User/${userInfo.UserId}`, { headers })
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

    const handleSubmit = (e) => {
        e.preventDefault() 

        const addressDataIn = {
            "id": userAddress.id,
            "userId": user.id,
            "address": address,
            "addressNumber": addressNumber,
            "city": city,
            "postalCode": postalCode,
            "country": country,
            "phone": phoneNumber
        }

        const userDataIn = {
            "email": email,
            "firstName": name,
            "lastName": surname,
            "phone": phoneNumber
        }
        axios
        .put(`https://localhost:7079/UserAddress/editUserAddress/${userAddress.id}`, addressDataIn, { headers })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        axios
        .put(`https://localhost:7079/User/editUser/${user.id}`, userDataIn, { headers })
        .then(response => {
            console.log(response)
            
        })
        .catch(error => {
            console.log(error)
        })
        
        window.location.reload();
        alert("Successfully updated")
    }

    return (
        <div className="profile_container">
            <h3 className="profile_title">Change user informations</h3>
            {user && userAddress ? (
            <form id="edit_info_form" onSubmit={handleSubmit}>
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
                <button className="profile-button btn btn-danger" type="submit">Update info</button>
                
            </form>
            ) : "" }
        </div>
    )
}