import React, {useEffect, useState} from 'react'
import Header from './header'
import './allitems.css'

const AllItems = () => {
  const [inv, setInv] = useState([])

  //get list of all items
  useEffect(() => {
    fetch('http://localhost:8080/all').then(res => res.json()).then(data => setInv(data)).catch(err => console.log(err))
  }, [])

  return (<>
    <Header />
    <div>
      {Array.isArray(inv) && inv.length > 0 ? (
        inv.map((item) => (
          <div className='item' key={item.id}>
            <img alt={`${item.item_name}`} src={item.img} />
            <a href={`/${item.un_id}`}>{item.item_name}</a>
            <br />
          </div>
        ))
      ) : (
        <p>No items found. Test your connection to the server.</p>
      )}
    </div>
  </>)
}

export default AllItems