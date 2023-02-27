import React, {useEffect, useState} from 'react';
import { useToken } from './Auth';
import { useAuthContext } from './Auth';


function CustomerPostList() {

// const { token } = useAuthContext();
const [posts, setPostsChange] = useState([])

const { token, login } = useToken();



///// grab all of the customer posts ////
const fetchAllCustomerPosts = async () => {

  const customerPostUrl = `http://localhost:8080/pickups`

  const fetchConfig = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await fetch(customerPostUrl, fetchConfig);



  if (response.ok) {
    const data = await response.json();
    setPostsChange(data);
  }

}

//////any uses effects/////
useEffect(() => {
  // useAuthContext();
  // useToken();
  fetchAllCustomerPosts();
}, []);

return (
  <>
  <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>All Your Posts</h1>
            <div className="mb-3">
                    <div>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Pickup #</th>
                          <th>Swooper</th>
                          <th>Trash Type</th>
                          <th>Description</th>
                          <th>Picture</th>
                          <th>Hazards</th>
                          <th>Size</th>
                          <th>Weight</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                      {posts.map(post => {
                          return (
                            <tr key={post.pickup_id}>
                                <td>{post.pickup_id}</td>
                                {/* <td>{post.swooper_id}</td> */}
                                <td>{post.customer_id}</td>
                                <td>{post.trash_type}</td>
                                <td>{post.description}</td>
                                <td>{post.picture_url}</td>
                                <td>{post.hazards}</td>
                                <td>{post.size}</td>
                                <td>{post.weight}</td>
                                <td>{post.status}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </>
)

}


export default CustomerPostList;
