import React, { useState, useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import UserImage from '../../images/cards/user.png'
import MoneyPouch from '../../images/cards/money-pouch.png'
import GreenSuccess from '../../images/cards/green-success.png'
import OrangeSuccess from '../../images/cards/orange-success.png'
import Chart from '../../images/cards/chart.png'
import fetchAnalyticsData from '../../api/FetchAnalytic';
import Loader from "../../common/Loader";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [analyticData, setAnalyticData] = React.useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchAnalyticsData();
      setAnalyticData(data)
      setLoading(false);
      console.log(data);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
        <h2 className='text-[23px] font-bold text-black mb-[18px]'>User Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] xl:grid-cols-3">
        <CardDataStats title="Total Users" total={analyticData ? analyticData?.totalUsers : "N/A"} img={UserImage} />
        <CardDataStats title="Active GSPs" total={analyticData ? analyticData?.activeSIPs : "N/A"} img={OrangeSuccess} />
        <CardDataStats title="Completed GSPs" total={analyticData ? analyticData?.completedSIPs : "N/A"} img={GreenSuccess} />
        <CardDataStats title="Total Payment" total={analyticData ? analyticData?.totalPayments?.amount.toFixed(2) : "N/A"} img={MoneyPouch} />
        {/* <CardDataStats title="Missed Payments" total={analyticData?.missedPayments ? analyticData.missedPayments : "N/A"} img={Warning} /> */}
        <CardDataStats title="Total Gold Accumulated" total={analyticData ? analyticData?.totalGoldAccumulated.toFixed(2) : "N/A"} img={Chart} />
      </div>
    </>
  );
};

export default Dashboard;

{/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
<ChartOne />
<ChartTwo />
<ChartThree />
<MapOne />
<div className="col-span-12 xl:col-span-8">
  <TableOne />
</div>
<ChatCard />
</div> */}
