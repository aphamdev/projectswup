import React, {useState} from 'react'
import { useAuthContext, useUser } from "./Auth";

function SwooperUpdateForm() {
  const {token} = useAuthContext();
  const user = useUser(token);
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

    const url = `http://localhost:8080/api/accounts/${user.user_id}`;
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
