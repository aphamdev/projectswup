import React, {useEffect, useState} from 'react'
import { useAuthContext } from './Auth.js';


function DetailCustomerPost(id) {
    const [swoop, setSwoops] = useState([]);
    const {token } = useAuthContext();

    const fetchPostDetails = async () => {
        const url = `http://localhost:8080/pickups/${id.id}`;
        console.log("THIS IS IDDDDDDD", id.id)
        // const data = {};
        // data.trash_type = swoop.trash_type
        // data.description = swoop.description
        // data.picture_url = swoop. picture_url
        // data.hazards = swoop.hazards
        // data.size = swoop.size
        // data.weight = swoop.weight

        const fetchConfig = {
            method: "get",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSwoops(data)
        }
    }
    useEffect(() => {
        fetchPostDetails();
    }, [token]);



      // if (swoop.swooper_id == null) {
      //   return <div>"Waiting for a Swooper to accept your job!"</div>;
      // } else {
        return ( <div>
            <div>
        <h1>Swoop Details</h1>
        <table className="table table-striped table-hover">
            <thead>
                Pick up Info
                <tr>
                    <th>Trash Type</th>
                    <th>Description</th>
                    <th>Hazards</th>
                    <th>Status</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>

                <tr key={swoop.swooper_id }>
                    <td>{ swoop.trash_type }</td>
                    <td>{ swoop.description }</td>
                    <td>{ swoop.hazards }</td>
                    <td>{ swoop.status }</td>
                    <td>
                        <img
                            src={ swoop.picture_url }
                            height="120"
                            />
                    </td>
                </tr>
            </tbody>
            <thead>
                Swooper Information
                <tr>

                    <th>first name</th>
                    <th>last name</th>
                    <th>phone number</th>
                </tr>
            </thead>
            <tbody>
                <tr key={swoop.swooper_id }>
                    <td>{ swoop.first_name }</td>
                    <td>{ swoop.last_name }</td>
                    <td>{ swoop.phone_number }</td>
                </tr>
            </tbody>

        </table>
    </div>
        </div>
    )
}




export default DetailCustomerPost;
