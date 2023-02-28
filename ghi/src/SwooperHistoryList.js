import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useAuthContext, useUser } from './Auth.js';
import SwoopHistoryDetail from './SwoopHistoryDetail.js';
import { NavLink, Link } from 'react-router-dom';

function SwooperHistoryList() {
  const [swoops, setSwoops] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const { token } = useAuthContext();

  const fetchSwoops = async () => {
    const url = `http://localhost:8080/swoops`;
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
      console.log("THIS IS LIST DATA", data)
    }
  };

  useEffect(() => {
    fetchSwoops();
  }, [token]);

  const handleRowClick = (swoop) => {
    setSelectedRow(selectedRow === swoop ? null : swoop);
  };

  return (
    <div>
      <h1>Your Swoops</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Trash Type</th>
            <th>Description</th>
            <th>Hazards</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {swoops.map((swoop) => {
            const isRowSelected = selectedRow === swoop;
            return (
              <React.Fragment key={swoop.swooper_id}>
                <tr onClick={() => handleRowClick(swoop)}>
                  <td>{swoop.trash_type}</td>
                  <td>{swoop.description}</td>
                  <td>{swoop.hazards}</td>
                  <td>{swoop.status}</td>
                  <td></td>
                </tr>
                {isRowSelected && (
                  <tr>
                    <td colSpan={5}>
                      <SwoopHistoryDetail id={swoop.pickup_id} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SwooperHistoryList;
