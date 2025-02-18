import Banner from "./Banner/Banner";
import FAQ from "./FAQ/FAQ";
import HowItWorks from "./HowItWorks/HowItWorks";
import Join from "./Join/Join";
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
            <Support></Support>
            <FAQ></FAQ>
            <Testimonial></Testimonial>
            <Join></Join>
        </div>
    );
};

export default Home;