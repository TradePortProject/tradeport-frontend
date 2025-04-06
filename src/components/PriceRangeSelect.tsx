import React from 'react';

interface PriceRange {
    label: string;
    min: number;
    max: number;
}

interface PriceRangeSelectProps {
    priceRanges: PriceRange[];
    selectedPriceRange?: string;
    selectedPrice?: string; // Added for backward compatibility
    onChange: (selectedPriceRange: string) => void;
}

const PriceRangeSelect: React.FC<PriceRangeSelectProps> = ({ priceRanges, selectedPriceRange, selectedPrice, onChange }) => {
    // Use selectedPriceRange if provided, otherwise fall back to selectedPrice
    const selectedValue = selectedPriceRange || selectedPrice || priceRanges[0].label;
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = event.target.value;
        onChange(selectedLabel);
    };

    return (
        <div className="price-range-select">
            <select
                value={selectedValue}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
            >
                {priceRanges.map((priceRange) => (
                    <option key={priceRange.label} value={priceRange.label}>
                        {priceRange.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PriceRangeSelect;
