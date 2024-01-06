import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const PaymentHistory = () => {
    const {user}= useContext(AuthContext)
    const axiosSecure =useAxiosSecure()
    const {data,isPending}=useQuery({
        queryKey:['paymentHistory',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`paymentHistory/${user.email}`)
            return res.data
        }
    })
    if(isPending){
        return
    }
    return (
        <div>
            <SectionTitle heading={'Payment history'}></SectionTitle>
             <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Transaction Id</th>
                            <th>Payment date</th>
                            <th>Total Price</th>
                            <th>Total parcels</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item,idx)=><tr key={idx}>
                                <th></th>
                                <td>{item.transactionId}</td>
                                <td>{item.date}</td>
                                <td>{item.price}</td>
                                <td>{item.cartIds.length}</td>
                            </tr>)
                        }
                    </tbody>
                    </table>
            </div>
        </div>
    );
};

export default PaymentHistory;