import React from 'react';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import UpComingMealCard from './UpComingMealCard';

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();

    const { data: upcomingMeal = [], refetch, isLoading } = useQuery({
        queryKey: ['upcomingMeal'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeal');
            return res.data;
        }
    })

    return (
        <div className="pt-24 px-4 md:px-16">
            <SectionTitle
                heading={'Upcoming Meals to Savor'}
                subheading={'Get Ready for a Feast of Flavors'}
            >
            </SectionTitle>
            {isLoading && <p className="text-center py-10">Loading meals...</p>}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                {upcomingMeal.map(item => (
                    <UpComingMealCard key={item._id} item={item} refetch={refetch} />
                ))}
            </div>
        </div>
    );
};

export default UpcomingMeals;