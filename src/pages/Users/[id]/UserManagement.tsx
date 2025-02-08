import UserCard from '../../../components/UserCard'
import User2 from '../../../images/cards/user2.png'
import Money from '../../../images/cards/money.png'
import Telephone from '../../../images/cards/telephone.png'
import Box from '../../../images/cards/box.png'
import Calendar from '../../../images/cards/calendar.png'
import PanCard from '../../../images/cards/pan-card.png'
import Adhaar from '../../../images/cards/adhaar.png'
import months from '../../../images/cards/months.png'
import dueDate from '../../../images/cards/due-date.png'
import { fetchSingleUserData } from "../../../api/FetchSingleUser"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import moment from 'moment';
import AddGoldManually from "../../../components/AddGoldManually"
import WithdrawalPopup from "../../../components/WithDrawal"
import TransactionHistoryTabs from "../../../components/TransactionHistoryTabs"

const UserManagement = () => {
    const [isGoldAddManuallyOpen, setIsGoldAddManuallyOpen] = useState(false);
    const [isWithdrawalPopupOpen, setIsWithdrawalPopupOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const { id } = useParams();

    // Define fetchData outside useEffect
    const fetchData = async () => {
        const data = await fetchSingleUserData(id);
        setUserData(data);
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    // Handler for gold addition
    const handleGoldAdded = (response: any) => {
        console.log(response);
        setUserData((prevData: any) => ({
            ...prevData,
            activeSIP: response?.userSIP,
            sipDetails: response?.sipDetails
        }));
        setIsGoldAddManuallyOpen(false);
    };

    // Handler for withdrawal
    const handleWithdrawal = async () => {
        setIsWithdrawalPopupOpen(false);
        await fetchData();
    };

    console.log(userData, "user data")

    return (
        <div className="bg-[#F5F7FA]">

            <div className="grid  grid-cols-1 gap-[12px] lg:grid-cols-3 mb-[40px]">
                <UserCard icon={User2} title='User Name' value={userData?.user?.fullName} />
                
                <UserCard icon={Telephone} title='Phone' value={userData?.user?.mobileNumber} />
                <UserCard icon={Adhaar} title='Adhar Card Number' value={userData?.user?.aadharCard} />
                <UserCard icon={PanCard} title='Pan card no.' value={userData?.user?.panCard} />
                <UserCard
                    icon={Calendar}
                    title='Date Of Registration'
                    value={userData?.user?.createdAt ? moment(userData.user.createdAt).format('MMM Do YY') : ''}
                />
                <UserCard icon={Money} title='Total Amount Invested' value={userData?.activeSIP?.totalAmountExculdingGst?.toFixed(2)} />
                <UserCard icon={Box} title='Total Gold Bought' value={userData?.activeSIP?.totalGramsAccumulated?.toFixed(2)} />
               
               
                <UserCard icon={months} title='Completed Months' value={userData?.activeSIP?.transactions?.length} />
                <UserCard icon={dueDate} title='Next Due Date' value={
                   userData?.activeSIP?.nextDueDate ? moment(userData?.activeSIP?.nextDueDate).format('MMM Do YY') : ''
                    } />
            </div>

            <div className="grid grid-cols-1 gap-[12px] lg:grid-cols-5 mb-[40px]">
                <div
                    onClick={() => setIsWithdrawalPopupOpen(true)}
                    className='bg-[#FFCB4E] h-[64px] rounded-[8px] text-[#7A231C] py-[22px] px-[41px] flex items-center justify-center cursor-pointer'
                >
                    <p className='text-base'>Withdraw Gold</p>
                </div>
                <div
                    onClick={() => setIsGoldAddManuallyOpen(true)}
                    className='bg-[#FFCB4E] h-[64px] rounded-[8px] text-[#7A231C] py-[22px] px-[41px] flex items-center justify-center cursor-pointer'
                >
                    <p className='text-base'>Add Gold Manually</p>
                </div>
            </div>

            <div className="mt-[42px]">
                <TransactionHistoryTabs userData={userData} />
            </div>

            {isGoldAddManuallyOpen && (
                <AddGoldManually
                    isOpen={isGoldAddManuallyOpen}
                    onClose={() => setIsGoldAddManuallyOpen(false)}
                    userId={userData?.user?._id}
                    onSuccess={handleGoldAdded}
                    
                />
            )}

            {isWithdrawalPopupOpen && (
                <WithdrawalPopup
                    isOpen={isWithdrawalPopupOpen}
                    onClose={() => setIsWithdrawalPopupOpen(false)}
                    gramsAccumulated={userData?.activeSIP?.totalGramsAccumulated}
                    sipId={userData?.activeSIP?._id}
                    onSuccess={handleWithdrawal}
                />
            )}
        </div>
    );
};

export default UserManagement;

