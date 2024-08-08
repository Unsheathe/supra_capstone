import React, { useEffect, useState } from 'react';
import Header from './header';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Cookies from 'js-cookie';
import "./homepage.css";

const rmuser = () => {};
const mkuser = () => {};

const Admin = () => {
  return (
    <>
      <form>
        <h1>Add Store</h1>
        <InputText id='un' type='text' />
        <br />
        <InputText id='pw' type='password' />
        <br />
        <InputText id='store_name' type='text' />
        <br />
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

const Home = () => {
  const [viewer, setViewer] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userid = Cookies.get('un_id');
    if (userid) {
      setViewer(parseInt(userid, 10)); 
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Filter out the admin page
        const filteredUsers = data.filter(user => user.id !== 1);
        setUsers(filteredUsers);
      })
      .catch(err => console.error(err));
  }, []);

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
