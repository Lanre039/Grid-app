import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { UserData } from "../context/types";
import userData from "../data/user.json";
import "./navbar.scss";

function Navbar() {
  const { user, login, logout } = useContext(AuthContext);

  const loginUser = () => login(userData as UserData);
  const logOutUser = () => logout();

  const handleClick = () => {
    if (user) {
      logOutUser();
    } else {
      loginUser();
    }
  };
  return (
    <nav className="nav">
      <div className="nav_content container">
        <h1>SHAPES</h1>
        <h1 className="nav_text-right" onClick={handleClick}>
          {user ? "Logout" : "Login"}
        </h1>
      </div>
    </nav>
  );
}

export default Navbar;
