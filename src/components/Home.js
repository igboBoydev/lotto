import React from 'react'
import { useGlobalContext } from '../context/context'

const Home = () => {
    const { isLoading, grantAccess, newUsers } = useGlobalContext()
    if (grantAccess.length !== 0) {
        console.log(grantAccess.userLogin)
    }

    if (newUsers) {
        console.log('Added A user')
        console.log(newUsers)
    }
    if (isLoading) {
        
      return (
          <div>
              <h1>Loading...</h1>
       </div>
      )
    }
    return (
        <div>
          
        </div>
    )
}

export default Home
