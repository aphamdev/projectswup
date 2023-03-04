import React, {useEffect, useState} from 'react';
import { useAuthContext} from './Auth';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

function AvailableSwoops() {

    const {token} = useAuthContext();
    const [user, setUser] = useState([]);
    const [availableSwoops, setAvailableSwoops] = useState([]);



    const handleAccept = async (swoop) => {
      const acceptSwoopUrl = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/${swoop.pickup_id}`;

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
  <Row>
    {availableSwoops.filter(swoop => swoop.customer_id !== user.user_id).map(swoop => (
      <Row key={swoop.pickup_id} className="mb-4">
        <Card>
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
  </Row>
</Container>
)





}

export default AvailableSwoops;
