import React from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  img: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  img
}) => {
  return (
    <div className="rounded-[10px] bg-white h-[134px] flex justify-between min-w-[323px]">
      <div className='pl-[25px] pt-[36px]'>
        <p className="text-base mb-[8px]">{title}</p>
        <h4 className="text-[28px] font-bold text-black dark:text-white">
          {total}
        </h4>
      </div>

      <div>
        <img src={img} alt="Description of image" style={{ width: 114, height: 134 }} />
      </div>
    </div>
  );
};

export default CardDataStats;
