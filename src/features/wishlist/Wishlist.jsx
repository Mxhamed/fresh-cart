import { useWishlist } from "./useWishlist";

// Mutations
import { useUser } from "../../context/UserContext";
import { useAddProductToCart } from "../cart/useAddProductToCart";
import { useRemoveProductFromWishlist } from "./useRemoveProductFromWishlist";

import Preloader from "../../ui/PreLoader";

import LoaderIcon from "../../icons/LoaderIcon";
import CartIcon from "../../icons/CartIcon";
import TrashIcon from "../../icons/TrashIcon";
import EmptyWishlist from "./EmptyWishlist";

export default function Wishlist() {
  const { name } = useUser();
  const firstName = name.slice(0, name.indexOf(" "));

  const { wishlist, isPending } = useWishlist();

  if (isPending) return <Preloader />;

  const { count } = wishlist;
  if (count === 0) return <EmptyWishlist />;

  const wishlistData = wishlist.data;

  return (
    <div className="List container-md">
      <h2>{firstName} Wishlist</h2>

      {wishlistData.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function WishlistItem({ item }) {
  const { id, title, price, imageCover: image } = item;

  // Mutations -> Removing From Wishlist / Adding to Cart
  const { userToken } = useUser();
  const { mutate: remove, isPending: isRemoving } =
    useRemoveProductFromWishlist();
  const { mutate: add, isPending: isAdding } = useAddProductToCart();

  return (
    <div className="WishlistItem">
      <img src={image} alt={title} />

      <div>
        <p>
          <span className="title">
            {title
              .split(" ")
              .slice(0, import.meta.env.VITE_MAX_TITLE_WORD_COUNT)
              .join(" ")}
          </span>
          <span className="price">{price} EGP</span>
        </p>
      </div>

      <button
        onClick={() => remove({ token: userToken, productId: id })}
        disabled={isRemoving}
        className="text-n-icon remove"
        aria-label="Remove From Wishlist">
        <TrashIcon />
      </button>

      <button
        onClick={() => add({ token: userToken, productId: id })}
        disabled={isAdding}
        className="text-n-icon btn btn-primary">
        {isAdding ? (
          <LoaderIcon />
        ) : (
          <>
            <CartIcon />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
}
