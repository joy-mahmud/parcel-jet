import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data, refetch } = useQuery({
        queryKey: ['AllUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers')
            return res.data
        }
    })
    const handleSetDeliveryMan = async(id)=>{
        const role = {role:'delivery_man'}
        const res = await axiosSecure.patch(`/users/admin/${id}`,role)
        if(res.data.modifiedCount>0){
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
    const handleSetAdmin = async(id)=>{
        const role ={role:'admin'}
        const res = await axiosSecure.patch(`/users/admin/${id}`,role)
        if(res.data.modifiedCount>0){
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
    

    console.log(data)
    return (
        <div>
            <SectionTitle heading={'All Users'}></SectionTitle>
            <div className="border-b-2 p-y-2">
                <div className="flex justify-between mx-14 mb-2">
                    <div className="flex w-1/3 gap-1">
                        <h2 className="text-3xl font-semibold">Total users:{data?.allUsers.length}</h2>

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
                                <th>{idx+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{data.deliveryCount[idx]}</td>
                                <td>{user.role}</td>
                                <td >
                                    <button onClick={()=>handleSetDeliveryMan(user._id)} className="bg-[#264E99] text-white p-2 rounded-lg mr-2">make Delivery man</button>
                                    <button onClick={()=>handleSetAdmin(user._id)} className="bg-[#264E99] text-white p-2 rounded-lg">make Admin</button>
                                </td>
                            </tr>)
                         }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;