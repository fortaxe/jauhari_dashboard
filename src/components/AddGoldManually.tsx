import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BASE_URL, token } from "../Constants";

interface AddGoldManuallyProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const AddGoldManually = ({ isOpen, onClose, userId }: AddGoldManuallyProps) => {
  const [formData, setFormData] = useState({
    userId: userId,
    monthlyAmount: "",
    months: "",
    karatage: "22kt",
    adminNote: "",
    startDate: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
    paymentMode: "cash"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const paymentModes = [
    { label: "Cash", value: "cash" },
    { label: "Credit Card", value: "creditCard" },
    { label: "UPI", value: "upi" }
  ];

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
      
      const response = await axios.post(`${BASE_URL}/add/amount/sip/amount`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.data) {
        onClose();
      
        toast.success("Gold added successfully");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add SIP details");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] p-6 w-full max-w-[350px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Gold SIP Manually</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Add Amount</label>
            <input
              name="monthlyAmount"
              type="number"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.monthlyAmount}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Months</label>
            <input
              name="months"
              type="number"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.months}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Payment Mode</label>
            <select
              name="paymentMode"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.paymentMode}
              onChange={handleInputChange}
            >
              {paymentModes.map(mode => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Admin Note</label>
            <textarea
              name="adminNote"
              className="flex-1 min-h-[80px] rounded border border-gray-300 px-3 py-2"
              value={formData.adminNote}
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
            {isSubmitting ? "Adding..." : "Add SIP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoldManually;