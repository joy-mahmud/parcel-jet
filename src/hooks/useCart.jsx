import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const axiosSecure =useAxiosSecure()
    const {user}=useContext(AuthContext)

    const {refetch:cartFetch,data: cart=[]} =useQuery({
        queryKey:['cart',user?.email],
        queryFn:async ()=>{
            const res = await axiosSecure.get(`/cart/allParcels?email=${user.email}`)
            return res.data
        }
    })
    return [cart,cartFetch]
};

export default useCart;