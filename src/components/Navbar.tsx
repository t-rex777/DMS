import React from 'react'
import { useAuthState } from '../store/auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const { setUserDetails } = useAuthState()

  const logout = () => {
    setUserDetails({ role: 'student', dob: '', email: '', name: '', userId: '' } as any)
    navigate('/login')
  }

  return (
    <div className='navbar bg-slate-600 flex justify-end absolute top-0 z-50'>
      <ul className='menu menu-horizontal px-1 gap-2'>
        <li className='bg-primary rounded' onClick={() => navigate('/')}>
          <a>Home</a>
        </li>
        <li className='bg-primary rounded' onClick={() => navigate('/contact-us')}>
          <a>Contact us</a>
        </li>
        <li className='bg-primary rounded' onClick={() => navigate('/about-us')}>
          <a>About Us</a>
        </li>
        <li className='bg-primary rounded' onClick={logout}>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
