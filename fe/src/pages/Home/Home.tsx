import Banner from "./components/Banner/Banner";
import BannerFooter from "./components/Banner/BannerFooter";
import BannerBottom from "./components/BannerBottom/BannerBottom";
import ProductsHome from "./components/ProductsHome/ProductsHome";
import ProductsHomeNew from "./components/ProductsHomeNew/ProductsHomeNew";
import TitleInspiration from "./components/Title/TitleInspiration";
import TitleNew from "./components/Title/TitleNew";
import TitleProducts from "./components/Title/TitleProducts";

const Home = () => {
    return (
        <>
            {/* Banner */}
            <Banner />
            {/* TitleNew */}
            <div className="padding">
                <TitleNew />
                {/* ProductsHomeNew */}
                <ProductsHomeNew />
                {/* TitleProducts */}
                <TitleProducts />
                {/* ProductsHome */}
                <ProductsHome />
            </div>
            {/* TitleInspiration */}
            <TitleInspiration />
            {/* BannerFooter */}
            <BannerFooter />
            {/* BannerBottom */}
            <BannerBottom />
        </>
    );
};

export default Home;
