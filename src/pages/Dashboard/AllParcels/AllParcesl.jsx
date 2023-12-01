import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const AllParcesl = () => {
    const [parceId, setParcelId] = useState('')
    const[showParcel,setShowParcel] =useState([])

    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()

    const { data: allParcel = [], refetch } = useQuery({
        queryKey: ['Allparcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders')
            return res.data
        }
    })
    useEffect(()=>{
        if(allParcel){
            setShowParcel(allParcel)
        }
    },[allParcel])
    const { data: allDeliveryMen = [] } = useQuery({
        queryKey: ['AllDeliverymen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getDeliveryMen')
            return res.data
        }
    })

    const handleModal = (id) => {
        setParcelId(id)
    }


    const onSubmit = async (data) => {
        console.log(data)

        const assignItems = {
            status: 'On The Way',
            approximate_date: data.approximate_date,
            delivery_man: data.deliverManId
        }
        const res = await axiosSecure.patch(`/assignDeliveryMan/${parceId}`, assignItems)
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delivery man assigned to the parcel",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleDateSearch =async(e)=>{
        e.preventDefault()
        const startDate= new Date(e.target.startDate.value)
        const endDate = new Date(e.target.endDate.value)
        const searchItem = {startDate,endDate}
        // const res = await axiosSecure.post(`/getDate`, searchItem)
        // console.log(res.data)
        const result = allParcel.filter(item=>{
            const current = new Date(item.req_date)
            if(current>=startDate && current<=endDate){
                return item
            }
            
        })
        setShowParcel(result)

    }


    return (
        <div>
            <SectionTitle heading={'All parcels'}></SectionTitle>

            <div className="border-b-2 p-y-2">
                <div className="flex justify-between mx-14 mb-2">
                    <div className="flex w-1/3 gap-1">
                        <h2 className="text-3xl font-semibold">Total parcel:{allParcel.length}</h2>
                        {/* search functionality by status */}

                    </div>
                    <div>
                        <form onSubmit={handleDateSearch}>
                            <label htmlFor="">Start date: </label>
                            <input name='startDate' className="border-2 rounded-md mr-2" type="date" />
                            <label htmlFor="">Ending date: </label>
                            <input name='endDate' className="border-2 rounded-md mr-3 " type="date" />
                            <button className="bg-[#264E99] text-white px-4 py-2 rounded-lg">find</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Name</th>
                            <th>User phone</th>
                            <th>Booking date</th>
                            <th>req. delivery date</th>
                            <th>cost</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showParcel?.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.booking_date}</td>
                                <td>{item.req_date}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button className="bg-[#264E99] text-white p-2 rounded-lg" onClick={() => document.getElementById('my_modal_1').showModal()}><p onClick={() => handleModal(item._id)}>Manage</p></button>

                                </td>
                            </tr>)
                        }
                        {/* Open the modal using document.getElementById('ID').showModal() method */}


                    </tbody>
                </table>
                <dialog id="my_modal_1" className="modal">

                    <div className="modal-box space-y-1">
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2' >
                            <select  {...register('deliverManId')} defaultValue={'select'} className="select select-bordered w-full max-w-xs">
                                <option value={'select'} disabled >Select a delivery man?</option>
                                {allDeliveryMen.map(item => <option value={item._id} key={item._id}>{item.name}</option>)}
                            </select>
                            <div >
                                <p className="pt-4 pb-1">Approximate delivery date</p>
                                <input {...register('approximate_date')} type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            </div>
                            <button className="btn mr-3">Assign</button>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">

                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default AllParcesl;