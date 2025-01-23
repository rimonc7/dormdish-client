import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import UseReviews from "../../../Hook/UseReviews";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, refetch] = UseReviews();
    const axiosPublic = useAxiosPublic();
    const [reviewText, setReviewText] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const filteredReviews = reviews.filter(review => review.email === user.email);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete the review?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/review/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted", "", "success");
                        refetch();
                    }
                });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const handleEditClick = (review, id) => {
        setReviewText(review);
        setSelectedId(id);
        document.getElementById('my_modal_1').showModal();
    };

    const handleReviewText = (e) => {
        setReviewText(e.target.value);
    };

    const closeModal = () => {
        setReviewText('');
        setSelectedId(null);
        document.getElementById('my_modal_1').close();
    };

    const handleEditReview = () => {
        if (reviewText.trim().length < 10) {
            alert('Please write at least 10 characters for your review.');
            return;
        }

        const reviewInfo = { review: reviewText };

        axiosPublic.patch(`/review/${selectedId}`, reviewInfo).then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire("Review updated!", "", "success");
                refetch();
                closeModal();
            }
        }).catch(error => {
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
            Swal.fire("Error", errorMessage, "error");
        });
    };

    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Your Reviews'} />
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Meal Title</th>
                            <th className="p-3">Review</th>
                            <th className="p-3">View Meal</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReviews.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-600 p-4">
                                    You have not submitted any reviews yet.
                                </td>
                            </tr>
                        ) : (
                            filteredReviews.map(filteredReview => (
                                <tr key={filteredReview._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3 text-center">{filteredReview.title}</td>
                                    <td className="p-3 text-center">{filteredReview.review}</td>
                                    <td className="p-3 text-center">
                                        <Link to={`/meal/${filteredReview.mealId}`} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            View Meal
                                        </Link>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleEditClick(filteredReview.review, filteredReview._id)}
                                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(filteredReview._id)}
                                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-bold text-2xl text-gray-800 mb-4">Update The Review</h3>
                    <p className="text-gray-600 mb-6">Share your thoughts about this meal. Your feedback is valuable to us!</p>
                    <textarea
                        onChange={handleReviewText}
                        value={reviewText}
                        className="textarea textarea-bordered w-full h-32 resize-none mb-6 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Write your review here..."
                    ></textarea>
                    <div className="modal-action flex justify-end gap-4">
                        <button onClick={handleEditReview} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200">
                            Submit Review
                        </button>
                        <button onClick={closeModal} className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400 transition duration-200">
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;
