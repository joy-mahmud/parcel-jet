
import img1 from '../../assets/shield.png'
import img2 from '../../assets/express-delivery.png'
import img3 from '../../assets/affordable.png'
const Services = () => {
    return (
        <div className='container mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl mt-10 mb-5 text-center font-bold py-3 border-y-2 inline-block'>Our special services</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 '>
                <div className='flex flex-col justify-center items-center space-y-2 bg-[#CECECE] rounded-lg p-4'>
                    <img className='h-[180px] w-[180px]' src={img1} alt="" />
                    <h2 className='text-3xl font-bold'>Parcel safety</h2>
                    <p className='text-18[px] font-medium'>Parcel safety is our utmost priority at Parcel Jet. We employ stringent security measures and advanced tracking technology to ensure the safety and integrity of your parcels throughout their journey.</p>

                </div>
                <div className='flex flex-col justify-center items-center space-y-2 bg-[#CECECE] rounded-lg p-4'>
                    <img className='h-[180px] w-[180px]' src={img2} alt="" />
                    <h2 className='text-3xl font-bold'>Fastest delivery</h2>
                    <p className='text-18[px] font-medium'>At Parcel Jet, we pride ourselves on our lightning-fast delivery services. Leveraging cutting-edge logistics and a streamlined network, we prioritize speed without compromising on reliability.</p>

                </div>
                <div className='flex flex-col justify-center items-center space-y-2 bg-[#CECECE] rounded-lg p-4' >
                    <img className='h-[180px] w-[180px]' src={img3} alt="" />
                    <h2 className='text-3xl font-bold'>Affordable price</h2>
                    <p className='text-18[px] font-medium'>At Parcel Jet, we believe in providing high-quality parcel delivery services at affordable prices. Our commitment to efficiency and optimization allows us to offer competitive rates without compromising on the quality of service.</p>

                </div>
            </div>
        </div>
    );
};

export default Services;