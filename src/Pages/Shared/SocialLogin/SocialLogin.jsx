import { useContext } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { loginWithGoogle, setErrorMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleGoogleLogin = () => {
        setErrorMessage('');
        loginWithGoogle()
            .then(userCredential => {
                Swal.fire({
                    title: "Login Success",
                    icon: "success",
                    draggable: true
                });
                navigate(from, { replace: true });
                // TODO: Send user data to database
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="border-t-2 mt-3">
            <div className="flex justify-center space-x-4 mt-6">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
                    <FaFacebookF className="text-blue-600" size={20} />
                </button>
                <button
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-md"
                    onClick={handleGoogleLogin}
                >
                    <FaGoogle className="text-red-500" size={20} />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
                    <FaTwitter className="text-blue-400" size={20} />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
