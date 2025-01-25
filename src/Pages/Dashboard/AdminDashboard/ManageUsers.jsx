import { FaUserShield } from "react-icons/fa";
import UseUser from "../../../Hook/UseUser";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const ManageUsers = () => {
    const [userDb, isUserLoading, refetch] = UseUser();
    const axiosPublic = useAxiosPublic();


    if (isUserLoading) {
        return <p className="text-center py-10 text-gray-600">Loading...</p>;
    }

    const handleMakeAdmin = id => {

        Swal.fire({
            title: "Do you want to make the user as Admin?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {

            if (result.isConfirmed) {
                axiosPublic.patch(`/users/admin/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Modified the User As Admin", "", "success");
                        }
                    })
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    return (
        <div>
            <div className="mt-10">
                <SectionTitle heading={'Manage Users'} />
            </div>
            <div className="overflow-x-auto mx-20 mt-10 mb-20">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#D1A054] text-white text-sm lg:text-base">
                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userDb.map(user => (
                                <tr key={user._id} className="border-b border-gray-200 text-sm lg:text-base">
                                    <td className="p-3 ">{user.name}</td>
                                    <td className="p-3 text-center">{user.email}</td>
                                    <td className="p-3 text-center">
                                        {
                                            user.role === 'admin' ? 'Admin' : <button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="btn btn-sm bg-[#D1A054] text-white hover:bg-red-700">
                                                <FaUserShield></FaUserShield>
                                            </button>
                                        }
                                    </td>
                                    <td className="p-3 text-center">{user.badge}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;