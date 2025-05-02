import React from "react";

const Features = () => {
  return (
    <main className="container mx-auto px-4 py-10">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <span className="text-red-600 text-4xl mb-3">
            <i className="ri-truck-line"></i>
          </span>
          <h4 className="text-lg font-semibold mb-2">Free Delivery</h4>
          <p className="text-gray-600">
            Offers convenience and the ability to shop from anywhere, anytime.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <span className="text-red-600 text-4xl mb-3">
            <i className="ri-money-dollar-circle-line"></i>
          </span>
          <h4 className="text-lg font-semibold mb-2">100% Money Back Guarantee</h4>
          <p className="text-gray-600">
            E-commerce has a review system where customers can share feedback.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <span className="text-red-600 text-4xl mb-3">
            <i className="ri-user-voice-fill"></i>
          </span>
          <h4 className="text-lg font-semibold mb-2">Strong Support</h4>
          <p className="text-gray-600">
            Offer customer support services to assist customers with queries and issues.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Features;

