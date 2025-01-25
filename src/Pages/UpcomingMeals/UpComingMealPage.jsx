import { useContext } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { AuthContext } from "../../Provider/AuthProvider";
import UseUser from "../../Hook/UseUser";
import { useQuery } from "@tanstack/react-query";
import UpComingMealCard from "./UpComingMealCard";

const UpComingMealPage = () => {

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

    if (authLoading || mealLoading) {
        return <p className="text-center py-10">Loading data...</p>;
    }

    const currentUser = userDb?.find(runningUser => runningUser.email === user?.email);
    const badge = currentUser?.badge || 'bronze';

    // if (!currentUser) {
    //     return <p className="text-center py-10 text-gray-600">Loading..</p>;
    // }

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

export default UpComingMealPage;