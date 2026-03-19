"use client"
import { apiAddComment } from "@/apis/offers"
import { emptyStar, filledStar, FontAwesomeIcon } from "@/constants/icons"
import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

interface CommentSectionProps {
    offer_id: string
    company_id: string
}

const CommentSection = ({ offer_id, company_id }: CommentSectionProps) => {
    const [rating, setRating] = useState<number>(0)
    const [hover, setHover] = useState<number>(0)
    const [comment, setComment] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [hasRated, setHasRated] = useState(false)

    useEffect(() => {
        const lastRated = localStorage.getItem(`hasRated_${offer_id}`)
        if (lastRated && new Date().getTime() - parseInt(lastRated) < 86400000) {
            setHasRated(true)
        }
    }, [offer_id])

    const handleRate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (hasRated) {
            toast.error("You have already rated please try again later!", { autoClose: 2000 })
            return
        }
        handleSubmit()
        localStorage.setItem(`hasRated_${offer_id}`, new Date().getTime().toString())
        setHasRated(true)
    }

    const handleStarClick = (starValue: number) => {
        setRating(starValue)
    } 

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()

        if (!rating && !comment.trim()) {
            toast.error("Please select a rating or add a comment.", { autoClose: 2000 })
            return
        }

        setLoading(true)

        try {
            const response = await apiAddComment(offer_id, company_id, comment, rating.toString())

            if (response.status == "success") {
                toast.success("Thank you for your feedback!", { autoClose: 2000 })
                setRating(0)
                setComment("")
            } else {
                toast.error("An error occurred. Please try again later!", { autoClose: 2000 })
            }
        } catch (error) {
            toast.error("An error occurred while submitting feedback.", { autoClose: 2000 })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h2 className="text-lg font-black text-slate-900 mb-4">Rate This Product</h2>
            <form onSubmit={handleRate}>
                <div className="mb-4">
                    <div className="flex gap-2 mb-2" onMouseLeave={() => setHover(0)}>
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <FontAwesomeIcon
                                    key={index}
                                    icon={starValue <= (hover || rating) ? filledStar : emptyStar}
                                    onClick={() => handleStarClick(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    className="cursor-pointer transition-transform duration-150 hover:scale-110"
                                    style={{
                                        fontSize: '24px',
                                        color: starValue <= (hover || rating) ? '#FFD700' : '#CBD5E1', // slate-300
                                        width: '24px',
                                        height: '24px'
                                    }}
                                />
                            );
                        })}
                    </div>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        {rating ? `${rating} Star${rating > 1 ? 's' : ''}` : ""}
                    </span>
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-bold text-slate-900 mb-2">
                        Add a Comment
                    </label>
                    <textarea
                        name="comment"
                        id="comment"
                        placeholder="What did you think of the product?"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none bg-slate-50 placeholder:text-slate-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || !rating}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-sm font-bold px-4 py-3 rounded-xl transition-all duration-200 transform active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Submitting...
                        </span>
                    ) : "Submit Review"}
                </button>
            </form>
            <ToastContainer />
        </>
    )
}

export default CommentSection
