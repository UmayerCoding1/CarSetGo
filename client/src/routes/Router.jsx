import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Home from "../pages/home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CarLists from "../pages/carr-list/CarLists";
import CarDetails from "../pages/car-details/CarDetails";
import PrivetRoute from "./PrivetRoute";
import SaveCars from "../pages/save-cars/SaveCars";
import MyBooking from "../pages/my-booking/MyBooking";
import SellerRoute from "./SellerRoute";
import Pricing from "../pages/seller/Pricing/Pricing";
import Payment from "../pages/payment/Payment";
import MyCars from "../pages/your-cars/MyCars";
import SellerDeshboard from "../pages/seller/seller-deshboard/SellerDeshboard";
import Overview from "../components/seller/Overview";

const GoogleAuthWrapper = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
      {children}
    </GoogleOAuthProvider>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/future-cars',
        element: <CarLists/>
      },
      {
        path: '/future-cars/:id',
        element: <CarDetails/>,
      },

      {
        path: '/payment/:type',
        element: <PrivetRoute><Payment/></PrivetRoute>
      },
      {
        path: '/saved-cars',
        element: <PrivetRoute><SaveCars/></PrivetRoute>
      },
      {
        path: '/my-booking',
        element: <PrivetRoute><MyBooking/></PrivetRoute>
      },
      {
        path: '/my-cars/:id',
        element: <PrivetRoute><MyCars/></PrivetRoute>
      },


      // seller routes
      {
        path: '/pricing',
        element: <PrivetRoute><Pricing/></PrivetRoute>
      },


     
        
      
    ],
  },

  // seller routes

  {
    path: "/seller-dashboard",
    element: <SellerRoute><SellerDeshboard/></SellerRoute>,
    children: [
      {
        path: "/seller-dashboard",
        element: <Overview/>
      },

    ]
  },

  {
    path: "/sign-in",
    element: (
      <GoogleAuthWrapper>
        <SignIn />
      </GoogleAuthWrapper>
    ),
  },
  {
    path: "/sign-up",
    element: <GoogleAuthWrapper>
              <SignUp />
           </GoogleAuthWrapper>,
  },
]);

export default router;
