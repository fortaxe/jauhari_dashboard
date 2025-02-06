import { useEffect, useState } from 'react'
import { fetchPaymentInfo } from "../../api/FetchSingleUser";

const PaymentInfo = () => {
    const [paymentInfoData, setPaymentInfoData] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const columns = [
        "Full Name",
        "Mobile Number",
        "Pan Card",
        "Image",
        "UTR Number"
        
    ];

    // api call
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPaymentInfo();
            setPaymentInfoData(data)
            console.log(data, paymentInfoData);
        };

        fetchData();
    }, []);

    console.log(paymentInfoData)

    return (
        <div className="text-black flex w-full">
        <div className="mt-[42px] w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full ">
              {/* Table Header */}
              <thead>
                <tr className="bg-[#F5F5F5] text-black">
                  <th className=" p-4 text-left text-sm  font-semibold">Full Name</th>
                  <th className=" p-4 text-left text-sm font-semibold">Mobile Number</th>
                  <th className=" p-4 text-left text-sm font-semibold">PAN Card</th>
                  <th className=" p-4 text-left text-sm font-semibold">Screenshot</th>
                  <th className=" p-4 text-left text-sm font-semibold">UPI ID</th>
                </tr>
              </thead>
  
              {/* Table Body */}
              <tbody>
                {paymentInfoData?.map((user: any, index: any) => (
                  <tr key={user?._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                    <td className=" p-4">{user?.userId?.fullName}</td>
                    <td className=" p-4 capitalize">{user?.userId?.mobileNumber}</td>
                    <td className=" p-4 capitalize">{user?.userId?.panCard}</td>
                    
                    {/* Clickable Image */}
                    <td className=" p-4 capitalize">
                      <img
                        src={user?.screenShot}
                        alt="Screenshot"
                        className="w-[200px] h-[80px] object-contain border border-gray-400 rounded cursor-pointer"
                        onClick={() => setSelectedImage(user?.screenShot)}
                      />
                    </td>
  
                    <td className=" p-4 capitalize">{user?.upiId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={() => setSelectedImage(null)} // Close on background click
          >
            <div className="relative bg-white p-4 rounded-lg">
              {/* Close Button */}
              <button 
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full px-2 py-1"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
  
              {/* Enlarged Image */}
              <img src={selectedImage} alt="Enlarged" className="max-w-[90vw] max-h-[60vh] object-contain" />
            </div>
          </div>
        )}
      </div>
    )
}

export default PaymentInfo
