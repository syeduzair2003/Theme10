"use client"
import Script from 'next/script'
import React, { useState } from 'react'

const LoaderScripts = () => {
    const [jqueryLoaded, setJqueryLoaded] = useState(false)

    return (
        <>
            <Script
                src="https://code.jquery.com/jquery-3.6.0.min.js"
                strategy="afterInteractive"
                onLoad={() => setJqueryLoaded(true)}
            />
            {jqueryLoaded && (
                <Script
                    id="preloader-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            $("#preloader").delay(300).animate({
                            "opacity": "0"
                            }, 500, function () {
                                $("#preloader").css("display", "none");
                            });
                        `,
                    }}
                />
            )}
        </>
    )
}

export default LoaderScripts
