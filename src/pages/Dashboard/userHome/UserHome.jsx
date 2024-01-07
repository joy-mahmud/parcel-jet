
import { useContext, useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const UserHome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data, isPending } = useQuery({
        queryKey: ['bookingsNum', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mytotalBooking/${user.email}`)
            return res.data
        }
    })

    if (isPending) {
        return <h1>loading....</h1>
    }
    console.log(data.length)
    return (
        <div className="mx-5">
            <SectionTitle heading={'Parcel jet'}></SectionTitle>
            <div className="grid grid-cols-2 gap-5 ">
                <div className="h-96 bg-gradient-to-r rounded-lg flex justify-center items-center from-violet-500 to-fuchsia-500">
                    <div>
                        <img className="h-48 w-48 rounded-full" src={user.photoURL} alt="" /><h2 className="text-center text-5xl font-bold text-white">{user.displayName}</h2>
                    </div>
                    {/* <h2>{data?.length}</h2> */}
                </div>
                <div className="h-96 rounded-lg bg-gradient-to-r flex justify-center items-center from-violet-500 to-fuchsia-500">
                    <div>
                     <h2 className="text-center text-5xl font-bold text-white">My total bookings:{data.length}</h2>
                        
                    </div>
                    {/* <h2>{data?.length}</h2> */}
                </div>
            </div>
        </div>
    );
};

export default UserHome;