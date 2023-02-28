import { NavLink, Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { useAuthContext, useToken, useUser } from "./Auth";


function Nav() {
    const { token } = useAuthContext();
    // // const user = useUser(token);
    // // console.log(user)

    const [user, setUser] = useState([]);
    const fetchUserData = async () => {

        const URL = 'http://localhost:8080/api/accounts/';

        const response = await fetch(URL, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [token]);






    // const handleLogout = async (e) => {
    //     e.preventDefault()
    //     await logout()
    //     console.log('Successfully logged out')
    //     console.log(token)
    //     // const attendeeForm = document.getElementById('create-attendee-form')
    //     // attendeeForm.classList.add("d-none")

    //     // const successMessage = document.getElementById("success-message")
    //     // successMessage.classList.remove("d-none")
    // }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">SWUP</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Pickups
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                <li><Link className="dropdown-item" to="/pickups">My Pickups</Link></li>
                <li><Link className="dropdown-item" to="/pickups/new">Schedule a Pickup</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Swoop Center
              </a>
              <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                <li><Link className="dropdown-item" to="/listings">Available Swoops</Link></li>
                <li><Link className="dropdown-item" to="/swoopshistory">Current and Past Swoops</Link></li>
              </ul>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/swoopers/signup">
                  Become a Swooper!
                </NavLink>
            </li>

            <li id="login" className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/login">
                  Login
                </NavLink>
            </li>
            <li id="signup" className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/signup">
                  Signup
                </NavLink>
            </li>
{/*
            <li id="logout" className="nav-item">
                <NavLink className="nav-link" aria-current="page">
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </NavLink>
            </li> */}

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
