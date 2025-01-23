import { FaTrash } from "react-icons/fa";
import UseRequestedMeal from "../../../Hook/UseRequestedMeal";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const RequestedMeals = () => {
    const [requestedMeals, refetch] = UseRequestedMeal();
    const axiosPublic = useAxiosPublic();


    const handleDelete = (id, status) => {

        if (status && status !== "pending") {
            Swal.fire("Cannot delete this meal", "Only pending meals can be canceled.", "error");
            return;
        }
        Swal.fire({
            title: "Do you want to cancel the food?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {

            if (result.isConfirmed) {
                axiosPublic.delete(`/mealReq/${id}`)
                    .then(res => {
                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Canceled", "", "success");
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
                <SectionTitle
                    heading={'Your requested Meal'}
                >
                </SectionTitle>
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base ">
                            <th className="p-3">#</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Meal Title</th>
                            <th className="p-3">Review Count</th>
                            <th className="p-3">Like</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {requestedMeals.map((requestedMeal, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 text-sm lg:text-base"
                            >
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 flex justify-center">
                                    <div className="rounded-sm h-12 w-12 overflow-hidden">
                                        <img
                                            src={requestedMeal.image}
                                            alt=''
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </td>
                                <td className="p-3 text-center">{requestedMeal.title}</td>
                                <td className="p-3 text-center">{requestedMeal.review_count || 0}</td>
                                <td className="p-3 text-center">{requestedMeal.like || 0}</td>
                                <td className="p-3 text-center">{requestedMeal.status}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleDelete(requestedMeal._id, requestedMeal.status)}
                                        className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;