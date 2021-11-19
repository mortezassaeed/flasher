import React, {useState,useEffect, Fragment} from 'react';
import {Table} from 'react-bootstrap';

export default function User(prop) {
    
    const[user,setUser]=useState([]);
    const[mode,setMode]=useState('online');
    useEffect(()=>{
        const url = "https://jsonplaceholder.typicode.com/users";
        fetch(url).then(response => {
            response.json().then(result => {
                localStorage.setItem('users',JSON.stringify(result))
                setUser(result);
            })          
        }).catch(err =>{
           const userCollection = localStorage.getItem('users');
           setUser(JSON.parse(userCollection));
           setMode('offline')
        }) ;
    },[])
 
    return (
        <div>
            {
                mode === "offline"? <div  className="alert alert-warning">you are in offline mode</div> : null
            }
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
               
                    {
                        user.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}