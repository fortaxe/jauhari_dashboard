

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BASE_URL } from "../Constants";
import Logo from './../images/logo/jauhari_logo.png';
import useAuthToken from "../hooks/useAuthToken";
interface WithdrawalPopupProps {
    isOpen: boolean;
    onClose: () => void;
    sipId: string;
    gramsAccumulated: string
    onSuccess: (response: any) => void;
}

const WithdrawalPopup = ({ isOpen, onClose, sipId, gramsAccumulated, onSuccess }: WithdrawalPopupProps) => {
    const [openOtp, setOpenOtp] = useState(false);
    const [formData, setFormData] = useState({
        otp: "",
        sipId: sipId, 
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const token = useAuthToken();

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

    const handleWithdraw = async () => {
        try {
            setIsSubmitting(true);
            setError("");

            const response = await axios.post(
                `${BASE_URL}/withdraw/sip`,
                {
                    sipId: sipId,
                  
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            
            if (response.data) {
                setOpenOtp(true);
                toast.success("OTP sent successfully");
            }
        } catch (error: any) {  
            const errorMessage = error?.response?.data?.error || error?.response?.data?.message || "failed to withdraw gold";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            if (!formData.otp) {
                throw new Error("Please enter OTP");
            }

            setIsSubmitting(true);
            setError("");

            const response = await axios.post(
                `${BASE_URL}/verify/withdraw`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (response.data) {
                onSuccess(response.data);
                onClose();
                toast.success("Withdrawal successful");
            }
        } catch (error: any) {
            setError(error.message || "Failed to verify OTP");
            toast.error(error.message || "Failed to verify OTP");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-jauhari_red rounded-[20px] p-6 w-full max-w-[400px]">
                <div className="flex justify-end items-center mb-4">
                    <button
                        onClick={onClose}
                        className="text-white"
                    >
                        ✕
                    </button>
                </div>

                {!openOtp ? (
                    <>
                        <div className="space-y-4  text-white">
                            <img 
                                src={Logo}
                                alt="logo"
                               
                            />

                        <h2 className="text-base font-semibold">Avaiable Gold Balance: {gramsAccumulated}</h2>

                            <button
                                onClick={handleWithdraw}
                                disabled={isSubmitting}
                                className="w-full bg-[#FFCB4E] h-[48px] rounded-[8px] text-[#7A231C] flex items-center justify-center cursor-pointer disabled:opacity-50"
                            >
                                <p className="text-base">{isSubmitting ? "Processing..." : "Withdraw"}</p>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-4">
                            {/* <h2 className="text-base font-normal">Enter OTP sent to your mobile number</h2> */}
                            <div className="flex flex-col">
                                <input
                                    name="otp"
                                    type="text"
                                    className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    placeholder="Enter OTP"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center">{error}</div>
                            )}

                            <div className="flex justify-end gap-2 mt-6">
                             
                               
                                <button
                                    className="px-6 py-2 rounded-full bg-white font-semibold text-jauhari_red border border-gray-300 text-sm hover:bg-gray-50"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2 rounded-full bg-jauhari_yellow font-semibold text-white text-sm disabled:opacity-50"
                                    onClick={handleVerifyOtp}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WithdrawalPopup;