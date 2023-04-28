import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar bg-slate-700 flex justify-end'>
      <ul className='menu menu-horizontal px-1 gap-2'>
        <li className='bg-primary rounded'>
          <a>Home</a>
        </li>
        <li className='bg-primary rounded'>
          <a>Contact us</a>
        </li>
        <li className='bg-primary rounded'>
          <a>About Us</a>
        </li>
        <li className='bg-primary rounded'>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
