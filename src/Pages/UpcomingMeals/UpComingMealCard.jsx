import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';
import { FaHeart, FaThumbsUp } from 'react-icons/fa';
import useAxiosPublic from '../../Hook/useAxiosPublic';

const UpComingMealCard = ({ item, refetch, badge, user }) => {
  const [liked, setLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { title, image, price, rating, description, distributor, ingredients, _id, like } = item;

  const handleLike = (id) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (badge === 'bronze') {
      Swal.fire("Only Premium Subscribers can Like the Upcoming Meal");
      return;
    }

    const likedInfo = { email: user.email };

    axiosPublic
      .patch(`/upcomingMeal/${id}`, likedInfo)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Thanks for liking the meal!", "", "success");
          setLiked(true);
          refetch();
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
        Swal.fire("Error", errorMessage, "error");
      });
  };

  return (
    <div className="max-w-sm w-full md:w-72 mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col">
        <div className="relative w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-44 object-cover"
          />
          <p className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-md shadow-md">
            ${price.toFixed(2)}
          </p>
        </div>
        <div className="p-4 space-y-3 flex-grow">
          <h2 className="text-lg font-bold text-gray-800 text-center">{title}</h2>
          <div className="flex items-center justify-center">
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="2px"
            />
          </div>
          <p className="text-gray-600 text-sm text-center">
            {showFullDescription ? description : `${description.slice(0, 50)}...`}
            {description.length > 50 && (
              <span
                className="text-orange-500 cursor-pointer ml-1"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500 text-center font-medium">
            Distributor: <span className="text-gray-800">{distributor}</span>
          </p>
          <div className="text-xs text-gray-500 text-center font-medium flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition duration-200">
            <FaThumbsUp className="text-orange-500" />
            <span className="text-gray-800 font-semibold">{like || '0'}</span>
          </div>
          <div className="text-sm text-gray-600">
            <h3 className="font-bold text-gray-800 mb-2">Ingredients:</h3>
            <ul className="grid grid-cols-2 gap-2 list-disc pl-5">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => handleLike(_id)}
            disabled={liked}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-medium transition rounded-md mt-3 ${
              liked ? 'bg-red-500 cursor-not-allowed' : 'bg-orange-500 hover:bg-gray-900'
            }`}
          >
            <FaHeart />
            {liked ? 'Liked' : 'Like'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpComingMealCard;
