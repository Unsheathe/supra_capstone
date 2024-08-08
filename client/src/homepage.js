import React, { useEffect, useState } from 'react';
import Header from './header';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Cookies from 'js-cookie';
import "./homepage.css";

//create a new business account
const rmuser = () => {};
//delete a business account
const mkuser = () => {};

//if admin is logged on, they can add/remove accounts
const Admin = () => {
  return (
    <>
      <form>
        <h1>Add Store account</h1>
        Username
        <InputText id='un' type='text' />
        <br />
        Password
        <InputText id='pw' type='password' />
        <br />
        Store Name
        <InputText id='store_name' type='text' />
        <br />
        URL to logo
        <InputText id='logo' type='text' />
        <br />
        <Button label="Add Store" type="submit" onClick={(e) => mkuser(e)}></Button>
      </form>
      <form>
        <h1>Remove Store</h1>
        <InputText id='id' type='text' />
        <Button label="Delete Store" type="submit" onClick={(e) => rmuser(e)}></Button>
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
