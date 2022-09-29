// The header navigation bar.

import React, { useContext, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from 'react-router-dom';
import './css/header.css';
import { auth } from './utilities/firebase'
import {UserContext} from './context/user.context'


function Header(props) {

    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext);

    // Logs out user from logout button
    const handleLogout = async(e) => {
        try {
            const response = auth.signOut();
            console.log(response);
        } catch (error) {
            console.log('error logging out', error.message);
            alert("Invalid username or password! Try again...")
        }
    }

    const [searchTerm , setsearchTerm] = useState('')
  
    // Gets search term from search bar
    function onSearchChange(e)
    {
        setsearchTerm(e.target.value)
    }

    return (
        <div className='header'>
            <header>
                <div class="container">
                    <Link to = '/home-page' style={{textDecoration: "none"}}><h1>DEV<span>@</span>Deakin</h1></Link>
                    {currentUser !== null ? <div className='welcome-user'><h2>Welcome, <span style={{color: "darkcyan"}}>{currentUser.email}</span></h2></div> 
                    : <div className='welcome-user'></div>}
                    <div className='search-bar'>
                        <div className='input'>
                            <input type='text' placeholder='Search...' onChange = {onSearchChange} value = {searchTerm}/>
                        </div>
                        <div className='search-icon'>
                            <button type='submit' onClick={()=>props.getData(searchTerm)}>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to = '/post' className='header-links'> Post </Link></li>
                            {/* <li><Link to = '/' className='header-links'> Login </Link></li> */}
                            <li><Link to = '/' className='header-links' onClick={handleLogout}> Log Out </Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header;