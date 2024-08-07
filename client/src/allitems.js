import React, {useEffect, useState} from 'react'
import {Header, LoginButton, Viewer} from './header'
import './allitems.css'

const AllItems = () => {
  const [inv, setInv] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/all').then(res => res.json()).then(data => setInv(data)).catch(err => console.log(err))
  }, [])

  return (<>
    <Header />
    <Viewer />
    <LoginButton />
    <div>
      {inv.map((item) => (
        <div className = 'item'>
          <img alt={`${item.item_name}`} src={item.img} />
          <a href={`/:un.id`}>{item.item_name}</a>
          <br />
        </div>
      ))}
    </div>
  </>)
}

export default AllItems