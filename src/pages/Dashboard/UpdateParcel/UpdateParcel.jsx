import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";


const UpdateParcel = () => {
    const item =useLoaderData()
    const {name,email,phone,receiver_address,latitude,longitude,parcel_type,weight,receiver_name,receiver_phone,price,req_date,_id}=item
    const [parcelPrice, setPrice] = useState(price)
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit,reset } = useForm()
    const onSubmit = async (data) => {

        const parcel = {
            name:data.name,
            email:data.email,
            phone:data.phone,
            parcel_type:data.parcel_type,
            weight:data.weight,
            receiver_name:data.receiver_name,
            receiver_phone:data.receiver_phone,
            receiver_address:data.receiver_address,
            latitude:data.latitude,
            longitude:data.longitude,
            req_date:data.req_date,
            price:parcelPrice,
            status:'pending',
            // booking_date: new Date(),
            
            // delivery_man:'',
            // approximate_date:approximateDate

        }
            const ParcelResponse = await axiosSecure.patch(`/cart/${_id}`,parcel)
            console.log(ParcelResponse.data)
            if(ParcelResponse.data.modifiedCount>0){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You updated the parcel successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }

        
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" {...register('name')} defaultValue={name} readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="text" {...register('email')} defaultValue={email} readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Phone</span>
                            </div>
                            <input defaultValue={phone} type="text" {...register('phone')} placeholder="Enter your phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Parcel type</span>
                            </div>
                            <input defaultValue={parcel_type} type="text" {...register('parcel_type')} placeholder="Pacel type" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">weight</span>
                            </div>
                            <input defaultValue={weight} type="number" {...register('weight')} onChange={(e) => {
                                const value = e.target.value
                                if (value <= 2) {

                                    setPrice(value * 50)

                                }
                                
                                 else {
                                    setPrice(150)
                                }

                            }} placeholder="Enter the weight of your parcel" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Receiver name</span>
                            </div>
                            <input defaultValue={receiver_name} type="text" {...register('receiver_name',{required:true})} placeholder="Receiver name" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Receiver Phone</span>
                            </div>
                            <input defaultValue={receiver_phone} type="text" {...register('receiver_phone',{required:true})} placeholder="Enter receiver phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Receiver address</span>
                            </div>
                            <input defaultValue={receiver_address} type="text" {...register('receiver_address',{required:true})} placeholder="Enter receiver's address" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Latitude</span>
                            </div>
                            <input defaultValue={latitude} type="text" {...register('latitude')} placeholder="Enter receiver's address" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Longitude</span>
                            </div>
                            <input defaultValue={longitude} type="text" {...register('longitude')} placeholder="Enter receiver phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Requested Date</span>
                            </div>
                            <input defaultValue={req_date} type="date" {...register('req_date')} placeholder="Enter receiver phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="text" {...register('price')} defaultValue={parcelPrice} readOnly placeholder="price" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="text-center mt-5 mb-12"><button className="bg-[#264E99] py-2 px-5 rounded-lg outline-none text-center text-white">Update</button></div>
                </form>
        </div>
    );
};

export default UpdateParcel;