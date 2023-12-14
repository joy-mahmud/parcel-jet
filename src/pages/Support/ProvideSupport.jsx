import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ProvideSupport = () => {
    const { user } = useContext(AuthContext)
    const [supportId,setSupportId]=useState(null)

    const axiosSecure = useAxiosSecure()
    const { data, isPending, refetch } = useQuery({
        queryKey: ['usermsg', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/getUsermsg')
            return res.data
        }
    })
    console.log(data)
    const {
        register,
        handleSubmit,
    } = useForm()
    const onSubmit = async (data) => {
        const repliedData = {
            reply:data.reply,
            status: 'replied'
        }
        const res = await axiosSecure.patch(`/provideSupport/${supportId}`,repliedData)
        console.log(res)
        if (res.data.modifiedCount >0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your message is delivered",
                showConfirmButton: false,
                timer: 1500
            });
        }


    }
    const handleSupport =(id)=>{
        setSupportId(id)
    }

    return (
        <div className=''>
            <SectionTitle heading={'Users Reports'}></SectionTitle>
            <div className='mx-10 border-2 min-h-screen p-5'>
                {
                    data?.map(user => <div onClick={()=>handleSupport(user._id)} key={user._id} className=' flex justify-between mb-3 gap-3 border-2 border-slate-800 pl-2 rounded-lg '>

                        {/* <div className='flex items-center'>
                            <img className='h-[50px] w-[50px] rounded-full' src={user.img} alt="" />
                            <div className='flex flex-col'>
                                <h2 className='text-3xl font-semibold'>{user.name}</h2>
                                <p className=''>{user.msg}</p>
                                
                            </div>
                        </div>
                        <div className='bg-slate-800 text-white w-[90px] flex justify-center'>
                            <button onClick={() => handleReply(user)} className='px-3 py-2 h-full w-full'>Reply</button>

                        </div> */}
                        <details className="collapse ">
                            <summary className="collapse-title text-xl font-medium">
                                <div className='flex items-center'>
                                    <img className='h-[50px] w-[50px] rounded-full mr-3' src={user.img} alt="" />
                                    <div className='flex flex-col'>
                                        <h2 className='text-3xl font-semibold'>{user.name}</h2>
                                        {/* <p className={!showmsg==user._id ?'hidden':''}>{user.msg.slice(0,50)}....</p> */}

                                    </div>
                                </div>
                            </summary>
                            <div className="collapse-content">
                                <p className='mb-10'>{user.msg}</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='flex items-center gap-2'>
                                        <input type="text" {...register('reply')} placeholder="Type here" className="input input-bordered w-full" />
                                        <button className='px-3 py-3 h-full rounded-lg w-[90px] bg-slate-800 text-white'>Reply</button>
                                    </div>
                                </form>
                            </div>
                        </details>

                    </div>)
                }
                <div>

                </div>
            </div>

        </div>
    );
};

export default ProvideSupport;