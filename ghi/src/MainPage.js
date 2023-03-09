import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import LoginInSignUp from './togglesignin'
import main1 from './img/main1.jpg';
import main2 from './img/main2.jpg';
import main3 from './img/main3.jpg';


function  MainPage() {
    const backgroundImages = [
    main1,
    main2,
    main3
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    while (backgroundImages.length < 3) {
      backgroundImages.push('');
    }

  return (
    <>
    <Carousel
    activeIndex={index}
    onSelect={handleSelect}
    style={{
      position: 'relative',
      zIndex: '1'
    }}>
        {backgroundImages.map((image, idx) => (
          <Carousel.Item key={idx} >
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${idx}`}
              style={{ height: "750px", width: "100vw", objectFit: "cover"}}
            />
          </Carousel.Item>
        ))}
    </Carousel>

    <div className="shadow-lg p-5 mb-5 bg-white"
      style={{
          maxWidth: "600px",
          marginTop: "11.5%",
          marginLeft: "24%",
          borderRadius: '20px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2'
      }}>
      <div id="swup-ready" className="text-black">
        <h2 className="text-center font-weight-bold mb-4">SWUP Ready?</h2>
        <h5 className='font-bold'>Join the SWUP Community today!</h5>
        <br/>
        <br/>
        <NavLink to="/signup" className="mx-1 nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal"><Button variant="dark" size="lg" block>Sign Up</Button></NavLink>


      </div>
    </div>

    <>
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <LoginInSignUp />
    </div>
    </>

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
