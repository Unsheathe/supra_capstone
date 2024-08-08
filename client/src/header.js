import React from 'react';
import {useNavigate } from 'react-router-dom'
import {Button } from 'primereact/button'
import Cookies from 'js-cookie'
import './header.css'

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {navigate('/1');};

  return (<div className='header'>
    <img alt='Home' src={require('./roll256.png')} onClick={handleClick} style={{ cursor: 'pointer' }} className='home-icon'/>
    <Viewer />
    <LoginButton />
  </div>);
}

function LoginButton() {
  const navigate = useNavigate();
  const user = Cookies.get('username')

  const handleLoginClick = () => {navigate('/login')};
  const handleLogoutClick = () => {
    Cookies.remove('username')
    Cookies.remove('un_id')
    Cookies.remove('auth_token')
    navigate('/1')
    window.location.reload()
  }

  return (<>
    {user 
      ? (<Button label="Logout" onClick={handleLogoutClick} className="logout-button"></Button>
      ) : (
        <Button label="Login" onClick={handleLoginClick} className="login-button"></Button>
      )}
  </>);
}

function Viewer() {
  //find out who is logged in
  const user = Cookies.get('username')
  
  return(<>
    {user ? <p>Welcome back, {user}!</p> : <p>Viewing as guest</p>}
  </>)
}