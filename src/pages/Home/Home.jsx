import Banner from "../../components/Banner";
import Footer from "./Footer/Footer";
import Services from "./Services";
import Stats from "./Stats/Stats";
import TopDeliveryMan from "./TopDeliveryMan";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <Stats></Stats>
           <TopDeliveryMan></TopDeliveryMan>
           <Footer></Footer>
        </div>
    );
};

export default Home;