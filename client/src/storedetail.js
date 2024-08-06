import React, {useEffect} from 'react'
import {Header, LoginButton} from './header'

const StoreDetail = () => {
  const [viewer, setViewer] = useState(0)

  useEffect(() => {
    //if they are logged in as THAT store owner, show additional buttons to make or delete from inventory
  })

  return (<>
    <Header />
    <LoginButton />
    
    
  </>)
}

export default StoreDetail