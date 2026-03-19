"use client";

import { faFacebook, faLinkedin, faTelegram, faTwitter, faWhatsapp, FontAwesomeIcon } from '@/constants/icons';
import Link from 'next/link';
import React from 'react';

interface Props {
    offerUrl: string;
    offerTitle: string;
    merchantHref: string;
    unique_id: string;
    domain: string;
}

const SocialMediaShare = ({ offerUrl, offerTitle, merchantHref, unique_id, domain }: Props) => {
    const finalDOmain = `https://${domain}`; // include protocol!

    const finalUrl = offerUrl?.startsWith("/") ? offerUrl : `/${offerUrl}`;

    // Full absolute URL
    const absoluteOutUrl = `${finalDOmain}${finalUrl}`;

    // Encode for FB sharer
    const encodedUrl = encodeURIComponent(absoluteOutUrl);

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            {/* Facebook */}
            <Link
                rel="nofollow sponsored noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                className="link"
                style={{ borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faFacebook} style={{ width: '16px', height: '16px', color: 'black' }} />
            </Link>

            {/* Twitter (X) */}
            <Link
                rel="nofollow sponsored noopener noreferrer"
                href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(offerTitle)}`}
                target="_blank"
                className="link"
                style={{ borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faTwitter} style={{ width: '16px', height: '16px', color: 'black' }} />
            </Link>

            {/* WhatsApp */}
            <Link
                rel="nofollow sponsored noopener noreferrer"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(offerTitle)}%20${encodedUrl}`}
                target="_blank"
                className="link"
                style={{ borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faWhatsapp} style={{ width: '16px', height: '16px', color: 'black' }} />
            </Link>

            {/* LinkedIn */}
            <Link
                rel="nofollow sponsored noopener noreferrer"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                className="link"
                style={{ borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faLinkedin} style={{ width: '16px', height: '16px', color: 'black' }} />
            </Link>

            {/* Telegram */}
            <Link
                rel="nofollow sponsored noopener noreferrer"
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(offerTitle)}`}
                target="_blank"
                className="link"
                style={{ borderRadius: '50%' }}
            >
                <FontAwesomeIcon icon={faTelegram} style={{ width: '16px', height: '16px', color: 'black' }} />
            </Link>
        </div>
    );
};

export default SocialMediaShare;
