import Link from 'next/link';
import React from 'react'
interface Props {
    heading: string;
    tags: string[];
}
const TagsSidebar = async ({ heading, tags }: Props) => {
    return (
        <aside className="sidebar-box marT20 p-3 rounded-3 shadow-sm b-seventh m-0">
            <h4 className="sidebar-heading marB15 fw-bold capital">{heading}</h4>
            <ul className="sidebar-list list-unstyled m-0 p-0">
                {tags?.map((tag, idx) => {
                    return (
                        <li
                            key={idx}
                            className={`sidebar-item mb-2`}
                        >
                            <Link
                                href={`/search?query=${tag}`}
                                className="sidebar-link d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
                            >
                                <span className="text-capitalize">{tag}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    )
}

export default TagsSidebar
