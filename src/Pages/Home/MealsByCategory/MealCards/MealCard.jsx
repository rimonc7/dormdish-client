import { useContext } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { ThemeContext } from '../../../../Provider/ThemeProvider';

const MealCard = ({ item }) => {
    const { darkTheme } = useContext(ThemeContext); 
    const { title, image, price, rating, description, _id } = item;

    return (
        <div className={`max-w-sm w-full md:w-72 mx-auto p-4 ${darkTheme ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-100 to-orange-100'} rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col`}>
            <div className="relative w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-44 object-cover rounded-t-lg"
                />
                <p className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold rounded-md shadow-md ${darkTheme ? 'bg-orange-400 text-black' : 'bg-orange-500 text-white'}`}>
                    ${price.toFixed(2)}
                </p>
            </div>
            <div className={`p-4 space-y-3 flex-grow flex flex-col items-center text-center ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                <h2 className={`text-lg font-bold ${darkTheme ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
                <StarRatings
                    rating={rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="2px"
                />
                <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    {description.length > 50 ? `${description.slice(0, 50)}...` : description}
                </p>
            </div>
            <div className="w-full p-4">
                <Link
                    to={`/meal/${_id}`}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition rounded-md ${darkTheme ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default MealCard;
