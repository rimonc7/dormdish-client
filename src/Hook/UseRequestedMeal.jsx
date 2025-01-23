import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";


const UseRequestedMeal = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: requestedMeals = [], refetch } = useQuery({
        queryKey: ['requestedMeals', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/mealReq/${user.email}`)
            return res.data;
        }

    })

    return [requestedMeals, refetch]
};

export default UseRequestedMeal;
