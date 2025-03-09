import React from 'react';

interface PriceRange {
    label: string;
    min: number;
    max: number;
}

interface PriceRangeSelectProps {
    priceRanges: PriceRange[];
    selectedPriceRange: string;
    onChange: (selectedPriceRange: string) => void;
}

const PriceRangeSelect: React.FC<PriceRangeSelectProps> = ({ priceRanges, selectedPriceRange, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = event.target.value;
        onChange(selectedLabel);
    };

    return (
        <div className="price-range-select">
            <select
                value={selectedPriceRange}
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
