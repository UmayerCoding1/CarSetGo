import React from 'react';
import Overview from '../../components/admin/Overview';
import Sidebar from '../../components/admin/Sidebar';

const AdminDeshboard = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Overview />
        </div>
    );
};

export default AdminDeshboard;