import React from 'react'
import Left from './Left'
import Right from './Right'
import Center from './Center'

const Dashboard = () => {
  return (
    <>
      <div className='contain'>
      <div className='container div'>
        <Left/>
        <Center/>
        <Right/>
      </div> 
      </div>
    </>
  )
}

export default Dashboard