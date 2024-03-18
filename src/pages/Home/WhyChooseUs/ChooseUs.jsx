import React, { useEffect, useState, useRef } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './chooseus.css'
import whyChoose from '../../../assets/whyChoose.jpg'
import { useCountUp } from 'use-count-up';

const ChooseUs = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [helpfull, setHelpful] = useState(0)
    const [polite, setPolite] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [friendly, setFriendly] = useState(0);
    const { value: value1, reset:handleHelpfull } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: 70,
    });
    const { value: value2, reset:handlePolite } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: 85,
    });
    const { value: value3, reset:handleCommunication } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: 75,
    });
    const { value: value4, reset:handleFriendly } = useCountUp({
        isCounting: true,
        duration: 3,
        start: 0,
        end: 100,
    });
    const value =parseInt(value1)
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            if (scrollY > 1000) {
                setHelpful(70)
                setPolite(85)
                setCommunication(75)
                setFriendly(100)
                setIsScrolled(true)
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (isScrolled) {
            handleHelpfull()
            handlePolite()
            handleCommunication()
            handleFriendly()
        }   
    }, [isScrolled]);

    return (
        <div className='relative mx-10 mt-20 relative'>
            <img src={whyChoose} alt="" className='w-full h-[430px]' />
            <div className='absolute overlay text-white flex flex-col items-center justify-center'>
                <h3 className='text-xl font-bold text-[#ff0000] uppercase mb-5'>some Facts</h3>
                <h1 className='text-3xl font-bold mb-8'>Why people choose us</h1>
                <div className='flex gap-20'>
                
                    <div style={{ width: 160, height: 160 }}>
                        <CircularProgressbar
                            className="custom-progress-bar"
                            value={helpfull}
                            text={`${value1}%`}
                            strokeWidth={5}
                            styles={{ root: {}, text: { fontSize: '20px', fontWeight: 'bolder', fill: "#fff" }, path: { transition: 'stroke-dashoffset 3s ease 0s', } }}
                        />
                        <h3 className='mt-2 text-center'>Helpful</h3>
                    </div>
                    <div style={{ width: 160, height: 160 }}>
                        <CircularProgressbar
                            className="custom-progress-bar"
                            value={polite}
                            text={`${value2}%`}
                            strokeWidth={4}
                            styles={{ root: {}, text: { fontSize: '20px', fontWeight: 'bolder', fill: "#fff" }, path: { transition: 'stroke-dashoffset 3s ease 0s', } }}
                        />
                        <h3 className='mt-2 text-center'>Polite</h3>
                    </div>
                    <div style={{ width: 160, height: 160 }} >
                        <CircularProgressbar
                            className="custom-progress-bar"
                            value={communication}
                            text={`${value3}%`}
                            strokeWidth={4}
                            styles={{ root: {}, text: { fontSize: '20px', fontWeight: 'bolder', fill: "#fff" }, path: { transition: 'stroke-dashoffset 3s ease 0s', } }}
                        />
                        <h3 className='mt-2 text-center'>communication</h3>
                    </div>
                    <div style={{ width: 160, height: 160 }}>
                        <CircularProgressbar
                            className="custom-progress-bar"
                            value={friendly}
                            text={`${value4}%`}
                            strokeWidth={4}
                            styles={{ root: {}, text: { fontSize: '20px', fontWeight: 'bolder', fill: "#fff" }, path: { transition: 'stroke-dashoffset 3s ease 0s', } }}
                        />
                        <h3 className='mt-2 text-center'>Friendly</h3>
                    </div>
                    
                </div>
            </div>


        </div>
    )
}

export default ChooseUs