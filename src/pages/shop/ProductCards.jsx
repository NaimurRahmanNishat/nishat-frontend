import React, { useState } from "react";
import RatingStars from "../../components/RatingStars";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {
  return (
    <div className="container mx-auto px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {products.length > 0 ?( products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))) : <div className="">No Products found</div>
        }
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shortDescription = product.description.slice(0, 50);
  const fullDescription = product.description;

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <a href={`/shop/${product._id}`}>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-48 md:h-56 lg:h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
        <div className="absolute top-3 right-3">
          <button onClick={() => handleAddToCart(product)} className="bg-primary cursor-pointer p-2 rounded-full text-white hover:bg-primary-dark transition-colors duration-300">
            <ShoppingCart className="hover:text-pink-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800">{product?.name}</h4>
        <p className="text-sm text-gray-600 mt-2">
          {showFullDescription ? fullDescription : shortDescription}...
          {!showFullDescription && (
          <button
            onClick={() => setShowFullDescription(true)}
            className="text-blue-500 text-sm mt-1 hover:underline cursor-pointer"
          >
            See More
          </button>
        )}
        </p>
        <div className="flex items-center mt-2">
          <p className="text-lg font-bold text-gray-900">${product?.price}</p>
          {product?.oldPrice && (
            <s className="text-sm text-gray-500 ml-2">${product?.oldPrice}</s>
          )}
        </div>
        <div className="mt-2">
          <RatingStars rating={product?.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
