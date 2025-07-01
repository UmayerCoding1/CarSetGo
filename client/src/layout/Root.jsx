import React, { useState } from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Footer from '../components/ui/Footer';
import {Toaster} from 'sonner';
import Navbar from '../components/ui/navbar/Navbar';
import { useEffect } from 'react';

const Root = () => {
 const [isChrome, setIsChrome] = useState(null);
  const [browserName, setBrowserName] = useState("");
 const isFooterAvailable = useLocation().pathname.includes('seller-dashboard');
 const homePath = useLocation().pathname === '/';

const handleClick = () => {
 window.open("https://www.google.com/chrome/", "_blank");
}

 useEffect(() => {
   if (homePath) {
     sessionStorage.removeItem('currentSellerPath');
   }
  const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;

    // Browser Name Detection
    let name = "Unknown Browser";
    if (userAgent.includes("Firefox")) name = "Mozilla Firefox";
    else if (userAgent.includes("Edg")) name = "Microsoft Edge";
    else if (userAgent.includes("OPR") || userAgent.includes("Opera"))
      name = "Opera";
    else if (navigator.brave) name = "Brave";
    else if (
      userAgent.includes("Chrome") &&
      vendor === "Google Inc." &&
      !userAgent.includes("Edg") &&
      !userAgent.includes("OPR")
    )
      name = "Google Chrome";
    else if (userAgent.includes("Safari")) name = "Safari";

    setBrowserName(name);

    // Only allow Chrome
    const isChromium = userAgent.includes("Chrome");
    const isGoogle = vendor === "Google Inc.";
    const isOpera = userAgent.includes("OPR");
    const isEdge = userAgent.includes("Edg");
    const isBrave = navigator.brave;

    const finalCheck =
      isChromium && isGoogle && !isOpera && !isEdge && !isBrave;

    setIsChrome(finalCheck);
   
 },[homePath]);


//  if (!isChrome) {
//     return (
//        <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h1>This website only works on <span style={{ color: "#4285F4" }}>Google Chrome</span>.</h1>
//         <p>
//           Please open in{" "}
//           <a
//             href="https://www.google.com/chrome/"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Google Chrome
//           </a>
//           .
//         </p>


//         <div className='flex items-center justify-center h-60'>
//           <h2 className='text-3xl text-orange-400'>A version for this browser ({browserName}) is coming very soon!</h2>
//         </div>
//       </div>
//     );
//   }
 
    return (
        <div className='font-IBM bg-white text-black'>
         
         <Navbar/>
         <Outlet/>
         
         {!isFooterAvailable && <Footer />}


    <Toaster richColors position='top-right'/>
        </div>
    );
};

export default Root;