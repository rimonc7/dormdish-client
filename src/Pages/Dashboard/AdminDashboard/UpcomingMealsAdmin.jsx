
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

const UpcomingMealsAdmin = () => {
    const axiosPublic = useAxiosPublic();


    const { data: upcomingMeals = [], refetch, isLoading } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeal');
            return res.data;
        },
    });

    const handlePublish = async (id) => {
        Swal.fire({
            title: "Are you sure you want to publish this meal?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.post(`/publishMeal/${id}`);
                    if (res.data.message) {
                        refetch();
                        Swal.fire("Published!", "The meal has been published successfully.", "success");
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "There was an error publishing the meal.", "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    if (isLoading) {
        return <p className="text-center py-10">Loading data...</p>;
    }
    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Upcoming Meals'} />
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Meal Image</th>
                            <th className="p-3">Meal Title</th>
                            <th className="p-3">Like</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">View Meal</th>
                            <th className="p-3">Publish</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            upcomingMeals.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-600 p-4">
                                        No Upcoming Meal At This Moment.
                                    </td>
                                </tr>
                            ) :
                                upcomingMeals.map(upcomingMeal => (
                                    <tr key={upcomingMeal._id} className="border-b border-gray-200 text-sm lg:text-base">
                                        <td className="p-3 flex justify-center">
                                            <div className="rounded-sm h-12 w-12 overflow-hidden">
                                                <img
                                                    src={upcomingMeal.image}
                                                    alt=''
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">{upcomingMeal.title}</td>
                                        <td className="p-3 text-center">{upcomingMeal.like}</td>
                                        <td className="p-3 text-center">{upcomingMeal.category}</td>
                                        <td className="p-3 text-center">
                                            <Link
                                                to={`/upcomingMeal/${upcomingMeal._id}`}
                                                className="btn btn-sm bg-[#D1A054] hover:bg-yellow-600  text-white hover:scale-105 ">
                                                View Meal
                                            </Link>
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handlePublish(upcomingMeal._id)}
                                                className="btn btn-sm bg-[#D1A054] hover:bg-yellow-600  text-white hover:scale-105 ">
                                                <AiOutlineCheckCircle />
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

export default UpcomingMealsAdmin;