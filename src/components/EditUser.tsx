import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BASE_URL } from "../Constants";
import useAuthToken from "../hooks/useAuthToken";
interface EditUserProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    fullName: string;
    email: string;
    mobileNumber: number;
    onUserUpdate: (user: any) => void;
}

const EditUser = ({ isOpen, onClose, userId, fullName, email, mobileNumber, onUserUpdate }: EditUserProps) => {
    const [formData, setFormData] = useState({
        id: userId,
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
    });
    const token = useAuthToken();
    console.log(token, "token")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
       
        try {
            setIsSubmitting(true);
            setError("");
           
            const response = await axios.patch(
                `${BASE_URL}/edit/user/by/admin`, formData, {
                headers: {
                    
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {
                // Call onUserUpdate with the updated user data
                onUserUpdate(response.data.user);
                onClose();
                toast.success("User updated successfully");
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.error || error?.response?.data?.message || "failed to update user";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[350px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit User</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Full Name</label>
                        <input
                            name="fullName"
                            type="text"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Email</label>
                        <input
                            name="email"
                            type="text"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Mobile Number</label>
                        <input
                            name="mobileNumber"
                            type="number"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Pan Card</label>
                        <input
                            name="panCard"
                            type="text"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.panCard}
                            onChange={handleInputChange}
                        />
                    </div> */}


                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        className="px-6 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 rounded-full bg-jauhari_red text-white text-sm"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Editing..." : "Edit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUser;