import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

export function Header() {
  const navigate = useNavigate();

  const handleClick = () => {navigate('/');};

  return (<>
    <img alt='Home' src={require('./roll256.png')} onClick={handleClick} style={{ cursor: 'pointer' }}/>
  </>);
}

export function LoginButton() {
  const navigate = useNavigate();

  const handleLoginClick = () => {navigate('/login')};

  return (<>
    <Button label="Login" onClick={handleLoginClick}></Button>
  </>);
}