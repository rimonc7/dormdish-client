import React, { useContext } from 'react';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import UpComingMealCard from './UpComingMealCard';
import { AuthContext } from '../../Provider/AuthProvider';
import UseUser from '../../Hook/UseUser';

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading: authLoading } = useContext(AuthContext);
    const [userDb, , isUserLoading] = UseUser();

    const { data: upcomingMeal = [], refetch, isLoading: mealLoading } = useQuery({
        queryKey: ['upcomingMeal'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeal');
            return res.data;
        },
    });

    if (authLoading || isUserLoading || mealLoading) {
        return <p className="text-center py-10">Loading data...</p>;
    }

    const currentUser = userDb.find(runningUser => runningUser.email === user?.email);
    const badge = currentUser?.badge || 'bronze';

    return (
        <div className="pt-24 px-4 md:px-16">
            <SectionTitle
                heading="Upcoming Meals to Savor"
                subheading="Get Ready for a Feast of Flavors"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                {upcomingMeal.map(item => (
                    <UpComingMealCard
                        key={item._id}
                        item={item}
                        badge={badge}
                        user={user}
                        refetch={refetch}
                    />
                ))}
            </div>
        </div>
    );
};

export default UpcomingMeals;
