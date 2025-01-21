import React, { useContext, useState } from 'react';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaHeart, FaClipboardList, FaCommentDots } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const MealDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false)

    const { data: meal = {}, isLoading, refetch } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meal/${id}`);
            return res.data;
        },
    });


    if (isLoading) {
        return <p className="text-center text-lg mt-20">Loading...</p>;
    }

    const { title, image, price, rating, description, distributorName, ingredients, postTime, like } = meal;

    const handleLike = () => {
        if (!user) {
            navigate('/login')
        }
        axiosPublic.patch(`/meal/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Thanks for Like The Food", "", "success");
                    refetch()
                    setLiked(true)
                }
            })
    };

    const handleMealRequest = () => {
    };

    const handleAddReview = () => {
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-orange-100 min-h-screen py-12 px-6 lg:px-24">
            <SectionTitle heading={title} subheading="Detailed Information" />
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 lg:p-16 flex flex-col lg:flex-row gap-12">
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full rounded-lg object-cover shadow-lg"
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
                    <p className="text-gray-600 text-lg mb-6">{description}</p>

                    <div className="flex flex-col space-y-4">
                        <p>
                            <strong className="text-gray-800">Price:</strong>{' '}
                            <span className="text-orange-500 font-semibold">${price}</span>
                        </p>
                        <p>
                            <strong className="text-gray-800">Rating:</strong>{' '}
                            <span className="text-orange-500 font-semibold">{rating} / 5</span>
                        </p>
                        <p>
                            <strong className="text-gray-800">Likes:</strong>{' '}
                            <span className="text-red-500 font-semibold">{like || 0}</span>
                        </p>
                        <p>
                            <strong className="text-gray-800">Distributor:</strong>{' '}
                            <span className="text-gray-700">{distributorName}</span>
                        </p>
                        <p>
                            <strong className="text-gray-800">Posted On:</strong>{' '}
                            <span className="text-gray-700">{postTime}</span>
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ingredients:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {ingredients?.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        {/* Like Button */}
                        <button
                            onClick={handleLike}
                            disabled={liked}
                            className={`flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg shadow-md transition ${liked ? 'bg-red-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
                                }`}
                        >
                            <FaHeart />
                            {liked ? 'Liked' : 'Like'}
                        </button>

                        {/* Meal Request Button */}
                        <button
                            onClick={handleMealRequest}
                            className="flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 transition"
                        >
                            <FaClipboardList />
                            Request Meal
                        </button>

                        {/* Add Review Button */}
                        <button
                            onClick={handleAddReview}
                            className="flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition"
                        >
                            <FaCommentDots />
                            Add Review
                        </button>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 lg:p-16 mt-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold text-gray-800">John Doe</h4>
                        <p className="text-gray-600 mt-2">
                            "The meal was absolutely delicious! The flavors were perfectly balanced, and the ingredients
                            were fresh. Highly recommended!"
                        </p>
                    </div>
                    {/* Review 2 */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold text-gray-800">Jane Smith</h4>
                        <p className="text-gray-600 mt-2">
                            "I loved this dish! It was flavorful and satisfying. The presentation was excellent as well.
                            Would definitely order again!"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
