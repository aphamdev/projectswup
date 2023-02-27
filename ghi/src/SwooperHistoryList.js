import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useAuthContext, useUser } from './Auth.js';



function SwooperHistoryList(){

    const [swoops, setSwoops] = useState([]);
    const [finished, setFinished] = useState([])
    const { token } = useAuthContext();


    const fetchSwoops = async () => {
        const url =  `http://localhost:8080/swoops`;
        const fetchConfig = {
            method: "get",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            setSwoops(data);
        }
    }
    useEffect (() => {
        fetchSwoops();
    },[token]);

    const finishSwoop = async (swoop) => {
        const data = {};
        data.trash_type = swoop.trash_type
        data.description = swoop.description
        data.picture_url = swoop.picture_url
        data.hazards = swoop.hazards
        data.size = swoop,size
        data.weight = swoop.weight

        const swoopUrl = `http://localhost:8080/swoops/complete/${pickup_id}`
        const fetchConfig  = {
            method: "PUT",
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    }

    return (
        <div>
        <h1>Your Swoops</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Trash Type</th>
                    <th>Description</th>
                    <th>Hazards</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {swoops.map(swoop => {
                        return (
                            <tr key={swoop.swooper_id }>
                                <td>{ swoop.trash_type }</td>
                                <td>{ swoop.description }</td>
                                <td>{ swoop.hazards }</td>
                                <td>{ swoop.status }</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    </div>

    )



}

export default SwooperHistoryList
