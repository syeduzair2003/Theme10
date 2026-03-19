"use client";
import { apiAddComment } from "@/apis/offers";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface RatingProps {
  offer_id: string;
  company_id: string;
}

const Rating = ({ offer_id, company_id }: RatingProps) => {
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

  const handleRate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasRated) {
      toast.error("You have already rated please try again later!", { autoClose: 2000 });
      return;
    }
    handleSubmit();
    localStorage.setItem(`hasRated_${offer_id}`, new Date().getTime().toString());
    setHasRated(true);
  };

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!rating && !comment.trim()) {
      toast.error("Please select a rating or add a comment.", { autoClose: 2000 });
      return;
    }

    setLoading(true);

    try {
      const response = await apiAddComment(offer_id, company_id, comment, rating.toString());
      
      if (response.status == "success") {
        toast.success("Thank you for your feedback!", { autoClose: 2000 });
        setRating(0);
        setComment("");
      } else {
        toast.error("An error occurred. Please try again later!", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("An error occurred while submitting feedback.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="align-items-center">
      <div className="d-flex align-items-center gap-1">
        <form onSubmit={handleRate} autoComplete="off">
          <ToastContainer />
          <div className="row gy-4">
            <div className="col-sm-12 col-xs-12">
              <ul className="star-rating" style={{ display: "flex", gap: "5px" }}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <li
                    key={index}
                    className={`star-rating__item font-20 ${index <= rating ? "active-star" : ""}`}
                    style={{
                      cursor: "pointer",
                      color: index <= rating ? "#ffc107" : "#ccc",
                      transition: "color 0.3s",
                    }}
                    onClick={() => handleStarClick(index)}
                  >
                    <i className="fas fa-star" />
                  </li>
                ))}
              </ul>
              <span className="star-rating__text text-body">{rating || "Select Rating"}</span>
            </div>
            <div className="col-sm-12 col-xs-12">
              <label htmlFor="comment" className="form-label mb-2 font-18 font-heading fw-600">
                Add a Comment
              </label>
              <textarea
                className="common-input stylish-textarea"
                id="comment"
                placeholder="Add your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  color: "#333",
                  resize: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  outline: "none",
                }}
              />
            </div>
            <div className="col-sm-12 text-center">
              <button type="submit" className="btn btn-main btn-lg pill mt-4" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rating;