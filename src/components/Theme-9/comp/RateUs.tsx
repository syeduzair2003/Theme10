"use client";
import { apiAddComment } from "@/apis/offers";
import { emptyStar, filledStar, FontAwesomeIcon } from "@/constants/icons";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface RatingProps {
  offer_id: string;
  company_id: string;
}

const RateUs = ({ offer_id, company_id }: RatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    const lastRated = localStorage.getItem(`hasRated_${offer_id}`);
    if (lastRated && new Date().getTime() - parseInt(lastRated) < 86400000) {
      setHasRated(true);
    }
  }, [offer_id]);

  const handleStarClick = (index: number) => {
    if (hasRated) return;
    setRating(index + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasRated) {
      toast.error("You have already rated. Please try again later!", {
        autoClose: 2000,
      });
      return;
    }

    if (!rating && !comment.trim()) {
      toast.error("Please select a rating or add a comment.", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await apiAddComment(
        offer_id,
        company_id,
        comment,
        rating.toString(),
      );

      if (response.status === "success") {
        toast.success("Thank you for your feedback!", { autoClose: 2000 });
        localStorage.setItem(
          `hasRated_${offer_id}`,
          new Date().getTime().toString(),
        );
        setHasRated(true);
        setRating(0);
        setComment("");
      } else {
        toast.error("An error occurred. Please try again later!");
      }
    } catch (error) {
      toast.error("An error occurred while submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-left">
      <ToastContainer />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">
            Rate Your Experience
          </h4>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={hasRated}
                  onClick={() => handleStarClick(index)}
                  className={`transition-all duration-200 transform ${!hasRated && "hover:scale-125 active:scale-95"}`}
                >
                  <FontAwesomeIcon
                    icon={index < rating ? filledStar : emptyStar}
                    className={`w-5 h-5 ${
                      index < rating ? "text-[#800000]" : "text-black/10"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-[10px] font-bold text-[#800000] uppercase tracking-wider">
              {rating ? `${rating} Star${rating > 1 ? "s" : ""}` : "Pick stars"}
            </span>
          </div>
        </div>

        {/* Comment Section */}
        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="text-[11px] font-black text-black uppercase tracking-[0.2em]"
          >
            Your Review
          </label>
          <textarea
            id="comment"
            disabled={hasRated}
            placeholder={
              hasRated
                ? "Feedback already submitted"
                : "Tell us what you think..."
            }
            className="w-full min-h-[100px] p-4 bg-[#FDFBF7] border border-black/10 rounded-xl text-sm text-black placeholder:text-black/30 focus:ring-2 focus:ring-[#800000]/20 focus:border-[#800000] outline-none transition-all resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || hasRated}
          className={`w-full py-4 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center justify-center gap-2
            ${
              hasRated
                ? "bg-black/5 text-black/40 cursor-not-allowed"
                : "bg-black text-[#FDFBF7] hover:bg-[#800000] active:scale-[0.98]"
            }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-[#FDFBF7]/30 border-t-[#FDFBF7] rounded-full animate-spin" />
          ) : hasRated ? (
            "Feedback Sent"
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default RateUs;
