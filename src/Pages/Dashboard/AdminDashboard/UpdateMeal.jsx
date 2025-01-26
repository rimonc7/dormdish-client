import { useLocation, useParams } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import UseMeal from "../../../Hook/UseMeal";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMeal = () => {
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [meal, isLoading, refetch] = UseMeal();
    const axiosPublic = useAxiosPublic();

    const item = meal?.find((singleMeal) => singleMeal._id === id);

    if (isLoading) {
        return <p className="text-center py-10 text-gray-600">Loading...</p>;
    }

    if (!item) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">Meal not found. Please check the ID or try again later.</p>
            </div>
        );
    }

    const { title, category, image, description, price, postTime, distributor, like, rating, review_count, ingredients } = item;

    const handleUpdateMeal = async (data) => {

        const processedData = {
            ...data,
            ingredients: data.ingredients.split(',').map((item) => item.trim()),
        };

        let imageUrl = image;

        if (data.image && data.image[0]) {
            const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                imageUrl = res.data.data.display_url;
            }
        }

        const mealInfo = {
            title: data.title,
            category: data.category,
            image: imageUrl,
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

        const mealRes = await axiosPublic.put(`/meal/${id}`, mealInfo);
        console.log(mealRes)
        if (mealRes.data.modifiedCount) {
            refetch();
            Swal.fire({
                title: "Meal Updated",
                icon: "success",
                draggable: true
            });
        }
    };


    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Update the Meal'} />
            </div>
            <div className="mx-20 mt-10 mb-20">
                <form onSubmit={handleSubmit(handleUpdateMeal)} className="space-y-6">
                    {/* Title*/}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Title*</span>
                        </div>
                        <input
                            type="text"
                            defaultValue={title}
                            {...register("title", { required: true })}
                            placeholder="Enter meal title"
                            className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </label>

                    {/* Category*/}
                    <label className="block text-lg font-semibold text-gray-700">Meal Category*</label>
                    <select
                        defaultValue={category}
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
                            {...register("image")}
                            type="file"
                            className="file-input file-input-bordered"
                        />
                        {image && (
                            <div className="mt-2">
                                <span className="text-sm text-gray-600">Current Image:</span>
                                <img src={image} alt="Current" className="w-32 h-32 object-cover mt-2 rounded-lg shadow" />
                            </div>
                        )}
                    </label>


                    {/* Ingredients*/}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Ingredients*</span>
                        </div>
                        <input
                            type="text"
                            defaultValue={ingredients.join(', ')}
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
                            defaultValue={description}
                            {...register("description", { required: true })}
                            placeholder="Enter meal description"
                            className=" textarea textarea-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                    </label>

                    {/* Price */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Price*</span>
                        </div>
                        <input
                            type="number"
                            defaultValue={price}
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
                            type="text"
                            defaultValue={new Date(postTime).toLocaleDateString()}
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
                            defaultValue={distributor}
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
                                defaultValue={rating}
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
                                defaultValue={like}
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
                                defaultValue={review_count || 0}
                                placeholder="Enter Reviews"
                                className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn text-white bg-gradient-to-r from-blue-500 to-orange-400 py-3 rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMeal;