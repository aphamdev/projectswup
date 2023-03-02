import { useToken } from "./Auth";
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const { signup } = useToken();
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  }

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  }

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  }

   const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  }

    const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
  }


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
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
      navigate("/");
    } catch (error) {
      console.log(error)
      setErrorMessage(String(error))
    //   if (error.response) {
    //   setErrorMessage(error.response.data.detail);
    //   console.log(error.response.data.detail)
    // } else {
    //   setErrorMessage("Something went wrong. Please try again later.");
    //   // console.log(error)
    //   // console.log("THIS IS THE ERRRORRRRRRRRR", error.message)
    //   // setErrorMessage(error);
    // }
  }
  };
  //   await signup(first_name, last_name, phone_number,
  //       email, address, password, username)
  //   window.location.href = '/';




   return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUserNameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" value={first_name} onChange={handleFirstNameChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={last_name} onChange={handleLastNameChange} />
      </label>
      <br />
      <label>
        Phone number:
        <input type="text" value={phone_number} onChange={handlePhoneNumberChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={handleAddressChange} />
      </label>
      <br />
      <button type="submit">Sign Up!</button>
    </form>
    </div>
  );
}

export default SignupForm;
