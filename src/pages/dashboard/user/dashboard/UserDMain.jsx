import Loading from '@/components/Loading';
import { useGetUserStatsQuery } from '@/redux/features/stats/statsApi';
import React from 'react'
import { useSelector } from 'react-redux';
import UserStats from './UserStats';

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
    const {user} = useSelector((state) => state.auth);
    const {data:UserData, isLoading, error} = useGetUserStatsQuery(user?.email);
    if(isLoading) return <Loading/>
    if(error) return <div>Faild to fetch data</div>;
    const stats = UserData?.data;
    const {totalPayments, totalReviews, totalPurchasedProducts} = stats;   // rename data

    const data = {
        labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
        datasets: [
          {
            label: "User Stats",
            data: [totalPayments, totalReviews*10, totalPurchasedProducts*10],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                if(tooltipItem.label === "Total Payments"){
                    return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
                }
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            }
          },
        },
      };

  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
            <p className='text-gray-500'>Hi, {user?.username}! Welcome to your user dashboard</p>
        </div>
        <UserStats stats={stats}/>
        <div className='mb-6'>
            <Bar data = {data} options={options}/>
        </div>
    </div>
  )
}

export default UserDMain;
