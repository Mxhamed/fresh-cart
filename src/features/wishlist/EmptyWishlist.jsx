import { Link } from "react-router-dom";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function EmptyWishlist() {
  return (
    <div className="Empty container-md">
      <h2>Your Wishlist is Empty</h2>
      <p>
        Save your favorite items to your wishlist and never lose track of the
        products you love most.
      </p>

      <Link to="/products" className="btn btn-primary text-n-icon">
        <span>Start Shopping</span>
        <ArrowRightIcon />
      </Link>
    </div>
  );
}
