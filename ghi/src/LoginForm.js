import { useToken } from "./Auth";
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function LogInForm() {
  const { login } = useToken();
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault()
      await login(username, password)
      navigate("/");
    }


   return (
    <>
      <div className="container w-25 mt-5">
        <div className="card p-5 shadow">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center fw-bold fs-1 h3 mb-3 fw-normal">Please sign in!</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={username} onChange={handleUserNameChange}/>
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handlePasswordChange}/>
            <label for="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p className="text-center mt-5 mb-3 text-muted">© 2023 SWUP Technologies Inc.</p>
        </form>
      </div>
      </div>
    </>
    );
  }

export default LogInForm
