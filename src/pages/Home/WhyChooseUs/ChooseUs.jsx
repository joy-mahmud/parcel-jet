import React from 'react'
import whyChoose from '../../../assets/whyChoose.jpg'
const ChooseUs = () => {
  return (
    <div className='mx-20 mt-20 relative'>
        <img src={whyChoose} alt="" className='w-full h-[450px]'/>
        <div className='absolute top-0 left-0 h-full w-full bg-black z-10'>
            <h3>some Facts</h3>
            <h1>Why people choose us</h1>
        </div>
    </div>
  )
}

export default ChooseUs