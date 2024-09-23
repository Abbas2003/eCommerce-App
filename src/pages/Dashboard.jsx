import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'
import FooterSection from '../components/Footer'

const Dashboard = () => {
  return (
    <section>
      <NavBar />
      <Outlet />
      <FooterSection />
    </section>
  )
}

export default Dashboard