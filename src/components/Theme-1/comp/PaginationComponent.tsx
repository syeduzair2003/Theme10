"use client";

import { PaginationType } from "@/services/dataTypes";
import Link from "next/link";
import React from "react";
import { Pagination } from "react-bootstrap";

interface Props {
    pagination: PaginationType;
}

const PaginationComponent = ({ pagination }: Props) => {
    return (
        <div>
            <Pagination size="lg" className="mt-3 d-flex justify-content-center">
                {/* First Page */}
                <Pagination.First
                    disabled={pagination.current_page === 1}
                    as={Link}
                    href={`?page=1`}
                />

                {/* Previous Page */}
                <Pagination.Prev
                    disabled={!pagination.prev_page}
                    as={Link}
                    href={`?page=${pagination.prev_page || 1}`}
                />

                {[...Array(pagination.last_page)].map((page, index) => {
                    if (index < 2 || index > pagination.last_page - 2 || (index > pagination.current_page - 2 && index < pagination.current_page + 2)) {
                        return (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === pagination.current_page}
                                as={Link}
                                href={`?page=${index + 1}`}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    }
                })}
                {/* Next Page */}
                <Pagination.Next
                    disabled={!pagination.next_page}
                    as={Link}
                    href={`?page=${pagination.next_page || pagination.last_page}`}
                />

                {/* Last Page */}
                <Pagination.Last
                    disabled={pagination.current_page === pagination.last_page}
                    as={Link}
                    href={`?page=${pagination.last_page}`}
                />
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
