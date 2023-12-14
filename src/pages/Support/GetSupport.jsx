import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const GetSupport = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        const supportDate = {
            name:user.displayName,
            email:user.email,
            img:user.photoURL,
            msg:data.msg,
            status:'pending'
        }
        const res = await axiosSecure.post('/getSupport',supportDate)
        if(res.status===200){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your message is recieved please wait for the reply",
                showConfirmButton: false,
                timer: 1500
              });
        }


    }
    return (
        <div>
            <SectionTitle heading={'Get your Support'}></SectionTitle>
            <div className="px-20 py-5 border-2 space-y-3 mx-10 rounded-lg">
                <h2 className="text-4xl font-semibold">You have any query? please let us Know...</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea {...register('msg')} className="textarea w-full textarea-bordered" placeholder="Type your message here"></textarea><br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default GetSupport;
