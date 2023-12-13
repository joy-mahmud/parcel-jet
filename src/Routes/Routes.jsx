import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/Signup";
import Dashboard from "../layout/Main/Dashboard";
import PrivateRoute from "./Private/PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BookParcel from "../pages/Dashboard/BookParcel/BookParcel";
import MyParcel from "../pages/Dashboard/MyParcel/MyParcel";
import UpdateParcel from "../pages/Dashboard/UpdateParcel/UpdateParcel";
import UserHome from "../pages/Dashboard/userHome/UserHome";
import UserProfile from "../pages/Dashboard/UseProfile/UserProfile";
import AdminRoute from "./AdminRoute/AdminRoute";
import AllParcesl from "../pages/Dashboard/AllParcels/AllParcesl";
import AllDeliveryMen from "../pages/Dashboard/AllDeliveryMen/AllDeliveryMen";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import DeliveryManHome from "../pages/Dashboard/DeliveryManHome/DeliveryManHome";
import DeliveryManRoute from "./DeliveryManRoute/DeliveryManRoute";
import MyDeliveryList from "../pages/Dashboard/MyDeliveryList/MyDeliveryList";
import Myreview from "../pages/Dashboard/MyReview/Myreview";
import GetSupport from "../pages/Support/GetSupport";
import UserMessages from "../pages/Support/UserMessages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'userHome',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path:'getSupport',
                element:<PrivateRoute><GetSupport></GetSupport></PrivateRoute>
            },
            {
                path: 'myProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'bookParcel',
                element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
            },
            {
                path: 'updateParcel/:id',
                element: <PrivateRoute><UpdateParcel></UpdateParcel></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/cart/${params.id}`)
            },
            {
                path: 'myParcels',
                element: <PrivateRoute><MyParcel></MyParcel></PrivateRoute>

            },
            {
                path:'myMessages',
                element:<PrivateRoute><UserMessages></UserMessages></PrivateRoute>
            },
            //delivery man routes
            {
                path:'deliveryManHome',
                element:<DeliveryManRoute><DeliveryManHome></DeliveryManHome></DeliveryManRoute>
            },
            {
                path:'myDeliveryList',
                element:<DeliveryManRoute><MyDeliveryList></MyDeliveryList></DeliveryManRoute>
            },
            {
                path:'myReviews',
                element:<DeliveryManRoute><Myreview></Myreview></DeliveryManRoute>
            },


            //admin only routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },

            {
                path: 'allParcels',
                element: <AdminRoute><AllParcesl></AllParcesl></AdminRoute>
            },
            {
                path: 'allDeliveryMen',
                element: <AdminRoute><AllDeliveryMen></AllDeliveryMen></AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
                loader:()=>fetch('http://localhost:5000/usersCount')
            }


        ]
    }
]);


