import Navbar from "../components/header/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <div>
            <div>
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