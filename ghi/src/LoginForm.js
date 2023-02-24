import { useToken } from "./Auth";
import React, {useState} from 'react'

function LogInForm() {
  const { token, login } = useToken();
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
    console.log('login successful +++++++++++++++++++++++++++++++++++++++++++++++++++')
  }


   return (
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
      <button type="submit">Log In</button>
    </form>
  );
}

export default LogInForm
