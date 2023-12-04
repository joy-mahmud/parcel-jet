import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CountUp from 'react-countup';



const Stats = () => {
    const axiosPublic = useAxiosPublic()
    const { data, isPending } = useQuery({
        queryKey: ['homeStats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homeStats')
            return res.data
        }
    })
    if (isPending) {
        return
    }
console.log(data)
    return (
        <div className="flex justify-center mb-12">
            <div className="stats shadow">
                <div className="stat place-items-center">
                    <div className="stat-title">Total Delivery</div>
                    
                    <div className="stat-value"><CountUp end={data.totalDelivery } duration={5}></CountUp></div>
                    <div className="stat-desc">From January 1st </div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary"><CountUp end={data.users } duration={5}></CountUp></div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Total Bokkings</div>
                    <div className="stat-value"><CountUp end={data.totalBooking} duration={5}></CountUp></div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
        </div>
    );
};

export default Stats;