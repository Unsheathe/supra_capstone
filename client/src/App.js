// dependencies from sources
import './App.css';
import React, { useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {PrimeReactProvider} from 'primereact/api'
import Cookies from 'js-cookie'
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
// dependencies that I made
import Homepage from './homepage.js'
import StoreDetail from './storedetail.js'
import Login from './login.js'
import AllItems from './allitems.js'
import PageNotFound from './pagenotfound.js'

export const AuthContext = React.createContext()

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setAuth(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AuthContext.Provider value={{auth, setAuth}}>
        <PrimeReactProvider>
          <Routes>
            <Route exact path='/1' element={<Homepage/>} />
            <Route path='/:un_id' element={<StoreDetail/>} />
            <Route path='/login' element={<Login />}/>
            <Route path='/all' element={<AllItems />}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </PrimeReactProvider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
