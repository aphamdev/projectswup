import React, {useEffect, useState} from 'react'
import { useAuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";


function ProfilePageUpdateForm() {
  ///////////////////////////////////////////////////////////////////////////
  const { token } = useAuthContext();
  ///////////////////////////////////////////////////////////////////////////
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
              setUserName(data.username)
              setFirstName(data.first_name)
              setLastName(data.last_name)
              setPhoneNumber(data.phone_number)
              setEmail(data.email)
              setAddress(data.address)
              setCar(data.car)
              setLicenseNumber(data.license_number)
          }
      }
      fetchUserData();
    }, [token]);
///////////////////////////////////////////////////////////////////////////
  const [username, setUserName] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [car, setCar] = useState('')
  const [license_number, setLicenseNumber] = useState('')

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
  }

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  }

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  }

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  }

   const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  }

    const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  }

    const handleCarChange = (e) => {
    const value = e.target.value;
    setCar(value);
  }

    const handleLicenseNumberChange = (e) => {
    const value = e.target.value;
    setLicenseNumber(value);
  }
///////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = `http://localhost:8080/api/profile/${user.user_id}`;
    const fetchConfig = {
        method: "put",
        body: JSON.stringify({
            username: username,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            address: address,
            car: car,
            license_number: license_number
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };


    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        navigate('/profile');
        return response.json()

    }
  }
///////////////////////////////////////////////////////////////////////////
  return (
    <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Update your Profile</h1>
                <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                    <input value={username} onChange={handleUserNameChange} placeholder="UserName" required type="text" name="username" id="username" className="form-control"/>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={first_name} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control"/>
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={last_name} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control"/>
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={phone_number} onChange={handlePhoneNumberChange} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control"/>
                    <label htmlFor="phone_number">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={email} onChange={handleEmailChange} placeholder="Email" required type="text" name="email" id="email" className="form-control"/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={address} onChange={handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                    <label htmlFor="address">Address</label>
                </div>
                {user.is_swooper === true ? (
                  <>
                <div className="form-floating mb-3">
                    <input value={car} onChange={handleCarChange} placeholder="car" required type="text" name="car" id="car" className="form-control"/>
                    <label htmlFor="car">Car</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={license_number} onChange={handleLicenseNumberChange} placeholder="license_number" required type="text" name="license_number" id="license_number" className="form-control"/>
                    <label htmlFor="license_number">License Number</label>
                </div>
                </>
                ) : (<></>)}
                <button className="btn btn-primary">Submit</button>
                </form>
            </div>
            </div>
        </div>
  )
}

export default ProfilePageUpdateForm
