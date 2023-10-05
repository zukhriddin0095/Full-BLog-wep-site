import { Fragment } from 'react'
import AdminHeader from '../../header/AdminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../../footer/Footer'

import "./admin.scss"
const AdminLayout = () => {
  return (
    <Fragment>
      <AdminHeader />
      <Outlet />
      <Footer /> 
    </Fragment>
  )
}

export default AdminLayout