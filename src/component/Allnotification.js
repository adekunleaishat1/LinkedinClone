import React ,{useEffect}from 'react'
import {  useSelector } from 'react-redux'

import Navbar from './Navbar'

const Allnotification = () => {
    const {allnotification} = useSelector((state)=>state.notificationslice)

    useEffect(() => {
      
    
      
    }, [allnotification])
    
  return (
    <div>
      <Navbar/>
         <div className='w-100 bg-white'>
         <div className='w-75 mx-auto bg-light mt-3 px-3 py-3 notify-table'>{allnotification && allnotification.map((el, i)=>(
            <>
            <div>
                {/* <p>{el.message}</p> */}
               <p>{el.message && (
            <>
              <strong>{el.message.substring(0,  el.message.indexOf(":") + 1)}</strong>{/* Example: Make the first 5 characters bold */}
              {el.message.substring( el.message.indexOf(":") + 1)}
            </>
          )}</p> 
            </div>
            </>
          ))
            }

          </div>
         </div>
    </div>
  )
}

export default Allnotification