import {createBrowserRouter} from 'react-router';
import Root from '../layout/Root';
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/signUp/SignUp';
import Home from '../pages/home/Home';

const router = createBrowserRouter([
    {
        path: '/', 
       element: <Root />,
       children: [
        {
            path:'/',
            element: <Home />
        }
       ]
    },


    {
        path:"/sign-in",
        element: <SignIn/>
    },
    {
        path:"/sign-up",
        element: <SignUp/>
    }
]);

export default router;