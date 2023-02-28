import { useAuthContext, useToken } from "./Auth";

import React, {useState} from 'react'

function LogInForm() {
  const { token } = useAuthContext();
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
    window.location.href = '/';
    console.log("LOGIN SUCCESS")
  }


   return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" value={username} onChange={handleUserNameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  );
}

export default LogInForm
