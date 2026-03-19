"use client";
import React, { useState } from "react";
import { apiSubscribeNewsletter } from "@/apis/page_optimization";
import { toast } from "react-toastify";
import Image from "next/image";
import { faPaperPlane, FontAwesomeIcon } from "@/constants/icons";

interface Props {
  companyId: string;
}

const Newsletter = ({ companyId }: Props) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      const response = await apiSubscribeNewsletter(companyId, email);

      if (response?.message === "Subscribed successfully") {
        toast.success("Thank you for subscribing!", { autoClose: 2000 });
        setEmail("");
      } else {
        toast.error("You have already subscribed to our newsletter.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="trv-subscribe-nl trv-full-bx py-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between px-4">
          <div className="trv-left-section mb-3 mb-md-0">
            <div className="trv-nl-large-text">
              <span>Subscribe</span> Now!
            </div>
            <div className="trv-nl-title">
              Sign up to searing weekly newsletter to get the latest updates.
            </div>
          </div>

          <div className="trv-nl-section">
            <form onSubmit={handleSubmit}>
              <div className="ftr-nw-form">
                <input
                  name="news-letter"
                  className="form-control"
                  placeholder="Email address..."
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                  <button type="submit" className="ftr-nw-subcribe-btn d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faPaperPlane} style={{ width: '16px', height: '16px', color: 'white' }}/>
                  </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Newsletter;
