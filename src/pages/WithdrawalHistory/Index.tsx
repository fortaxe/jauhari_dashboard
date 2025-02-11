import { useEffect, useState } from "react";
import { fetchAllCompletedSIPTransactions } from "../../api/FetchSingleUser";
import moment from "moment";
import { useWithdrawalSearch } from "../../context/WithdrawalHistoryContext";
import * as XLSX from "xlsx";

const WithdrawalHistory = () => {
  const [transactions, setTransactions] = useState<any>(null);
  const { searchTerm } = useWithdrawalSearch();


  const columns = [
    'Date',
    'Total Amount',
    
    'GM',
    'Gold Rate',
    'Pan Card',
    'User Name'
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCompletedSIPTransactions();
      setTransactions(data.data);
    };

    fetchData();
  }, []);

  console.log(transactions);

  const filteredTransactions = transactions?.filter((transaction: any) => {
    // Text search filter
    const matchesSearch = !searchTerm ||
      transaction?.fullName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      transaction?.panCard?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      moment(transaction?.date)?.format("MMM Do YY")?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      String(transaction?.goldRate)?.toLowerCase()?.includes(searchTerm?.toLowerCase())

    return matchesSearch;
  });

  const downloadExcel = () => {

    const worksheet = XLSX?.utils?.json_to_sheet(
      filteredTransactions?.map((t: any) => ({
        Date: moment(t?.date)?.format("MMM Do YY"),
        'Total Amount': (t?.gstAmount + t?.amount)?.toFixed(2),
        'Amount Without GST': t?.amount?.toFixed(2),
        GST: t?.gstAmount?.toFixed(2),
        GM: t?.gramsAccumulated?.toFixed(2),
        'Gold Rate': t?.goldRate,
        'Payment Mode': t?.paymentMode,
        'Pan Card': t?.panCard,
        'User Name': t?.fullName
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const fileName = 'withdrawal_history.xlsx';

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[23px] font-bold text-black"></p>
          </div>

        </div>
        <div className="flex items-end gap-4">

          <button
            onClick={downloadExcel}
            className="bg-jauhari_red px-[20px]   font-semibold h-[45px] text-white text-sm rounded-[8px]"
          >
            Download Report
          </button>
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
                  {filteredTransactions?.map((transaction: any, index: any) => (
                    <tr
                      key={transaction?._id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                    >
                      <td className="border-none p-4 capitalize">
                        {moment(transaction?.date).format("MMM Do YY")}
                      </td>
                    
                      <td className="border-none p-4 capitalize">
                        {transaction?.amount?.toFixed(2)}
                      </td>
                      
                      <td className="border-none p-4 capitalize">
                        {transaction?.gramsAccumulated?.toFixed(2)}
                      </td>
                      <td className="border-none p-4 capitalize">
                        {transaction?.goldRate}
                      </td>

                      {/* <td className="border-none p-4 capitalize">
                          {transaction?.transactionType}
                        </td> */}
                    
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

export default WithdrawalHistory;