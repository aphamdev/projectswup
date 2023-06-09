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
import './MainPageLeggedIn.css';


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
    const [selectedButton, setSelectedButton] = useState("sales");

    const handleToggle = (selected) => {
      setSelectedButton(selected);
      console.log(selected)
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
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{
        position: 'relative',
        zIndex: '1'
      }}>
        {backgroundImages.slice(0, ).map((image, idx) => (

            <Carousel.Item key={idx}>
            <img
                className="d-block w-100"
                src={image}
                alt={`Slide ${idx}`}
                style={{ height: "750px", width: "100vw", objectFit: "cover"}}/>
            </Carousel.Item>
        ))}
    </Carousel>
    <p
    style={{
      marginTop: "34%",
      marginLeft: "44.5%",
      top: '0',
      left: '0',
      position: 'absolute',
      zIndex: '2'
    }}>© 2023 SWUP Technologies Inc.</p>
    {user.is_swooper === false ? (
      <>
      <div
        className="shadow-lg p-5 mb-5 bg-white"
        style={{
          maxWidth: '500px',
          marginTop: '11%',
          marginLeft: '22.75%',
          borderRadius: '20px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2',
        }}
      >
        <div className="card-body text-black">
          <div className="d-flex align-items-center mb-4">
            <div>
              <h3 className="font-weight-bold mb-1">Schedule a Swoop</h3>
              <p>Schedule a convenient way for your pickup and get it done today!</p>
            </div>
          </div>
          <NavLink to="/newpickup" className="nav-link">
            <Button variant="dark" size="lg" block>
              Schedule Now
            </Button>
          </NavLink>
        </div>
      </div>
      <div
        className="shadow-lg p-5 mb-5 bg-white"
        style={{
          maxWidth: '500px',
          marginTop: '11%',
          marginLeft: '22.75%',
          borderRadius: '20px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2',
        }}
      >
        <div className="card-body text-black">
          <div className="d-flex align-items-center mb-4">
            <div>
              <h3 className="font-weight-bold mb-1">Join the SWUP Team</h3>
              <p>Earn money by becoming a Swooper and complete pickups.</p>
            </div>
          </div>
          <NavLink to="/swoopers/signup" className="nav-link">
            <Button variant="dark" size="lg" block>
              Sign Up Now
            </Button>
          </NavLink>
        </div>
      </div>
      </>

    ) : (
      <>
      <div class="card shadow-lg p-5 mb-5 bg-white second-div"
        style={{
            maxWidth: "500px",
            marginTop: "11%",
            marginLeft: "22.75%",
            borderRadius: '20px',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '2'
          }}>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li>
            <button button onClick={() => handleToggle("sales")} data-bs-toggle="button" type="button" class="btn btn-white">Get a Swoop</button>
          </li>
          <li>
            <button onClick={() => handleToggle("service")} data-bs-toggle="button" type="button" class="btn btn-white">Swoops list</button>
          </li>
        </ul>
        {selectedButton === "sales" && (
          <div class="tab-pane fade show active">
            <div className="card-body text-black">
              <div className="d-flex align-items-center mb-4">
                  <div>
                  <h3 className="font-weight-bold mb-1"> Available Swoops</h3>
                  <p>View a list of available swoops that need to get picked up today!</p>
                  </div>
              </div>
              <NavLink to="/listings" className='btn btn-dark'>Get a Swoop</NavLink>
            </div>
          </div>

        )}
        {selectedButton === "service" && (
            <div class="tab-pane fade show active">
              <div className="card-body text-black">
                <div className="d-flex align-items-center mb-4">
                    <div>
                      <h3 className="font-weight-bold mb-1">Current and Past Swoops</h3>
                      <p>View your current swoops and past swoops by clicking below!</p>
                    </div>
                </div>

                    <NavLink to="/swoopshistory" className='btn btn-dark' variant="dark" size="lg" block>Swoop History</NavLink>

                </div>
            </div>

        )}


      </div>

{/* <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Swoop History</a> */}
      {/* <div className="card shadow-lg p-5 mb-5 bg-white second-div"
        style={{
          maxWidth: "500px",
          marginTop: "11%",
          marginLeft: "22.75%",
          borderRadius: '20px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2'
        }}>
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

      <div className="card shadow-lg p-5 mb-5 bg-white"
        style={{
          maxWidth: "500px",
          marginTop: "11%",
          marginLeft: "52.75%",
          borderRadius: '20px',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2'
        }}>
          <div className="card-body text-black">
          <div className="d-flex align-items-center mb-4">
              <div>
              <h3 className="font-weight-bold mb-1">Current and Past Swoops</h3>
              <p>View your current swoops and past swoops by clicking below!</p>
              </div>
          </div>
          <NavLink to="/swoopshistory" className="nav-link"><Button variant="dark" size="lg" block>Swoop History</Button></NavLink>
          </div>
      </div> */}
      </>
    )}
    <div>
      <ExpandingMain/>
      <Container style={{ marginTop: '50px', marginBottom: '50px'}}>
        <Row>
          <Col md={6} className="" style={{ marginTop: '40px'}}>

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
                <div className="con pt-2">
                  <NavLink to="/team" className="nav-link">
                    <button>
                      <span className="circle">
                        <span class="icon arrow"></span>
                      </span>

                      <span class="text">Learn More</span>
                    </button>
                  </NavLink>
                </div>
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
                <div className="con pt-2">
                  <NavLink to="/team" className="nav-link">
                    <button>
                      <span className="circle">
                        <span class="icon arrow"></span>
                      </span>

                      <span class="text">Learn More</span>
                    </button>
                  </NavLink>
                </div>
              </Card.Body>

          </Col>
        </Row>


      </Container>
    </div>
  </>
);
};

export default MainPageLoggedIn;
