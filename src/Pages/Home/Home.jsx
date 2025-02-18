import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import Membership from "./Membership/Membership";
import Support from "./Support/Support";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MealsByCategory></MealsByCategory>
            <HowItWorks></HowItWorks>
            <Membership></Membership>
            <Testimonial></Testimonial>
            <Support></Support>
        </div>
    );
};

export default Home;