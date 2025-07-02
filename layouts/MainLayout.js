import { Outlet } from "react-router-dom";
import Header from '@components/Header/NavBar';
import Footer from '@components/Footer/Footer';

const MainLayout = () => {
    return (
        <main>
            <Header />
            
            <div className="min-h-screen flex">
                {/* Sidebar */}
                <aside className="w-[30%] bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <ul className="space-y-4">
                    <li className="hover:text-blue-400 cursor-pointer">Overview</li>
                    <li className="hover:text-blue-400 cursor-pointer">Users</li>
                    <li className="hover:text-blue-400 cursor-pointer">Settings</li>
                </ul>
                </aside>
        
                {/* Main content */}
                <main className="w-[70%] bg-gray-100 p-8">
                {children}
                </main>
            </div>

            <Outlet />
            <Footer />
        </main>
    );
};

export default MainLayout;