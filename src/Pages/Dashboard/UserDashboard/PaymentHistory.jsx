import { useContext } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], error, isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error) return <div>Error loading payment history.</div>;

    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Payment History'} />
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Transaction Id</th>
                            <th className="p-3">Package Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-3 text-center text-gray-500">
                                    No payment history available.
                                </td>
                            </tr>
                        ) : (
                            payments.map(payment => (
                                <tr key={payment._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3 text-center">{payment.transactionId}</td>
                                    <td className="p-3 text-center">{payment.badge}</td>
                                    <td className="p-3 text-center">${payment.price}</td>
                                    <td className="p-3 text-center">{new Date(payment.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
