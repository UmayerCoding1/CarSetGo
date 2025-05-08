import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Home from "../pages/home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CarLists from "../pages/carr-list/CarLists";
import CarDetails from "../pages/car-details/CarDetails";
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
        // loader: ({params}) => fetch(`${import.meta.env.VITE_API_ENDPOINT}/car/${params.id}`)
      }
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
    element: <GoogleAuthWrapper>
              <SignUp />
           </GoogleAuthWrapper>,
  },
]);

export default router;
