import React, { useState, useEffect } from 'react'
import './Users.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')) 
    axios.get('https://localhost:7079/User?PageSize=100&Page=1', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            setUsers(response.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'username', headerName: 'Username', width: 220 },
    { field: 'firstName', headerName: 'First Name', width: 220},
    { field: 'lastName', headerName: 'Last Name', width: 220 },
    // { field: 'userType', headerName: 'Type', width: 220 },
    ];

    return (
        <div className="users_container">
            <div className="users_table">
                <DataGrid 
                rows={users}
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