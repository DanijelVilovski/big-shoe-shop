import React, { useState, useEffect } from 'react'
import './AdminCategories.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

export default function AdminCategories() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')) 
    axios.get('https://localhost:7079/Category?PageSize=100&Page=1', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            setCategories(response.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 320 }
    ]

    return (
        <div className="orders_container">
            <div className="orders_table">
                <DataGrid 
                rows={categories}
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