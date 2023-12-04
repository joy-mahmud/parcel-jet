import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading/Loading";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Rating } from "@mui/material";
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'; // Import AOS CSS

const TopDeliveryMan = () => {
    const axiosPublic = useAxiosPublic()
    const { data, isPending } = useQuery({
        queryKey: ['topDeliveryMan'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topDeliveryMan')
            return res.data
        }
    })
    useEffect(() => {
        Aos.init({
          // Global settings
            offset:300,
          duration: 600,
        });
      }, []);
    if (isPending) {
        return <Loading></Loading>
    }

    console.log(data)
    return (
        <div className="container mx-auto mb-20">
            <SectionTitle heading={'Our top delivery men'}></SectionTitle>
            <div data-aos='fade-up' className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                {
                    data.topDeliveryMen.map((item, idx) => <div  className="bg-[#CECECE] rounded-md" key={idx}>
                        <img className='w-full h-[300px]' src={item.image} alt="" />
                        <div className="p-2 space-y-1 ">
                            <h2 className="text-4xl font-semibold">{item.name}</h2>
                            <p className="text-xl">Total delivery:{data.topDeliverycount[idx]}</p>
                            <div className="flex justify-between"><Rating value={parseInt(data.topAveragRating[idx])} readOnly></Rating> <p className="bg-black text-white rounded-md px-3 py-1">{data.topAveragRating[idx]}</p></div>
                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default TopDeliveryMan;