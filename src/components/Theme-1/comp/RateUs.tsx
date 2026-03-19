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
        setRating(index + 1); // Add 1 because array is 0-based
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
        <div className="align-items-center p-3">
            <h4 className="n17-color fw-bold fw-5">Rate This Product</h4>
            <div className="d-flex align-items-center gap-1">
                <form onSubmit={handleRate} autoComplete="off">
                    <ToastContainer />
                    <div className="row gy-4">
                        <div className="col-sm-12 col-xs-12">
                            <div className="rating" style={{ display: "flex", gap: "5px" }}>
                                {[...Array(5)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={index < rating ? filledStar : emptyStar}
                                        onClick={() => handleStarClick(index)}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '20px',
                                            transition: 'color 0.2s ease',
                                            color: index < rating ? '#FFD700' : '#ccc',
                                            width: '16px', height: '16px'
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-body">{rating ? `${rating} Star${rating > 1 ? 's' : ''}` : "Select Rating"}</span>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <label htmlFor="comment" className="form-label mb-1">
                                <h4 className="n17-color fw-bold fw-5">Add a Comment</h4>
                            </label>
                            <textarea
                                className="common-input stylish-textarea comment-textarea"
                                id="comment"
                                placeholder="Add your comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <div className="btn-area d-center justify-content-start gap-md-2">
                            <button type="submit" className="btn-get-deal">
                                <span className="fs-six text-nowrap">Submit</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RateUs;