import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useFetchProductbyIdQuery } from "../../../redux/features/products/products";
import { usePostAReviewMutation } from "../../../redux/features/reviews/reviewsApi";

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate(); // Get navigate function
  const [rating, setRating] = useState(0); // Add state for rating
  const [comment, setComment] = useState(""); // Add state for comment
  const { refetch } = useFetchProductbyIdQuery(id, { skip: !id }); // Fetch product details
  const { user } = useSelector((state) => state.auth); // Get user details
  const [postAReview] = usePostAReviewMutation(); // Correctly use the hook

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    // create a new review
    const newReview = { comment: comment, rating: rating, userId: user?._id, productId: id };

    // check if user is logged in
    if (!user) {
      alert("You must be logged in to post a review.");
      navigate("/login");
      return;
    }

    try {
      await postAReview(newReview).unwrap();
      alert("Review posted successfully!");
      setComment("");
      setRating(0);
      // refetch the product details
      refetch();
    } catch (error) {
      alert("Failed to post review!");
    }
    handleClose();
  };

  return (
    <main
      className={`fixed inset-0 ${
        isModalOpen ? "block" : "hidden"
      } bg-black/90 flex items-center justify-center z-40 px-2`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold mb-4">Post a Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-xl"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>
        {/* textarea for comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          className="w-full h-32 p-2 border rounded-md"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
          >
            <i className="ri-close-line"></i> Cancel
          </button>
          <button
            onClick={handleSubmitComment}
            className="px-4 py-2 bg-primary text-white rounded-md flex cursor-pointer items-center gap-2"
          >
            <i className="ri-check-line"></i> Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default PostAReview;
