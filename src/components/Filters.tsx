import React, { useState } from "react";
import items from "../data/items.json";
import { FilterOption, FilterProps } from "../pages/types";

function Filters(props: FilterProps) {
  const [activeColor, setActiveColor] = useState<string[]>([]);
  const [activeShape, setActiveShape] = useState<string[]>([]);
  const { filter, handleFilters } = props;

  // Color would serve as the filter control
  // Remove color dublicate here
  const colorFilterItem = Array.from(new Set(items.map(({ color }) => color)));

  const handleClick = (filter: string, { shape = "", color = "" }) => {
    if (color) {
      handleFilters({
        color,
        category: filter,
      } as FilterOption);

      // SET ACTIVE FILTER - COLOR
      if (activeColor.includes(color)) {
        const activeItems = activeColor.filter((item) => item !== color);
        setActiveColor(activeItems);
      } else {
        setActiveColor([...activeColor, color]);
      }
    }

    if (shape) {
      handleFilters({
        shape,
        category: filter,
      } as FilterOption);

      // SET ACTIVE FILTER - SHAPE
      if (activeShape.includes(shape)) {
        const activeItems = activeShape.filter((item) => item !== shape);
        setActiveShape(activeItems);
      } else {
        setActiveShape([...activeShape, shape]);
      }
    }
  };

  const renderByShape = () => {
    const shapeFilterItem = items.filter(
      ({ color }) => color === colorFilterItem[0]
    );

    return shapeFilterItem.map(({ shape }, index) => {
      const active = activeShape.includes(shape)
        ? "filter_shape-active"
        : "filter_shape-inactive";

      return (
        <span
          key={index}
          className={`filter_container-item ${active}`}
          onClick={() => handleClick(filter, { shape })}
        >
          {shape}
        </span>
      );
    });
  };
  const renderByColor = () =>
    colorFilterItem.map((color, index) => {
      const active = activeColor.includes(color)
        ? "filter_color-active"
        : "filter_color-inactive";

      return (
        <span
          key={index}
          className={`filter_container-shapes ${color} ${active}`}
          onClick={() => handleClick(filter, { color })}
        ></span>
      );
    });

  return (
    <div className="filter_container">
      {filter === "shapes" ? renderByShape() : renderByColor()}
    </div>
  );
}

export default Filters;
