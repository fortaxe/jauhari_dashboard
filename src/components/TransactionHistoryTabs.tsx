import React, { useState } from 'react';
import moment from 'moment';

// Type for a single Transaction
interface Transaction {
  _id?: string;
  date: string;
  amount?: number;
  gramsAccumulated?: number;
  goldRate?: number;

  transactionType: 'adminAddition' | 'withdrawal' | 'investment';
  paymentMode: 'cash' | 'creditCard' | 'upi';
  sipId: string;
  sipStatus: string;
  startDate: string;

}

// Type for a single SIP
interface SIP {
  _id: string;
  status: string;
  startDate: string;

  transactions: Transaction[];
}

// Type for user data
interface UserData {
  sipDetails: SIP[];
}

interface TransactionHistoryTabsProps {
  userData: UserData;
}

const TransactionHistoryTabs: React.FC<TransactionHistoryTabsProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'withdrawals'>('transactions');

  const columns = [
    'Transaction Date',
    'Amount',
    'Grams Accumulated',
    'Gold Rate',
    
    'Transaction Type',
    'Payment Mode',
  ];

  console.log(userData);

  const getAllTransactions = (): Transaction[] => {
    return (
      userData?.sipDetails?.flatMap((sip) =>
        sip.transactions.map((txn) => ({
          ...txn,
          sipId: sip?._id,
          startDate: sip?.startDate,
      
        }))
      ) || []
    );
  };

  const getWithdrawalTransactions = (): Transaction[] => {
    return getAllTransactions().filter((txn) => txn.transactionType === 'withdrawal');
  };

  const TransactionTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-[#F5F5F5]">
            {columns.map((column, index) => (
              <th
                key={index}
                className="border-none p-4 text-left text-[#828282] text-sm font-normal"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions?.map((txn, idx) => (
            <tr key={txn._id || idx} className="border-b">
              <td className="p-4">{moment(txn?.date).format('MMM Do YY')}</td>
              <td className="p-4">₹ {txn?.amount?.toFixed(2)}</td>
              <td className="p-4">{txn?.gramsAccumulated?.toFixed(2)} gms</td>
              <td className="p-4">₹ {txn?.goldRate?.toFixed(2)}</td>
             
              <td className="p-4">
                {txn.transactionType === 'adminAddition' ? 'Admin' : txn.transactionType === 'withdrawal' ? 'Withdrawal' : 'User'}
                </td>
              <td className="p-4">
                {txn?.paymentMode
                  ? {
                    cash: "Cash",
                    creditCard: "Credit Card",
                    upi: "UPI"
                  }[txn.paymentMode] || '-'
                  : '-'}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-8 border-b">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`text-[23px] font-bold pb-2 ${activeTab === 'transactions' ? 'border-b-2 border-[#7A231C] text-[#7A231C]' : 'text-black'
            }`}
        >
          Transaction History
        </button>
        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`text-[23px] font-bold pb-2 ${activeTab === 'withdrawals' ? 'border-b-2 border-[#7A231C] text-[#7A231C]' : 'text-black'
            }`}
        >
          Withdrawal History
        </button>
      </div>

      <div className="mt-[42px]">
        {activeTab === 'transactions' && <TransactionTable transactions={getAllTransactions()} />}
        {activeTab === 'withdrawals' && <TransactionTable transactions={getWithdrawalTransactions()} />}
      </div>
    </div>
  );
};

export default TransactionHistoryTabs;
