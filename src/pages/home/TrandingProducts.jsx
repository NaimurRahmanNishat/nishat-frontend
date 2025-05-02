// import React, { useState } from "react";
// import products from "../../data/products.json";
// import ProductCards from "../shop/ProductCards";

// const TrandingProducts = () => {
//   const [visiableProducts, setVisiableProducts] = useState(8);
//   const loadMoreProducts = () => {
//     setVisiableProducts((precount) => precount + 4);
//   };

//   return (
//     <main className="container mx-auto px-2">
//       <section className="mt-20">
//         <h2 className="text-center text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">Trending Products</h2>
//         <p className="text-center pt-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-800">
//           Discover the Hottest Picks: Elevate Your Style with Our Curated
//           Collection of Trending Women's Fashion Products.
//         </p>
//         {/* product cards */}
//         <div className="pt-20">
//           <ProductCards products={products.slice(0, visiableProducts)} />
//         </div>
//         {/* load more btn */}
//         <div className="flex items-center justify-center pt-8 pb-20">
//           {visiableProducts < products.length && (
//             <button onClick={loadMoreProducts} className="py-2 hover:scale-110 duration-300 px-4 border rounded-md cursor-pointer bg-gradient-to-r from-pink-600 to-blue-800 text-white">
//               Load More
//             </button>
//           )}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default TrandingProducts;





import React, { useState } from "react";
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "@/redux/features/products/products";

const TrendingProducts = () => {
  // State to track how many products are visible initially
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Function to load more products by increasing visible count
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  // Fetching products from the API using Redux Toolkit query
  const {data: productData = {},isLoading,error} = useFetchAllProductsQuery({});
  // console.log(productData);

  // Extract products safely; if undefined, default to an empty array
  const products = productData?.data?.products || [];
  // console.log("Total Products:", products.length);
  // console.log("Visible Products:", visibleProducts);

  // Display a loading message while data is being fetched
  if (isLoading) return <p className="text-center text-xl">Loading...</p>;

  // Handle API error
  if (error)
    return (
      <p className="text-center text-xl text-red-600">
        Error loading products.
      </p>
    );

  return (
    <main className="container mx-auto px-2">
      <section className="mt-20">
        {/* Section title */}
        <h2 className="text-center text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-800">
          Trending Products
        </h2>
        <p className="text-center pt-2 text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-800">
          Discover the Hottest Picks: Elevate Your Style with Our Curated
          Collection of Trending Women's Fashion Products.
        </p>

        {/* Product Cards */}
        <div className="pt-20">
          <ProductCards products={products.slice(0, visibleProducts)} />
        </div>

        {/* Load More Button */}
        <div className="flex items-center justify-center pt-8 pb-20">
          {visibleProducts < products.length && (
            <button
              onClick={loadMoreProducts}
              className="py-2 hover:scale-110 duration-300 px-4 border rounded-md cursor-pointer bg-gradient-to-r from-pink-600 to-blue-800 text-white"
            >
              Load More
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default TrendingProducts;
