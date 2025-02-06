import { useEffect, useState } from "react";
import { fetchAllSIPTransactions } from "../api/FetchSingleUser";
import moment from "moment";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<any>(null);

  const columns = [
    'Date', 
    'Total Amount',
    'Amount Without GST', 
    'GST',
    'GM', 
    'Gold Rate',
    'Payment Mode',
    'Pan Card',
    'User Name'
];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllSIPTransactions();
      setTransactions(data.data);
    };

    fetchData();
  }, []);

  console.log(transactions);

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[23px] font-bold text-black"></p>
          </div>
        </div>
        <div className="mt-[42px]">
          <div className="">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#F5F5F5]">
                    {columns.map((column, index) => (
                      <th key={index} className="border-none p-4 text-left text-[#828282] text-sm font-normal">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions &&
                    transactions?.map((transaction: any, index: any) => (
                      <tr
                        key={transaction?._id}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                      >
                        <td className="border-none p-4 capitalize">
                          {moment(transaction?.date).format("MMM Do YY")}
                        </td>
                        <td className="border-none p-4 capitalize">
                        {(transaction?.gstAmount + (transaction?.amount)).toFixed(2)}
                        </td>
                        <td className="border-none p-4 capitalize">
                          {transaction?.amount?.toFixed(2)}
                        </td>
                        <td className="border-none p-4 capitalize">
                          {transaction?.gstAmount?.toFixed(2)}
                        </td>
                       
                        <td className="border-none p-4 capitalize">
                          {transaction?.goldRate}
                        </td>
                        <td className="border-none p-4 capitalize">
                          {transaction?.gramsAccumulated?.toFixed(2)}
                        </td>
                        {/* <td className="border-none p-4 capitalize">
                          {transaction?.transactionType}
                        </td> */}
                        <td className="border-none p-4 capitalize">
                          {transaction?.paymentMode}
                        </td>
                       
                        <td className="border-none p-4 capitalize">
                          {transaction?.panCard}
                        </td>
                        <td className="border-none p-4 capitalize">
                          {transaction?.fullName}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default RecentTransactions;