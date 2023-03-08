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
        window.location.href = '/module3-project-gamma';
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
    <div className="container w-50 mt-5">
      <div className="card p-5 shadow">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center fw-bold fs-1 h3 mb-3 fw-normal">Update Info</h1>
              <div className="text-center">
                <p>Please fill-in the information below to become a Swooper!</p>
              </div>
            <div className="form-floating">
              <input type="text" className="form-control" value={car} onChange={handleCarChange} />
            <label>
              Car:
            </label>
            <br />
            </div>
            <div className="form-floating">
              <input type="text" className="form-control" value={license_number} onChange={handleLicenseChange} />
            <label>
              License Number:
            </label>
            <br />
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up!</button>
            <p className="text-center mt-5 mb-3 text-muted">© 2023 SWUP Technologies Inc.</p>
          </form>
      </div>
    </div>
  );
}

export default SwooperUpdateForm
