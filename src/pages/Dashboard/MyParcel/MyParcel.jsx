import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";


const MyParcel = () => {
    const { user, loading } = useContext(AuthContext)
    const [myParcel,setMyParcel] = useState([])

    const { register } = useForm()
    const axiousSecure = useAxiosSecure()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['myparcel', user?.email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/cart?email=${user?.email}`)
            return res.data
        }
    })

    useEffect(()=>{
        if(data){
            setMyParcel(data)
        }
    },[data])
    
    if (loading || isPending) {
        return <Loading></Loading>
    }
    console.log(data)
    const handleDelete = (id) => {
        const status = { status: 'cancelled' }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiousSecure.patch(`/cart/cancel/${id}`, status)

                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Cancelled!",
                        text: "The parcel order is cancelled",
                        icon: "success"
                    });
                }


            }
        });
    }
    return (
        <div>
            <SectionTitle heading={'My parcels'}></SectionTitle>

            <div className="border-b-2 p-y-2">
                <div className="flex justify-between mx-14 mb-2">
                    <div className="flex w-1/2 gap-1">
                        <h2 className="text-3xl font-semibold">Total parcel:{data.length}</h2>
                        {/* search functionality by status */}
                        <select {...register('status') } onChange={(e) => {
                            const value = e.target.value
                            const parcels = data.filter(item=>{
                               return item.status ===value
                            })
                            if(value==='showAll'){
                                setMyParcel(data)
                            } else{
                                setMyParcel(parcels)
                            }
                            
                        }} defaultValue={'select'} className="select select-bordered w-full max-w-xs">
                            <option disabled value={'select'}>Filter By</option>
                            <option value={'pending'}>Pending</option>
                            <option value={'cancelled'}>cancelled</option>
                            <option value={'delivered'}>Delivered</option>
                            <option value={'returned'}>Returned</option>
                            <option value={'shipped'}>Shipped</option>
                            <option value={'showAll'}>Show all parcel</option>
                        </select>
                    </div>
                    <button className="px-5 py-2 bg-[#264E99] rounded-lg text-white">Pay</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Type</th>
                            <th>delivery man Id</th>
                            <th>Booking date</th>
                            <th>req. delivery date</th>
                            <th>Approximate delivery date</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myParcel?.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{item.parcel_type}</td>
                                <td>{item.delivery_man}</td>
                                <td>{item.booking_date}</td>
                                <td>{item.req_date}</td>
                                <td>{item.approximate_date}</td>
                                <td>{item.status}{item.status==='delivered'?<button className="bg-[#264E99] text-white py-[10px] px-3 rounded-lg ml-3">Reveiw</button>:""}</td>
                                <td>
                                    <div className="space-x-2 flex items-center">
                                        
                                        

                                        {item.status === "pending" || item.status === "cancelled" ? <button className="bg-[#264E99] text-white p-2 rounded-lg"><Link to={`/dashboard/updateParcel/${item._id}`}><FaEdit className="text-xl" /></Link></button> : <button className="bg-[#264E99] text-white p-2 rounded-lg cursor-default"><FaEdit className="text-xl"></FaEdit></button>}

                                        {/* <button disabled={item.status==="pending" || item.status==="cancelled"?false:true} className="bg-[#264E99] text-white p-2 rounded-lg"><Link to={`/dashboard/updateParcel/${item._id}`}><FaEdit className="text-xl" /></Link></button> */}
                                        <button disabled={item.status === "pending" || item.status === "cancelled" ? false : true} onClick={() => { handleDelete(item._id) }} className="bg-red-600 text-white p-2 rounded-lg"><RiDeleteBin6Line className="text-xl" /></button>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyParcel;