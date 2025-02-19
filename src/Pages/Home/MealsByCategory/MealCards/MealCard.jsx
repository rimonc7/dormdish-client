import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const MealCard = ({ item }) => {
    const { title, image, price, rating, description, _id } = item;

    return (
        <div className="max-w-sm w-full md:w-72 mx-auto p-4">
            <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col">
                <div className="relative w-full">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-44 object-cover rounded-t-lg"
                    />
                    <p className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-md shadow-md">
                        ${price.toFixed(2)}
                    </p>
                </div>
                <div className="p-4 space-y-3 flex-grow flex flex-col items-center text-center">
                    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                    <StarRatings
                        rating={rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="2px"
                    />
                    <p className="text-gray-600 text-sm">
                        {description.length > 50 ? `${description.slice(0, 50)}...` : description}
                    </p>
                </div>
                <div className="w-full p-4">
                    <Link
                        to={`/meal/${_id}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-medium transition rounded-md bg-orange-500 hover:bg-orange-600"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
