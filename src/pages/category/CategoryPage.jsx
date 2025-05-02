import React from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "@/redux/features/products/products";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const {data: productData={}, isLoading} = useFetchAllProductsQuery({});
  if(isLoading) return <p className="text-center text-xl">Loading...</p>;

  const {products, } = productData?.data || {};
  // console.log(products);

  const filteredProducts = products.filter(
    (product) => product.category === categoryName.toLowerCase()
  );

  return (
    <main className="pt-20 container mx-auto px-2">
      <section className="bg-primaryLight mt-10 w-full mx-auto py-8 px-1">
        <h2 className="section__header capitalize text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-800">
          {categoryName}
        </h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>
      {/* Product Cards */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </main>
  );
};

export default CategoryPage;

