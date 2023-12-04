import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const useTotalDelivery = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading} = useContext(AuthContext)

    const {data:totalDelivery=[],isPending:isTotalDeliveryPending}=useQuery({
        queryKey:['totalDelivery',user?.email],
        enabled:!loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/totalDelivery?email=${user.email}`)
            return res.data
        }

    })
return [totalDelivery,isTotalDeliveryPending]
  
};

export default useTotalDelivery;
