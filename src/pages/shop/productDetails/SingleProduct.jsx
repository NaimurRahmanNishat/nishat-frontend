import React from "react";
import Loading from "@/components/Loading";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { useFetchProductbyIdQuery } from "@/redux/features/products/products";
import { Link, useParams } from "react-router";
import ReviewsCard from "../reviews/ReviewsCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  // id distructure
  const { id } = useParams();
  // console.log("product Id: ",id);

  const {data: { data: productDetails } = {}, isLoading, error } = useFetchProductbyIdQuery(id); // pass id
  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error to load product Deatails.
      </div>
    );

  // distructure single product details and review
  const { product, reviews } = productDetails || {};

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <main className="pt-20 container mx-auto px-4">
      {/* bannar section */}
      <section className="bg-primaryLight rounded py-8 mt-5">
        <h2 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-yellow-600">
          Single Product Page
        </h2>
        <div className="text-center mt-5 font-semibold text-xl space-x-1">
          <span className="hover:text-pink-600">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-pink-600 text-green-600">
            <Link to="/shop">shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-pink-600 text-violet-600">
            {product?.name}
          </span>
        </div>
      </section>
      {/* product details and show page */}
      <section className="mt-8 m-auto px-2 py-5">
        <div className="flex flex-col md:flex-row gap-8">
          {/* product image left side */}
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt=""
              className="rounded-md w-full h-auto"
            />
          </div>
          {/* product name and all details right side */}
          <div className="w-full md:w-1/2">
            {/* product name */}
            <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {product?.name}
            </h3>
            {/* product price */}
            <p className="text-xl mb-4 font-semibold text-slate-500">
              ${product?.price}
              {product?.oldPrice && (
                <s className="px-8">${product?.oldPrice}</s>
              )}
            </p>
            {/* product description */}
            <p className="text-gray-500 mb-4">{product?.description}</p>
            {/* product additional information */}
            <div className="flex flex-col space-y-2 font-medium text-slate-600">
              <p className="capitalize">
                <strong>Category: </strong>
                {product?.category}
              </p>
              <p className="capitalize">
                <strong>Colors: </strong>
                {product?.color}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStars rating={product?.rating} />
              </div>
            </div>
            {/* Add to cart button */}
            <div className="pt-5">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
                className="bg-transparent cursor-pointer hover:scale-110 bg-gradient-to-r from-violet-600 to-yellow-600"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* review section */}
      <section>
        <ReviewsCard productReviews={reviews} />
      </section>
      {/* cart modal open */}
    </main>
  );
};

export default SingleProduct;
