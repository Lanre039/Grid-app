import { cleanup } from "@testing-library/react";
import { mount } from "enzyme";
import { shallow } from "enzyme";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth";

afterEach(cleanup);

const auth = {
  user: null,
  login: jest.fn(),
  logout: jest.fn(),
};

describe("Navbar", () => {
  it("render correctly", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });

  it("login user", () => {
    const screen = mount(
      <AuthContext.Provider value={auth}>
        <Navbar />
      </AuthContext.Provider>
    );

    const loginBtn = screen.find(".nav_text-right");
    loginBtn.simulate("click");
    expect(auth.login).toHaveBeenCalledTimes(1);
  });
});
