
import bannerImg from "../../../assets/banner.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
const UserHome = () => {
    return (
        <div>
            <SectionTitle heading={'Parcel jet'}></SectionTitle>
            <img src={bannerImg} alt="" />
        </div>
    );
};

export default UserHome;