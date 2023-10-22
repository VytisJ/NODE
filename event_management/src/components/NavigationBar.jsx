import { Link } from "react-router-dom";
import { topNavigationItems } from "../routes/routes";
import "./NavigationBar.scss";

const NavigationBar = () => {
  return (
    <header className="navigation-header">
      <img src="" alt="logo" className="navigation-logo" />
      <nav>
        {topNavigationItems.map((navItem) => (
          <Link
            key={navItem.path}
            to={navItem.path}
            className="navigation-item"
          >
            {navItem.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default NavigationBar;
