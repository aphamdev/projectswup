import React, {useEffect, useState} from 'react';
import { useToken } from './Auth';
import CustomerPostDetail from './DetailCustomerPost';
import { Row, Col, Container, Card} from 'react-bootstrap';


function CustomerPostList() {

const [swoops, setSwoops] = useState([])
const [selectedRow, setSelectedRow] = useState(null);
const { token } = useToken();

//////any uses effects/////
useEffect(() => {
  const fetchAllCustomerPosts = async () => {
    const customerPostUrl = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/pickups`
    const fetchConfig = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(customerPostUrl, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setSwoops(data);
    }
  }
  fetchAllCustomerPosts();
}, [token]);

 const handleRowClick = (swoop) => {
    setSelectedRow(selectedRow === swoop ? null : swoop);
  };

return (
  <Container>
    <h1 className="text-center mt-4 mb-4">Your Posts</h1>
    <Col >
      <section>
        {swoops.map((swoop) => {
          const isRowSelected = selectedRow === swoop;
          return (
            <React.Fragment key={swoop.swooper_id}>
              <div className="my-3 border rounded-pill p-4 dog bg-light" onClick={() => handleRowClick(swoop)}>
                <Row className="font-weight-bold d-flex align-items-center justify-content-between ">
                  <Col> Post
                  </Col>
                  <Col> Trash Type
                  </Col>
                  <Col> Description
                  </Col>
                  <Col> Hazards
                  </Col>
                  <Col> Status
                  </Col>
                </Row>
                <Row>
                  <Col> #{swoop.pickup_id}
                  </Col>
                  <Col> {swoop.trash_type}
                  </Col>
                  <Col> {swoop.description}
                  </Col>
                  <Col> {swoop.hazards}
                  </Col>
                  <Col style={{color: swoop.status === 1 ? 'gold' : swoop.status === 2 ? 'green' : 'red'}}>
                    {swoop.status === 1 ? 'In Progress' : swoop.status === 2 ? 'Completed' : 'Not Accepted'}
                  </Col>
                </Row>
              </div >
              {isRowSelected && (
                <div className="swoop-detail">
                  <Row className="my-3 " >
                    <Col md={12}>
                      <Card className="rounded border shadow-sm">
                        <Card.Body>
                          {swoop.swooper_id != null ? (
                        <CustomerPostDetail id={swoop.pickup_id} />
                      ) : (
                        <div className="center">
                          Your request is currently pending for a Swooper to accept your job. Kindly check again later.
                        </div>
                      )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </section>
    </Col>
  </Container>
  )};

export default CustomerPostList;
