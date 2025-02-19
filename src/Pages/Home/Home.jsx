import { useState } from "react";
import Banner from "./Banner/Banner";
import FAQ from "./FAQ/FAQ";
import HowItWorks from "./HowItWorks/HowItWorks";
import Join from "./Join/Join";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import Membership from "./Membership/Membership";
import Support from "./Support/Support";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div>
            <Banner setSearchQuery={setSearchQuery}></Banner>
            <MealsByCategory searchQuery={searchQuery}></MealsByCategory>
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