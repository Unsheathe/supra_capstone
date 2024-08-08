import React, { useEffect, useState } from 'react';
import Header from './header';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Cookies from 'js-cookie';
import "./homepage.css";
const server = 'http://localhost:8080/'

//create a new business account
const rmuser = async (e, store_name) => {
  try{
    const response = await fetch(server, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({store_name}),
    })
    const result = await response.json()
    console.log('Response:', result);

  } catch (error) {
    console.error('Error:', error);
  }
};

//delete a business account
const mkuser = async (e, un, pw, store_name, logo) => {
  // check input lengths
  if (un.length > 255 || store_name.length > 255 || logo.length > 1000 ) {
    alert('Input exceeds maximum allowed length');
    return;
  }

  //send data
  try {
    const response = await fetch(`${server}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ un, pw, store_name, logo }),
    });

    const result = await response.json();
    console.log('Response:', result);

  } catch (error) {
    console.error('Error:', error);
  }
};

//if admin is logged on, they can add/remove accounts
const Admin = () => {
  //for adding
  const [un, setun] = useState('')
  const [pw, setpw] = useState('')
  const [store_name, setstore_name] = useState('')
  const [logo, setlogo] = useState('')
  //for removing
  const [rmun, setrmun] = useState('')

  return (
    <>
      <form>
        <h1>Add Store account</h1>
        Username
        <InputText id='un' type='text' value = {un} onChange={(e) => setun(e.target.value)} required/>
        <br />
        Password
        <InputText id='pw' type='password' value = {pw} onChange={(e) => setpw(e.target.value)} required/>
        <br />
        Store Name
        <InputText id='store_name' type='text' value = {store_name} onChange={(e) => setstore_name(e.target.value)} required/>
        <br />
        URL to logo
        <InputText id='logo' type='text' value = {logo} onChange={(e) => setlogo(e.target.value)} required/>
        <br />
        <Button label="Add Store" type="submit" onClick={(e) => mkuser(e, un, pw, store_name, logo)}></Button>
      </form>
      <form>
        <h1>Remove Store</h1>
        Store name:
        <InputText id='rmun' type='text' value = {rmun} onChange={(e) => setrmun(e.target.value)} required/>
        <Button label="Delete Store" type="submit" onClick={(e) => rmuser(e, rmun)}></Button>
      </form>
    </>
  );
};

//main render function of homepage
const Home = () => {
  const [viewer, setViewer] = useState(null);
  const [users, setUsers] = useState([]);

  //find out who is logged in... is it admin?
  useEffect(() => {
    const userid = Cookies.get('un_id');
    if (userid) {
      setViewer(parseInt(userid, 10)); 
    }
  }, []);

  //grab all current accounts
  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // ignoring admin user, create var of all account data
        const filteredUsers = data.filter(user => user.id !== 1);
        setUsers(filteredUsers);
      })
      .catch(err => console.error(err));
  }, []);

  //render a page with links to every store
  return (
    <>
      <Header />
      <div> 
        {users.map((user) => (
          <div className='storeIcon' key={user.id}>
            <img alt={`${user.store_name}`} src={user.logo} />
            <a href={`/${user.id}`}>{user.store_name}</a>
            <br />
          </div>
        ))}
      </div>
      {viewer === 1 ? <Admin /> : null} {/* Show Admin component if viewer is admin (id 1) */}
    </>
  );
};

export default Home;
