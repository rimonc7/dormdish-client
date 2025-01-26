import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure= useAxiosSecure();


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
                like: parseFloat(data.likes),
                review_count: parseFloat(data.review_count),
            };
            const mealRes = await axiosSecure.post('/meal', mealInfo);
            if (mealRes.data.insertedId) {
                reset();
                Swal.fire({
                    title: "Meal Added",
                    icon: "success",
                    draggable: true
                });
            }
        }
    };


    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Add Meal'} />
            </div>
            <div className="mx-20 mt-10 mb-20">
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
            </div>
        </div >
    );
};

export default AddMeal;
