import { FaEdit, FaTrash } from "react-icons/fa";
import UseMeal from "../../../Hook/UseMeal";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useMemo, useState } from 'react';
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const AllMeals = () => {
    const [meal, isLoading, refetch] = UseMeal();
    const axiosSecure = useAxiosSecure();
    const [sortedByLikes, setSortedByLikes] = useState(false);
    const [sortedByReview, setSortedByReview] = useState(false);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete the food?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/meal/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted", "", "success");
                            refetch();
                        }
                    })
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const handleSortMealsByLikes = () => {
        setSortedByLikes(!sortedByLikes);
        setSortedByReview(false);
    };

    const handleSortMealsByReview = () => {
        setSortedByReview(!sortedByReview);
        setSortedByLikes(false);
    };

    const sortedMeals = useMemo(() => {
        if (sortedByLikes) {
            return [...meal].sort((a, b) => b.like - a.like);
        } else if (sortedByReview) {
            return [...meal].sort((a, b) => b.review_count - a.review_count);
        }
        return meal;
    }, [sortedByLikes, sortedByReview, meal]);


    if (isLoading) {
        return <p className="text-center py-10 text-gray-600">Loading...</p>;
    }


    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'All Meals'} />
            </div>
            <div className="flex justify-between mx-20 my-4">
                <button
                    onClick={handleSortMealsByLikes}
                    className="btn bg-[#D1A054] hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
                >
                    Sort By Likes {sortedByLikes ? '(Descending)' : '(Original Order)'}
                </button>
                <button
                    onClick={handleSortMealsByReview}
                    className="btn flex items-center bg-[#D1A054] hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
                >
                    Sort By Review Count {sortedByReview ? '(Descending)' : '(Original Order)'}
                </button>
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Meal Title</th>
                            <th className="p-3">Likes</th>
                            <th className="p-3">Review Count</th>
                            <th className="p-3">Rating</th>
                            <th className="p-3">Distributor Name</th>
                            <th className="p-3">View</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedMeals.map(item => (
                                <tr key={item._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3">{item.title}</td>
                                    <td className="p-3 text-center">{item.like}</td>
                                    <td className="p-3 text-center">{item.review_count || 0}</td>
                                    <td className="p-3 text-center">{item.rating}</td>
                                    <td className="p-3 text-center">{item.distributor}</td>
                                    <td className="p-3 text-center">
                                        <Link to={`/meal/${item._id}`} className="btn btn-sm bg-[#D1A054] hover:bg-yellow-600 text-white hover:scale-105 ">
                                            View Meal
                                        </Link>
                                    </td>
                                    <td className="p-3 text-center">
                                        <Link
                                            to={`/dashboard/update/${item._id}`}
                                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMeals;