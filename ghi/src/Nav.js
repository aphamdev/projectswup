import { NavLink, useNavigate } from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import { useAuthContext, useToken } from "./Auth";
import LoginInSignUp from './togglesignin'
// import LoginForm from './LoginForm'


function Nav() {
//Authorization//////////////////////////////////////////////////////////////////////////////////////
    const { token } = useAuthContext();
    const { logout } = useToken();
//Getting current user data //////////////////////////////////////////////////////////////////////////////////////
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const URL = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/api/accounts`;

            const response = await fetch(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data)
            }
        }
        fetchUserData();
    }, [token]);

//Logout//////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        await logout();
        navigate("/");
    }

//Renders different navbar is youre logged in or not//////////////////////////////////////////////////////////////////////////////////////
    const swooper_status = user.is_swooper
    if ( token === false) {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
                <div className="mx-auto">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="mx-auto px-2 navbar-brand" to="/">SWÜP</NavLink>
                            <li className="nav-item">
                                <NavLink className="mx-1 nav-link" aria-current="page" to="/">
                                How it Works
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="mx-1 nav-link" aria-current="page" to="/">
                                About Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="mx-1 nav-link" aria-current="page" to="/">
                                Contact Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="mx-1 nav-link" aria-current="page" to="/">
                                FAQ
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="mx-1 nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Login
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </nav>
            <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <LoginInSignUp />
            </div>
            </>
            </>
        )
    }
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
        <div className="mx-auto">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {swooper_status === true ? (
                    <>
                    <NavLink className="mx-auto px-2 navbar-brand" to="/">SWÜP</NavLink>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/pickups">
                        My Pickups
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/newpickup">
                        Schedule a Pickup
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/listings">
                        Available Swoops
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/swoopshistory">
                        My Swoops
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/profile">
                        My Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" onClick={handleLogout}>
                        Logout
                        </NavLink>
                    </li>
                    </>
                ) : (
                    <>
                    <NavLink className="mx-auto px-2 navbar-brand" to="/">SWÜP</NavLink>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/pickups">
                        My Pickups
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/newpickup">
                        Schedule a Pickup
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/swoopers/signup">
                        Become a Swooper!
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" to="/profile">
                        My Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="mx-1 nav-link" aria-current="page" onClick={handleLogout}>
                        Logout
                        </NavLink>
                    </li>
                    </>
                )}
                </ul>
            </div>
        </div>
        </div>
        </nav>
  )

}

export default Nav;
