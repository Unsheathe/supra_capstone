import React, {useEffect} from 'react'
import {Header, LoginButton, Viewer} from './header'



const Home = () => {

  useEffect(() => {
    //if they are logged in as admin, show additional buttons to make or delete accounts
  })

  return (<>
    <Header />
    <Viewer />
    <LoginButton />
    
    {/* <Stores />
    {un_id == 1 ? <EditUsers /> : <></>} */}
  </>)
}

export default Home