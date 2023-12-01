import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

import bannerImg from '../../../assets/banner.jpg'
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import auth from "../../../firebase/firebase.config";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UserProfile = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": 'multipart/form-data'
            }
        })
        if (res.data.success) {
            updateProfile(auth.currentUser, {
                photoURL: res.data.data.display_url
            }).then(res=>console.log(res))
        }
    }

    return (
        <div className="flex justify-center bg-black min-h-full">
            <div className="flex flex-col w-[80%] items-center bg-[#FFFFFF]">

                <img className="w-[80%] h-[300px]" src={bannerImg} alt="" />
                <div className=" top-[200px] flex flex-col items-center">
                    <div className="">
                        <img className="h-[280px] w-[280px] -mt-[100px] rounded-full" src={user.photoURL} alt="" />
                    </div>
                    <div className=" mb-12 mt-3">
                        <form onSubmit={handleSubmit(onSubmit)} className='' >
                            <input type="file" className="bg-[#0069D9] text-white rounded-lg" {...register("image", { required: true })} id="actual-btn"  />
                            <button className="bg-[#0069D9] px-3 cursor-pointer py-2 ml-2 text-white rounded-lg ">upload photo</button>
                        </form>
                    </div>
                    <h2 className="text-5xl font-semibold text-[#5D7173]">{user.displayName}</h2>
                    <p className="text-xl font-medium">Web designer and developer</p>
                    <button className=" mt-10 bg-[#0069D9] px-8 py-3 text-2xl font-semibold rounded-[60px] text-white">Follow</button>

                </div>
                <div className="flex justify-around w-full mt-10 mb-20">
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold">454635</h2>
                        <p>Articles</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold">3635k</h2>
                        <p>Followers</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-semibold">7535k</h2>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;