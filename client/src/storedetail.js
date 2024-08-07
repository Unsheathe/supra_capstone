import React, {useEffect, useState} from 'react'
import {Header, LoginButton} from './header'

const StoreDetail = () => {
  const [viewer, setViewer] = useState(0)
  const [inv, setInv] = useState([])

  useEffect(() => {
    fetch('localhost:8080/viewer').then(res => res.json()).then(data => setInv(data))
  }, [])

  return (<>
    <Header />
    <LoginButton />
    
    
  </>)
}

export default StoreDetail