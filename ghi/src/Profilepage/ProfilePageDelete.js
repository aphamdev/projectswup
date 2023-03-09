import React, {useEffect, useState} from 'react'
import {useNavigate } from 'react-router-dom';
import { useAuthContext, useToken } from "../Auth.js";
import { useAutoAnimate } from '@formkit/auto-animate/react'


function ProfilePageDelete() {
////////////////////////////////////////////////////
    const [listref] = useAutoAnimate();
////////////////////////////////////////////////////
    const [email, setEmail] = useState('')
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }
////////////////////////////////////////////////////
    const { logout } = useToken();
    const { token } = useAuthContext();
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
////////////////////////////////////////////////////
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const deleteProfile = async (e) => {
        if (email === user.email) {
            e.preventDefault()
            const url = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/delete`;
            const fetchConfig = {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                await logout();
                navigate("/");
                const closeBtn = document.querySelector('#myModal .btn-close');
                closeBtn.setAttribute('data-bs-dismiss', 'modal');
                closeBtn.click();
            }
        } else {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        }
    }
////////////////////////////////////////////////////
  return (
    <div id="myModal" className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <p>Once your account is deleted you will no longer have access and it can no longer be retrieved. Please enter your email address to confirm.</p>
            <input value={email} onChange={handleEmailChange} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div ref={listref}>
        {submitted && (
                <div className="mx-3 alert alert-danger" role="alert">
                    Wrong email!
                </div>
                )}
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, let's go back</button>
            <button onClick={deleteProfile} type="button" className="btn btn-danger">Yes, delete my account</button>
        </div>
        </div>
    </div>
  )
}

export default ProfilePageDelete
