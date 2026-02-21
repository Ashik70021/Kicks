import Navbar from "../components/header/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
const MainLayout = () => {
    const { pathname } = useLocation();
    return (
        <div className="pt-4">
            <ScrollToTop />
            <div>
                <Navbar></Navbar>
            </div>
            <div key={pathname} className="min-h-screen animate-fade-in">
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;