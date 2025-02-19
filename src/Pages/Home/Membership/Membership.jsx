import { Link, useLocation } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../../Provider/ThemeProvider";

const Membership = () => {
    const { hash } = useLocation();
    const { darkTheme } = useContext(ThemeContext); 

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    const packages = [
        {
            name: "Silver",
            price: 10,
            description: "Get basic features for a smooth experience.",
            benefits: ["Access to premium meals", "Exclusive offers"],
            bgClass: "bg-gray-300",
        },
        {
            name: "Gold",
            price: 25,
            description: "Upgrade to enjoy advanced features.",
            benefits: ["Everything in Silver", "Priority customer support", "Bonus rewards"],
            bgClass: "bg-yellow-300",
        },
        {
            name: "Platinum",
            price: 50,
            description: "Unlock all premium features with exclusive perks.",
            benefits: ["Everything in Gold", "Free delivery", "Early access to new meals"],
            bgClass: "bg-blue-300",
        },
    ];

    return (
        <div id="subscription" className={`flex flex-col items-center justify-center p-6 mb-10 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <SectionTitle
                heading={'Choose Your Premium Package'}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {packages.map((pkg) => (
                    <div
                        key={pkg.name}
                        className={`flex flex-col justify-between cursor-pointer rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition-shadow duration-300 ${darkTheme ? 'bg-gray-700' : pkg.bgClass}`}
                    >
                        <h2 className={`text-2xl font-bold mb-2 ${darkTheme ? 'text-white' : 'text-gray-800'}`}>{pkg.name}</h2>
                        <p className={`text-lg font-semibold mb-4 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>${pkg.price}/month</p>
                        <p className={`mb-4 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>{pkg.description}</p>
                        <ul className={`text-left mb-6 ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                            {pkg.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <span>✔️</span>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto">
                            <Link
                                to={`/checkout/${pkg.name}`}
                                state={{ price: pkg.price }}
                                className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition-colors"
                            >
                                Select {pkg.name}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Membership;
