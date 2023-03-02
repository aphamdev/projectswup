import { NavLink, Link, useNavigate } from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import { useAuthContext, useToken } from "./Auth";


function Nav() {
//Authorization//////////////////////////////////////////////////////////////////////////////////////
    const { token } = useAuthContext();
    const { logout } = useToken();
//Getting current user data //////////////////////////////////////////////////////////////////////////////////////
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

//Logout//////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        await logout();
        navigate("/login");
    }
//Renders different navbar is youre logged in or not//////////////////////////////////////////////////////////////////////////////////////
    const swooper_status = user.is_swooper
    if ( token === false) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">SWUP</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">SWUP</NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {swooper_status === true ? (
                    <>
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
                            <li><Link className="dropdown-item" to="/swoopshistory">My Swoops</Link></li>
                        </ul>
                    </li>
                    <li id="profile" className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/profile">
                        My Profile
                        </NavLink>
                    </li>
                    <li id="logout" className="nav-item">
                        <NavLink className="nav-link" aria-current="page" onClick={handleLogout}>
                        Logout
                        </NavLink>
                    </li>
                    </>
                ) : (
                    <>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        My Pickups
                    </a>
                    <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                        <li><Link className="dropdown-item" to="/pickups">My Pickups</Link></li>
                        <li><Link className="dropdown-item" to="/pickups/new">Schedule a Pickup</Link></li>
                    </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/swoopers/signup">
                        Become a Swooper!
                        </NavLink>
                    </li>
                    <li id="profile" className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/profile">
                        My Profile
                        </NavLink>
                    </li>
                    <li id="logout" className="nav-item">
                        <NavLink className="nav-link" aria-current="page" onClick={handleLogout}>
                        Logout
                        </NavLink>
                    </li>
                    </>
                )}
                </ul>
            </div>
        </div>
        </nav>
  )

}

export default Nav;
