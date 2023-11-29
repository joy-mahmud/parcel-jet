
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

const useDeliveryman = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)


    const { data: isdeliveryMan, isPending: deliveryLoading } = useQuery({
        queryKey: [user?.email, 'deliveryMan'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliveryMan/${user.email}`)
            return res.data?.deliveryMan
        }
    })
    return [isdeliveryMan, deliveryLoading]
};

export default useDeliveryman;