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

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element:<Signup></Signup>
        }
      ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'userHome',
                element:<PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path:'myProfile',
                element:<UserProfile></UserProfile>
            },
            {
               path:'bookParcel',
               element:<PrivateRoute><BookParcel></BookParcel></PrivateRoute> 
            },
            {
                path:'updateParcel/:id',
                element:<PrivateRoute><UpdateParcel></UpdateParcel></PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:5000/cart/${params.id}`)
            },
            {
                path:'myParcels',
                element:<PrivateRoute><MyParcel></MyParcel></PrivateRoute>

            }
        ]
    }
  ]); 


