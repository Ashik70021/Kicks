import Navbar from "../components/header/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <div className="ml-4 mr-4 sm:ml-8 sm:mr-8 pt-4">
            <div className="">
                <Navbar></Navbar>
            </div>
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;