import React from "react";

const products = [
  {
    img: "https://images.unsplash.com/photo-1698512475067-74ed7c956c8d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Timeless Elegance",
    title: "Mastering the Art of Capsule Wardrobes",
    date: "12th August 2022",
  },
  {
    img: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Summer Breeze",
    title: "Unveiling the Hottest Beachwear Trends",
    date: "18th January 2023",
  },
  {
    img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Power Dressing",
    title: "Navigating the World of Women's Tailoring",
    date: "5th January 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "New York Times",
    title: "The World's Best Fashion Fair 2025",
    date: "25th May 2025",
  },
];

const Blogs = () => {
  return (
    <main className="container mx-auto px-2 pb-20">
      <section className="px-4 py-12 md:px-8 lg:px-16 xl:px-24 bg-gray-200 rounded-sm pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Latest From Blog
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Elevate your wardrobe with our freshest style tips, trends, and
          inspiration on our blog.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((blog, index) => (
            <div
              key={index}
              className="cursor-pointer hover:scale-105 transition-transform duration-300 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h6 className="text-sm text-gray-500">{blog.category}</h6>
                <h4 className="text-lg font-semibold mt-1">{blog.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Blogs;
