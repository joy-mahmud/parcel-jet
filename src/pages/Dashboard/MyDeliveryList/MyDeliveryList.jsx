import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyDeliveryList = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: DeliveryMan, isPending: deliveryManLoading } = useQuery({
        queryKey: ['Deliveryman', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryman?email=${user?.email}`)
            return res.data
        }
    })
    const { data: myDeliveryList = [], isPending, refetch } = useQuery({
        queryKey: ['MyDeliveryList', user?.email],
         enabled:!deliveryManLoading,
        queryFn: async () => {
            if (DeliveryMan) {
                const res = await axiosSecure.get(`/deliveryList/${DeliveryMan?._id}`)
                return res.data
            }

        }
    })
    if (loading || isPending) {
        return <Loading></Loading>
    }
    console.log(myDeliveryList)
    return (
        <div>
            <h2>My delivery list</h2>
        </div>
    );
};

export default MyDeliveryList;