import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Container} from 'react-bootstrap';
import { useAuthContext} from './Auth.js';
import SwoopHistoryDetail from './SwoopHistoryDetail.js';




function SwooperHistoryList() {
  const [swoops, setSwoops] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const { token } = useAuthContext();


  useEffect(() => {
      const fetchSwoops = async () => {
        const url = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/swoops`;
        const fetchConfig = {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
          const data = await response.json();
          setSwoops(data);
        }
      }
    fetchSwoops();
  }, [token, ]);



  const handleRowClick = (swoop) => {
    if (selectedRow === swoop) {
      setSelectedRow(null);
      return;
    }
    setSelectedRow(swoop);


  };


  const finishSwoop = async (swoop) => {

        const swoopUrl = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/swoops/complete/${swoop.pickup_id}`

        const data = {};
        data.trash_type = swoop.trash_type
        data.description = swoop.description
        data.picture_url = swoop.picture_url
        data.hazards = swoop.hazards
        data.size = swoop.size
        data.weight = swoop.weight


        const fetchConfig  = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(swoopUrl, fetchConfig)
        if (response.ok) {
            console.log("Swoop Succesfully Completed!")
              const fetchSwoops = async () => {
                const url = `${process.env.REACT_APP_SWOOP_SERVICE_API_HOST}/swoops`;
                const fetchConfig = {
                  method: "get",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const response = await fetch(url, fetchConfig);

                if (response.ok) {
                  const data = await response.json();
                  setSwoops(data);
                }
              }
              fetchSwoops();
        }
    }

  return (
 <div className="bg-white py-5">
  <Container>
    <h1 className="text-center mb-5 font-weight-bold">Your Swoops</h1>
    <Row>
      <Col md={2} className="d-sm-block d-none" style={{ position: 'sticky', top: '0', height: '100vh', width: '200px' }}>
        {/* Left sidebar */}
        <div className="p-3 bg-light border rounded">
          <p>Left sidebar content here</p>
        </div>
      </Col>
      <Col md={1}></Col>

      <Col md={6} style={{ overflowY: 'auto', height: '100vh' }}>
        {/* Center column */}
        <section>
          {swoops.map((swoop) => {
            const isRowSelected = selectedRow === swoop;
            return (
              <React.Fragment key={swoop.swooper_id}>
                <div className="my-3 border rounded-pill p-4 dog" onClick={() => handleRowClick(swoop)}>
                  <Row className="d-flex align-items-center justify-content-between">
                    <Col md={3} className="text-center text-muted border-right">
                      {swoop.trash_type}
                    </Col>
                    {/* <Col md={3} className="text-center border-right">
                      {swoop.description}
                    </Col> */}
                    <Col md={3} className="text-center border-right">
                      {swoop.hazards}
                    </Col>
                    <Col md={3} className="text-center border-right">
                      {swoop.status === 1 ? (
                        <Button variant="primary" onClick={() => finishSwoop(swoop)}>
                          Complete
                        </Button>
                      ) : (
                        <span className="text-success">Completed</span>
                      )}
                    </Col>
                  </Row>
                </div >
                {isRowSelected && (
                  <div className="swoop-detail">
                    <Row className="my-3 " >
                      <Col md={12}>
                        <Card className="rounded border shadow-sm">
                          <Card.Body>
                            <SwoopHistoryDetail id={swoop.pickup_id} />
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

      <Col md={1}></Col>
      <Col md={2} className="d-md-block d-none" style={{ position: 'sticky', top: '0', height: '100vh', width: '200px' }}>
        {/* Right sidebar */}
        <div className="p-3 bg-light border rounded">
          <p>Right sidebar content here</p>
        </div>
      </Col>
    </Row>
  </Container>
</div>
);
}


export default SwooperHistoryList;
