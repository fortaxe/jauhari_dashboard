import React, { useState } from 'react';
import { BASE_URL } from "../../Constants";
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!mobileNumber) {
      setError('Mobile number is required');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'OTP sent successfully') {
          navigate('/auth/otp');
        } else {
          setError('Unexpected response from server');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-800">
      <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-md">
        <h2 className="mb-4 text-lg font-medium text-red-900">Enter Mobile Number</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter Mobile Number"
            className="w-full px-3 py-2 mb-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
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

export default SignIn;
