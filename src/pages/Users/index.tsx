import { useEffect, useState } from 'react'
import fetchUsersData from '../../api/FetchUsers';
import { useNavigate } from "react-router-dom";
import EditUser from "../../components/EditUser";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Constants";
import axios from "axios";
import DeleteUser from "../../components/DeleteUser";
import { useSearch } from "../../context/SearchContext";
import useAuthToken from "../../hooks/useAuthToken";

const Users = () => {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const { searchTerm } = useSearch();
    const token = useAuthToken();

    const columns = [
        "User name",
        "Pan card no.",
        "Mobile number",
        "Email id",
        "View",
        "Edit",
        "Delete",
    ];

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUsersData();
            setUsersData(data)
            console.log(data);
        };

        fetchData();
    }, []);

    const filteredUsers = usersData?.filter((user: any) =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

    const handleClick = (id: any) => {
        navigate(`/users/${id}`);
    }

    // handle edit user
    const handleEditUser = (user: any) => {
        setIsOpen(true);
        setSelectedUser(user); // Store the whole user data
    };

    // Add this new handler to update the table data
    const handleUserUpdate = (updatedUser: any) => {
        setUsersData((prevUsers: any) =>
            prevUsers.map((user: any) =>
                user?._id === updatedUser?._id ? updatedUser : user
            )
        );
        setIsOpen(false);
    };

    // handlle delete update
    const handleDeleteUpdate = (updatedUser: any) => {
        setUsersData((prevUsers: any) =>
            prevUsers.filter((user: any) => user._id !== updatedUser._id)
        );
        setDeleteOpen(false);
    };

    // send otp to user
    const handleSendOtp = async (user: any) => {
        try {
            const response = await axios.post(`${BASE_URL}/delete/user`, { userId: user._id }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {
                toast.success("OTP sent successfully");
                setSelectedUser(user);
                setDeleteOpen(true);


            }
        } catch (err: any) {
            toast.error(err.message || "Failed to send OTP");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
           


            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-[23px] font-bold text-black'></p>
                    </div>

                </div>
                <div className="mt-[42px]">
                    <div className="">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-[#F5F5F5]">
                                        {columns.map((column, index) => (
                                            <th
                                                key={index}
                                                className="border-none p-4 text-left text-[#828282] text-sm font-normal"
                                            >
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers && filteredUsers?.map((user: any, index: any) => (
                                        <tr
                                            key={user?._id}
                                            className={`${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                                        >

                                            <td className="border-none p-4 capitalize">
                                                {user?.fullName}
                                            </td>
                                            <td className="border-none p-4 capitalize">
                                                {user?.panCard}
                                            </td>
                                            <td className="border-none p-4 capitalize">
                                                {user?.mobileNumber}
                                            </td>
                                            <td className="border-none p-4 capitalize">
                                                {user?.email}
                                            </td>

                                            <td className="border-none p-4 capitalize">
                                                <button className='bg-jauhari_red w-[84px] h-[36px] text-white text-sm rounded-[8px]'
                                                    onClick={() => handleClick(user?._id)}
                                                >View</button>
                                            </td>
                                            <td className="border-none p-4 capitalize">
                                                <Edit
                                                    onClick={() => handleEditUser(user)}
                                                    className="w-[20px] h-[20px] text-gray-800 cursor-pointer"
                                                />
                                            </td>
                                            <td className="border-none p-4 capitalize">
                                                <Trash2
                                                    onClick={() => handleSendOtp(user)}
                                                    className="w-[20px] h-[20px] text-gray-800 cursor-pointer"
                                                />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit User Modal */}
            {isOpen && (
                <EditUser
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    userId={selectedUser?._id}
                    fullName={selectedUser?.fullName}
                    email={selectedUser?.email}
                    mobileNumber={selectedUser?.mobileNumber}

                    onUserUpdate={handleUserUpdate}
                />
            )}

            {/* Delete User Modal */}
            {deleteOpen && (
                <DeleteUser
                    isOpen={deleteOpen}
                    onClose={() => setDeleteOpen(false)}
                    userId={selectedUser?._id}
                    onUserUpdate={handleDeleteUpdate}
                />
            )}
        </div>
    )
}

export default Users