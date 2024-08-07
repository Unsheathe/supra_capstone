import React, {useEffect, useState} from 'react'
import {Header, LoginButton, Viewer} from './header'
import "./homepage.css"

const Home = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null);

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
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    //if they are logged in as admin, show additional buttons to make or delete accounts
  })

  return (<>
    <Header />
    <Viewer />
    <LoginButton />
    <div>
      {users.map((user) => (
        <div className = 'storeIcon' key={user.id}>
          <img alt={`${user.store_name}`} src={user.logo} />
          <a href={`/:user.id`}>{user.store_name}</a>
          <br />
        </div>
      ))}
    </div>
  </>)
}

export default Home