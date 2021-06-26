import Adapter from "enzyme-adapter-react-16";
import { cleanup } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Filters from "../components/Filters";
import { FilterProps } from "../pages/types";

configure({ adapter: new Adapter() });
afterEach(cleanup);

const renderFilters = ({ filter, handleFilters }: FilterProps) =>
  shallow(<Filters filter={filter} handleFilters={handleFilters} />);

describe("<Filter />", () => {
  it("render correctly", () => {
    const wrapper = renderFilters({
      filter: "shapes",
      handleFilters: jest.fn(),
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe("filter behaviour with shapes", () => {
    const noOfShapes = 5;
    const wrapper = renderFilters({
      filter: "shapes",
      handleFilters: jest.fn(),
    });
    it("render number of shapes to be 5", () => {
      const elements = wrapper.find("span");
      expect(elements.length).toBe(noOfShapes);
    });
  });

  it("render number of colors to be 6", () => {
    const noOfColors = 6;
    const wrapper = renderFilters({
      filter: "color",
      handleFilters: jest.fn(),
    });
    const elements = wrapper.find("span");
    expect(elements.length).toBe(noOfColors);
  });
});
