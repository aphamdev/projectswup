import React, {useEffect, useState} from 'react'
import { useAuthContext } from './Auth.js';


function DetailCustomerPost(id) {
    const [swoop, setSwoops] = useState([]);
    const {token } = useAuthContext();

    useEffect(() => {
    const fetchPostDetails = async () => {
    const url = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/pickups/${id.id}`;
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
        fetchPostDetails();
    }, [token, id.id]);

    return (
        <div>
            <div>
            <h1>Swoop Details</h1>
            <table className="table table-striped table-hover">
                <thead>
                    Pick up Info
                    <tr>
                        <th>Trash Type</th>
                        <th>Description</th>
                        <th>Hazards</th>
                        <th>Size</th>
                        <th>Weight</th>
                        <th>Status</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={swoop.swooper_id }>
                        <td>{ swoop.trash_type }</td>
                        <td>{ swoop.description }</td>
                        <td>{ swoop.hazards }</td>
                        <td>{ swoop.size }</td>
                        <td>{ swoop.weight }lbs</td>
                        <td>{swoop.status === 1 ? 'In Progress' : swoop.status === 2 ? 'Completed' : 'Not Accepted'}</td>
                        <td>
                            <img
                                src={ swoop.picture_url }
                                height="120"
                                alt="trash"
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
