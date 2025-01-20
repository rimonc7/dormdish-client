import MealCard from "./MealCard";

const MealCards = ({ items }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            {items.map(item => (
                <MealCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default MealCards;