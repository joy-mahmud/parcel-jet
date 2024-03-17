import bycle from '../../assets/cycle-courier.jpg'
import rushbycle from '../../assets/rush-bicycle.jpg'
import messenger from '../../assets/messenger.jpg'
import './banner.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
    const slides = [{ image: bycle, heading: "Bicycle courier", text: 'We provide the best delivery service in the city' }, { image: rushbycle, heading: 'Bicycle rush', text: 'We deliver the fastest way within 4 hours so make it fast' }, { image: messenger, heading: 'Messenger Services', text: 'we provide the fastest package transport so,why delay?' }]
    const [currentSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => {
                console.log(prevSlide)
                return (prevSlide + 1) % slides.length
            })
        }, 10000)
        return () => clearInterval(interval)
    }, [slides.length])
    return (
        <div>
            <div className='relative mx-20'>
                <div className='bg-[#112232] w-[80%] h-[600px]'>
                </div>
                <div className='absolute top-[50px] right-0 h-[450px] md:h-[500px] w-[70%]'>
                    {
                        slides.map((slide, idx) => <div key={idx} >
                            <div style={{ display: idx === currentSlide ? 'block' : 'none' }} className='text-white absolute top-20 -left-[30%] w-[400px] h-[400px] flex items-center justify-center overflow-hidden'>
                                <div className=''>
                                    <h2 className="bannerHeading transition-all duration-300 text-[80px] font-bold leading-none mb-10" >{slide.heading}</h2>
                                    <p className='bannerText text-xl mb-20'>{slide.text}</p>

                                    <div className='orderBtnBox w-[190px]'>
                                        <Link to={'dashboard/bookParcel'}><button className='orderBtn relative transition-all duration-500 flex items-center justify-center gap-4 bg-white text-black px-4 py-5 w-[190px] hover:text-white'><span className='text-xl font-bold'>Order now </span><FaArrowRight className='text-[#eb5e34] arrowBtn text-xl'></FaArrowRight></button> </Link>
                                       
                                    </div>
                                </div>

                            </div>
                            <img src={slide.image} style={{ display: idx === currentSlide ? 'block' : 'none' }} />

                        </div>)
                    }
                </div>
                
            </div>



        </div>
    );
};

export default Banner;