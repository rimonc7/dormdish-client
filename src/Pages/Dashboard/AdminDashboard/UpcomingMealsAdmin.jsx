
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Shared/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hook/useAxiosPublic';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const UpcomingMealsAdmin = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const [sortedByLikes, setSortedByLikes] = useState(false);

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const { data: upcomingMeals = [], refetch, isLoading } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeal');
            return res.data;
        },
    });


    const handleSortMealsByLikes = () => {
        setSortedByLikes(!sortedByLikes);
    };
    const sortedMeals = useMemo(() => {
        return sortedByLikes
            ? [...upcomingMeals].sort((a, b) => b.like - a.like)
            : upcomingMeals;
    }, [sortedByLikes, upcomingMeals]);

    const handleAddMeal = async (data) => {

        const processedData = {
            ...data,
            ingredients: data.ingredients.split(',').map((item) => item.trim()),
        };

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const mealInfo = {
                title: data.title,
                category: data.category,
                image: res.data.data.
                    display_url,
                ingredients: processedData.ingredients,
                description: data.description,
                price: parseFloat(data.price),
                postTime: data.postTime,
                distributor: data.distributor,
                email: data.email,
                rating: parseFloat(data.rating),
                likes: parseFloat(data.likes),
                review_count: parseFloat(data.review_count),
            };
            const mealRes = await axiosPublic.post('/upcomingMeal', mealInfo);
            if (mealRes.data.insertedId) {
                reset();
                document.getElementById('my_modal_1').close()
                refetch()
                Swal.fire({
                    title: "Upcoming Meal Added",
                    icon: "success",
                    draggable: true
                });
            }
        }
    };



    const handlePublish = async (id, like) => {
        if (like >= 10) {
            const res = await axiosPublic.post(`/publishMeal/${id}`);
            if (res.data.message) {
                refetch();
                Swal.fire({
                    title: "Meal Published Successfully",
                    text: "The meal has been automatically published since it has received the targeted likes.",
                    icon: "success",
                    confirmButtonText: "Great!"
                });
                return; 
            }
        }
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
    };
    
    

    useEffect(() => {
        upcomingMeals.forEach((meal) => {
            if (meal.like >= 10) {
                handlePublish(meal._id);
            }
        });
    }, [upcomingMeals]);

    if (isLoading) {
        return <p className="text-center py-10">Loading data...</p>;
    }
    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Upcoming Meals'} />
            </div>
            <div className="flex justify-between mx-20 my-4">
                <button
                    onClick={handleSortMealsByLikes}
                    className="btn bg-[#D1A054] hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
                >
                    Sort By Likes {sortedByLikes ? '(Descending)' : '(Original Order)'}
                </button>
                <button
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                    className="btn flex items-center bg-[#D1A054] hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg hover:scale-105 transition-transform"
                >
                    <AiOutlinePlusCircle className="mr-2 text-xl" />
                    Add Meal
                </button>
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
                            sortedMeals.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-600 p-4">
                                        No Upcoming Meal At This Moment.
                                    </td>
                                </tr>
                            ) :
                                sortedMeals.map(upcomingMeal => (
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
                                                onClick={() => handlePublish(upcomingMeal._id, upcomingMeal.like)}
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
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white rounded-lg shadow-lg p-8">
                    <h3 className="font-bold text-2xl text-center text-gray-800 mb-4">Add Upcoming Meal</h3>
                    {/* Textarea for review input */}
                    <form onSubmit={handleSubmit(handleAddMeal)} className="space-y-6">
                        {/* Title*/}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Title*</span>
                            </div>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="Enter meal title"
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>

                        {/* Category*/}
                        <label className="block text-lg font-semibold text-gray-700">Meal Category*</label>
                        <select
                            {...register("category", { required: true })}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option selected value="" disabled>
                                Select a category
                            </option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>

                        {/* Image*/}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Upload Image*</span>
                            </div>
                            <input
                                {...register('image')}
                                type="file"
                                className="file-input file-input-bordered"
                            />
                        </label>

                        {/* Ingredients*/}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Ingredients*</span>
                            </div>
                            <input
                                type="text"
                                {...register("ingredients", { required: true })}
                                placeholder="Enter ingredients separated by commas"
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>

                        {/* Description*/}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Description*</span>
                            </div>
                            <textarea
                                {...register("description", { required: true })}
                                placeholder="Enter meal description"
                                className="textarea textarea-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </label>

                        {/* Price */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Price*</span>
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: true })}
                                placeholder="Enter meal price"
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>

                        {/* Post */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Post Time*</span>
                            </div>
                            <input
                                type="datetime-local"
                                {...register("postTime", { required: true })}
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>

                        {/* Distributor*/}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Distributor Name*</span>
                            </div>
                            <input
                                type="text"
                                {...register("distributor", { required: true })}
                                defaultValue={user.displayName}
                                readOnly
                                placeholder="Enter distributor name"
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>

                        {/* Email*/}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-semibold text-gray-700">Email*</span>
                            </div>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                defaultValue={user.email}
                                readOnly
                                placeholder="Enter email"
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>

                        {/* Rating, Likes, and Review Count*/}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-lg font-semibold text-gray-700">Rating*</span>
                                </div>
                                <input
                                    type="number"
                                    step="0.1"
                                    {...register("rating", { required: true })}
                                    defaultValue={0}
                                    readOnly
                                    placeholder="Enter Rating (e.g., 4.5)"
                                    className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-lg font-semibold text-gray-700">Likes*</span>
                                </div>
                                <input
                                    type="number"
                                    {...register("likes", { required: true })}
                                    defaultValue={0}
                                    readOnly
                                    placeholder="Enter Likes"
                                    className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-lg font-semibold text-gray-700">Review Count*</span>
                                </div>
                                <input
                                    type="number"
                                    {...register("review_count", { required: true })}
                                    defaultValue={0}
                                    readOnly
                                    placeholder="Enter Reviews"
                                    className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn text-white bg-gradient-to-r from-blue-500 to-orange-400 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
                        >
                            Add Meal
                        </button>
                    </form>
                    <div className="modal-action flex justify-end gap-4">
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

export default UpcomingMealsAdmin;