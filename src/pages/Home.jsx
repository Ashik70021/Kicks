import Banner from "../components/Home_Page_Contents/Banner";
import Categories from "../components/Home_Page_Contents/Categories";
import New_Drops from "../components/Home_Page_Contents/New_Drops";
import Reviews from "../components/Home_Page_Contents/Reviews";

const Home = () => {
    return (
        <div>
            <Banner />
            <New_Drops />
            <Categories />
            <Reviews />
        </div>
    );
};

export default Home;