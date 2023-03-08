import React, {useEffect, useState} from 'react'
import { useAuthContext} from './Auth.js';


function SwoopHistoryDetail(id) {
    const [swoop, setSwoops] = useState([]);
    const {token } = useAuthContext();


    useEffect(() => {
        const fetchSwoopsDetails = async () => {
            const url = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/swoops/${id.id}`;

            const fetchConfig = {
                method: "get",
                headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setSwoops(data)
            }
        }
    fetchSwoopsDetails();
    }, [token, id]);
    return (
      <div>
        <div className="border-0">
          <div className=" card-body border-0">
            <h1 className="card-title border-0">Swoop Details</h1>
            <div className="row">
              <div className="col-md-6">
                <p className="card-text">Trash Type: {swoop.trash_type}</p>
                <p className="card-text">Description: {swoop.description}</p>
                <p className="card-text">Hazards: {swoop.hazards}</p>
                <p className="card-text">Status: {swoop.status}</p>
              </div>
              <div className="col-md-6">
                <p className="card-text">Size: {swoop.size}</p>
                <p className="card-text">Weight: {swoop.weight}</p>
                <img className="card-img-top" src={swoop.picture_url} alt={swoop.description} style={{ height: "200px", width: "auto" }}/>
              </div>
            </div>
            <hr />
            <h5 className="card-title">Customer Info</h5>
            <p className="card-text">First Name: {swoop.first_name}</p>
            <p className="card-text">Last Name: {swoop.last_name}</p>
            <p className="card-text">Phone Number: {swoop.phone_number}</p>
          </div>
        </div>
      </div>
    )
}

export default SwoopHistoryDetail
