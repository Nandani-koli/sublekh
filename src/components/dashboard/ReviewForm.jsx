'use client'
import { getSubDomainData, saveReview } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ReviewForm = ({ domain }) => {

    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [data, setData] = useState([]);
    const [logoPreview, setLogoPreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSpace = async () => {
        const { success, space } = await getSubDomainData(domain)
  
        if (success) {
          setData(space);
          setLogoPreview(space.logo);
          setLoading(false)
        }
        else{
            setLoading(false)
        }
      };
  
      if (domain) {
        fetchSpace();
      }
    }, [domain]);
  
    const onSubmit = async (formData) => {
      setIsSubmitting(true);
  
      try {
        const reviewData = {
          ...formData,
          domain,
          rating,
        };
  
        const response = await saveReview(reviewData);
  
        if (response.success) {
          alert("Review submitted successfully!");
          reset();
          setRating(0); 
        } else {
          alert("Failed to submit review: " + response.message);
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };


  return (
    <>
    
    {data?.length == 0 && !loading ? <div className="text-black">Domain not found</div> 
    :
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
    {/* Logo */}
    {logoPreview && (
      <div className="flex justify-center">
        <img src={logoPreview} alt="Logo" className="w-32 h-32 object-cover rounded-md" />
      </div>
    )}

    {/* Heading */}
    {data?.heading && (
      <h2 className="text-2xl font-bold text-center text-black">{data?.heading}</h2>
    )}

    {/* Message */}
    {data?.message && <p className="text-center text-black">{data?.message}</p>}

    {/* Questions */}
    <div>
      <label className="block text-sm font-large text-gray-700">
        Your review can include answers to the below questions.
      </label>
      {data?.questions?.map((q, index) => (
        <div key={index} className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {q.id} - {q.question}
          </label>
        </div>
      ))}
    </div>

    {/* Star Rating */}
    <div className="flex justify-center space-x-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const ratingValue = i + 1;
        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer ${
              ratingValue <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <path d="M12 3l1.55 4.53L18 9l-3.9 2.85L15.1 16 12 12.9 8.9 16 9.9 11.9 6 9l4.45-.47L12 3z" />
          </svg>
        );
      })}
      <p className="ml-2 text-gray-700">{rating} out of 5 stars</p>
    </div>

    {/* Write a Review */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Write a Review</label>
      <textarea
        className="w-full mt-2 text-black p-2 border border-gray-300 rounded-lg"
        {...register("review", { required: true })}
      ></textarea>
    </div>

    {/* Extra Info */}
    {data?.extraInfo?.includes("name") && (
      <div className="mt-4">
        <label className="block text-black text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full mt-1 text-black p-2 border border-gray-300 rounded-lg"
          {...register("name")}
        />
      </div>
    )}
    {data?.extraInfo?.includes("email") && (
      <div className="mt-4">
        <label className="block text-black text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full mt-1 text-black p-2 border border-gray-300 rounded-lg"
          {...register("email")}
        />
      </div>
    )}
    {data?.extraInfo?.includes("social") && (
      <div className="mt-4">
        <label className="block text-black text-sm font-medium">Social Link</label>
        <input
          type="text"
          className="w-full mt-1 text-black p-2 border border-gray-300 rounded-lg"
          {...register("social")}
        />
      </div>
    )}
    {data?.extraInfo?.includes("number") && (
      <div className="mt-4">
        <label className="block text-black text-sm font-medium">Phone Number</label>
        <input
          type="text"
          className="w-full mt-1 text-black p-2 border border-gray-300 rounded-lg"
          {...register("number")}
        />
      </div>
    )}

    {/* Submit Button */}
    <div className="mt-4">
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg w-full ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  </form>
    
    
}
    </>
  );
};

export default ReviewForm;
