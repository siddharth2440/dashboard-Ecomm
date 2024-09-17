import React from 'react'
import { useUserStore } from '../stores/useUserStore.js'

const Homepage = () => {
  const checkingAuth = useUserStore((state) => state.checkingAuth );
  const user = useUserStore((state) => state.user);
  console.log(user);
  
  return (
    <div>Homepage  </div>
  )
}

export default Homepage