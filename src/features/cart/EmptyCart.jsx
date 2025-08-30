import { Link } from "react-router-dom";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

export default function EmptyCart() {
  return (
    <div className="Empty container-md">
      <h2>Your Cart is Empty</h2>
      <p>
        Looks like you haven't added anything to your cart yet. Start shopping
        and discover amazing products!
      </p>

      <Link to="/products" className="btn btn-primary text-n-icon">
        <span>Start Shopping</span>
        <ArrowRightIcon />
      </Link>
    </div>
  );
}
