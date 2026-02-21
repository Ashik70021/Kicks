import Navbar from "../components/header/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
const MainLayout = () => {
    return (
        <div className="pt-4">
            <ScrollToTop />
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