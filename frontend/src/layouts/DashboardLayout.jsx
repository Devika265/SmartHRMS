import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen flex'>
        <Sidebar />

        <div className='flex-1 flex flex-col'>
            <Navbar />


            <main className='flex-1 bg-slate-100 p-6'>
                <Outlet />
            </main>

        </div>


      
    </div>
  )
}

export default DashboardLayout
