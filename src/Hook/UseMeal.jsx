import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UseMeal = () => {
    const axiosPublic = useAxiosPublic();


    const { data: meal = [], isLoading, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosPublic.get('/meal');
            return res.data;
        }
    });

    return [meal, isLoading, refetch]
};

export default UseMeal;