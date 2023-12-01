import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const BookParcel = () => {
    const { user } = useContext(AuthContext)
    const [parcelPrice, setPrice] = useState('')
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        // const approximateDate = new Date()
        // const currentDay = approximateDate.getDate();
        // approximateDate.setDate(currentDay + 3)
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
            booking_date: new Date(),
            status:'pending',
            delivery_man:'',
            approximate_date:''

        }
        const res = await axiosSecure.post('/addtocart',parcel)
        if(res.data.insertedId){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You succefully ordered the parcel",
                showConfirmButton: false,
                timer: 1500
              });
        }
        // console.log(res.data)

    }
   
    return (
        <div>
            <SectionTitle heading={'Book a parcel'}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" {...register('name')} defaultValue={user.displayName} readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="text" {...register('email')} defaultValue={user.email} readOnly placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Phone</span>
                            </div>
                            <input type="text" {...register('phone')} placeholder="Enter your phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Parcel type</span>
                            </div>
                            <input type="text" {...register('parcel_type')} placeholder="Pacel type" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">weight</span>
                            </div>
                            <input type="number" {...register('weight')} onChange={(e) => {
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
                            <input type="text" {...register('receiver_name',{required:true})} placeholder="Receiver name" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Receiver Phone</span>
                            </div>
                            <input type="text" {...register('receiver_phone',{required:true})} placeholder="Enter receiver phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Receiver address</span>
                            </div>
                            <input type="text" {...register('receiver_address',{required:true})} placeholder="Enter receiver's address" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Latitude</span>
                            </div>
                            <input type="text" {...register('latitude')} placeholder="Enter receiver's address" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Longitude</span>
                            </div>
                            <input type="text" {...register('longitude')} placeholder="Enter receiver phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Requested Date</span>
                            </div>
                            <input type="date" {...register('req_date')} placeholder="Enter receiver phone number" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="text" {...register('price')} defaultValue={parcelPrice} readOnly placeholder="Enter receiver's address" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                    <div className="text-center mt-5 mb-12"><button className="bg-[#264E99] py-2 px-5 rounded-lg outline-none text-center text-white">Book now</button></div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;