import { Link } from "react-router-dom";
import UseReviews from "../../../Hook/UseReviews";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { FaTrash } from "react-icons/fa";
import UseMeal from "../../../Hook/UseMeal";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const AllReview = () => {
    const [reviews, refetch, isLoading] = UseReviews();
    const [meal] = UseMeal();
    const axiosPublic = useAxiosPublic();


    if (isLoading) {
        return <p className="text-center py-10 text-gray-600">Loading...</p>;
    }

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

    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={"All Reviews"} />
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Reviewer Name</th>
                            <th className="p-3">Meal Title</th>
                            <th className="p-3">Likes</th>
                            <th className="p-3">View</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => {
                            const foundMeal = meal.find((mealItem) => mealItem._id === review.mealId);
                            return (
                                <tr key={review._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3 ">{review.name}</td>
                                    <td className="p-3 text-center">{foundMeal?.title}</td>
                                    <td className="p-3 text-center">{foundMeal?.like ?? "No Data"}</td>
                                    <td className="p-3 text-center">
                                        <Link to={`/meal/${review.mealId}`} className="btn btn-sm bg-[#D1A054] text-white hover:bg-yellow-600 hover:scale-105">
                                            View Meal
                                        </Link>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReview;
