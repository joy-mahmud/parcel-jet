
import { Link, NavLink } from 'react-router-dom';
import './navbar.css'
import logo from '../../assets/logo.jpg'
import { useContext, useState } from 'react';

// import useAdmin from '../../hooks/useAdmin';
import { AuthContext } from '../../provider/AuthProvider';
import { FaArrowRight, FaBell } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import useAdmin from '../../hooks/useAdmin';
import useDeliveryman from '../../hooks/useDeliveryman';
const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext)
    const [showProfie, setShowProfile] = useState(false)
    // const [isAdmin] = useAdmin()
    const [isAdmin] = useAdmin()
    const [isdeliveryMan] = useDeliveryman()
    const handleLogout = () => {
        logOut()
            .then(res => {
                setShowProfile(false)
            })
            .catch(err => console.log(err))
    }
    const handleDropdown = () => {
        setShowProfile(!showProfie)
    }
    const hideMenu = () => {
        setShowProfile(false)
    }
    // if(loading){
    //     return <Loading></Loading>
    // }
    return (
        <div className="navbg py-3 z-10 w-full mb-5">
            <div className=" mx-20 flex justify-between items-center">
                <div className="">
                    <img className='w-[70px] h-[40px] md:w-[90px] lg:h-[50px]' src={logo} alt="" />
                    <h3 className="md:text-xl font-bold">parcel jet</h3>
                </div>
                <ul className="flex items-center gap-5 font-bold text-xl">
                    <li className=''><NavLink>Home</NavLink></li>

                    {
                        user && !isAdmin && !isdeliveryMan && <li><NavLink to={'dashboard/getSupport'}>Support</NavLink></li>
                    }
                    {user && isAdmin && <li><NavLink to={'dashboard/ProvideSupport'}>Support</NavLink></li>}
                    {user && isAdmin && <li><NavLink to={'dashboard/adminHome'}>Dashboard</NavLink></li>}
                    {user && isdeliveryMan && <li><NavLink to={'dashboard/deliveryManHome'}>Dashboard</NavLink></li>}

                    {
                        user && !isAdmin && !isdeliveryMan && <li><NavLink to={'dashboard/userHome'}>Dashboard</NavLink></li>
                    }


                    {/* <li><NavLink to={'/dashboard'}>DashBoard</NavLink></li> */}
                    <li className='flex relative mr-2'><span><NavLink to={'/'}><FaBell className='text-3xl'></FaBell></NavLink></span><Link to={'/'}><div className="absolute badge text-[12px] badge-secondary top-0 left-[16px]">+{0}</div></Link></li>
                    <li>
                        <div className='flex items-center gap-5 relative'>
                            <div style={{ position: 'absolute', zIndex: '10' }} className={showProfie ? 'showprofile' : 'hideProfile'}>
                                <ul className="menu bg-[#242424] w-56 rounded-box">
                                    <li className='w-full text-center text-2xl mb-5 text-white'>{user?.displayName}</li>
                                    {
                                        user && !isAdmin && !isdeliveryMan && <li className='text-white'><NavLink to={'dashboard/userHome'}>Dashboard</NavLink></li>
                                    }
                                    {user && isAdmin && <li className='text-white'><NavLink to={'dashboard/adminHome'}>Dashboard</NavLink></li>}
                                    {user && isdeliveryMan && <li className='text-white'><NavLink to={'dashboard/deliveryManHome'}>Dashboard</NavLink></li>}
                                    <li onClick={hideMenu}><button onClick={handleLogout} className='text-white'>LogOut</button></li>
                                </ul>
                            </div>
                        </div>
                        {
                            user ? <div onClick={handleDropdown} className='flex gap-1 cursor-pointer'><img className="h-[40px] w-[40px] rounded-full" src={user.photoURL}></img></div> : <NavLink to={'/login'}>Login</NavLink>
                        }
                    </li>
                    <li>
                        <div className='bg-[#112232]'>
                            <Link to={'dashboard/bookParcel'}><button className='navOrderBtn relative transition-all duration-500  text-white px-5 py-3 border-2 border-[#112232] z-10'><span className='text-xl font-bold'>Order Online </span></button> </Link>
                        </div>
                    </li>


                </ul>
            </div>
        </div>
    );
};

export default Navbar;