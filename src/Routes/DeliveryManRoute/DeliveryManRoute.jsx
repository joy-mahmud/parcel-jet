import { Navigate, useLocation } from "react-router-dom";
import useDeliveryman from "../../hooks/useDeliveryman";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";


const DeliveryManRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const [isdeliveryMan,deliveryLoading]=useDeliveryman()
    const location =useLocation()
    if(loading || deliveryLoading){
        return <div className="text-center"><span className="loading loading-spinner loading-lg"></span></div>
    }
    if(user && isdeliveryMan){
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default DeliveryManRoute;