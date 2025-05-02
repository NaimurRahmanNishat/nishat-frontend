import { Button } from "@/components/ui/button";
import React from "react";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>
      {/* category filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>
      {/* color filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Colors</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              value={color}
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>
      {/* price range filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={`${range.min}-${range.max}`} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>
      {/* clears filter */}
      <div className="pb-10">
        <Button
          className="cursor-pointer bg-primaryDark"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default ShopFiltering;

