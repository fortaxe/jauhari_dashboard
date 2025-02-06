import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthToken from "../hooks/useAuthToken";
import { BASE_URL } from "../Constants";
interface PlanPopupProps {
    isOpen: boolean;
    onClose: () => void;
    planAmount?: any;
    planName?: any;
    planBanner?: File | null;
    onSuccess?: any
}

const PlanPopup: React.FC<PlanPopupProps> = ({ isOpen, onClose, planAmount, planName, onSuccess }) => {

    const [formData, setFormData] = useState({
        planAmount: planAmount,
        planName: planName,
        planBanner: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const token = useAuthToken();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            setError("");

            // Create FormData object
            const formDataToSend = new FormData();
            formDataToSend.append("planAmount", formData.planAmount);
            formDataToSend.append("planName", formData.planName);
            if (formData.planBanner) {
                formDataToSend.append("planBanner", formData.planBanner);
            }

            const response = await axios.post(
                // "http://localhost:5000/api/create/plan"
                `${BASE_URL}/create/plan`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data) {

                toast.success("Plan created successfully");
                if (onSuccess) onSuccess(response.data);
            }
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.error || error?.response?.data?.message || "Failed to create plan";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "planBanner" && files ? files[0] : value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[20px] p-6 w-full max-w-[400px]">
                <div className="flex justify-end items-center mb-4">
                    <button onClick={onClose} className="text-white">
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Plan Name</label>
                        <input
                            name="planName"
                            type="text"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.planName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Plan Amount</label>
                        <input
                            name="planAmount"
                            type="number"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            value={formData.planAmount}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-sm">Plan Banner</label>
                        <input
                            name="planBanner"
                            type="file"
                            className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                            onChange={handleInputChange}
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button className="px-6 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-50" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 rounded-full bg-jauhari_red text-white text-sm"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanPopup;
