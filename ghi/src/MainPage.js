import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Nav, Card, Carousel } from 'react-bootstrap';

function  MainPage() {


    const backgroundImages = [
    'https://images.unsplash.com/photo-1560843300-ce9370f96b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1561763439-fb89720fc359?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2094&q=80',
    'https://images.unsplash.com/photo-1504222013707-cd1090517aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1493&q=80'
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
};

  return (
    <>
        <Carousel activeIndex={index} onSelect={handleSelect} >
            {backgroundImages.map((image, idx) => (
              <Carousel.Item key={idx} >
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`Slide ${idx}`}
                  style={{ height: "700px", width: "100vw"}}
                />
              </Carousel.Item>
            ))}

          <Container fluid className="p-0" style={{ minHeight: '10vh', position: 'relative', zIndex: 1 }}>
            <Row className="justify-content-start align-items-center" style={{ minHeight: '75vh', position: 'relative' }}>
              <Col md={6} className="offset-md-3 d-flex justify-content-start align-items">
                <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                  <div className="card-body text-black">
                    <Nav className="justify-content-between mb-4">
                      <Nav.Item className='hover-highlight'>
                        <NavLink to="/login" className="nav-link font-weight-bold text-black">Schedule a Pickup</NavLink>
                      </Nav.Item>
                     <Nav.Item>
                        <NavLink to="/signup" className="nav-link font-weight-bold text-black">Become a Swooper</NavLink>
                      </Nav.Item>
                    </Nav>
                    <h2 className="text-center font-weight-bold mb-4">SWUP Ready?</h2>
                    <NavLink to="/signup" className="nav-link"><Button variant="dark" size="lg" block>Sign Up</Button></NavLink>
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
    </>
 );
};
export default MainPage;
