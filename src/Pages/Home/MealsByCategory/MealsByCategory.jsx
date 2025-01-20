import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMeal from "../../../Hook/UseMeal";
import MealCards from "./MealCards/MealCards";

const MealsByCategory = () => {
    const [meal] = UseMeal();

    const breakfast = meal.filter(item => item.category === 'breakfast')
    const lunch = meal.filter(item => item.category === 'lunch')
    const dinner = meal.filter(item => item.category === 'dinner')


    return (
        <div>
            <SectionTitle
                heading={'Explore Our Delicious Meals'}
                subheading={'Choose from a variety of breakfast, lunch, and dinner options to satisfy your cravings. Find the perfect meal for any time of day!'}
            ></SectionTitle>
            <div className="my-10 text-center">
                <Tabs>
                    <TabList>
                        <Tab>All Meals</Tab>
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                    </TabList>

                    <TabPanel>
                        <MealCards items={meal}></MealCards>
                    </TabPanel>
                    <TabPanel>
                        <MealCards items={breakfast}></MealCards>
                    </TabPanel>
                    <TabPanel>
                        <MealCards items={lunch}></MealCards>
                    </TabPanel>
                    <TabPanel>
                        <MealCards items={dinner}></MealCards>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default MealsByCategory;