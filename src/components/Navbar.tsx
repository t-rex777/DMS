import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar bg-slate-700 flex justify-end'>
      <ul className='menu menu-horizontal px-1'>
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Contact us</a>
        </li>
        <li>
          <a>About Us</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
