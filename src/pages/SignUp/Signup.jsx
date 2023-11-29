import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import GoogleLogin from "../Login/GoogleLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";


const Signup = () => {
    const { createUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) =>{
        createUser(data.email,data.password)
        .then(result=>{
            updateProfile(auth.currentUser, {
                displayName: data.name, photoURL: ""
              })
              .then(()=>{
               const userInfo ={
                    name:data.name,
                    email:data.email
                }
                axiosPublic.post('/users',userInfo)
                .then(res=>{
                    if(res.data.insertedId){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You registered successfully",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                })
              })
              navigate('/')

            console.log(result.user)})
    }

   
    return (
        <div className="flex justify-center flex-row-reverse items-center">
          
            <div className="w-1/3 mt-28">
            <h1 className="text-4xl text-center mt-5 mb-3 font-bold">Signup Now</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2' >
                    <div>
                        <label>Name</label><br />
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Your name" className="input input-bordered w-full " />
                        {errors.name && <span className='text-red-600'>Name is required</span>}
                    </div>
                    <div>
                        <label>Email</label><br />
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="Your email" className="input input-bordered w-full " />
                        {errors.email && <span className='text-red-600'>Email is required</span>}
                    </div>
                    <div>
                        <label>password</label><br />
                        <input type="password" {...register("password", { required: true, minLength:6,pattern:/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/ })} name="password" placeholder="your password" className="input input-bordered w-full " />
                        {errors.password?.type === "required" && (
                            <p className='text-red-600'>password is required</p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className='text-red-600'>password must have one uppercase,one lowercase, one special character and one numeric value</p>
                        )}
                    </div>


                    <div>
                        <button className="bg-[#264E99] py-2 rounded-lg outline-none text-center text-white w-full">Sign up</button>
                        <p className="mb-5">Already have an account ? <Link to='/login' className="text-[#264E99]">Login</Link></p>
                        
                    </div>
                </form>
                <GoogleLogin></GoogleLogin>
            </div>
        </div>
    );
};

export default Signup;