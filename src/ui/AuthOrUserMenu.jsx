import { NavLink } from "react-router-dom";
import { useVerifyToken } from "../features/user/useVerifyToken";

import CartItemsCount from "../features/cart/CartItemsCount";
import WishlistItemsCount from "../features/wishlist/WishlistItemsCount";
import UserDetails from "../features/user/UserDetails";

import LoaderIcon from "../icons/LoaderIcon";

function AuthOrUserMenu() {
  const { isValid, isPending } = useVerifyToken();

  // Loading Spinner While Verifying the Token
  if (isPending) return <LoaderIcon />;

  // Register + Sign In Buttons -> if Logged Out / Token NOT Valid
  if (!isValid)
    return (
      <div className="AuthOrUserMenu auth">
        <NavLink to="/signup">Register</NavLink>
        <span>/</span>
        <NavLink to="/signin">Sign In</NavLink>
      </div>
    );

  // Wishlist + Cart + Profile -> if Logged In / Token IS Valid
  return (
    <div className="AuthOrUserMenu menu">
      <WishlistItemsCount />

      <CartItemsCount />

      <UserDetails />
    </div>
  );
}

export default AuthOrUserMenu;
