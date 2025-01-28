import UserCard from '../../../components/UserCard'
import User2 from '../../../images/cards/user2.png'
import Notes from '../../../images/cards/notes.png'
import Money from '../../../images/cards/money.png'
import Telephone from '../../../images/cards/telephone.png'
import Box from '../../../images/cards/box.png'
import Calendar from '../../../images/cards/calendar.png'
import PanCard from '../../../images/cards/pan-card.png'
import Adhaar from '../../../images/cards/adhaar.png'

const UserManagement = () => {

    const columns = [
        "GSP ID",
        "GSP Status",
        "Amount",
        "Plan Start",
        "Plan End",
        "Last Payment Date",
        "Next Payment Date",
        "Credit",
        "Debit",
    ];

    const data = Array.from({ length: 4 }, (_, index) => ({
        "Student Name": `Student name ${index + 1}`,
        Location: "Hyderabad",
        Board: "CISCE",
        Grade: "7",
        Subject: "Mathematics",
        Date: "20 Nov 2024",
        Time: "10:00 AM",
    }));

    return (
        <div>
            <div className="grid grid-cols-1 gap-[12px] lg:grid-cols-4 mb-[40px]">
                <UserCard icon={User2} title='User Name' value='User Name' />
                <UserCard icon={Notes} title='User ID' value='userid1234' />
                <UserCard icon={Money} title='Phone' value='+91 9536 542 556' />
                <UserCard icon={Telephone} title='Adhar Card Number' value='1234 5678 9123' />
                <UserCard icon={Box} title='Total Amount Invested Across All GSPs Till Last Payment Date' value='₹56,000.00' />
                <UserCard icon={Calendar} title='Total Gold Bought Across all GSPs Till Last Payment Date' value='8 grams' />
                <UserCard icon={PanCard} title='Date Of Registration' value='02 Nov 2024' />
                <UserCard icon={Adhaar} title='Pan card no.' value='1234 5647 5654' />
            </div>

            <div className="grid grid-cols-1 gap-[12px] lg:grid-cols-5 mb-[40px]">
                <div className=' bg-[#FFCB4E] h-[64px] rounded-[8px] text-[#7A231C] py-[22px] px-[41px] flex items-center justify-center'>
                    <p className='text-base'>Gold Withdrawal History</p>
                </div>
                <div className=' bg-[#FFCB4E] h-[64px] rounded-[8px] text-[#7A231C] py-[22px] px-[41px] flex items-center justify-center'>
                    <p className='text-base'>User History</p>
                </div>
                <div className=' bg-[#FFCB4E] h-[64px] rounded-[8px] text-[#7A231C] py-[22px] px-[41px] flex items-center justify-center'>
                    <p className='text-base'>Withdraw Gold</p>
                </div>
            </div>

            {/* Tansaction List */}
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-[23px] font-bold text-black'>Transaction History</p>
                    </div>
                    <div>
                        <button className='h-[48px] rounded-[13px] flex items-center justify-center bg-[#EDEDED] text-[#282828] py-[22px] px-[41px] text-sm'>Filer By
                            <svg className='ml-[3px]' width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.87436 6.27018L3.47852 7.64518C3.35352 7.75631 3.20768 7.81185 3.04102 7.81185C2.87435 7.81185 2.72852 7.74935 2.60352 7.62435C2.47852 7.49935 2.41602 7.35352 2.41602 7.18685C2.41602 7.02018 2.47852 6.87435 2.60352 6.74935L5.06186 4.29102C5.13127 4.22157 5.20073 4.17296 5.27019 4.14518C5.33961 4.11741 5.41602 4.10352 5.49936 4.10352C5.58269 4.10352 5.65907 4.11741 5.72852 4.14518C5.79794 4.17296 5.8674 4.22157 5.93686 4.29102L8.39519 6.74935C8.52019 6.87435 8.58269 7.02018 8.58269 7.18685C8.58269 7.35352 8.52019 7.49935 8.39519 7.62435C8.27019 7.74935 8.12436 7.80839 7.95769 7.80143C7.79102 7.79447 7.64519 7.73547 7.52019 7.62435L6.12436 6.27018V14.7702L7.52019 13.3952C7.64519 13.2841 7.79102 13.2285 7.95769 13.2285C8.12436 13.2285 8.27019 13.291 8.39519 13.416C8.52019 13.541 8.58269 13.6868 8.58269 13.8535C8.58269 14.0202 8.52019 14.166 8.39519 14.291L5.93686 16.7493C5.8674 16.8188 5.79794 16.8674 5.72852 16.8952C5.65907 16.923 5.58269 16.9368 5.49936 16.9368C5.41602 16.9368 5.33961 16.923 5.27019 16.8952C5.20073 16.8674 5.13127 16.8188 5.06186 16.7493L2.60352 14.291C2.47852 14.166 2.41602 14.0202 2.41602 13.8535C2.41602 13.6868 2.47852 13.541 2.60352 13.416C2.72852 13.291 2.87435 13.232 3.04102 13.2389C3.20768 13.2459 3.35352 13.3049 3.47852 13.416L4.87436 14.7702V6.27018ZM11.1244 16.3327C10.9438 16.3327 10.7945 16.2736 10.6764 16.1556C10.5584 16.0376 10.4994 15.8882 10.4994 15.7077C10.4994 15.5271 10.5584 15.3778 10.6764 15.2598C10.7945 15.1417 10.9438 15.0827 11.1244 15.0827H18.2077C18.3882 15.0827 18.5375 15.1417 18.6556 15.2598C18.7736 15.3778 18.8327 15.5271 18.8327 15.7077C18.8327 15.8882 18.7736 16.0376 18.6556 16.1556C18.5375 16.2736 18.3882 16.3327 18.2077 16.3327H11.1244ZM11.1244 11.1243C10.9438 11.1243 10.7945 11.0653 10.6764 10.9473C10.5584 10.8292 10.4994 10.6799 10.4994 10.4993C10.4994 10.3188 10.5584 10.1695 10.6764 10.0514C10.7945 9.93339 10.9438 9.87435 11.1244 9.87435H18.2077C18.3882 9.87435 18.5375 9.93339 18.6556 10.0514C18.7736 10.1695 18.8327 10.3188 18.8327 10.4993C18.8327 10.6799 18.7736 10.8292 18.6556 10.9473C18.5375 11.0653 18.3882 11.1243 18.2077 11.1243H11.1244ZM11.1244 5.91602C10.9438 5.91602 10.7945 5.85697 10.6764 5.73893C10.5584 5.62089 10.4994 5.47156 10.4994 5.29102C10.4994 5.11047 10.5584 4.96114 10.6764 4.8431C10.7945 4.72506 10.9438 4.66602 11.1244 4.66602H18.2077C18.3882 4.66602 18.5375 4.72506 18.6556 4.8431C18.7736 4.96114 18.8327 5.11047 18.8327 5.29102C18.8327 5.47156 18.7736 5.62089 18.6556 5.73893C18.5375 5.85697 18.3882 5.91602 18.2077 5.91602H11.1244Z" fill="#282828" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-[42px]">
                    <div className="">
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
                                    {data.map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}`}
                                        >
                                            {columns.map((column, colIndex) => (
                                                <td key={colIndex} className="border-none p-4">
                                                    {row[column] || ""}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement