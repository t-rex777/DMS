import React from 'react'

const Sidebar = () => {
  return (
    <div className='absolute left-0 top-0 h-screen w-48 bg-slate-700 flex flex-col justify-between px-4 py-2'>
      <div></div>
      <div>
        <p> Username</p>
        <p> Email</p>
      </div>
    </div>
  )
}

export default Sidebar
