import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout: React.FC = () => {
   return (
      <>
         <Outlet />
      </>
   )
}

export default UserLayout