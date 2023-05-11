import React, { useState, useEffect } from 'react'
import './Orders.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {  
    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')); 
    axios.get('https://localhost:7079/Order?PageSize=100&Page=1', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            console.log(response)
            setOrders(response.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'userId', headerName: 'User ID', width: 120 },
    { field: 'orderDate', headerName: 'Date', width: 220 },
    { field: 'userAddressId', headerName: 'Address', width: 220},
    // { field: 'userAddress', headerName: 'Address', width: 220 },
    { field: 'shippingMethodId', headerName: 'Method', width: 220 },
    // { field: 'shippingMethod', headerName: 'Method', width: 220 },
    { field: 'orderStatusId', headerName: 'Status', width: 220 },
    // { field: 'orderStatus', headerName: 'Status', width: 220 },
    { field: 'orderTotal', headerName: 'Total', width: 220 },
    ];

    return (
        <div className="orders_container">
          <div className="orders_table">
              <DataGrid 
              rows={orders}
              columns={columns}
              initialState={{
              pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
              },
              }}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              />
          </div>
        </div>
    )
}