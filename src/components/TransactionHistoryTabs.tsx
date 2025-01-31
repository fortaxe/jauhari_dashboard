import React, { useState } from 'react';
import moment from 'moment';

interface Transaction {
  _id?: string;
  transactionType: string;
  amount: number;
  date: string;
  sipId?: string;
  sipStatus?: string;
  startDate?: string;
  nextDueDate?: string | null;
}

interface SipDetail {
  _id: string;
  status: string;
  startDate: string;
  nextDueDate: string | null;
  transactions: Transaction[];
}

interface UserData {
  sipDetails: SipDetail[];
}

interface TransactionHistoryTabsProps {
  userData: UserData;
}

const TransactionHistoryTabs: React.FC<TransactionHistoryTabsProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'withdrawals'>('transactions');

  const columns = [
    'GSP ID',
    'GSP Status',
    'Amount',
    'Plan Start',
    'Transaction Date',
    'Next Payment Date',
  ];

  // Function to get all transactions from all SIPs
  const getAllTransactions = (): Transaction[] => {
    return (
      userData?.sipDetails?.flatMap((sip) =>
        sip.transactions.map((txn) => ({
          ...txn,
          sipId: sip._id,
          sipStatus: sip.status,
          startDate: sip.startDate,
          nextDueDate: sip.nextDueDate,
        }))
      ) || []
    );
  };

  // Function to get only withdrawal transactions
  const getWithdrawalTransactions = (): Transaction[] => {
    return getAllTransactions().filter((txn) => txn.transactionType === 'withdrawal');
  };

  interface TransactionTableProps {
    transactions: Transaction[];
  }

  const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => (
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
          {transactions.map((txn, idx) => (
            <tr key={txn._id || idx} className="border-b">
              <td className="p-4">{txn.sipId}</td>
              <td className="p-4">{txn.sipStatus}</td>
              <td className="p-4">{txn.amount ? txn.amount.toFixed(2) : '0.00'}</td>
              <td className="p-4">{moment(txn.startDate).format('MMM Do YY')}</td>
              <td className="p-4">{moment(txn.date).format('MMM Do YY')}</td>
              <td className="p-4">
                {txn.nextDueDate === null ? '-' : moment(txn.nextDueDate).format('MMM Do YY')}
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
          className={`text-[23px] font-bold pb-2 ${
            activeTab === 'transactions' ? 'border-b-2 border-[#7A231C] text-[#7A231C]' : 'text-black'
          }`}
        >
          Transaction History
        </button>
        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`text-[23px] font-bold pb-2 ${
            activeTab === 'withdrawals' ? 'border-b-2 border-[#7A231C] text-[#7A231C]' : 'text-black'
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
