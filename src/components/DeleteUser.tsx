

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BASE_URL, token } from "../Constants";

interface DeleteUserProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    onUserUpdate: (user: any) => void;
}

const DeleteUser = ({ isOpen, onClose, userId, onUserUpdate }: DeleteUserProps) => {
    console.log(userId, "userId")
    const [formData, setFormData] = useState({
        userId: userId,
        otp: "",
    });

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
            console.log('Sending data:', formData); // Add this line
            setIsSubmitting(true);
            setError("");

            const response = await axios.delete(`${BASE_URL}/verify/delete/user/otp`, {
                data: formData,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            

            if (response.data) {
                onUserUpdate(response.data.user);
                toast.success("User Deleted Successfully");
            }
        } catch (err: any) {
            setError(err.message || "Failed to update user");
            toast.error(err.message || "Failed to add SIP details");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[350px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Delete User</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* show otp send to user number */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-normal">OTP Sent to user mobile number</h2>
                </div>


                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">OTP</label>
                        <input
                            name="otp"
                            type="text"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.otp}
                            onChange={handleInputChange}
                        />
                    </div>

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
                        {isSubmitting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUser;