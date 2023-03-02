import React, {useEffect, useState } from 'react';
import { useAuthContext } from "./Auth";
import { NavLink } from 'react-router-dom';

function ProfilePage() {
//Authorization//////////////////////////////////////////////////////////////////////////////////////
    const { token } = useAuthContext();
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
//The JSX //////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <div className="container w-25 mt-5">
        <div className="card">
            <div className="card-header">
                <h1 className="text-center card-title">Hello, {user.first_name} {user.last_name}!</h1>
            </div>
            <div className="card-body">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h6 className="card-subtitle text-muted">Username</h6>
                    <p className="card-text">{user.username}</p>
                </li>
                <li className="list-group-item">
                    <h6 className="card-subtitle text-muted">Email</h6>
                    <p className="card-text">{user.email}</p>
                </li>
                <li className="list-group-item">
                    <h6 className="card-subtitle text-muted">Phone Number</h6>
                    <p className="card-text">{user.phone_number}</p>
                </li>
                <li className="list-group-item">
                    <h6 className="card-subtitle text-muted">Address</h6>
                    <p className="card-text">{user.address}</p>
                </li>
                <li className="list-group-item">
                    <h6 className="card-subtitle text-muted">Swooper Status</h6>
                    {user.is_swooper === true ? (<p className="card-text">Yes</p>) : (<p className="card-text">No</p>)}
                </li>
                {user.is_swooper === true ? (
                <><li className="list-group-item">
                    <h6 className="card-subtitle text-muted">Car</h6>
                    <p className="card-text">{user.car}</p>
                </li>
                <li className="list-group-item">
                    <h6 className="card-subtitle text-muted">License Number</h6>
                    <p className="card-text">{user.license_number}</p>
                </li></>) : (<></>)
                }
            </ul>
            </div>

        </div>
        <NavLink className="mt-3 btn btn-primary nav-link text-white" aria-current="page" to="/profile/update">Update Profile</NavLink>
    </div>
    </>
)
}

export default ProfilePage
