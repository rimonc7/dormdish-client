import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const Membership = () => {
    const navigate = useNavigate();

    const packages = [
        {
            name: "Silver",
            price: "$10/month",
            description: "Get basic features for a smooth experience.",
            benefits: ["Access to premium meals", "Exclusive offers"],
            bgClass: "bg-gray-300",
        },
        {
            name: "Gold",
            price: "$25/month",
            description: "Upgrade to enjoy advanced features.",
            benefits: ["Everything in Silver", "Priority customer support", "Bonus rewards"],
            bgClass: "bg-yellow-300",
        },
        {
            name: "Platinum",
            price: "$50/month",
            description: "Unlock all premium features with exclusive perks.",
            benefits: ["Everything in Gold", "Free delivery", "Early access to new meals"],
            bgClass: "bg-blue-300",
        },
    ];

    const handlePackageClick = (packageName) => {
        navigate(`/checkout/${packageName}`);
    };

    return (
        <div className=" bg-gray-100 flex flex-col items-center justify-center p-6">
            <SectionTitle
                heading={'Choose Your Premium Package'}
            >
            </SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {packages.map((pkg) => (
                    <div
                        key={pkg.name}
                        onClick={() => handlePackageClick(pkg.name.toLowerCase())}
                        className={`cursor-pointer ${pkg.bgClass} rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300`}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h2>
                        <p className="text-lg font-semibold text-gray-700 mb-4">{pkg.price}</p>
                        <p className="text-gray-600 mb-4">{pkg.description}</p>
                        <ul className="text-left text-gray-700 mb-6">
                            {pkg.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <span>✔️</span>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition-colors">
                            Select {pkg.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Membership;
