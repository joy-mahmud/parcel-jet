import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useDeliveryman from "../../hooks/useDeliveryman";
import { FaBook, FaHome, FaList, FaQuestion, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { BiMessage } from "react-icons/bi";

const Dashboard = () => {
    const [isdeliveryMan,deliveryLoading] = useDeliveryman()
    
    const [isAdmin,adminLoading] = useAdmin()
    if(deliveryLoading || adminLoading){
        return
    }
    return (
        <div className="flex">
            <div className="w-56 bg-[#253544] min-h-screen">
                <h2 className="text-3xl text-white  mt-5 font-extrabold border-b-2 border-black p-2 ">Parcel Jet
                </h2>

                <ul>
                   { !isAdmin && !isdeliveryMan &&<>
                        <NavLink to={'/'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaHome></FaHome> <p>Home</p></li></NavLink>
                        <NavLink to={'/dashboard/bookParcel'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaBook></FaBook> <p>Book a parcel</p></li></NavLink>
                        <NavLink to={'/dashboard/myParcels'}> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaList></FaList><p>My Parcels</p></li></NavLink>
                        <NavLink to={'/dashboard/myProfile'}> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaUser></FaUser> <p>My profile</p></li></NavLink>
                        <NavLink to={'/dashboard/myMessages'}> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><BiMessage /> <p>Messages</p></li></NavLink>
                        <NavLink to={'/dashboard/getSupport'}> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaQuestion /> <p>Support</p></li></NavLink>
                    </>}

                    { isdeliveryMan &&<>
                        <NavLink to={'/'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaHome></FaHome> <p>Home</p></li></NavLink>
                        <NavLink to={'/dashboard/myDeliveryList'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaList></FaList> <p>My delivery List</p></li></NavLink>
                        <NavLink to={'/dashboard/myReviews'}> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaStar></FaStar><p>My Reviews</p></li></NavLink>
                        <NavLink> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaUser></FaUser> <p>my profile</p></li></NavLink>
                        <NavLink to={'/dashboard/bookParcel'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaBook></FaBook> <p>Book a parcel</p></li></NavLink>
                    </>}
                    { isAdmin &&<>
                        <NavLink to={'/'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaHome></FaHome> <p>Home</p></li></NavLink>
                        <NavLink to={'/dashboard/allParcels'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaList></FaList> <p>All parcels</p></li></NavLink>
                        <NavLink to={'/dashboard/allUsers'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaUsers></FaUsers><p>All Users</p></li></NavLink>
                        <NavLink to={'/dashboard/allDeliveryMen'}> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaUsers></FaUsers><p>All Delivery Men</p></li></NavLink>
                        <NavLink> <li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaUser></FaUser> <p>my profile</p></li></NavLink>
                        <NavLink to={'/dashboard/provideSupport'}><li className="text-white border-b-2 p-2 border-[#3C3C3C] flex items-center gap-1 text-xl font-semibold"><FaQuestion/> <p>Provide Support</p></li></NavLink>
                    </>}
                    
                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>

            </div>

        </div>
    );
};

export default Dashboard;