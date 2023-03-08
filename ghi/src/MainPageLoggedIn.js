import React, { useState, useEffect} from 'react';
import ExpandingMain from './ExpandingCards/ExpandingMain';
import { Container, Row, Col, Card, Button, Carousel, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuthContext} from './Auth';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { FaRegLightbulb } from 'react-icons/fa';

function  MainPageLoggedIn() {
  const backgroundImages = [
    'https://images.unsplash.com/photo-1560843300-ce9370f96b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1561763439-fb89720fc359?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2094&q=80',
    'https://images.unsplash.com/photo-1504222013707-cd1090517aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1493&q=80',
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const [user, setUser] = useState([]);
    const {token} = useAuthContext();

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
        {backgroundImages.slice(0, ).map((image, idx) => (

            <Carousel.Item key={idx}>
            <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx}`}
                style={{ height: "750px", width: "100vw", objectFit: "cover"}}
            />
            </Carousel.Item>

        ))}
        {user.is_swooper === false ? (
          <div className='container'>

            <Container fluid className="p-0 container" style={{ minHeight: '20vh', position: 'relative', zIndex: 1 }}>
              <Row className="justify-content-center align-items-stretch" style={{ minHeight: '75vh', position: 'relative' }}>
                  <Col md={4} className="d-flex justify-content-center align-items-center" style={{borderRadius: "10px"}}>
                    <div className="card shadow-lg p-3 mb-5 bg-white">
                        <div className="card-body text-black">
                        <div className="d-flex align-items-center mb-4">
                            <div>
                            <h3 className="font-weight-bold mb-1">Schedule a Swoop</h3>
                            <p>Schedule a convenient way for your pickup and get it done today!</p>
                            </div>
                        </div>
                        <NavLink to="/newpickup" className="nav-link"><Button variant="dark" size="lg" block>Schedule Now</Button></NavLink>
                        </div>
                    </div>
                  </Col>

                  <Col md={4} className="d-flex justify-content-center align-items-center">
                    <div className="card shadow-lg p-3 mb-5 bg-white">
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
        </div>


        ) : (

        <Container fluid className="p-0" style={{ minHeight: '20vh', position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center align-items-stretch" style={{ minHeight: '75vh', position: 'relative' }}>
            <Col md={4} className="d-flex justify-content-center align-items-center" >
            <div className="card shadow-lg p-3 mb-5 bg-white" style={{ borderRadius: "20px"}}>
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
            <div className="card shadow-lg p-3 mb-5 bg-white" style={{ borderRadius: "20px"}}>
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


    <div className="pt-5"></div>
    <ExpandingMain/>

    <Container style={{ marginTop: '50px', marginBottom: '50px'}}>
      <Row>
        <Col md={6} className="">
          <Col className='' style={{ height: '100%' }}>
            <Card.Body >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Card.Title style={{ fontSize: '36px' }}>Our Story</Card.Title>
                <HiOutlineBookOpen style={{ fontSize: '40px', marginLeft: '15px' }} />
              </div>
              <div className='pt-3'></div>
              <Card.Text style={{ fontSize: '21px' }}>
                We've all found it difficult at times to remove trash in an ethical way

              </Card.Text>
              <Card.Text style={{ fontSize: '21px' }}>
                SWUP desires to take away that inconvenience, and help you make the world a greener place
              </Card.Text>
            </Card.Body>
          </Col>
        </Col>
        <Col md={6}>
          <Image src="https://img.freepik.com/free-vector/tiny-people-reading-writing-poetry-poem-isolated-flat-vector-illustration-cartoon-characters-standing-sitting-near-open-book-ink-feather-entertainment-literature-concept_74855-13258.jpg?w=1380&t=st=1678307290~exp=1678307890~hmac=ac1896495f01b34e1fc230dfbbee9e86e282b904f7f4eee4ff8b15c69166fd92" fluid/>
        </Col>
      </Row>
          <div className='pt-5 pb-5'></div>

      <Row>
        <Col md={6}>
          <Image src="https://img.freepik.com/free-vector/internship-job-training-illustration_23-2148751181.jpg?w=1380&t=st=1678306870~exp=1678307470~hmac=abd33295701f112a724e84e786c19f070737cb786c8ef85f69a10ff103641a64" fluid/>
        </Col>
        <Col md={6} className="">
          <Col className='' style={{ height: '100%' }}>
            <Card.Body >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Card.Title style={{ fontSize: '36px' }}>How Does SWUP Work?</Card.Title>
                <FaRegLightbulb style={{ fontSize: '40px', marginLeft: '15px', marginBottom: '10px'}} />
              </div>
              <div className='pt-3'></div>
              <Card.Text style={{ fontSize: '21px' }}>
                SWUP works by allowing a customer to create a pickup request for various types of trash.
              </Card.Text>
              <Card.Text style={{ fontSize: '21px' }}>
                A worker, also known as a Swooper, will be able to see your posting and select it for pickup.
              </Card.Text>
            </Card.Body>
          </Col>
        </Col>
      </Row>


      </Container>




    </>
);
};

export default MainPageLoggedIn;
