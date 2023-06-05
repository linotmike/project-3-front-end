import React from 'react'
import { NavLink as Link } from "react-router-dom";
import './style.css';



export default function Navbar({ userId, logout }) {
  
    return (
        <div className='col-3 d-flex justify-content-evenly nav-links'>
            { userId && 
                <Link className='nav-bar-link' to={{ pathname: "/profile" }}>Profile</Link>
            }
            { userId ? 
                <Link className='nav-bar-link' to={{ pathname: "/messages" }}>Messages</Link> : 
                <Link className='nav-bar-link' to={{ pathname: "/signup" }}>Sign Up</Link> 
            }
            { userId && <button className='logout-btn' onClick={logout}>Logout</button> }
        </div>
    );
}

