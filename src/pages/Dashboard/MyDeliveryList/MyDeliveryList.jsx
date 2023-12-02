import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";


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
        enabled: !deliveryManLoading,
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
    const handleDeliver = (id) => {
        const status = { status: 'delivered' }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to deliver this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, deliver it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/order/status/${id}`, status)

                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    const deliveyItem = {
                        delivery_man: DeliveryMan.name,
                        email: DeliveryMan.email,
                        phone: '',
                        review: ''
                    }
                    const res2 = await axiosSecure.post('/delivered', deliveyItem)
                    if (res2.data.insertedId) {
                        refetch()
                        Swal.fire({
                            title: "Delivered!",
                            text: "The parcel is delivered",
                            icon: "success"
                        });
                    }

                }


            }
        });
    }
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
                const res = await axiosSecure.patch(`/order/status/${id}`, status)

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

    console.log(myDeliveryList)
    return (
        <div>
            <SectionTitle heading={'My delivery list'}></SectionTitle>
            <div className="border-b-2 p-y-2">
                <div className="flex justify-between mx-14 mb-2">
                    <div className="flex w-1/2 gap-1">
                        <h2 className="text-3xl font-semibold">Total Order:{myDeliveryList.length}</h2>

                    </div>

                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="border-r-2">Booked user</th>
                            <th className="border-r-2">Receiver name</th>
                            <th className="border-r-2">Booked user number</th>
                            <th className="border-r-2">req. delivery date</th>
                            <th className="border-r-2">Approximate delivery date</th>
                            <th className="border-r-2">Receivers number</th>
                            <th className="border-r-2">Receivers Address</th>
                            <th className="border-r-2">status</th>
                            <th className="border-r-2">Location</th>
                            <th className="border-r-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myDeliveryList?.map((item, idx) => <tr key={idx}>
                                <th className="border-r-2">{idx + 1}</th>
                                <td className="border-r-2">{item.name}</td>
                                <td className="border-r-2">{item.receiver_name}</td>
                                <td className="border-r-2">{item.phone}</td>
                                <td className="border-r-2">{item.req_date}</td>
                                <td className="border-r-2">{item.approximate_date}</td>
                                <td className="border-r-2">{item.receiver_phone}</td>
                                <td className="border-r-2">{item.receiver_address}</td>
                                <td className="border-r-2">{item.status}</td>
                                <td className="border-r-2"> <button className="bg-[#264E99] text-white py-[10px] px-3 rounded-lg ">Location</button> </td>
                                <td className="border-r-2">
                                    <div className="gap-2 flex items-center">
                                        <button onClick={() => handleDeliver(item._id)} className="bg-[#264E99] text-white py-[10px] px-3 rounded-lg ">Deliver</button>

                                        {/* <button disabled={item.status==="pending" || item.status==="cancelled"?false:true} className="bg-[#264E99] text-white p-2 rounded-lg"><Link to={`/dashboard/updateParcel/${item._id}`}><FaEdit className="text-xl" /></Link></button> */}
                                        <button disabled={item.status === "cancelled" ? true : false} onClick={() => { handleDelete(item._id) }} className="bg-red-600 text-white p-2 rounded-lg"><RiDeleteBin6Line className="text-xl" /></button>
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

export default MyDeliveryList;