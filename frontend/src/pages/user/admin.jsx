import React, { useState } from 'react';
import Dashboard from '../../components/admin/dashboard';
import Sidebar from '../../components/admin/sidebar';
import { Helmet } from "react-helmet";
import { Menu, X } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Helmet>
                <title>Admin | Mera Bestie</title>
            </Helmet>
          
            <div 
                className={`fixed inset-0 z-40 lg:hidden bg-black/50 transition-opacity duration-300 
                    ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleSidebar}
            ></div>
            
            <div className="flex-1 flex flex-col relative">
                <header className="lg:hidden p-4 border-b flex items-center">
                    <button onClick={toggleSidebar} className="mr-4">
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                </header>
                
                <div className="flex-1 overflow-auto">
                    <Sidebar/>
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default Admin;