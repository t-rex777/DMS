import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='max-h-screen overflow-auto'>
      <Navbar />
      <Sidebar />

      <div
        className='p-8 ml-48 h-full'
        style={{
          height: 'calc(100vh - 60px)',
          marginTop: 60,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default AppLayout
