import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin.Jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const JoinUs = () => {
    const { register, handleSubmit, reset } = useForm();
    const { createUserWithEmail, setErrorMessage, errorMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const axiosPublic = useAxiosPublic();

    const handleCreateUser = async (data) => {
        const { name, photo, email, password } = data;
        setErrorMessage("");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage(
                "Password must be at least 6 characters long and contain at least one uppercase letter and one lowercase letter."
            );
            return;
        }

        // Create user with email and password
        createUserWithEmail(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo,
                }).then(() => user);
            })
            .then((user) => {

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    badge: 'bronze'
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Success",
                                icon: "success",
                                draggable: true
                            });
                            reset();
                            setErrorMessage("");
                            navigate(from, { replace: true })
                        }
                    })
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-orange-400 py-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <SectionTitle heading="Join Us" />
                <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-6">
                    {/* Name Field */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Name*</span>
                        </div>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter your name"
                            className="input input-bordered w-full py-3 px-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </label>

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

                    {/* Photo URL Field */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-lg font-semibold text-gray-700">Photo URL*</span>
                        </div>
                        <input
                            type="text"
                            {...register("photo", { required: true })}
                            placeholder="Enter your photo URL"
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
                        Join Now
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-gray-700">
                        Already have an account?{" "}
                        <Link
                            to='/login'
                            className="text-orange-500 hover:underline font-semibold"
                        >
                            Log in
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

export default JoinUs;
