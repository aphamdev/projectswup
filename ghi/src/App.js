import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import { AuthProvider, useToken } from "./Auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInForm from "./LoginForm"
import SignupForm from "./SignupForm"
import PickupForm from './PickupForm.js';
import SwooperUpdateForm from './SwooperUpdateForm.js';
import SwooperHistoryList from './SwooperHistoryList.js';
import AvailableSwoops from './AvailableSwoops.js';
import CustomerPostList from './CustomerPostList.js';
import SwoopHistoryDetail from './SwoopHistoryDetail.js';

function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null
}

function App() {
  // const [launch_info, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log('fastapi url: ', url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, [])



  return(

    <div>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Routes>
              <Route path="/login" element={<LogInForm/>} />
              <Route path="/signup" element={<SignupForm/>} />
              <Route path="/pickups" element={<CustomerPostList />} />
              <Route path="/swoopers/signup" element={<SwooperUpdateForm/>}/>
              <Route path="/pickups/new" element={<PickupForm/>} />
              <Route path="/swoopshistory" element={<SwooperHistoryList/>} />
              <Route path="/listings" element={<AvailableSwoops/>} />
              <Route path="/swoopshistory/:pickup_id" element={<SwoopHistoryDetail/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
    </div>
  );

}


export default App;
