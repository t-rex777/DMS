import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className='p-8'>{children}</div>
    </div>
  )
}

export default AppLayout
