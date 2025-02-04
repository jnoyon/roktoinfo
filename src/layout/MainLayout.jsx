import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className='bg-gradient-to-r from-indigo-50 via-red-50 to-yellow-50 min-h-screen pb-5'>
      <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
