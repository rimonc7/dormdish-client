import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { MdFastfood } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const ServeMeals = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("");


    const { data: requestedMeals = [], refetch } = useQuery({
        queryKey: ['requestedMeals', search],
        queryFn: async () => {
            const params = {};
            if (search) params.search = search;
            const response = await axiosPublic.get("/mealReq", { params });
            return response.data;
        },
        keepPreviousData: true,
    });



    const handleDelivered = (id, status) => {
        Swal.fire({
            title: "Would you like to update the status to 'Delivered'?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {

            if (result.isConfirmed) {

                if (status === 'delivered') {
                    Swal.fire("The Meal Has Delivered Already");
                }
                const statusInfo = {
                    status: 'delivered'
                }
                axiosPublic.patch(`/mealReq/${id}`, statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Status Updated", "", "success");
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
                <SectionTitle heading={'Requested Meals'} />
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <div className="flex items-center space-x-2 w-full sm:w-1/3 mb-5">
                    <input
                        type="text"
                        placeholder="Search meals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full px-4 py-2 rounded-md focus:ring-1 focus:ring-orange-400"
                    />
                </div>
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Meal Title</th>
                            <th className="p-3">User Name</th>
                            <th className="p-3">User Email</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Serve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requestedMeals.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-600 p-4">
                                        Not Found.
                                    </td>
                                </tr>
                            ) :
                                requestedMeals.map(requestedMeal => (
                                    <tr key={requestedMeal._id} className="border-b border-gray-200 text-sm lg:text-base">
                                        <td className="p-3">{requestedMeal.title}</td>
                                        <td className="p-3 text-center">{requestedMeal.user_name}</td>
                                        <td className="p-3 text-center">{requestedMeal.email}</td>
                                        <td className="p-3 text-center capitalize"> {requestedMeal.status}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleDelivered(requestedMeal._id, requestedMeal.status)}
                                                className="btn btn-sm bg-gradient-to-r from-blue-500 to-orange-400 text-white hover:scale-105 ">
                                                <MdFastfood></MdFastfood>
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

export default ServeMeals;