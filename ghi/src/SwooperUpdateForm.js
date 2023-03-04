import React, { useState, useEffect} from 'react'
import { useAuthContext} from "./Auth";

function SwooperUpdateForm() {
  const {token} = useAuthContext();
  const [user, setUser] = useState([]);
  const [car, setCar] = useState('')
  const [license_number, setLicenseNumber] = useState('')

  const handleCarChange = (e) => {
    const value = e.target.value;
    setCar(value);
  }

////////////////////////////////////////////////////////
  const handleLicenseChange = (e) => {
    const value = e.target.value;
    setLicenseNumber(value);
  }
////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/api/accounts/${user.user_id}`;
    const fetchConfig = {
        method: "put",
        body: JSON.stringify({
            car: car,
            license_number: license_number,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        console.log("Swooper sign-up successful!")
        console.log(token)
        window.location.href = '/';
        return response.json()
    }
  }

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


   return (
    <form onSubmit={handleSubmit}>
      <label>
        Car:
        <input type="text" value={car} onChange={handleCarChange} />
      </label>
      <br />
      <label>
        License Number:
        <input type="text" value={license_number} onChange={handleLicenseChange} />
      </label>
      <button type="submit">Sign Up!</button>

    </form>
  );
}

export default SwooperUpdateForm
