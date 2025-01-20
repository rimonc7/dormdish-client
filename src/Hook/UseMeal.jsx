import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UseMeal = () => {
    const axiosPublic = useAxiosPublic();


    const { data: meal = [], isPending, refetch } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosPublic.get('/meal');
            return res.data;
        }
    });

    return [meal, isPending, refetch]
};

export default UseMeal;