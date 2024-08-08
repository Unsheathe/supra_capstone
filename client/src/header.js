import React from 'react';
import {useNavigate} from 'react-router-dom'
import {Button } from 'primereact/button'
import Cookies from 'js-cookie'
import './header.css'

//main header function: logo + other elements
export default function Header() {
  const navigate = useNavigate();

  return (<div className='header'>
    <img alt='Home' src={require('./roll256.png')} onClick={()=>navigate('/1')} style={{ cursor: 'pointer' }} className='home-icon'/>
    <Viewer />
    <LoginButton />
  </div>
  );
}

//log in/out button
function LoginButton() {
  const navigate = useNavigate();
  const user = Cookies.get('username')

  const handleLogoutClick = () => {
    Cookies.remove('username')
    Cookies.remove('un_id')
    Cookies.remove('auth_token')
    navigate('/1')
    window.location.reload()
  }

  //change text and functionality depending on if logged in or out
  return (<>
    <Button label="All items" onClick={()=>navigate('/all')}></Button>
    {user 
      ? (<Button label="Logout" onClick={handleLogoutClick} className="logout-button"></Button>
      ) : (
        <Button label="Login" onClick={()=>navigate('/login')} className="login-button"></Button>
    )}
  </>);
}

//find out who is logged in for custom message
function Viewer() {
  const user = Cookies.get('username')
  
  return(<>
    {user ? <p>Welcome back, {user}!</p> : <p>Viewing as guest</p>}
  </>)
}