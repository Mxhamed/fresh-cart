import { Link } from "react-router-dom";
import { useWishlist } from "./useWishlist";
import HeartOutlineIcon from "../../icons/HeartOutlineIcon";

function WishlistItemsCount() {
  const { wishlist, isPending, error } = useWishlist();

  const itemCount = wishlist?.count || 0;
  const shouldShowBadge = !isPending && !error && itemCount > 0;

  return (
    <Link
      className="Icon-w-Badge"
      to="/wishlist"
      aria-label="Open Your Wishlist">
      <HeartOutlineIcon />
      {shouldShowBadge && <span className="badge">{itemCount}</span>}
    </Link>
  );
}

export default WishlistItemsCount;
