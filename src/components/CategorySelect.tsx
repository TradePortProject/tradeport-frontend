import React from 'react';

interface Category {
    id: number;
    name: string;
}

interface CategorySelectProps {
    categories: Category[];
    selectedCategory: number;
    onChange: (selectedCategory: number) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ categories, selectedCategory, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        onChange(selectedId);
    };

    return (
        <div className="category-select">
            <select
                value={selectedCategory}
                onChange={handleChange}
                className="px-4 py-2 border rounded"
            >
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySelect;
