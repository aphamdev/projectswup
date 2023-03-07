import * as Components from './components/components';
import { useToken } from "./Auth";
import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";

function LogInSignUp() {
  const { login, signup } = useToken();
  const [signIn, toggle] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  };

  // const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(
        first_name,
        last_name,
        phone_number,
        email,
        address,
        password,
        username
      );

      // navigate('/');
    } catch (error) {
      console.log(error);
      setErrorMessage(String(error));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      // navigate('/');
    } catch (error) {
      console.log(error);
      setErrorMessage(String(error));
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleSignupSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Username" onChange={handleUserNameChange} value={username} />
          <Components.Input type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
          <Components.Input type="text" placeholder="First Name" onChange={handleFirstNameChange} value={first_name} />
          <Components.Input type="text" placeholder="Last Name" onChange={handleLastNameChange} value={last_name} />
          <Components.Input type="text" placeholder="Phone Number" onChange={handlePhoneNumberChange} value={phone_number} />
          <Components.Input type="text" placeholder="Email" onChange={handleEmailChange} value={email} />
          <Components.Input type="text" placeholder="Address" onChange={handleAddressChange} value={address} />
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          <Components.Button type="submit">Sign Up</Components.Button>
          <p className="text-center text-muted">© 2023 SWUP Technologies Inc.</p>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" onChange={handleUserNameChange} value={username} />
          <Components.Input type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>

          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
                      <Components.Paragraph>
                          To keep connected with us please login with your personal info
                      </Components.Paragraph>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Sign In
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sign Up
                            </Components.GhostButton>
                      </Components.RightOverlayPanel>

                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>
      )
 }

 export default LogInSignUp;
