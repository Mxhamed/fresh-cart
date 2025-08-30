import { Link } from "react-router-dom";
import { useCart } from "./useCart";
import CartIcon from "../../icons/CartIcon";

function CartItemsCount() {
  const { cart, isPending, error } = useCart();

  const itemCount = cart?.numOfCartItems || 0;
  const shouldShowBadge = !isPending && !error && itemCount > 0;

  return (
    <Link className="Icon-w-Badge" to="/cart" aria-label="Open Your Cart">
      <CartIcon />
      {shouldShowBadge && <span className="badge">{itemCount}</span>}
    </Link>
  );
}

export default CartItemsCount;
