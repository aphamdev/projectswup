import React, {useEffect, useState} from 'react';
import { useAuthContext} from './Auth';
import { NavLink } from 'react-router-dom'
import { Row, Col, Card, Button, Container, Nav, NavItem, Image } from 'react-bootstrap';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import available_pic from './img/work.jpg';
import available_sidebar from './img/available_sidebar.jpg'
import error from './img/error.jpg'

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
  <>
    {sortedSwoops.length === 0 ? (
      <div>
        <p className="errormessage" style={{ position: 'absolute', top: '40%', left: '70%', transform: 'translate(-50%, -50%)', zIndex:"2" }}>
          There are no available Swoops to pick up,
         check your current or past swoops&nbsp;
          <NavLink
            aria-current="page" to="/swoopshistory">
            here!
          </NavLink>
        </p>
        <img src={error} alt="No posts" style={{ position: 'absolute', bottom: 170, left: 0, height:"82%" }} />
      </div>

    ) : (
  <Container>
    <h1 className="text-center mt-4 mb-4">Available Swoops</h1>
    <Row>
      <Col md={3} className="d-sm-block d-none" style={{ position: 'sticky', top: '0', height: '100vh', textAlign: 'left' }}>
          <Nav className="flex-column py-3" style={{ paddingLeft: "60px" }}>
            <Row>
              <NavItem>
                <Nav.Link href="/loggedin" className="text-black" style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-house-door-fill me-2"></i>
                  Home
                </Nav.Link>
              </NavItem>
            </Row>
            <Row>
              <NavItem>
                <Nav.Link href="/profile" className="text-black" style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </Nav.Link>
              </NavItem>
            </Row>
            <Row>
              <NavItem>
                <Nav.Link href="/team" className="text-black" style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-credit-card-2-front-fill me-2"></i>
                  About us
                </Nav.Link>
              </NavItem>
            </Row>
            <Row>
              <NavItem>
                <Nav.Link href="/help" className="text-black" style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-question-circle-fill me-2"></i>
                  Help
                </Nav.Link>
              </NavItem>
            </Row>
            <Row>
              <NavItem>
                <Nav.Link href="/listings" className="text-black" style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-arrow-down-circle-fill"></i>&nbsp;
                   Filter
                </Nav.Link>
              </NavItem>
            </Row>
            <Row>
              <div ref={listref}>
                <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={sortBy} onChange={e => setSortBy(e.target.value)} >
                  <option value="weight">Sort by Weight</option>
                  <option value="hazards">Sort by Post Number</option>
                </select>
              </div>
            </Row>
          </Nav>
      </Col>

      <Col md={6}>
      <Image className='pb-5'src={available_pic} fluid/>
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
      </Col>

      <Col md={3} className="d-md-block d-none" style={{ position: 'sticky', top: '0', height: '100vh'}}>
        {/* Right sidebar */}
        <div className="p-2">
          <Image src={available_sidebar} fluid />
          <h5 className='pt-3' style={{ fontWeight: 'bold' }}>Check your Current and Past Swoops!</h5>
          <p>Once you click accept, you can view you current swoops
            by clicking down below!
          </p>
          <NavLink className="mx-1 pt-2 nav-link" aria-current='page' to='/swoopshistory'>
            <Button variant='dark'>My Swoops</Button>
          </NavLink>
        </div>
      </Col>
    </Row>
  </Container>
    )
        }</>
  );
}

export default AvailableSwoops;
