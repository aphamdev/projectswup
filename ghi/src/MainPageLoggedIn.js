import React, { useState, useEffect} from 'react';
import ExpandingMain from './ExpandingCards/ExpandingMain';
import { Container, Row, Col, Card, Button, Carousel, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuthContext} from './Auth';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { FaRegLightbulb } from 'react-icons/fa';
import work from './img/work.jpg';
import main1 from './img/main1.jpg';
import main2 from './img/main2.jpg';
import main3 from './img/main3.jpg';

function  MainPageLoggedIn() {
  const backgroundImages = [
    main1,
    main2,
    main3
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
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {backgroundImages.map((image, idx) => (
            <Carousel.Item key={idx}>
            <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx}`}
                style={{ height: "700px", width: "100vw", objectFit: "cover" }}
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


    <div className="pt-5"></div>
    <div>
    <ExpandingMain/>
    </div>

    <Container style={{ marginTop: '50px', marginBottom: '50px'}}>
      <Row>
        <Col md={6} className="">

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
        <Col md={6}>
          <Image src="https://img.freepik.com/free-vector/tiny-people-reading-writing-poetry-poem-isolated-flat-vector-illustration-cartoon-characters-standing-sitting-near-open-book-ink-feather-entertainment-literature-concept_74855-13258.jpg?w=1380&t=st=1678307290~exp=1678307890~hmac=ac1896495f01b34e1fc230dfbbee9e86e282b904f7f4eee4ff8b15c69166fd92" fluid/>
        </Col>
      </Row>
          <div className='pt-5 pb-5'></div>

      <Row>
        <Col md={6}>
          <Image src={work} fluid/>
        </Col>
        <Col md={6} className="">

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
      </Row>


      </Container>




    </div>
);
};

export default MainPageLoggedIn;
