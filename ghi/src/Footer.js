import React from 'react'
import { NavLink } from 'react-router-dom';

function Footer() {
  return (

        <footer className="bg-dark text-white text-center py-3 sticky-bottom"
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
        }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>About Us</h5>
                <p>SWUP Technologies Inc. is a waste management platform that connects customers to local waste collectors.</p>
              </div>
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p>Email: contact@swup.com</p>
                <p>Phone: 1-800-SWUP</p>
              </div>
              <div className="col-md-4">
                <h5>Meet the Team</h5>
                <NavLink style={{textDecoration: 'none', color: 'white'}} to='/team'>Our Story</NavLink>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p>&copy; 2023 SWUP Technologies Inc. All rights reserved.</p>
          </div>
      </footer>
  )
}

export default Footer
