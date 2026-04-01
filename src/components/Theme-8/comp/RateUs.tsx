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
    const [hover, setHover] = useState<number>(0);

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
        setRating(index + 1);
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
        <div className="w-full">
            <ToastContainer />
            <form onSubmit={handleRate} autoComplete="off" className="space-y-6">
                
                {/* Header & Stars Section */}
                <div className="space-y-3">
                    <h4 className="text-slate-900 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Rate This Product
                    </h4>
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => handleStarClick(index)}
                                        onMouseEnter={() => setHover(starValue)}
                                        onMouseLeave={() => setHover(0)}
                                        className="transition-transform duration-200 hover:scale-125 focus:outline-none"
                                    >
                                        <FontAwesomeIcon
                                            icon={(hover || rating) > index ? filledStar : emptyStar}
                                            className={`text-2xl transition-colors duration-200 ${
                                                (hover || rating) > index ? 'text-amber-400' : 'text-slate-200'
                                            }`}
                                            style={{ width: '24px', height: '24px' }}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                            {rating ? `${rating} Star${rating > 1 ? 's' : ''} Selected` : "Click to rate"}
                        </span>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-3">
                    <label htmlFor="comment" className="text-slate-900 font-black text-sm uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Quick Comment
                    </label>
                    <textarea
                        id="comment"
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                        placeholder="What's your experience?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                {/* <button 
                    type="submit" 
                    disabled={loading || (hasRated && rating === 0)}
                    className="group relative w-full overflow-hidden bg-slate-900 !text-white font-black py-4 rounded-xl transition-all hover:!bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                        {loading ? (
                            <div className="w-4 h-4 border-2 !text-white border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            "Submit Review"
                        )}
                    </span>
                </button> */}
                <button 
                    type="submit" 
                    disabled={loading || (hasRated && rating === 0)}
                    className="group relative w-full overflow-hidden bg-slate-900 rounded-xl transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200 py-4"
                >
                    {/* Background overlay for smooth color transition */}
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <span className="relative z-10 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] !text-white">
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <span className="!text-white">Submit Review</span>
                        )}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default RateUs;