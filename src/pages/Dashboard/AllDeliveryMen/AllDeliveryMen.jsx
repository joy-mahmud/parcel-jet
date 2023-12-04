import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useTotalDelivery from "../../../hooks/useTotalDelivery";
import { AuthContext } from "../../../provider/AuthProvider";
import useTotalReview from "../../../hooks/useTotalReview";
import Loading from "../../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllDeliveryMen = () => {
    // const [totalDelivery,isTotalDeliveryPending] = useTotalDelivery()
    // const [totalReview,isTotalReviewPending] =useTotalReview()
    const { user ,loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: totalDeliveryMen = [], isPending: isTotalDeliveryPending } = useQuery({
        queryKey: ['totalDelivery', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getAllDeliverymen`)
            return res.data
        }

    })
    // console.log(totalDeliveryMen)
    // const [avgReview,setAvgReview]=useState(null)
    // console.log(totalDelivery,totalReview)

    // useEffect(()=>{
    //     const totalDeliveryLength = totalDelivery.length
    //     const totalReviewLength =totalReview.length
    //     const average = totalReviewLength / totalDeliveryLength
    //     setAvgReview(average)
    // },[])
    if(isTotalDeliveryPending || loading){
        return <Loading></Loading>
    }
    //console.log('totalrating count',totalDeliveryMen.AverageRatingCount)
    return (
        <div>
            <SectionTitle heading={'All delivery man'}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total delivery</th>
                            <th>Average review</th>
                            <th>Average rtaing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            totalDeliveryMen.alldeliverymen
                            .map((user, idx) => <tr key={idx}>
                            <th>{idx+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{totalDeliveryMen.deliveryCount[idx]}</td>
                            <td>{totalDeliveryMen.averageReview[idx]}%</td>
                            <td>{totalDeliveryMen.AverageRatingCount[idx]}</td>
                           
                        </tr>)
                        }
                      

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;