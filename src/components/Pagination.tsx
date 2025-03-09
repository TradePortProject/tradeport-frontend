import React from 'react';

interface PaginationProps {
    pageNumber: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber, totalPages, onPageChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPage = Number(event.target.value);
        onPageChange(selectedPage);
    };

    return (
        <div className="pagination">
            <select
                className="px-4 py-2 border rounded"
                value={pageNumber}
                onChange={handleChange}
            >
                {Array.from({ length: totalPages }, (_, index) => (
                    <option key={index} value={index + 1}>
                        Page {index + 1}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Pagination;
