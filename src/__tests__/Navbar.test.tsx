import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Navbar from "../components/Navbar";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  it("render correctly", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
