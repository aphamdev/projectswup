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
  <div className="container w-25 mt-5">
    <div className="card p-5 shadow">
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <h1 className="text-center fw-bold fs-1 h3 mb-3 fw-normal">Sign Up!</h1>
        <div className="form-floating">
            <input type="text" className="form-control" value={username} onChange={handleUserNameChange} />
          <label>
            Username:
          </label>
          <br />
        </div>
        <div className="form-floating">
            <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
          <label>
            Password:
          </label>
          <br />
        </div>
        <div className="form-floating">
            <input type="text" className="form-control" value={first_name} onChange={handleFirstNameChange} />
          <label>
            First Name:
          </label>
          <br />
        </div>
        <div className="form-floating">
            <input type="text" className="form-control" value={last_name} onChange={handleLastNameChange} />
          <label>
            Last Name:
          </label>
          <br />
        </div>
        <div className="form-floating">
            <input type="text" className="form-control" value={phone_number} onChange={handlePhoneNumberChange} />
          <label>
            Phone number:
          </label>
          <br />
        </div>
        <div className="form-floating">
            <input type="text" className="form-control" value={email} onChange={handleEmailChange} />
          <label>
            Email:
          </label>
          <br />
        </div>
        <div className="form-floating">
            <input type="text" className="form-control" value={address} onChange={handleAddressChange} />
          <label>
            Address:
          </label>
          <br />
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up!</button>
        <p className="text-center mt-5 mb-3 text-muted">© 2023 SWUP Technologies Inc.</p>
      </form>
    </div>
  </div>
);

}

export default SignupForm;
