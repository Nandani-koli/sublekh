'use client';

import { fetchReviewsBySpaceId } from "@/lib/actions";
import { useEffect, useState } from "react";

const Reviews = ({ spaceId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      try {
        const { success, reviews, message } = await fetchReviewsBySpaceId(spaceId); // Fetch reviews by spaceId

        if (success) {
          setReviews(reviews);
        } else {
          setError(message || "Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("An error occurred while fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (spaceId) {
      fetchReviews();
    }
  }, [spaceId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-center text-gray-500">No reviews available for this space.</p>;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center text-black">User Reviews</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center space-x-2 mb-2">
              {/* Rating Stars */}
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3l1.55 4.53L18 9l-3.9 2.85L15.1 16 12 12.9 8.9 16 9.9 11.9 6 9l4.45-.47L12 3z" />
                </svg>
              ))}
              <span className="text-sm text-gray-700">({review.rating}/5)</span>
            </div>

            {/* Review Text */}
            <p className="text-gray-800">{review.review}</p>

            {/* Reviewer Information */}
            <div className="mt-2 text-sm text-gray-500">
              {review.name && <p><strong>Name:</strong> {review.name}</p>}
              {review.email && <p><strong>Email:</strong> {review.email}</p>}
              {review.social && <p><strong>Social:</strong> {review.social}</p>}
              {review.number && <p><strong>Phone:</strong> {review.number}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
