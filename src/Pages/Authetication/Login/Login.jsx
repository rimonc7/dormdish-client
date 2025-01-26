import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin.Jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const { loginUserWithEmail, setErrorMessage, errorMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/'

    const handleLoginWithMail = async (data) => {
        const { email, password } = data;
        loginUserWithEmail(email, password)
            .then((userCredential) => {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    draggable: true
                });
                reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                setErrorMessage(error.message)
            });

    }
    return (
        <div className="bg-gradient-to-r from-blue-500 to-orange-400 py-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <SectionTitle heading="Login Here" />
                <form onSubmit={handleSubmit(handleLoginWithMail)} className="space-y-6">

                    {/* Email Field */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Email*</span>
                        </div>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </label>
                    {/* Password Field */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Password*</span>
                        </div>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password"
                            className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn text-white bg-gradient-to-r from-blue-500 to-orange-400 w-full py-3 rounded-lg shadow-md hover:scale-105 transform transition-all duration-200"
                    >
                       Login
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-gray-700">
                        New Here?{" "}
                        <Link
                            to="/joinUs"
                            className="text-orange-500 hover:underline font-semibold"
                        >
                            Create Link New Account
                        </Link>
                    </p>
                </div>
                <SocialLogin></SocialLogin>
                {/* Display Error Message */}
                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                        <p className="font-medium">Error:</p>
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;