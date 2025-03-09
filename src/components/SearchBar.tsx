import React from 'react';

interface SearchBarProps {
    searchText: string;
    onSearchChange: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearchChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
                style={{ width: '500px' }} 
            />
        </div>
    );
};

export default SearchBar;
