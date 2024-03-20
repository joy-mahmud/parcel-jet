import axios from "axios";

const axiosPublic = axios.create({
    // http://localhost:5000
    //http://localhost:5000/
    baseURL: 'http://localhost:5000'
})
const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;