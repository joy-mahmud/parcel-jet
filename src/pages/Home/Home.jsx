
import Banner from "../../components/Banner/Banner";
import Footer from "./Footer/Footer";
import Services from "./Services/Services";

import Stats from "./Stats/Stats";
import TopDeliveryMan from "./TopDeliveryMan";
import ChooseUs from "./WhyChooseUs/ChooseUs";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ChooseUs></ChooseUs>
           {/* 
           <Stats></Stats>
           <TopDeliveryMan></TopDeliveryMan>
           <Footer></Footer> */}
        </div>
    );
};

export default Home;