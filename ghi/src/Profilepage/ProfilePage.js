import React, {useEffect, useState } from 'react';
import { useAuthContext } from "../Auth";
// import { NavLink } from 'react-router-dom';
import ProfilePageUpdateForm from './ProfilePageUpdateForm';
import profile from './profile.jpg';
import ProfilePageDelete from './ProfilePageDelete';


function ProfilePage() {
//Authorization//////////////////////////////////////////////////////////////////////////////////////
    const { token } = useAuthContext();
//Getting current user data//////////////////////////////////////////////////////////////////////////////////////
    const [user, setUser] = useState([]);
    const fetchProfileData = async () => {
            const URL = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/api/accounts`;

            const response = await fetch(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data)
            }
        }
    useEffect(() => {
        const fetchProfileData = async () => {
            const URL = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/api/accounts`;

            const response = await fetch(URL, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data)
            }
        }
        fetchProfileData();
    }, [token]);

//The JSX //////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <div class="container">
        <div class="row">
            <div class="col-md">
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="p-3 text-center card-title">Hello, {user.first_name} {user.last_name}!</h1>
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
                        <div className="card-footer py-3 d-flex justify-content-center">
                            <button type="button" className="mx-3 btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal">
                                Update Profile
                            </button>
                            <button type="button" className="mx-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                Delete Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md">
                <img
                className='mt-5'
                src={profile}
                alt="profilehero"
                style={{height: '600px'}}
                />
            </div>
        </div>
    </div>
    <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <ProfilePageDelete/>
    </div>
    <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <ProfilePageUpdateForm fetchProfileData={fetchProfileData} />
    </div>
    </>
)
}

export default ProfilePage
