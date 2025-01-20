import StarRatings from 'react-star-ratings';

const MealCard = ({ item }) => {
    const { title, image, price, rating, description } = item;


    return (
        <div className="flex justify-center p-6">
            <div className="bg-gradient-to-br from-blue-100 to-orange-100 w-80 rounded-lg shadow-2xl overflow-hidden flex flex-col items-center transform transition duration-500 hover:scale-105">
                <figure className="relative w-full">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-56 object-cover rounded-t-lg shadow-md"
                    />
                    <p className="bg-orange-500 text-white px-4 py-2 text-lg font-semibold absolute top-2 left-2 rounded-md shadow-lg">
                        ${price}
                    </p>
                </figure>
                <div className="flex flex-col items-center p-6 space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-wide">{title}</h2>
                    <StarRatings
                        rating={rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="25px"
                        starSpacing="3px"
                    />
                    <p className="text-gray-600 text-center text-sm mb-6">{description}</p>
                    <div className="w-full">
                        <button
                            className="w-full btn btn-primary border-none text-white py-3 rounded-lg font-medium bg-orange-500 hover:bg-orange-600 transition duration-300"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealCard;
