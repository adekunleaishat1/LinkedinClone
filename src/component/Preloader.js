import React from 'react'

const Preloader = () => {
  return (
    <div className='preloader d-flex justify-content-center align-items-center w-100 bg-white'>
        <div>
          <h1 className='text-primary fw-bold fs-1'>Linkedin</h1>
           <div className='bg-primary w-100 animate-div '>
            <div className='loader'></div>
          </div>
        </div>
    </div>
  )
}

export default Preloader