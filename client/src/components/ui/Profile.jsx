import { X } from 'lucide-react';
import React from 'react';

const Profile = ({setIsOpenProfile}) => {
    return (
        <div className='absolute top-0 left-0 z-100 w-full h-screen bg-black/30 flex items-center justify-center'>
             <div className='bg-white w-[900px] h-[400px] rounded-lg p-4'>
                 <button onClick={()=>setIsOpenProfile(false)}><X/></button>
             </div>
        </div>
    );
};

export default Profile;