import { FaEdit, FaTrash } from "react-icons/fa";
import UseMeal from "../../../Hook/UseMeal";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const AllMeals = () => {
    const [meal, isLoading, refetch] = UseMeal();
    const axiosPublic = useAxiosPublic();

    if (isLoading) {
        return <p className="text-center py-10 text-gray-600">Loading...</p>;
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete the food?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {

            if (result.isConfirmed) {
                axiosPublic.delete(`/meal/${id}`)
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

    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'All Meals'} />
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
                            meal.map(item => (
                                <tr key={item._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3">{item.title}</td>
                                    <td className="p-3 text-center">{item.like}</td>
                                    <td className="p-3 text-center">{item.review_count || 0}</td>
                                    <td className="p-3 text-center">{item.rating}</td>
                                    <td className="p-3 text-center">{item.distributor}</td>
                                    <td className="p-3 text-center">
                                        <Link to={`/meal/${item._id}`} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            View Meal
                                        </Link>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            // onClick={() => handleEditClick(filteredReview.review, filteredReview._id)}
                                            className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                            <FaEdit />
                                        </button>
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