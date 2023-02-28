import React, {useEffect, useState} from 'react';
import { useToken } from './Auth';


function CustomerPostList() {
const [posts, setPostsChange] = useState([])
const { token } = useToken();

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
  fetchAllCustomerPosts();
}, [token]);

return (
  <>
  <div className="row">

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
                                {post.swooper_id === null ? (
                                  <td>N/A</td>
                                ) : (
                                  <td>{post.swooper_id}</td>
                                )}
                                <td>{post.trash_type}</td>
                                <td>{post.description}</td>
                                <td>{post.picture_url}</td>
                                <td>{post.hazards}</td>
                                <td>{post.size}</td>
                                <td>{post.weight}</td>
                                {post.status === 0 ? (
                                  <td>Pending</td>
                                ) : post.status === 1 ? (
                                  <td>In Progress</td>
                                ) : (
                                  <td>Completed</td>
                                )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    </div>
                </div>
            </div>
    </div>
  </>
)

}


export default CustomerPostList;
