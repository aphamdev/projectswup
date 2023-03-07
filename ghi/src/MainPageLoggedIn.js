import React, { useState, useEffect } from 'react';
import { useAuthContext} from './Auth';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';

function  MainPageLoggedIn() {

    const {token} = useAuthContext();
    const [user, setUser] = useState([]);

    const backgroundImages = [
    'https://images.unsplash.com/photo-1560843300-ce9370f96b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1561763439-fb89720fc359?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2094&q=80',
    'https://images.unsplash.com/photo-1504222013707-cd1090517aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1493&q=80'
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
};

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
    <>
        <Carousel activeIndex={index} onSelect={handleSelect}>
        {backgroundImages.map((image, idx) => (
            <Carousel.Item key={idx}>
            <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx}`}
                style={{ height: "700px", width: "100vw" }}
            />
            </Carousel.Item>
        ))}
        {user.is_swooper === false ? (
        <Container fluid className="p-0" style={{ minHeight: '20vh', position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center align-items-stretch" style={{ minHeight: '75vh', position: 'relative' }}>
            <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body text-black">
                <div className="d-flex align-items-center mb-4">
                    <div>
                    <h3 className="font-weight-bold mb-1">Schedule a Swoop</h3>
                    <p>Schedule a convenient way for your pickup and get it done today!</p>
                    </div>
                </div>
                <NavLink to="/pickups/new" className="nav-link"><Button variant="dark" size="lg" block>Schedule Now</Button></NavLink>
                </div>
            </div>
            </Col>

            <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body text-black">
                <div className="d-flex align-items-center mb-4">
                    <div>
                    <h3 className="font-weight-bold mb-1">Join the SWUP Team</h3>
                    <p>Earn money by becoming a Swooper and complete pickups.</p>
                    </div>
                </div>
                <NavLink to="/swoopers/signup" className="nav-link"><Button variant="dark" size="lg" block>Sign Up Now</Button></NavLink>
                </div>
            </div>
            </Col>
        </Row>
        <Row className="justify-content-center" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Col className="text-center text-white my-5">
            <p>© 2023 SWUP Technologies Inc.</p>
            </Col>
        </Row>
        </Container>

        ) : (

        <Container fluid className="p-0" style={{ minHeight: '20vh', position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center align-items-stretch" style={{ minHeight: '75vh', position: 'relative' }}>
            <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body text-black">
                <div className="d-flex align-items-center mb-4">
                    <div>
                    <h3 className="font-weight-bold mb-1"> Available Swoops</h3>
                    <p>View a list of available swoops that need to get picked up today!</p>
                    </div>
                </div>
                <NavLink to="/listings" className="nav-link"><Button variant="dark" size="lg" block>Available Now</Button></NavLink>
                </div>
            </div>
            </Col>

            <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body text-black">
                <div className="d-flex align-items-center mb-4">
                    <div>
                    <h3 className="font-weight-bold mb-1">Current and Past Swoops</h3>
                    <p>View your current swoops and past swoops by clicking below!</p>
                    </div>
                </div>
                <NavLink to="/swoopshistory" className="nav-link"><Button variant="dark" size="lg" block>Swoop History</Button></NavLink>
                </div>
            </div>
            </Col>
        </Row>
        <Row className="justify-content-center" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Col className="text-center text-white my-5">
            <p>© 2023 SWUP Technologies Inc.</p>
            </Col>
        </Row>
        </Container>
        )
        }

        </Carousel>

      <Container style={{ marginTop: '50px', marginBottom: '50px'}}>
        <Row>
          <Col>
            <Card className='shadow' style={{ height: '100%' }}>
              <Card.Body >
                <Card.Title>How Does SWUP Work?</Card.Title>
                <Card.Text>
                  SWUP works by allowing a customer to create a pickup request for various types of trash. A worker, also known as a Swooper, will be able to see your posting and select it for pickup.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='shadow' style={{ height: '100%' }}>
              <Card.Body >
                <Card.Title>Questions? Contact Us!</Card.Title>
                <Card.Text>
                  You can contact us through the following channels:
                  <br /><br />
                  <img src="https://cdn-icons-png.flaticon.com/512/2989/2989993.png" alt="Email Icon" width="25" height="25" style={{ marginRight: '5px' }} />
                  Email: contact@swup.com
                  <br /><br />
                  <img src="https://cdn-icons-png.flaticon.com/512/46/46854.png" alt="Phone Icon" width="25" height="25" style={{ marginRight: '5px' }} />
                  Phone: 1-800-SWUP
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-white text-center py-3">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h5>About Us</h5>
                  <p>SWUP Technologies Inc. is a waste management platform that connects customers to local waste collectors.</p>
                </div>
                <div className="col-md-4">
                  <h5>Contact Us</h5>
                  <p>Email: contact@swup.com</p>
                  <p>Phone: 1-800-SWUP</p>
                </div>
                <div className="col-md-4">
                  <h5>Meet the Team</h5>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p>&copy; 2023 SWUP Technologies Inc. All rights reserved.</p>
            </div>
      </footer>


    </>
 );
};
export default MainPageLoggedIn;
