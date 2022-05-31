import React from 'react'
import { Link } from 'react-router-dom'

 const Navlinks = () => {
  return (
    <div>
    <Link to="./login"> Login</Link>
    <Link to="./signup"> Sign Up</Link>
    <Link to="./dashboard"> Dashboard</Link>
   </div>
  )
}

export default Navlinks;
