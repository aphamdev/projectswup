import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import { useToken } from "./Auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInForm from "./LoginForm"
import SignupForm from "./SignupForm"
import PickupForm from './PickupForm.js';
import SwooperUpdateForm from './SwooperUpdateForm.js';
import { AuthProvider } from "./Auth";

function GetToken() {
  useToken();
  return null;
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
            <Route path="/swooper_sign_up" element={<SwooperUpdateForm/>}/>
            <Route path="/pickups/new" element={<PickupForm/>} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
      {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
    </div>
  );
}

export default App;
