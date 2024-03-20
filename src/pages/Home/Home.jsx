
import Banner from "../../components/Banner/Banner";
import Feature from "./Feature/Feature";
import Footer from "./Footer/Footer";
import Services from "./Services/Services";
import Stats from "./Stats/Stats";
import TopDeliveryMan from "./TopDeliveryMen/TopDeliveryMan";
import ChooseUs from "./WhyChooseUs/ChooseUs";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <Services></Services>
            <ChooseUs></ChooseUs>
            <TopDeliveryMan></TopDeliveryMan>
            <Footer></Footer>
            {/* 
           <Stats></Stats>
          
           <Footer></Footer> */}
        </div>
    );
};

export default Home;