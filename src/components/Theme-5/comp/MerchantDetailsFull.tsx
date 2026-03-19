import React from 'react'

interface Props {
    details: string
}

const MerchantDetailsFull = ({ details }: Props) => {
    return (
        <div className="relative group/details mt-[-4px]"> {/* Pulls text up to align with headers */}
            {/* Side Accent line that glows on parent hover */}
            <div className="prose prose-slate max-w-none">
                <p className="text-[15px] font-medium text-slate-500 leading-relaxed tracking-tight italic">
                    <span className="text-indigo-600 font-black not-italic uppercase text-[10px] tracking-[0.2em] block mb-2">
                        Overview —
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: details }} />
                </p>
            </div>
        </div>
    )
}

export default MerchantDetailsFull