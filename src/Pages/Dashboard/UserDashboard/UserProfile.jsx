import { useContext } from "react";
import UseUser from "../../../Hook/UseUser";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaUser, FaEnvelope, FaAward, FaUserShield } from "react-icons/fa";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const UserProfile = () => {
    const [userDb, isUserLoading] = UseUser();
    const { user } = useContext(AuthContext);

    if (isUserLoading) {
        return <p className="text-center py-10 text-gray-600">Loading...</p>;
    }

    const currentUser = userDb?.find(runningUser => runningUser.email === user?.email);

    if (!currentUser) {
        return <p className="text-center py-10 text-gray-600">User not found.</p>;
    }
    return (
        <div className="max-w-4xl mx-auto p-8 rounded-lg">
            <SectionTitle heading={'My Profile'} />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-6 mb-6">
                    <img
                        className="w-28 h-28 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                        src={currentUser.photo}
                        alt="User Profile"
                    />
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 flex items-center space-x-2">
                            <FaUser className="text-2xl text-orange-500" />
                            <span>{currentUser.name}</span>
                        </h2>
                        <p className="text-gray-600 text-lg flex items-center space-x-2">
                            <FaEnvelope className="text-xl text-orange-500" />
                            <span>{currentUser.email}</span>
                        </p>
                        <p className="text-gray-600 text-lg flex items-center space-x-2">
                            <FaUserShield className="text-xl text-orange-500" />
                            <span>{currentUser.role || "User"}</span>
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-gray-700 text-lg flex items-center space-x-2">
                        <FaAward className="text-xl text-orange-500" />
                        <span>Badge: {currentUser.badge || "No Badge"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
