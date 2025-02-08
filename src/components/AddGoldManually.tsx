import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { BASE_URL } from "../Constants";
import useAuthToken from "../hooks/useAuthToken";
import { fetchPlans } from "../api/FetchSingleUser";

interface AddGoldManuallyProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: (response: any) => void;
  sip: any;
}

const AddGoldManually = ({ isOpen, onClose, userId, onSuccess, sip }: AddGoldManuallyProps) => {
  const [plans, setPlans] = useState<any>(null);
  const [openOtp, setOpenOtp] = useState(false);
  const [formData, setFormData] = useState({
    userId: userId,
    monthlyPlanId: sip ? sip?.monthlyPlan?._id : "",
    month: "", // 
    paymentMode: "cash", // Default to cash
    date: new Date().toISOString().split('T')[0], // Default to today
    gm: "",
    goldRate: "",
    otp: ""
  });

  console.log(sip, "sip")

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const token = useAuthToken();

  const paymentModes = [
    { label: "Cash", value: "cash" },
    { label: "Credit Card", value: "creditCard" },
    { label: "UPI", value: "upi" }
  ];

  // Generate months array from 1 to 11
  const months = Array.from({ length: 11 }, (_, i) => ({
    label: `${i + 1} Month`,
    value: String(i + 1)
  }));

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlans();
      setPlans(data);
    };

    fetchData();
  }, []);

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
        toast.error("Grams is required");
      }

      if (!formData.goldRate) {
        toast.error("Gold rate is required");
      }


      if (!formData.date) {
        toast.error("Date is required");
      }

      if (!formData.paymentMode) {
        toast.error("Payment mode is required");
      }

      const response = await axios.post(
        `${BASE_URL}/initiate/admin/add/sip/amount`

        , {
          userId,
          monthlyPlanId: formData.monthlyPlanId,
          gm: formData.gm,
          goldRate: formData.goldRate,
          paymentMode: formData.paymentMode,
          month: formData.month,
          date: formData.date
        }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.data) {
        setOpenOtp(true);
        toast.success("OTP sent successfully");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error?.response?.data?.error || error?.response?.data?.message || "failed to add gold";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {

    if (!isOpen) return null;

    const response = await axios.post(
      `${BASE_URL}/add/amount/sip/amount`
      , {
        otp: formData.otp
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    if (response.data) {
      onSuccess(response.data);
      onClose();
      toast.success("GSP added successfully");
    }
  };



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

        {!openOtp ? (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium text-sm">Select Plan</label>
                  <select
                    name="monthlyPlanId"
                    className="flex-1 h-10 rounded border border-gray-300 px-3 py-2"
                    value={sip ? sip?.monthlyPlan?._id : formData.monthlyPlanId}
                    onChange={handleInputChange}
                    disabled={!!sip} // Disable if an active SIP exists
                  >
                    {sip ? (
                      // Show the existing SIP plan as a disabled option
                      <option value={sip?.monthlyPlan?._id} disabled>
                        {sip?.monthlyPlan?.planName} - {sip?.monthlyPlan?.planAmount}
                      </option>
                    ) : (
                      <>
                        {/* Default placeholder option */}
                        <option value="" disabled hidden>
                          Select a Plan
                        </option>

                        {/* Render plans dynamically */}
                        {plans?.map((plan: any) => (
                          <option key={plan?._id} value={plan?._id}>
                            {plan?.planName} - {plan?.planAmount}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
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
}

export default AddGoldManually;