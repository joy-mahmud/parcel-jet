import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import { useLoaderData } from "react-router-dom";
import './allUsers.css'

const AllUsers = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const itmesPerPage = 5
    const axiosSecure = useAxiosSecure()
    const { count } = useLoaderData()
    console.log(count)
   

    const { data, refetch, isPending } = useQuery({

        queryKey: ['AllUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers?page=${currentPage}&size=${itmesPerPage}`)
            return res.data
        }
    })
    useEffect(()=>{
        refetch()
    },[currentPage,refetch])
    if (isPending) {
        return <Loading></Loading>
    }
    const numberOfPages = Math.ceil(count / itmesPerPage)
    console.log(numberOfPages)
    const pages = [...Array(numberOfPages).keys()]

    const handleSetDeliveryMan = async (id) => {
        const role = { role: 'delivery_man' }
        const res = await axiosSecure.patch(`/users/admin/${id}`, role)
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The user is delivery man now",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleSetAdmin = async (id) => {
        const role = { role: 'admin' }
        const res = await axiosSecure.patch(`/users/admin/${id}`, role)
        if (res.data.modifiedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The user is admin now",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            // refetch()
        }

    }
    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            // refetch()
        }
    }

    console.log(data)
    return (
        <div>
            <SectionTitle heading={'All Users'}></SectionTitle>
            <div className="border-b-2 p-y-2">
                <div className="flex justify-between mx-14 mb-2">
                    <div className="flex w-1/3 gap-1">
                        <h2 className="text-3xl font-semibold">Total users:{count}</h2>

                    </div>

                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number of parcel booked</th>
                            <th>User Type</th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.allUsers.map((user, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{data.deliveryCount[idx]}</td>
                                <td>{user.role}</td>
                                <td >
                                    <button onClick={() => handleSetDeliveryMan(user._id)} className="bg-[#264E99] text-white p-2 rounded-lg mr-2">make Delivery man</button>
                                    <button onClick={() => handleSetAdmin(user._id)} className="bg-[#264E99] text-white p-2 rounded-lg">make Admin</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div className="flex gap-1 justify-center mt-1">
                <button onClick={handlePrev} className='btn mr-2'>prev</button>
                {
                    pages.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        className={currentPage == page ? 'bg-black text-white rounded-md ml-2 text-xl p-2' : 'bg-slate-400 rounded-md ml-2 text-xl p-2'}
                        key={page}
                    >
                     {page + 1}
                    </button>)
                }
                <button onClick={handleNext} className='btn ml-2'>next</button>
            </div>
        </div>
    );
};

export default AllUsers;