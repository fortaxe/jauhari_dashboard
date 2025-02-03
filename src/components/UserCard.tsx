import React from "react";

type UserCardProps = {
  icon: string;
  title: string;
  value: string; 
};

const UserCard: React.FC<UserCardProps> = ({ icon, title, value }) => {
  return (
<div className="px-[20px] bg-[#F8F8F8] shadow-sm rounded-[10px] flex h-[76px] items-center">
  {/* Icon and Title in the same row */}
  <div className="w-full flex items-center justify-between">
    <div className="flex items-center gap-2">
      <img src={icon} alt="User Icon" className="w-[24px] h-[24px] object-contain" />
      <p className="text-sm text-gray-600">{title}</p>
    </div>
    {/* Value on the opposite side */}
    <p className="text-[16px] font-semibold text-gray-900">{value}</p>
  </div>
</div>



  );
};

export default UserCard;