import { cleanup } from "@testing-library/react";
import { shallow } from "enzyme";
import Card from "../components/Card";

afterEach(cleanup);

const renderCard = (shape: string, color: string) =>
  shallow(<Card shape={shape} color={color} />);

describe("<Card />", () => {
  it("render correctly", () => {
    const wrapper = renderCard("rectangle", "red");
    expect(wrapper).toMatchSnapshot();
  });

  it("should include color class when the shape is triangle", () => {
    const wrapper = renderCard("triangle", "red");
    expect(wrapper.find(".triangle")).toBeTruthy();
    expect(wrapper.find("triangle red")).toBeTruthy();
  });
});
