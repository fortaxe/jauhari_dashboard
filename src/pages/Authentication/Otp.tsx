import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { BASE_URL } from "../../Constants";

const Otp: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const mobileNumber = '8367260182';
  const { setAuthenticated, storedOtp } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!otp) {
      setError('OTP is required');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/verify/otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setAuthenticated(true);
        console.log(setAuthenticated)
        navigate("/");
        toast.success(data.message);
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-800">
      <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md">
        <h2 className="mb-4 text-lg font-medium text-red-900">Enter OTP</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-3 py-2 mb-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          
          {storedOtp && (
            <p className="mb-4 text-[16px] text-gray-600">
              OTP: {storedOtp}
            </p>
          )}
          
          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-medium text-center text-red-800 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;