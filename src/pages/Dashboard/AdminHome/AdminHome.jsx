import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure()
  const { data = {} } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/adminStats')
      return res.data
    }
  })
  console.log(data)
  return (
    <div className="mx-5">
      <SectionTitle heading={"Parcel Jet"}></SectionTitle>
      <div className="grid grid-cols-2 gap-5">
        <div className="h-48 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-3 flex items-center justify-center rounded-lg">
          <div>
            <h2 className="text-5xl font-bold">Total revenue</h2>
            <p className="text-4xl font-bold text-center">{data.revenue}$</p>
          </div>
        </div>
        <div className="h-48 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-3 flex items-center justify-center rounded-lg">
          <div>
            <h2 className="text-5xl font-bold">Total Delivery</h2>
            <p className="text-4xl font-bold text-center">{data.totalDelivery}</p>
          </div>
        </div>
        <div className="h-48 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-3 flex items-center justify-center rounded-lg">
          <div>
            <h2 className="text-5xl font-bold">Total Users</h2>
            <p className="text-4xl font-bold text-center">{data.users}</p>
          </div>
        </div>
        <div className="h-48 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-3 flex items-center justify-center rounded-lg">
          <div>
            <h2 className="text-5xl font-bold">Total Bookings</h2>
            <p className="text-4xl font-bold text-center">{data.totalBooking}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;