// import React, {useEffect, useState} from 'react'
// import {useParams} from 'react-router-dom'
// import Header from './header'
// import {InputText } from 'primereact/inputtext';
// import {InputNumber} from 'primereact/inputnumber'
// import { Button} from 'primereact/button'
// import Cookies from 'js-cookie'

// //create new item
// const rmitem = () => {}
// //remove an item
// const mkitem = () => {}

// // extra functions if owner is logged in
// const Options = () => {
//   return (<>
//     <form>
//       <h1>Add stock</h1><br/>
//       Item name
//       <InputText id='item_name' type='text'/>
//       <br />
//       Description
//       <InputText id='desc' type='text' />
//       <br />
//       Quantity
//       <InputNumber id='quan' type='number'/>
//       <br />
//       Link to product photo
//       <InputText id='img' type='text' />
//       <br />
//       Price (Nearest dollar)
//       <InputNumber id='price' type='number'/>
//       <br />
//       <Button label="Add Item" type="submit" onClick={(e)=>mkitem(e)}></Button>
//     </form>
//     <form>
//       <h1>Remove stock</h1>
//       <InputText id='id' type='text'/>
//       <Button label="Delete Item" type="submit" onClick={(e)=>rmitem(e)}></Button>
//     </form>
//   </>)
// }

// //see who is viewing... is it store owner?
// const StoreDetail = () => {
//   const [viewer, setViewer] = useState(0)
//   const [inv, setInv] = useState([])
//   const {un_id}=useParams()

//   useEffect(() => {
//     const userid = Cookies.get('un_id')
//     if (userid){
//       setViewer(userid)
//     }
//   }, [])

//   //get all inventory from a store
//   useEffect(() => {
//     fetch(`http://localhost:8080/${un_id}`).then(res => res.json()).then(data => setInv(data)).catch(err => console.log(err))
//   }, [un_id])

//   return (<>
//     <Header />
//     <div>
//       {inv.map((e) => (
//         <div className = 'item'>
//           <img alt={`${e.item_name}`} src={e.img} />
//           <p>{e.item_name}</p>
//           <br />
//         </div>
//       ))}
//     </div>
//     {viewer === un_id ? <Options/> : null}
//   </>)
// }

// export default StoreDetail

import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Header from './header'
import {InputText } from 'primereact/inputtext';
import {InputNumber} from 'primereact/inputnumber'
import { Button} from 'primereact/button'
import Cookies from 'js-cookie'

const server = 'http://localhost:8080/'

//create new item
const rmitem = (e, item_name) => {
  e.preventDefault()
  const un_id = Cookies.get('un_id')
  fetch(`${server}${un_id}`, {
    method: 'DELETE',
    headers: {'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'},
    body: JSON.stringify({item_name})
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(error => {
      console.log(error);
      return { message: 'Error Connecting to the Server' };
    })
}

//remove an item
const mkitem = async (e, item_name, desc, quan, img, price) => {
  e.preventDefault()
  const un_id = Cookies.get('un_id')
  // fetch(`${server}${un_id}`, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     un_id, item_name, desc, quan, img, price})
  // }).then(res => res.json())
  //   .then(res => {
  //     console.log(res);
  //     return res;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     return { message: 'Error Connecting to the Server' };
  //   })
  try {
    const response = await fetch(`${server}${un_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        un_id, item_name, desc, quan, img, price
      })
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

// extra functions if owner is logged in
const Options = () => {
  //for adding
  const [item_name, setitem_name] = useState('')
  const [desc, setDesc] = useState('')
  const [quan, setquan] = useState(0)
  const [img, setimg] = useState('')
  const [price, setprice] = useState(0)
  //for removal
  const [rmitem_name, setrmitem_name] = useState('')

  return (<>
    <form>
      <h1>Add stock</h1><br/>
      Item name
      <InputText id='item_name' type='text' value = {item_name} onChange={(e) => setitem_name(e.target.value)} required/>
      <br />
      Description
      <InputText id='desc' type='text' value = {desc} onChange={(e) => setDesc(e.target.value)} required/>
      <br />
      Quantity
      <InputNumber id='quan' value = {quan} onChange={(e) => setquan(e.value)} min={0} useGrouping={false} required/>
      <br />
      Link to product photo
      <InputText id='img' type='text' value = {img} onChange={(e) => setimg(e.target.value)} required/>
      <br />
      Price
      <InputNumber id='price' value = {price} onChange={(e) => setprice(e.value)} min={0} useGrouping={false} required/>
      <br />
      <Button label="Add Item" type="submit" onClick={(e)=>mkitem(e, item_name, desc, quan, img, price)}></Button>
    </form>
    <form>
      <h1>Remove stock</h1>
      <InputText id='rmitem_name' type='text' value = {rmitem_name} onChange={(e) => setrmitem_name(e.target.value)} required/>
      <Button label="Delete Item" type="submit" onClick={(e)=>rmitem(e, rmitem_name)}></Button>
    </form>
  </>)
}

//see who is viewing... is it store owner?
const StoreDetail = () => {
  const [viewer, setViewer] = useState(0)
  const [inv, setInv] = useState([])
  const {un_id}=useParams()

  useEffect(() => {
    const userid = Cookies.get('un_id')
    if (userid){
      setViewer(userid)
    }
  }, [])

  //get all inventory from a store
  useEffect(() => {
    fetch(`${server}${un_id}`).then(res => res.json()).then(data => setInv(data)).catch(err => console.log(err))
  }, [un_id])

  return (<>
    <Header />
    <div>
      {inv.map((e) => (
        <div className = 'item'>
          <img alt={`${e.item_name}`} src={e.img} />
          <p>{e.item_name}</p>
          <br />
        </div>
      ))}
    </div>
    {viewer === un_id ? <Options/> : null}
  </>)
}

export default StoreDetail