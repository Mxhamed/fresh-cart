import { useCart } from "./useCart";
import { useUser } from "../../context/UserContext";
import { useClearAllCartItems } from "./useClearAllCartItems";
import { useUpdateProductCartQuantity } from "./useUpdateProductCartQuantity";
import { useRemoveProductFromCart } from "./useRemoveProductFromCart";

import EmptyCart from "./EmptyCart";

import Preloader from "../../ui/PreLoader";
import TrashIcon from "../../icons/TrashIcon";
import LoaderIcon from "../../icons/LoaderIcon";
import MinusIcon from "../../icons/MinusIcon";
import PlusIcon from "../../icons/PlusIcon";

export default function Cart() {
  const { name, userToken } = useUser();
  const firstName = name.slice(0, name.indexOf(" "));

  const { cart, isPending } = useCart();
  const { mutate } = useClearAllCartItems();

  if (isPending) return <Preloader />;

  const { numOfCartItems } = cart;

  if (numOfCartItems === 0) return <EmptyCart />;

  const cartList = cart.data.products;

  const { price: totalPrice, count: totalCount } = cartList.reduce(
    (acc, cur) => {
      const newPrice = cur.count * cur.price + acc.price;
      const newCount = acc.count + cur.count;

      return { price: newPrice, count: newCount };
    },
    { price: 0, count: 0 }
  );

  return (
    <div className="Cart List container-md">
      <h2>{firstName} Cart</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
        {cartList.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <div className="Statistics">
        <p>
          <span>Total Count:</span>
          <span>{totalCount}</span>
        </p>

        <p>
          <span>Total Price:</span>
          <span>{totalPrice} EGP</span>
        </p>

        <p>
          <span>Delivery:</span>
          <span>Free</span>
        </p>

        <p>
          <span>Total:</span>
          <span>{totalPrice} EGP</span>
        </p>
      </div>

      <button
        onClick={() => mutate(userToken)}
        className="clear btn btn-secondary">
        Clear All
      </button>
    </div>
  );
}

function CartItem({ item }) {
  const {
    product: { id, title, imageCover: image },
    price,
    count,
  } = item;

  const { userToken } = useUser();
  const { mutate: remove, isPending: isRemoving } = useRemoveProductFromCart();
  const { mutate: update, isPending: isUpdating } =
    useUpdateProductCartQuantity();

  const isMutating = isRemoving || isUpdating;

  const handleMinusClick = () => {
    count === 1
      ? remove({ token: userToken, productId: id })
      : update({ token: userToken, productId: id, quantity: count - 1 });
  };

  return (
    <div className="col">
      <div className="CartItem">
        <figure>
          <img src={image} alt={title} />
        </figure>

        <div className="details">
          <p className="title">
            {title
              .split(" ")
              .slice(0, import.meta.env.VITE_MAX_TITLE_WORD_COUNT)
              .join(" ")}
          </p>

          <span className="price">{price * count} EGP</span>

          <div className="update">
            <button
              onClick={handleMinusClick}
              disabled={isMutating}
              aria-label="Decrease Product's Quantity"
              className="minus btn">
              <MinusIcon />
            </button>

            <span>{count}</span>

            <button
              onClick={() =>
                update({ token: userToken, productId: id, quantity: count + 1 })
              }
              disabled={isMutating}
              aria-label="Increase Product's Quantity"
              className="plus btn btn-primary">
              <PlusIcon />
            </button>
          </div>
        </div>

        <button
          onClick={() => remove({ token: userToken, productId: id })}
          disabled={isRemoving}
          aria-label="Remove from Cart"
          className="del">
          {isRemoving ? <LoaderIcon /> : <TrashIcon />}
        </button>
      </div>
    </div>
  );
}
