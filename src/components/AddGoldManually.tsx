import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BASE_URL, token } from "../Constants";

interface AddGoldManuallyProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: (response: any) => void;
}

const AddGoldManually = ({ isOpen, onClose, userId, onSuccess }: AddGoldManuallyProps) => {
  const [formData, setFormData] = useState({
    userId: userId,
    monthlyAmount: "",
    month: "1", // Default to 1
    paymentMode: "cash", // Default to cash
    date: new Date().toISOString().split('T')[0], // Default to today
    gm: "",
    goldRate: "",
    // adminNote: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const paymentModes = [
    { label: "Cash", value: "cash" },
    { label: "Credit Card", value: "creditCard" },
    { label: "UPI", value: "upi" }
  ];

  // Generate months array from 1 to 11
  const months = Array.from({ length: 11 }, (_, i) => ({
    label: `${i + 1} Month${i + 1 === 1 ? '' : 's'}`,
    value: String(i + 1)
  }));

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

      if (!formData.gm) {
        throw new Error("Grams is required");
      }

      if (!formData.goldRate) {
        throw new Error("Gold rate is required");
      }

      if (!formData.monthlyAmount) {
        throw new Error("Amount is required");
      }

      if (!formData.date) {
        throw new Error("Date is required");
      }

      if (!formData.paymentMode) {
        throw new Error("Payment mode is required");
      }

      // Validate amount
      if (!formData.monthlyAmount || Number(formData.monthlyAmount) <= 2500) {
        throw new Error("Amount must be greater than 2500");
      }
      
      const response = await axios.post(
        // `${BASE_URL}/add/amount/sip/amount`
        "http://localhost:5000/api/add/amount/sip/amount"
        , formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.data) {
        onSuccess(response.data);
        onClose();
        toast.success("GSP added successfully");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Failed to add SIP details");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-[20px] p-6 w-full max-w-[700px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Gold SIP Manually</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Amount (min. ₹2500)</label>
            <input
              name="monthlyAmount"
              type="number"
              min="2501"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.monthlyAmount}
              onChange={handleInputChange}
              placeholder="Enter amount greater than 2500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Month</label>
            <select
              name="month"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.month}
              onChange={handleInputChange}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

       

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Date</label>
            <input
              name="date"
              type="date"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Grams</label>
            <input
              name="gm"
              type="number"
              step="0.0001"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.gm}
              onChange={handleInputChange}
              placeholder="Enter grams accumulated"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Gold Rate (per gram)</label>
            <input
              name="goldRate"
              type="number"
              className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
              value={formData.goldRate}
              onChange={handleInputChange}
              placeholder="Enter current gold rate"
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
        </div>

        {/* <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Admin Note</label>
          <textarea
            name="adminNote"
            className="flex-1 min-h-[80px] rounded border border-gray-300 px-3 py-2"
            value={formData.adminNote}
            onChange={handleInputChange}
            placeholder="Add any additional notes"
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
          {isSubmitting ? "Adding..." : "Add SIP"}
        </button>
      </div>
    </div>
  </div>
  );
};

export default AddGoldManually;