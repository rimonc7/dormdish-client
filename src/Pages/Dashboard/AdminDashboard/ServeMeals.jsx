import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { MdFastfood } from "react-icons/md";
import Swal from "sweetalert2";

const ServeMeals = () => {
    const axiosPublic = useAxiosPublic();


    const { data: requestedMeals = [], refetch, isLoading } = useQuery({
        queryKey: ['requestedMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/mealReq');
            return res.data;
        }
    })


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
                            requestedMeals.map(requestedMeal => (
                                <tr key={requestedMeal._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3 text-center">{requestedMeal.title}</td>
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