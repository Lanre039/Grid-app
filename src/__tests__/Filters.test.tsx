import { cleanup } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import Filters from "../components/Filters";

afterEach(cleanup);

const props = {
  filter: "shapes",
  handleFilters: jest.fn(),
};

describe("<Filter />", () => {
  it("render correctly", () => {
    const wrapper = shallow(<Filters {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe("filter behaviour with shapes", () => {
    const noOfShapes = 5;
    const wrapper = mount(<Filters {...props} />);
    it("render number of span (shapes) to be 5", () => {
      const elements = wrapper.find("span");
      expect(elements.length).toBe(noOfShapes);
      expect(elements.at(0).text()).toBeTruthy();
    });

    it("span should have a text", () => {
      const elements = wrapper.find("span");
      expect(elements.at(0).text()).toBeTruthy();
    });

    it("add active to rounded shape after onClick event", () => {
      const shape = wrapper.find("span").first();

      expect(shape.html()).toBe(
        '<span class="filter_container-item filter_shape-inactive">rounded</span>'
      );

      shape.simulate("click");

      expect(props.handleFilters).toHaveBeenCalledTimes(1);

      expect(shape.html()).toBe(
        '<span class="filter_container-item filter_shape-active">rounded</span>'
      );
    });
  });

  describe("filter behaviour with color", () => {
    const noOfColors = 6;
    const wrapper = shallow(<Filters {...props} filter="color" />);

    it("render number of colors to be 6", () => {
      const elements = wrapper.find("span");

      expect(elements).toHaveLength(noOfColors);
    });

    it("span should NOT have a text", () => {
      const elements = wrapper.find("span");
      expect(elements.at(0).text()).toBeFalsy();
    });
  });
});
