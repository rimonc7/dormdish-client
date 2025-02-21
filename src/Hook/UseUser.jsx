import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UseUser = () => {
    const axiosPublic = useAxiosPublic();

    const { data: userDb = [], isFetching: isUserLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        },
    });

    return [userDb, isUserLoading, refetch];
};

export default UseUser;
