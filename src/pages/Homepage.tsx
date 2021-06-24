import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./homepage.scss";
import shapes from "../data/items.json";
import Card from "../components/Card";
import Filters from "../components/Filters";
import { FilterOption, Items } from "./types";

function Homepage(): JSX.Element {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOption[]>([]);
  const [gridTitle, setGridTItle] = useState<string>("");

  useEffect(() => {
    const data = renderShapes(shapes);
    setItems(data);
  }, []);

  // RENDER ITEMS
  const renderShapes = (data: Items[]): JSX.Element[] =>
    data.map(({ shape, color }, index) => (
      <Card key={index} shape={shape} color={color} />
    ));

  // DESELECT EXISTING FILTERS
  const deselectFilters = (data: FilterOption): FilterOption[] => {
    const { shape: itemShape = "", color: itemColor = "", category } = data;

    const isDublicate = activeFilter.find(
      ({ shape, color }) => shape === itemShape || color === itemColor
    );

    if (isDublicate) {
      const items =
        category === "shapes"
          ? activeFilter.filter(({ shape }) => shape !== itemShape)
          : activeFilter.filter(({ color }) => color !== itemColor);
      setActiveFilter(items);
      return items;
    }

    const filterItem = [...activeFilter, data];
    setActiveFilter(filterItem);
    return filterItem;
  };

  // const handleGridTitle = (shape: string[], color: string[]) => {
  //   const
  //   if ()

  // }

  const selectItemByFilters = (filterItem: FilterOption[]): Items[] => {
    let filtered: Items[] = shapes;

    const shapeFilters = filterItem
      .filter(({ category }) => category === "shapes")
      .map(({ shape }) => shape);

    const colorFilters = filterItem
      .filter(({ category }) => category === "color")
      .map(({ color }) => color);

    if (shapeFilters.length) {
      filtered = shapes.filter(({ shape }) => shapeFilters.includes(shape));
      console.log(filtered);
    }

    if (colorFilters.length) {
      filtered = filtered.filter(({ color }) => colorFilters.includes(color));
    }

    return filtered;
  };

  const handleFilters = (filterOption: FilterOption): void => {
    const filterItem = deselectFilters(filterOption);

    const filteredItems = selectItemByFilters(filterItem);

    const result = renderShapes(filteredItems);

    setItems(result);
  };

  return (
    <div>
      <Navbar />
      <section className="filter container">
        <h2 className="filter_text-1">Filters</h2>
        <p className="filter_text-2">Shapes</p>
        <Filters filter="shapes" handleFilters={handleFilters} />

        <div className="shapes">
          <p className="filter_text-2">Colors</p>
          <Filters filter="color" handleFilters={handleFilters} />
        </div>
      </section>
      <section className="main container">
        <h2 className="filter_text-1">
          All {`${gridTitle ?? ""}`} items. <span>{`(${items.length})`}</span>
        </h2>
        <div className="main_container">{items}</div>
      </section>
    </div>
  );
}

export default Homepage;
