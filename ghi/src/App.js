import { AuthProvider, useToken} from "./Auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInForm from "./LoginForm"
import SignupForm from "./SignupForm"
import PickupForm from './PickupForm.js';
import LogInSignUp from "./togglesignin";
import Nav from './Nav.js';
import SwooperUpdateForm from './SwooperUpdateForm.js';
import SwooperHistoryList from './SwooperHistoryList.js';
import AvailableSwoops from './AvailableSwoops.js';
import CustomerPostList from './CustomerPostList.js';
import CustomerPostDetail from './DetailCustomerPost.js';
import SwoopHistoryDetail from './SwoopHistoryDetail.js';
import MainPage from './MainPage.js';
import ProfilePage from './Profilepage/ProfilePage.js';

import Team from './Team.js'
import MainPageLoggedIn from "./MainPageLoggedIn";
import Footer from "./Footer";


function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null
}

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  return(
    <div style={{ paddingBottom: "300px" }}> {/* Add 80px padding to the bottom */}
      <BrowserRouter basname={basename}>
          <AuthProvider>
            <GetToken />
              <Nav />
              <Routes>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/" element={<MainPage/>} />
                <Route path="/test" element={<LogInSignUp/>} />
                <Route path="/login" element={<LogInForm/>} />
                <Route path="/signup" element={<SignupForm/>} />
                <Route path="/pickups" element={<CustomerPostList />} />
                <Route path="/swoopers/signup" element={<SwooperUpdateForm/>}/>
                <Route path="/newpickup" element={<PickupForm/>} />
                <Route path="/swoopshistory" element={<SwooperHistoryList/>} />
                <Route path="/listings" element={<AvailableSwoops/>} />
                <Route path="/swoopshistory/:pickup_id" element={<SwoopHistoryDetail/>} />
                <Route path="/pickups/{pickup_id}" element={<CustomerPostDetail />} />
                <Route path="/team" element={<Team />} />
                <Route path="/loggedin" element={<MainPageLoggedIn />} />
              </Routes>
              <Footer/>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );

  }


export default App;
