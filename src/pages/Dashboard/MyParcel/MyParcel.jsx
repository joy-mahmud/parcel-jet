import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
//rating
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';



const MyParcel = () => {
    const { user, loading } = useContext(AuthContext)
    const [myParcel, setMyParcel] = useState('showAll')
    const [deliverId, setDeliverId] = useState('')
    const [orderId, setOrderId] = useState('')
    const [value, setValue] = useState(2);

    const { register, handleSubmit, } = useForm()
    const axiousSecure = useAxiosSecure()
    const { data: parcelList = [], isPending, refetch } = useQuery({
        queryKey: ['myparcel', user?.email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/cart?email=${user?.email}&show=${myParcel}`)
            return res.data
        }
    })

    useEffect(() => {
        refetch()

    }, [refetch, myParcel])

    if (loading || isPending) {
        return <Loading></Loading>
    }
    // console.log(parcelList)
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
                const res = await axiousSecure.patch(`/order/status/${id}`, status)

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
    //handle rating

    //for review handle form
    const handleReview = (id,itemId) => {
        setDeliverId(id)
        setOrderId(itemId)

    }
    console.log(value)
    const onSubmit = async (data) => {
        const usersrName = data.username
        const userImage = data.userImage
        const deliveryManId = deliverId
        const feedback = data.feedback
        const dateObj = new Date()
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1
        const year = dateObj.getFullYear(); 
        const reviewDate = `${day}-${month}-${year}`
       
        const revieItem = {usersrName,userImage,deliveryManId,orderId,feedback,rating:value,date:reviewDate}

        const res = await axiousSecure.post('/giveReview',revieItem)
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Successfully give your review",
                showConfirmButton: false,
                timer: 1500
              });
        }

     }
    return (
        <div>
            <SectionTitle heading={'My parcels'}></SectionTitle>

            <div className="border-b-2 p-y-2">
                <div className="flex justify-between mx-14 mb-2">
                    <div className="flex w-1/2 gap-1">
                        <h2 className="text-3xl font-semibold">Total parcel:{parcelList.length}</h2>
                        {/* search functionality by status */}
                        <select {...register('status')} onChange={(e) => {
                            const value = e.target.value
                            // const parcels = parcelList.filter(item => {
                            //     return item.status === value
                            // })
                            // if (value === 'showAll') {
                            //     setMyParcel(parcelList)
                            // } else {
                            //     setMyParcel(parcels)
                            // }
                            setMyParcel(value)
                            // refetch()

                        }} defaultValue={'select'} className="select select-bordered w-full max-w-xs">
                            <option disabled value={'select'}>Filter By</option>
                            <option value={'pending'}>Pending</option>
                            <option value={'cancelled'}>cancelled</option>
                            <option value={'delivered'}>Delivered</option>
                            <option value={'returned'}>Returned</option>
                            <option value={'On The Way'}>On The Way</option>
                            <option value={'showAll'}>Show all parcel</option>
                        </select>
                    </div>
                    {parcelList.length?<Link to={'/dashboard/payment'}><button className="px-5 py-2 bg-[#264E99] rounded-lg text-white">Pay</button></Link>:<button disabled className="px-5 py-2 bg-[#264E99] rounded-lg text-white">Pay</button>}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>parcel Type</th>
                            <th>delivery man Id</th>
                            <th>Booking date</th>
                            <th>req. delivery date</th>
                            <th>Approximate delivery date</th>
                            <th>payment</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcelList?.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{item.parcel_type}</td>
                                <td>{item.delivery_man}</td>
                                <td>{item.booking_date}</td>
                                <td>{item.req_date}</td>
                                <td>{item.approximate_date}</td>
                                <td>{item.pay_status}</td>
                                <td>{item.status}{item.status === 'delivered' ? <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-[#264E99] text-white py-[10px] px-3 rounded-lg ml-3"><p onClick={() => handleReview(item.delivery_man,item._id)}>Reveiw</p></button> : ""}</td>
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
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <label htmlFor="">Your Name: </label><br />
                            <input type="text" {...register('username')} defaultValue={user.displayName} readOnly placeholder="Type here" className="mb-1 input input-bordered w-full max-w-xs" /> <br />
                            <label htmlFor="">Your image: </label><br />
                            <input type="text" {...register('userImage')} defaultValue={user.photoURL} readOnly placeholder="Type here" className=" mb-1 input input-bordered w-full max-w-xs" /> <br />
                            <label htmlFor="">DeliveryMan Id: </label><br />
                            <input type="text" {...register('deliveryManId')} defaultValue={deliverId} readOnly placeholder="Type here" className=" input input-bordered w-full max-w-xs" /> <br />
                            {/* rating */}
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">Please give your rating:</Typography>
                                <Rating
                                    name="simple-controlled"
                                    size="large"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                              
                                
                            </Box>

                            <textarea {...register('feedback')} className="textarea textarea-bordered mt-2 w-full" placeholder="Write your feedback here"></textarea>
                            <button  type="submit" className="btn btn-primary mt-1">submit</button>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-primary">Close</button>
                            </form>
                        </div>

                    </div>
                </dialog>
            </div>

        </div>

    );
};

export default MyParcel;