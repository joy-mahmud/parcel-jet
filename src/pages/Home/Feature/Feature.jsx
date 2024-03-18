import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './feature.css'
import successfulDelivery from '../../../assets/successdfullDelivery.jpg' 
const Feature = () => {
    return (
        <div className='relative flex justify-end mx-20 mt-20'>
            <div style={{height:"85vh"}} className='w-[65%] bg-[#e6f7fa]'></div>
            <div className='absolute top-[50px] left-0 flex gap-16 w-full'>
                <img style={{height:"67vh"}}  className="w-[50%] " src={successfulDelivery} alt="" />
                <div className='pr-20'>
                    <h2 className='text-6xl font-bold mb-5'>Fastest Home delivery</h2>
                    <div className='h-1 w-10 bg-[#ff0000] mb-5'></div>
                    <p className='mb-5'>We understand the importance of speed and efficiency when it comes to delivering your parcels right to your doorstep. With our cutting-edge logistics solutions and dedicated team of professionals </p>
                    <div className='bg-[#ff0000] inline-block featureBtnContainer transition-all duration-500 '>
                        <Link to={'dashboard/bookParcel'}><button className='featureBtn relative text-white hover:text-[#ff0000] px-5 py-4 border-2 flex items-center gap-3 border-transparent hover:border-[#112232] z-10'><span className='text-[16px] font-mono uppercase'>Order now </span><FaArrowRight className='text-white text-[18px] featureArrowBtn '></FaArrowRight></button> </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature