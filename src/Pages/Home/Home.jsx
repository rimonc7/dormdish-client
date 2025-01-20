import Banner from "./Banner/Banner";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import Membership from "./Membership/Membership";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <Membership></Membership>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;