import { Link, NavLink } from "react-router-dom";
import shoppingCartImage from "../assets/shopping-cart.png";
import AuthOrUserMenu from "./AuthOrUserMenu";
import HamburgerMenu from "./HamburgerMenu";

function Header() {
  return (
    <header className="Header">
      <div className="container-lg flex-between">
        <Link to="/" className="logo text-n-icon">
          <img src={shoppingCartImage} alt="Page Logo" className="icon-lg" />
          <span>FreshCart</span>
        </Link>

        <ul className="pages">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/brands">Brands</NavLink>
          </li>
          <li>
            <NavLink to="/categories">Categories</NavLink>
          </li>
        </ul>

        {/* Either Display (Register & Sign In Buttons) OR (Wishlist, Cart & User Details Menu) */}
        <AuthOrUserMenu />

        {/* For Small Screens */}
        <HamburgerMenu />
      </div>
    </header>
  );
}

export default Header;
