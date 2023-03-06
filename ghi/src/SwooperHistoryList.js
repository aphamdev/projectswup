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
  }, [token]);

  const handleRowClick = (swoop) => {
    setSelectedRow(selectedRow === swoop ? null : swoop);
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
      <div className="accordion" >
        {swoops.map((swoop) => {
          const isRowSelected = selectedRow === swoop;
          return (
            <React.Fragment key={swoop.swooper_id}>
              <div className="my-3 border rounded-pill p-4" onClick={() => handleRowClick(swoop)}>
                <Row className="d-flex align-items-center justify-content-between">
                  <Col md={3} className="text-center text-muted border-right">
                    {swoop.trash_type}
                  </Col>
                  <Col md={3} className="text-center border-right">
                    {swoop.description}
                  </Col>
                  <Col md={3} className="text-center border-right">
                    {swoop.hazards}
                  </Col>
                  <Col md={3} className="text-center border-right">
                    {swoop.status === 1 ? (
                      <Button
                        variant="primary"
                        onClick={() => finishSwoop(swoop)}
                      >
                        Complete
                      </Button>
                    ) : (
                      <span className="text-success">Completed</span>
                    )}
                  </Col>
                </Row>
              </div>
              {isRowSelected && (
                <Row className="my-3">
                  <Col md={12}>
                    <Card className="rounded border shadow-sm">
                      <Card.Body>
                        <SwoopHistoryDetail id={swoop.pickup_id} />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Container>
  </div>
);
}

export default SwooperHistoryList;
