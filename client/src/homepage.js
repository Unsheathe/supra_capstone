import React, {useEffect} from 'react'
import {Header, LoginButton} from './header'

const Home = () => {

  useEffect(() => {
    //if they are logged in as root, show additional buttons to make or delete accounts
  })

  return (<>
    <Header />
    <LoginButton />
    
    {/* <Stores />
    {un_id == 1 ? <EditUsers /> : <></>} */}
  </>)
}

export default Home