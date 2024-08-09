import React, {useEffect, useState} from 'react'
import Header from './header'
import './allitems.css'
const server = 'http://localhost:8080/'

const AllItems = () => {
  const [inv, setInv] = useState([])
  const [focusItem, setFocusItem] = useState(null)
  const [focus, setFocus] = useState(null)

  //get details of a single item
  useEffect(()=>{
    fetch(`${server}i/${focusItem}`).then(res => res.json()).then(data => setFocus(data[0])).catch(err => console.log(err))
  }, [focusItem])

  //get list of all items
  useEffect(() => {
    fetch(`${server}all`).then(res => res.json()).then(data => setInv(data)).catch(err => console.log(err))
  }, [])

  return (<>
    <Header />
    <div>
      {Array.isArray(inv) && inv.length > 0 ? (
        inv.map((item) => (
          <div className='item' key={item.id}>
            <img alt={`${item.item_name}`} src={item.img} onClick={()=>{setFocusItem(item.id)}}/>
            <p>{item.item_name}</p>
            <br />

            {focus && focus.id === item.id? <div className='specificItem'>
              <h2>Product Details:</h2>
              <p>Description: {focus.desc}</p>
              <p>Current Stock: {focus.quan}</p>
              <p>Price: ${focus.price}</p>
              <a href={`/${item.un_id}`}>Sold here</a>
            </div> : null}
          </div>
        ))
      ) : (
        <p>No items found. Test your connection to the server.</p>
      )}
    </div>
  </>)
}

export default AllItems