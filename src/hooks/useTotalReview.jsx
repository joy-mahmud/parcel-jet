import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTotalReview = () => {
   const {user,loading} = useContext(AuthContext)
   const axiosSecure = useAxiosSecure()
   const {data:totalReview=[],isPending:isTotalReviewPending} =useQuery({
    queryKey:['totalReview',user?.email],
    enabled:!loading,
    queryFn:async()=>{
        const res = await axiosSecure.get(`/getTotalReviews?email=${user.email}`)
        return res.data 
    }
   })
   return [totalReview,isTotalReviewPending]
};

export default useTotalReview;