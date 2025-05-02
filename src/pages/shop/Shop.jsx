import React, { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "@/redux/features/products/products";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

// all filter create
const filters = {
  categories: [
    "all",
    "mobile",
    "laptop",
    "furniture",
    "processor",
    "monitor",
    "motherboard",
  ],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 - $300", min: 10, max: 300 },
    { label: "$300 - $800", min: 300, max: 800 },
    { label: "$800 and above", min: 800, max: Infinity },
  ],
};

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  // distructure filter
  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const [productsPerPage] = useState(8);

  // api distructue for redux toolkit
  const {
    data: productsData = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  if (isLoading) return <Loading/>;
  if (error) return <p>{error}</p>;

  // data distructure for backend
  const { products, totalPage, totalProducts } = productsData?.data || {};
  // console.log(products);
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber);
    }
  };

  // clear all filter button
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
    });
  };

  // pagination setup
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <main className="container mx-auto px-2 pt-32">
      {/* shop header section */}
      <section className="py-12 rounded bg-primaryLight">
        <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-yellow-600">
          Shop Page
        </h2>
        <p className="pt-2 px-2 text-base text-center font-semibold text-slate-500">
          Discover the Hottest Picks: Elevate Your Style with Our Curated
          Collection of Trending Women's Fashion Products.
        </p>
      </section>
      {/* product show and category filter section */}
      <section className="pt-8">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* categories */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          {/* products grid */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />
            {/* pagingation */}
            {products.length > 0 && (
              <div className="mt-6 pb-5 flex justify-center items-center space-x-1">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="cursor-pointer"
                >
                  Previous
                </Button>
                {[...Array(totalPage)].map((_, index) => (
                  <Button
                    onClick={() => handlePageChange(index + 1)}
                    key={index}
                    className={`cursor-pointer ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  disabled={currentPage === totalPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="cursor-pointer"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;
