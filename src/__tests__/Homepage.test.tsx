import { cleanup } from "@testing-library/react";
import { shallow } from "enzyme";
import Homepage from "../pages/Homepage";

afterEach(cleanup);

describe("<Filter />", () => {
  it("render correctly", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper).toMatchSnapshot();
  });
});
