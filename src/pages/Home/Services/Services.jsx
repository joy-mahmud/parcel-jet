import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './services.css'

const Services = () => {
    return (
        <div className='mx-20 mt-10'>
            <div className='mb-10'>
                <h2 className='bg-[#e6f7fa] py-10 text-center text-4xl font-semibold'> Our Services</h2>
            </div>
            <div className='flex justify-between'>
                <div className='bg-[#e6f7fa] w-[340px] px-14 py-16 flex flex-col justify-between'>
                    <p className=' w-[50px] h-[50px] p-3 border-2 inline-block border-[#eb5e34] text-2xl font-bold rounded-full flex items-center justify-center mb-5'><span>01</span></p>
                    <h2 className='text-4xl font-semibold mb-4'>
                        Business services
                    </h2>
                    <p className='text-[14px] mb-3'>Parcel Jet's business services cater to the needs of companies of all sizes, offering reliable and efficient courier solutions to streamline their operations.</p>
                    <ul style={{ listStyleType: 'square' }} className='listStyle ml-5 mb-5 text-[14px]'>
                        <li>Timely and secure deliveries</li>
                        <li>Customizable delivery options</li>
                        <li>Dedicated account management</li>
                    </ul>
                    <div className='bg-tranparent'>
                        <Link to={'/'}><button className='learnrBtn relative transition-all duration-500 hover:text-white px-5 py-4 border-2 flex items-center gap-3 border-[#112232] z-10'><span className='text-xl font-bold'>Learn More </span><FaArrowRight className='text-[#eb5e34] text-xl'></FaArrowRight></button> </Link>
                    </div>

                </div>
                <div className='bg-[#e6f7fa] w-[340px] px-14 py-16 flex flex-col justify-between'>
                    <p className=' w-[50px] h-[50px] p-3 border-2 inline-block border-[#eb5e34] text-2xl font-bold rounded-full flex items-center justify-center mb-5'><span>02</span></p>
                    <h2 className='text-4xl font-semibold mb-4'>
                        Shop <br /> Delivery
                    </h2>
                    <p className='text-[14px] mb-3'>Parcel Jet simplifies the retail experience with its shop delivery service, providing swift and dependable delivery solutions for stores and online sellers.</p>
                    <ul style={{ listStyleType: 'square' }} className='listStyle ml-5 mb-5 text-[14px]'>
                        <li>Swift and dependable delivery</li>
                        <li>Optimization of the supply chain </li>
                        <li>Advanced tracking capabilities</li>
                    </ul>
                    <div className='bg-tranparent'>
                        <Link to={'/'}><button className='learnrBtn relative transition-all duration-500 hover:text-white px-5 py-3 border-2 flex items-center gap-3 border-[#112232] z-10'><span className='text-xl font-bold'>Learn More </span><FaArrowRight className='text-[#eb5e34] text-xl'></FaArrowRight></button> </Link>
                    </div>

                </div>
                <div className='bg-[#e6f7fa] w-[340px] px-14 py-16 flex flex-col justify-between'>
                    <p className=' w-[50px] h-[50px] p-3 border-2 inline-block border-[#eb5e34] text-2xl font-bold rounded-full flex items-center justify-center mb-5'><span>03</span></p>
                    <h2 className='text-4xl font-semibold mb-4'>
                        Home services
                    </h2>
                    <p className='text-[14px] mb-3'>Parcel Jet brings convenience to the doorstep with its home services, offering personalized delivery solutions for residential addresses.</p>

                    <ul style={{ listStyleType: 'square' }} className='listStyle ml-5 mb-5 text-[14px]'>
                        <li>Personalized delivery solutions</li>
                        <li>Courteous couriers and efficiency </li>
                        <li>Trusted choice for safe and reliable</li>
                    </ul>

                    <div className='bg-tranparent'>
                        <Link to={'/'}><button className='learnrBtn relative transition-all duration-500 hover:text-white px-5 py-3 border-2 flex items-center gap-3 border-[#112232] z-10'><span className='text-xl font-bold'>Learn More </span><FaArrowRight className='text-[#eb5e34] text-xl'></FaArrowRight></button> </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Services