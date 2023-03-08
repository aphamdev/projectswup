import React, {useEffect, useState} from 'react';
import { useAuthContext} from './Auth';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { useAutoAnimate } from '@formkit/auto-animate/react'

function AvailableSwoops() {

    const {token} = useAuthContext();
    const [user, setUser] = useState([]);
    const [availableSwoops, setAvailableSwoops] = useState([]);
    const [listref] = useAutoAnimate();

    const [sortBy, setSortBy] = useState('weight');

    const sortedSwoops = availableSwoops
      .filter(swoop => swoop.customer_id !== user.user_id)
      .sort((a, b) => {
        if (sortBy === "weight") {
          return a.weight - b.weight;
        } else if (sortBy === "pickup_id") {
          return a.pickup_id - b.pickup_id;
        }
        return 0;
      });

    const handleAccept = async (swoop) => {
      const acceptSwoopUrl = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/swoops/accept/${swoop.pickup_id}`;

      const data = {};
      data.trash_type = swoop.trash_type
      data.description = swoop.description
      data.picture_url = swoop.picture_url
      data.hazards = swoop.hazards
      data.size = swoop.size
      data.weight = swoop.weight

      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(acceptSwoopUrl, fetchConfig);
      if (response.ok) {
        console.log("Swoop Succesfully Accepted!")
        const fetchAvailableSwoops = async () => {

          const availableSwoopsURL = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/listings`;

          const fetchConfig = {
              method: "get",
              headers: {
              Authorization: `Bearer ${token}`,
              },
          };

          const response = await fetch(availableSwoopsURL, fetchConfig);

          if (response.ok) {
              const availableSwoopsData = await response.json();
              setAvailableSwoops(availableSwoopsData)
          }
      }
        fetchAvailableSwoops();
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
      const fetchAvailableSwoops = async () => {

        const availableSwoopsURL = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/listings`;

        const fetchConfig = {
            method: "get",
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(availableSwoopsURL, fetchConfig);

        if (response.ok) {
            const availableSwoopsData = await response.json();
            setAvailableSwoops(availableSwoopsData)
        }
    }
        fetchUserData();
        fetchAvailableSwoops();
      }, [token]);

    if (availableSwoops === null) {
        return (
            <progress className='progress is-primary' max="100"></progress>
        );
    }


 return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Available Swoops</h1>
      <div className="text-right mb-3">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} ref={listref}>
          <option value="weight">Sort by weight</option>
          <option value="hazards">Sort by post number</option>
        </select>
      </div>
      <Row>
        <div ref={listref}>
        {sortedSwoops.map(swoop => (
          <Row key={swoop.pickup_id} className="mb-4">

            <Card className='py-4'>
              <Row>
                <Col xs={9}>
                  <Card.Body>
                    <Card.Title>{swoop.trash_type}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">#{swoop.pickup_id}</Card.Subtitle>
                    <Card.Text>{swoop.description}</Card.Text>
                    <Row>
                      <Col xs={6}><strong>Weight:</strong> {swoop.weight} lbs</Col>
                      <Col xs={3}><strong>Hazards:</strong> {swoop.hazards}</Col>
                      <Col xs={3}><Button onClick={() => handleAccept(swoop)} variant="success" block className="float-right">Accept</Button></Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs={6}>
                        <span style={{ color: "green", fontWeight: "bold" }}>Available</span>
                        <img src="https://img.icons8.com/metro/26/000000/checkmark.png" alt="checkmark" style={{ marginLeft: 10 }} />
                      </Col>
                      <Col xs={6} className="text-right">
                        <small className="text-muted">Posted by {swoop.first_name} {swoop.last_name}</small>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
                <Col xs={3}>
                  <Card.Img variant="top" src={swoop.picture_url} />
                </Col>
              </Row>
            </Card>
          </Row>
        ))}
        </div>
      </Row>
    </Container>
  );
}

export default AvailableSwoops;
