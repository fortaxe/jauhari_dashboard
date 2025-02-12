import { useEffect, useState } from "react";
import { fetchPlans } from "../../api/FetchSingleUser";
import PlanPopup from "../../components/createPlan";
import Loader from "../../common/Loader";

const Plan = () => {
  const [plans, setPlans] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const data = await fetchPlans();
      setPlans(data);
      setLoader(false);
    };

    fetchData();
  }, []);

  if (loader) {
    return <Loader />;
  }

  const handlePlanPopup = (response: any) => {
    console.log(response);
    setPlans((prevPlans: any) => [...(prevPlans || []), response?.plan]);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[23px] font-bold text-black"></p>
          </div>
        </div>
        <div className="flex justify-end">
          <button 
          onClick={() => setIsOpen(true)}
          className="bg-jauhari_red px-[20px] h-[40px] text-white text-sm rounded-[8px]">
            Create New Plan
          </button>
        </div>

        <div className="mt-[42px]">
          <div className="">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#F5F5F5]">
                    <th className="border-none p-4 text-left text-[#828282] text-sm font-normal">
                      Plan Name
                    </th>
                    <th className="border-none p-4 text-left text-[#828282] text-sm font-normal">
                      Plan Amount
                    </th>
                    <th className="border-none p-4 text-left text-[#828282] text-sm font-normal">
                      Plan Banner
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {plans &&
                    plans?.map((plan: any, index: any) => (
                      <tr
                        key={plan?._id}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                      >
                        <td className="border-none p-4 capitalize">
                          {plan?.planName}
                        </td>
                        <td className="border-none p-4 capitalize">
                          {plan?.planAmount}
                        </td>
                        <td className="border-none p-4 capitalize">
                          <img
                            src={plan?.planBanner}
                            alt="Screenshot"
                            className="w-[200px] h-[80px] object-contain border border-gray-400 rounded cursor-pointer"
                          // onClick={() => setSelectedImage(user?.screenShot)}
                          />
                        </td>
                        <td className="border-none p-4 capitalize">
                          {/* <button className='bg-jauhari_red w-[84px] h-[36px] text-white text-sm rounded-[8px]'
                            onClick={() => handleClick(user?._id)}
                          >View</button> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <PlanPopup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          planAmount={0}
          planName=""
          planBanner={null}
          onSuccess={handlePlanPopup}
        />
      )}
    </div>
  );
};

export default Plan;