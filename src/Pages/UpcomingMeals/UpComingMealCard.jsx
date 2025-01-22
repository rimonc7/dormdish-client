import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';
import useAxiosPublic from '../../Hook/useAxiosPublic';

const UpComingMealCard = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { title, image, price, rating, description, distributor, ingredients, _id, like } = item;

    const handleLike = (id) => {
        if (!user) {
            navigate('/login');
            return;
        }
        axiosPublic.patch(`/upcomingMeal/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Thanks for liking the meal!", "", "success");
                    setLiked(true);
                }
            })
            .catch(error => console.error("Error liking the meal:", error));
    };

    return (
        <div className="max-w-sm mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                {/* Image Section */}
                <div className="relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-56 object-cover"
                    />
                    <p className="absolute top-3 left-3 bg-orange-500 text-white px-4 py-1 text-lg font-semibold rounded-md shadow-md">
                        ${price.toFixed(2)}
                    </p>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

                    <div className="flex items-center justify-center">
                        <StarRatings
                            rating={rating}
                            starRatedColor="orange"
                            numberOfStars={5}
                            name="rating"
                            starDimension="25px"
                            starSpacing="3px"
                        />
                    </div>

                    <p className="text-gray-600 text-sm text-center">{description}</p>

                    {/* Distributor */}
                    <p className="text-sm text-gray-500 text-center font-medium">
                        Distributor: <span className="text-gray-800">{distributor}</span>
                    </p>
                    <div className="text-sm text-gray-500 text-center font-medium flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-200">
                        <FaThumbsUp className="text-orange-500" />
                        <span className="text-gray-800 font-semibold">{like ? like : '0'}</span>
                    </div>

                    {/* Ingredients */}
                    <div className="text-sm text-gray-600">
                        <h3 className="font-bold text-gray-800 mb-2">Ingredients:</h3>
                        <ul className="list-disc pl-5">
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Like Button */}
                <button
                    onClick={() => handleLike(_id)}
                    disabled={liked}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-medium transition ${liked
                            ? 'bg-red-500 cursor-not-allowed'
                            : 'bg-gray-800 hover:bg-gray-900'
                        }`}
                >
                    <FaHeart />
                    {liked ? 'Liked' : 'Like'}
                </button>
            </div>
        </div>
    );
};

export default UpComingMealCard;
