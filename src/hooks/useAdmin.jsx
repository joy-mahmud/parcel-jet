import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)


    const { data: isAdmin, isPending: adminLoading } = useQuery({
        queryKey: [user?.email, 'admin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin
        }
    })
    return [isAdmin, adminLoading]
};


export default useAdmin;