import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const UseReviews = () => {
    const axiosPublic = useAxiosPublic();


    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/review');
            return res.data;
        }
    })

    return [reviews, refetch, isLoading]
};

export default UseReviews;