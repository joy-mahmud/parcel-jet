import banner from '../assets/banner.jpg'

const Banner = () => {
    return (
        <div>
            <img className=' h-[400px] md:h-[700px] w-full' src={banner} alt="" />
            <div className="absolute flex flex-col justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00) 100%)] left-0 top-0  h-[400px] md:h-[700px] w-full">
                <div className=' md:pl-5 lg:pl-12 md:w-1/2 flex flex-col-reverse md:flex-col   md:mt-0'>
                    <div className='space-y-5'>
                    <h2 className='text-white text-xl md:text-4xl lg:text-6xl font-bold'>
                    Experience the thrill of parcel delivery with Parcel Jet
                    </h2>
                    <p className='text-white'>
                    Parcel Jet is your trusted partner for hassle-free parcel delivery. Our streamlined logistics and commitment to excellence ensure that your parcels are handled with care and
                    </p>
                    </div>
                    <div className='lg:mt-5'>
                        <input type="text" className='outline-none rounded-l-lg px-2 py-2 w-3/4' /><button className='px-5 py-[8px] bg-[#4F4F4F] rounded-r-lg text-white'>search</button>
                        {/* <button className=" mr-5 btn btn-outline text-[#FFFF] hover:bg-[#FF3811] hover:text-white hover:border-[#FF3811]">Discover more</button>
                        <button className="btn btn-outline text-white hover:bg-[#FF3811] hover:text-white hover:border-[#FF3811]">Latest project</button> */}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Banner;