import React from 'react'
import SideBar from './AdminSideBar'

function Layout({children}) {
  return (
    <div className="flex max-h-max min-h-screen bg-gray-200 ">
    <SideBar />
      <div className="flex-grow p-6 overflow-x-auto">
      {/* content here */}

      {children}
      </div>
      </div>
  )
}

export default Layout
