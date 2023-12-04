import { FaCopyright, FaFacebook, FaInstagram, FaTwitter, } from "react-icons/fa";

import location from '../../../assets/location-162102_1280.png'

const Footer = () => {
    
    return (
        <div>
            <h3>
                <footer>
                    <div className="bg-[#050A30] lg:px-20 py-5 mb-10 ">
                        <div className="w-full border-b-[2px] flex items-center justify-between border-b-slate-50">
                            <div className="flex items-end text-4xl gap-4 mb-5 text-white">
                                <FaFacebook></FaFacebook>
                                <FaTwitter></FaTwitter>
                                <FaInstagram></FaInstagram>
                            </div>
                            
                            <input type="text" placeholder="Type your email here" className="outline-none px-3 mr-2 py-2 rounded-lg md:w-1/4" />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between " >
                            <div className="md:w-1/4 mt-10">

                                <img className="h-[200px] w-full" src={location} alt="" />
                                <h2 className="text-white">Dahaka 1207</h2>
                            </div>
                            <div className="footer p-10 text-white md:w-1/2 flex justify-around md:flex-none">
                                <nav>
                                    <header className="footer-title">Company</header>
                                    <a className="link link-hover">About us</a>
                                    <a className="link link-hover">Contact</a>
                                    <a className="link link-hover">Jobs</a>
                                    <a className="link link-hover">Press kit</a>
                                </nav>
                                <nav>
                                    <header className="footer-title">Legal</header>
                                    <a className="link link-hover">Terms of use</a>
                                    <a className="link link-hover">Privacy policy</a>
                                    <a className="link link-hover">Cookie policy</a>
                                </nav>
                            </div>
                        </div>
                       <div className="flex justify-center items-center gap-1"><FaCopyright className="text-white"></FaCopyright><p className="text-white"> All rights reserved by parcelJet 2023</p></div> 

                    </div>
                </footer>
            </h3>
        </div>
    );
};

export default Footer;