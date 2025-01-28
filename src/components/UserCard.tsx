import React from "react";

type UserCardProps = {
  icon: string;
  title: string;
  value: string; 
};

const UserCard: React.FC<UserCardProps> = ({ icon, title, value }) => {
  return (
    <div className="py-[30px] px-[20px] bg-[#F8F8F8] rounded-2xl flex flex-col justify-start items-start">
      <div className="w-15 h-15 mb-[17px]">
        <img src={icon} alt="User Icon" className="w-full h-full object-contain" />
      </div>

      <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-[28px] leading-[33px] font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default UserCard;