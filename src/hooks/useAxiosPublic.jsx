import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://parcel-management-server-bay.vercel.app'
})
const useAxiosPublic = () => {
   
        return axiosPublic;
};

export default useAxiosPublic;