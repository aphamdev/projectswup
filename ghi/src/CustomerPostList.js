import React, {useEffect, useState} from 'react';
import { useToken } from './Auth';
import CustomerPostDetail from './DetailCustomerPost';

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
    <div>
      <h1>Your Pickups</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Pick Up</th>
            {/* <th>Swooper</th> */}
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
                  <td>{swoop.pickup_id}</td>
                  {/* <td>{swoop.swooper_id}</td> */}
                  <td>{swoop.trash_type}</td>
                  <td>{swoop.description}</td>
                  <td>{swoop.hazards}</td>
                  <td>{swoop.status === 1 ? 'In Progress' : swoop.status === 2 ? 'Completed' : 'Not Accepted'}</td>
                  <td></td>
                </tr>
                  {isRowSelected && (

                    <tr>
                      <td colSpan={5}>
                      {swoop.swooper_id != null ? (
                          <CustomerPostDetail id={swoop.pickup_id} />
                        ) : (
                          <div>Waiting for Swooper to accept your job</div>
                        )}
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

export default CustomerPostList;
