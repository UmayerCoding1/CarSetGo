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
import MyCars from "../pages/your-cars/MyCars";
import SellerDeshboard from "../pages/seller/seller-deshboard/SellerDeshboard";
import Overview from "../components/seller/Overview";
import AllCarLists from "../pages/seller/Cars/car-lists/CarLists";
import AddCars from "../pages/seller/Cars/add-cars/AddCars";
import AllBookings from "../pages/seller/all-bookings/AllBookings";
import DealershipRequest from "../pages/seller/dealership/delalership-request/DealershipRequest";
import SehedulMeeting from "../pages/seller/dealership/sehedul-meeting/SehedulMeeting";
import ReceivedPayment from "../pages/seller/payment/ReceviedPayment";
import RequestRecord from "../pages/seller/dealership/request-record/RequestRecord";
import AdminDeshboard from "../pages/admin/AdminDeshboard";
import AdminOverview from "../components/admin/Overview";
import AdminRoute from "./AdminRoute";
import Users from "../pages/admin/Users";
import Cars from "../pages/admin/Cars";
import UserAnalytics from "../pages/admin/UserAnalytics";
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
        path: "/future-cars",
        element: <CarLists />,
      },
      {
        path: "/future-cars/:id",
        element: <CarDetails />,
      },

      {
        path: "/saved-cars",
        element: (
          <PrivetRoute>
            <SaveCars />
          </PrivetRoute>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <PrivetRoute>
            <MyBooking />
          </PrivetRoute>
        ),
      },
      {
        path: "/my-cars/:id",
        element: (
          <PrivetRoute>
            <MyCars />
          </PrivetRoute>
        ),
      },

      // seller routes
      {
        path: "/pricing",
        element: (
          <PrivetRoute>
            <Pricing />
          </PrivetRoute>
        ),
      },
    ],
  },

  // seller dashboard routes

  {
    path: "/seller-dashboard",
    element: (
      <SellerRoute>
        <SellerDeshboard />
      </SellerRoute>
    ),
    children: [
      {
        path: "/seller-dashboard",
        element: <Overview />,
      },
      {
        path: "/seller-dashboard/car-lists",
        element: <AllCarLists />,
      },
      {
        path: "/seller-dashboard/add-cars",
        element: <AddCars />,
      },
      {
        path: "/seller-dashboard/all-bookings",
        element: <AllBookings />,
      },
      {
        path: "/seller-dashboard/dealership-requests",
        element: <DealershipRequest />,
      },
      {
        path: "/seller-dashboard/dealership-requests/record",
        element: <RequestRecord />,
      },
      {
        path: "/seller-dashboard/schedile-mecting",
        element: <SehedulMeeting />,
      },
      {
        path: "/seller-dashboard/received-payments",
        element: <ReceivedPayment />,
      },
    ],
  },

  // admin desboard route
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <AdminDeshboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminOverview />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <UserAnalytics />,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      
    ],
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
    element: (
      <GoogleAuthWrapper>
        <SignUp />
      </GoogleAuthWrapper>
    ),
  },
]);

export default router;
