import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseMeal from "../../../Hook/UseMeal";
import MealCards from "./MealCards/MealCards";

const MealsByCategory = ({ searchQuery }) => {
  const [meal] = UseMeal();
  const lowerCaseQuery = (searchQuery || "").toLowerCase();

  const filteredMeals = meal?.filter((item) =>
    item.title?.toLowerCase().includes(lowerCaseQuery)
  ) || [];

  const breakfast = filteredMeals.filter(item => item.category === 'breakfast');
  const lunch = filteredMeals.filter(item => item.category === 'lunch');
  const dinner = filteredMeals.filter(item => item.category === 'dinner');

  const renderMessage = (category) => {
    return <div className="text-red-500">No meals found for {category}.</div>;
  };

  return (
    <div className="mt-10">
      <div className="mx-7">
        <SectionTitle
          heading="Explore Our Delicious Meals"
          subheading="Explore breakfast, lunch, and dinner options to satisfy any craving!"
        />
      </div>
      <div className="my-10 text-center">
        <Tabs>
          <TabList>
            <Tab>All Meals</Tab>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
          </TabList>
          <TabPanel>
            {filteredMeals.length > 0 ? (
              <MealCards items={filteredMeals} />
            ) : (
              renderMessage("All Meals")
            )}
          </TabPanel>
          <TabPanel>
            {breakfast.length > 0 ? (
              <MealCards items={breakfast} />
            ) : (
              renderMessage("Breakfast")
            )}
          </TabPanel>

          <TabPanel>
            {lunch.length > 0 ? (
              <MealCards items={lunch} />
            ) : (
              renderMessage("Lunch")
            )}
          </TabPanel>
          <TabPanel>
            {dinner.length > 0 ? (
              <MealCards items={dinner} />
            ) : (
              renderMessage("Dinner")
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MealsByCategory;
