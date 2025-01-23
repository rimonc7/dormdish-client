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
    const [liked, setLiked] = useState(false);
    const [reviewText, setReviewText] = useState('');



    const { data: meal = {}, isLoading, refetch } = useQuery({
        queryKey: ['meal', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meal/${id}`);
            return res.data;
        },
    });

    const { data: userDb = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        }
    });



    const { data: reviews = [], refetch: reviewRefetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/review');
            return res.data;
        }
    });

    const filteredReviews = reviews.filter(review => review.mealId === id);

    if (isLoading) {
        return <p className="text-center text-lg mt-20">Loading...</p>;
    }

    const { title, image, price, rating, description, distributorName, ingredients, postTime, like, _id } = meal;

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
        if (!user) {
            navigate('/login');
            return;
        }
        if (userDb.badge == 'bronze') {
            Swal.fire({
                title: "Subscription Required",
                text: "You need a subscription to request meals.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Want to Subscribe?"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/#subscription')
                }
            });
        } else {
            const mealReqInfo = {
                email: user.email,
                mealId: _id,
                review_count: filteredReviews.length,
                status: 'pending',
                price,
                like,
                image,
                title
            }
            axiosPublic.post('/mealReq', mealReqInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Meal Requested Successfully",
                            icon: "success",
                            draggable: true
                        });
                    }
                })
        }
    };

    const handleReviewText = e => {
        const text = e.target.value;
        setReviewText(text)
    }
    const handleAddReview = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (reviewText.trim().length < 10) {
            alert('Please write at least 10 characters for your review.');
            return;
        }
        const reviewInfo = {
            name: user.displayName,
            mealId: _id,
            review: reviewText
        }

        axiosPublic.post('/review', reviewInfo)
            .then(res => {
                if (res.data.insertedId) {
                    document.getElementById('my_modal_1').close();
                    Swal.fire({
                        title: "Submitted Review",
                        icon: "success",
                        draggable: true
                    });
                    reviewRefetch();
                }
            })
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
                            onClick={() => document.getElementById('my_modal_1').showModal()}
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
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review, idx) => (
                            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold text-gray-800">{review.name}</h4>
                                <p className="text-gray-600 mt-2">{review.review}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-lg text-center">No reviews found yet. Be the first to share your thoughts!</p>
                    )}
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-bold text-2xl text-gray-800 mb-4">Write a Review</h3>
                    <p className="text-gray-600 mb-6">Share your thoughts about this meal. Your feedback is valuable to us!</p>

                    {/* Textarea for review input */}
                    <textarea
                        onChange={handleReviewText}
                        className="textarea textarea-bordered w-full h-32 resize-none mb-6 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Write your review here..."
                    ></textarea>

                    <div className="modal-action flex justify-end gap-4">
                        {/* Submit Button */}
                        <button
                            onClick={handleAddReview}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200"
                        >
                            Submit Review
                        </button>

                        {/* Close Button */}
                        <button
                            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400 transition duration-200"
                            onClick={() => document.getElementById('my_modal_1').close()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MealDetails;
