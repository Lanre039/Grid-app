import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./homepage.scss";
import shapes from "../data/items.json";
import Card from "../components/Card";
import Filters from "../components/Filters";
import { FilterOption, Items, Track } from "./types";

function Homepage(): JSX.Element {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOption[]>([]);
  const [gridTitleTrack, setGridTitleTrack] = useState<Track>({
    shape: 0,
    color: 0,
  });

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
  // SET ACTIVE FILTERS
  // SET FILTER TRACK
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

      const track =
        category === "shapes"
          ? { shape: gridTitleTrack.shape - 1, color: gridTitleTrack.color }
          : { shape: gridTitleTrack.shape, color: gridTitleTrack.color - 1 };
      setGridTitleTrack(track);

      return items;
    }

    const filterItem = [...activeFilter, data];
    setActiveFilter(filterItem);

    const track =
      category === "shapes"
        ? { shape: gridTitleTrack.shape + 1, color: gridTitleTrack.color }
        : { shape: gridTitleTrack.shape, color: gridTitleTrack.color + 1 };
    setGridTitleTrack(track);

    return filterItem;
  };

  // RENDER GRID TITLE
  const renderGridTitle = () => {
    const noOfColors = 6;
    const noOfShapes = 5;
    let title = "All items";
    let item = [];

    switch (true) {
      case gridTitleTrack.color === noOfColors &&
        gridTitleTrack.shape === noOfShapes:
        return <GridTitle title={title} />;

      case gridTitleTrack.color === 0 && gridTitleTrack.shape === 1:
      case gridTitleTrack.color === noOfColors && gridTitleTrack.shape === 1:
        item = activeFilter.filter(({ shape }) => !!shape);
        title = `All ${item[0].shape} items`;
        return <GridTitle title={title} />;

      case gridTitleTrack.color === 1 && gridTitleTrack.shape === 0:
      case gridTitleTrack.color === 1 && gridTitleTrack.shape === noOfShapes:
        item = activeFilter.filter(({ color }) => !!color);
        title = `All ${item[0].color} items`;
        return <GridTitle title={title} />;

      case gridTitleTrack.color === 0 && gridTitleTrack.shape > 1:
      case gridTitleTrack.color > 1 && gridTitleTrack.shape > 1:
        title = "Multiple items";
        return <GridTitle title={title} />;

      case gridTitleTrack.color === 1 && gridTitleTrack.shape > 1:
        item = activeFilter.filter(({ color }) => !!color);
        title = `Multiple ${item[0].color} items`;
        return <GridTitle title={title} />;

      case gridTitleTrack.color > 1 && gridTitleTrack.shape === 1:
        item = activeFilter.filter(({ shape }) => !!shape);
        title = `Multiple ${item[0].shape} items`;
        return <GridTitle title={title} />;

      case gridTitleTrack.color === 1 && gridTitleTrack.shape === 1:
        item = activeFilter.filter(({ shape }) => !!shape);
        const item2 = activeFilter.filter(({ color }) => !!color);
        title = `${item2[0].color}  ${item[0].shape} items`;
        return <GridTitle title={title} />;

      default:
        return <GridTitle title={title} />;
    }
  };

  // FILTER ITEM BY SHAPE OR COLOUR
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
    }

    if (colorFilters.length) {
      filtered = filtered.filter(({ color }) => colorFilters.includes(color));
    }

    return filtered;
  };

  // SET DISPLAY ITEMS
  const handleFilters = (filterOption: FilterOption): void => {
    const filterItem = deselectFilters(filterOption);

    const filteredItems = selectItemByFilters(filterItem);

    const result = renderShapes(filteredItems);

    setItems(result);
  };

  const GridTitle = ({ title }: { title: string }) => (
    <>
      <h2 className="filter_text-1">
        {title} <span>{`(${items.length})`}</span>
      </h2>
      <span className="main_container">{items}</span>
    </>
  );

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
      <section className="main container">{renderGridTitle()}</section>
    </div>
  );
}

export default Homepage;
