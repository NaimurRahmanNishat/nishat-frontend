import React, { useState, useEffect } from 'react';
import Asus from "../../assets/categories/laptop.jpg";

const DealsSection = () => {
  // Set the initial countdown target date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14); 
  targetDate.setHours(targetDate.getHours() + 20);
  targetDate.setMinutes(targetDate.getMinutes() + 15);
  targetDate.setSeconds(targetDate.getSeconds() + 5);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="container mx-auto px-4 pb-20">
      <section className="flex flex-col md:flex-row bg-gray-200 p-4 rounded-md items-center gap-6">
        {/* Image Section (Left Side) */}
        <div className="w-full md:w-1/2">
          <img src={Asus} alt="laptop" className="w-full rounded-lg shadow-md" />
        </div>

        {/* Text Section (Right Side) */}
        <div className="w-full md:w-1/2">
          <h5 className="text-red-500 text-lg font-semibold">Get Up To 20% Discount</h5>
          <h4 className="text-2xl font-bold">Deals Of This Month</h4>
          <p className="text-gray-600 mt-2">
            Our Women's Fashion Deals of the Month are here to make your style
            dreams a reality without breaking the bank. Discover a curated
            collection of exquisite clothing, accessories, and footwear, all
            handpicked to elevate your wardrobe.
          </p>
          <div className="deals__countdown flex gap-4 mt-4">
            {/* Dynamic countdown */}
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="deals__countdown__card text-center p-2 border rounded-md shadow-md">
                <h4 className="text-xl font-bold">{item.value}</h4>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default DealsSection;
