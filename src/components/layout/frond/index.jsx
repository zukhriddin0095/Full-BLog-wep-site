import { Fragment } from "react"
import Header from "../../header/Header"
import { Outlet } from "react-router-dom"
import Footer from "../../footer/Footer"




const FrondLayout = () => {
  return (<Fragment>
    <Header />
    <Outlet />
    <Footer />
  </Fragment>
  )
}

export default FrondLayout