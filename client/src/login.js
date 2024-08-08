import {useState, useContext, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import Cookies from 'js-cookie'
import './login.css';
import {AuthContext} from './App'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const loginServer = 'http://localhost:8080/login';

  //check credentials of person logging in
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
        return res;
      })
      .catch(error => {
        console.log(error);
        return { message: 'Error Connecting to the Server' };
      });
  
    return response;
  }

  //send data and do things depending if valid user
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

  //create persistence of who is logged in, with cookies
  const handleResponse = (res) => {
    if (res.token) {
      Cookies.set('auth_token', res.token);
      Cookies.set('un_id', res.id)
      setAuth(true);
      navigate(`/${res.id}`)
    } else {
      alert(res.message)
    }
  };

  //make sure their un&pw don't suck
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

  //display a fillable form and send-buttons
  return (<>
    <form>
      <img alt='Home' src={require('./roll256.png')} onClick={()=> navigate('/1')} style={{ cursor: 'pointer' }} />
      <h1>Log In</h1><br/>
      Username
      <InputText id='username' type='text' minLength="1" maxLength = "25" placeholder={checked && username !=='' ? username : ""} value = {username} onChange={(e) => setUsername(e.target.value)} required />
      <br />
      Password
      <InputText id='password' type='password' placeholder="" value = {password} onChange={(e)=>setPassword(e.target.value)} required />
      <br />
      {/* <input className='rememberMe' type="checkbox" checked={checked} onChange={handleRememberMe}/>Remember Me 
      <br /> */}
      <Button label="Login" type="submit" onClick={(e)=>login(e)}></Button>
      <br />
      <Button visible={visible} onClick={()=> setVisible (false)}> {message} </Button>
    </form>
  </>)
}

export default Login