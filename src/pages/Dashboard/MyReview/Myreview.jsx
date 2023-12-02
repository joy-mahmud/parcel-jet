import { FaClock } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { Rating } from "@mui/material";


const Myreview = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: deliveryMan, isPending: isDeliveryLoading } = useQuery({
        queryKey: ['myreviewsDeliveryman', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryman?email=${user.email}`)
            return res.data
        }

    })
    const { data, isPending } = useQuery({
        queryKey: ['myreviews', user?.email],
        enabled: !isDeliveryLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/getReviews/${deliveryMan._id}`)
            return res.data

        }

    })
    if (isPending) {
        return <Loading></Loading>
    }
    console.log(data)
    return (
        <div className=" mx-5">
            <SectionTitle heading={'My Reviews'}></SectionTitle>
            <div className="grid grid-cols-3 gap-5">
                {
                    data.map(review => <div key={review._id} className=" bg-[#264E99] text-white rounded-lg relative">
                        <div className="flex items-center gap-1 bg-black rounded-md p-1 absolute right-3 top-2"><FaClock></FaClock> <p className=" font-semibold">{review.date}</p></div>
                        <img className=" w-full h-[300px] rounded-t-lg" src={review.userImage} alt="" />
                        <div className="p-2">
                            <h2 className="text-4xl font-semibold mb-2">{review.usersrName}</h2>
                            <Rating name="read-only" value={review.rating} readOnly />
                            <p className="font-medium">{review.feedback}</p>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Myreview;
