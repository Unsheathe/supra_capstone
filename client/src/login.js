import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
//import { FloatLabel } from "primereact/floatlabel";
//import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Cookies from 'js-cookie';
//import './login.css';
import { AuthContext } from './App';
import {Header} from './header.js'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const loginServer = 'http://localhost:8080/login';

  async function authenticate(username, password, requestType) {
    const response = await fetch(loginServer, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: username,
        pass: password,
        type: requestType,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log(error);
        return { message: 'Error Connecting to the Server' };
      });
  
    return response;
  }

  const login = async (e) => {
    e.preventDefault();
    let userValidation = formValidation(username, `Username`);
    let passValidation = formValidation(password, `Password`)
    if (!userValidation && !passValidation){
      const status = await authenticate(username, password, 'login');
      if (checked) {
        Cookies.set('username', username);
        Cookies.set('rememberMe', 'true');
      } else {
        Cookies.remove('username');
        Cookies.set('rememberMe', 'false');
      }
      handleResponse(status);
    } else {
      let msg = '';
      if (userValidation){
        msg = msg.concat(userValidation);
      }
      if (passValidation){
        msg = msg.concat(passValidation);
      }
      alert(msg)
    }
  };

  const handleResponse = (res) => {
    if (res.token) {
      Cookies.set('auth_token', res.token);
      setAuth(true);
      navigate(`/${res.userId}`)
    } else {
      alert(res.message)
    }
  };

  const handleRememberMe = () => {
    setChecked(!checked);
  };

  const formValidation = (input, inputType) => {
    let strRegex = new RegExp(/^[a-z0-9]+$/i);
    let validChars = strRegex.test(input); 
    let validLength =(input.length >=5) && (input.length <=30);
    let message = '';
    if (!validChars){
      message = message.concat(`Invalid Characters in ${inputType}, only alphanumeric characters are acceptable.\n`)
    }
    if (!validLength){
      message = message.concat(`Invalid Length in ${inputType}, input must be 5-30 characters.\n`)
    }
    if (validChars && validLength){
      return false;
    } else {
      return message
    }
  }

  return (<>
    <form>
      <Header />
      <h1>Log In</h1>
      <InputText id='username' type='text' minLength="1" maxLength = "25" placeholder={checked && username !=='' ? username : ""} value = {username} onChange={(e) => setUsername(e.target.value)} required />
      <br />
      <InputText id='password' type='password' placeholder="" value = {password} onChange={(e)=>setPassword(e.target.value)} required />
      <br />
      <input className='rememberMe' type="checkbox" checked={checked} onChange={handleRememberMe}/>Remember Me 
      <br />
      <Button label="Login" type="submit" onClick={(e)=>login(e)}></Button>
      <br />
      {/* <Dialog header="Alert" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}> {message} </Dialog> */}
      <Button visible={visible} onClick={()=> setVisible (false)}> {message} </Button>
    </form>
  </>)
}

export default Login