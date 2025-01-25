import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const UpcomingMealDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: upcomingMeal = {}, isLoading, refetch } = useQuery({
        queryKey: ['upcomingMeal', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/upcomingMeal/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center text-lg mt-20">Loading...</p>;
    }

    const { title, image, price, rating, description, distributorName, ingredients, postTime, like } = upcomingMeal;

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
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealDetails;