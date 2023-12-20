import React from 'react'
import { ImBarcode, ImBell, ImHome3, ImWordpress,} from "react-icons/im";
import { FaAirbnb, FaBars, FaBell, FaBlog, FaBriefcase, FaConnectdevelop, FaEnvelopeOpenText, FaInbox, FaMotorcycle, FaNetworkWired, FaNeuter, FaUserTimes } from "react-icons/fa";


const Navbar = () => {
  return (
    <>
      <div className='bg-light light'>
      <div className='container' >
      <div className='top '>
         <div className='d-flex justify-content-around align-items-center logo-nav'>
            <img className='img' src={require('./free-linkedin-logo-icon-2430-thumb_1_-removebg-preview.png')} alt="" />
            <input className='form-control' type="text" placeholder='Search'/>
          </div>
          <div className='d-flex justify-content-between align-items-center icons-nav'>
            <div  className='text-center ico'>
              <button><ImHome3/></button>
              <h1>Home</h1>
            </div>
            <div  className='text-center ico'>
              <button><FaConnectdevelop/></button>
              <h1>My Network</h1>
            </div>
            <div  className='text-center ico'>
              <button><FaBriefcase/></button>
              <h1>Jobs</h1>
            </div>
            <div className='text-center ico'>
              <button><FaUserTimes/></button>
              <h1>Messaging</h1>
            </div>
            <div className='text-center ico'>
              <button><FaBell/></button>
              <h1>Notifications</h1>
            </div>
            <hr />
            <div className='text-center ico sm-none'>
              <button><FaBars/></button>
              <h1>For Business</h1>
            </div>
          </div>
        </div>
      </div> 
      </div>
    </>
  )
}

export default Navbar