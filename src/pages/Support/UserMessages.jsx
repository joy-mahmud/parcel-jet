import { useContext } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import logo from '../../assets/logo.jpg'


const UserMessages = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data, isPending } = useQuery({
        queryKey: ['mymessages', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/getReply?email=${user.email}`)
            return res.data
        }
    })
    if (loading || isPending) {
        return <Loading></Loading>
    }

    return (
        <div>
            <SectionTitle heading={'My Messages'}></SectionTitle>
            {
                data.map(reply => <div className="ml-5 p-3 min-h-screen" key={reply._id}>
                    <div className="p-3 border-2 mb-2 rounded-lg">
                        <div className="flex justify-start">
                            <div className=" w-[90%] mb-3 ">
                                <div className="flex gap-2">
                                    <img src={reply.img} className="h-[50px] w-[50px] rounded-full" alt="" />
                                    <p className="p-2 rounded-lg inline-block bg-slate-300"> {reply.msg}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="w-[90%] flex justify-end mb-3">
                                <div className="flex gap-2">
                                    <p className="p-2 rounded-lg inline-block bg-slate-300"> {reply.reply}</p>
                                    <img src={logo} className="h-[50px] w-[50px] rounded-full" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }



        </div>
    );
};

export default UserMessages;