import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MealCard from "../Home/MealsByCategory/MealCards/MealCard";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const Meals = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const axiosPublic = useAxiosPublic();

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meal', search, category, minPrice, maxPrice],
        queryFn: async () => {
            const params = {};
            if (search) params.search = search;
            if (category) params.category = category;
            if (minPrice) params.minPrice = Number(minPrice);
            if (maxPrice) params.maxPrice = Number(maxPrice);
            const response = await axiosPublic.get("/meal", { params });
            return response.data;
        },
        keepPreviousData: true,
    });
   
    return (
        <div className="pt-24 px-4 md:px-16">
            <SectionTitle
                heading={"Delicious Meals for Every Taste"}
                subheading={"Explore a World of Flavorful Recipes"}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
                {/* Search Bar */}
                <div className="flex items-center space-x-2 w-full sm:w-1/3">
                    <input
                        type="text"
                        placeholder="Search meals..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {/* Filter by Category */}
                <div className="flex items-center space-x-2 w-full sm:w-1/4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered w-full px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="">All Categories</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>

                {/* Price Range */}
                <div className="flex items-center space-x-2 w-full sm:w-1/4">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="input input-bordered w-1/2 px-4 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
                    />
                    <span className="text-xl text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="input input-bordered w-1/2 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {isLoading && <p className="text-center py-10">Loading meals...</p>}

            {!isLoading && meals.length === 0 && (
                <p className="text-center py-10 text-xl text-gray-600">No meals found</p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                {meals.map((item) => (
                    <MealCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Meals;
