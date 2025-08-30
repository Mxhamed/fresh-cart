import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "./useProducts";
import { useWishlist } from "../wishlist/useWishlist";

// Mutations
import { useUser } from "../../context/UserContext";
import { useAddProductToCart } from "../cart/useAddProductToCart";
import { useAddProductToWishlist } from "../wishlist/useAddProductToWishlist";
import { useRemoveProductFromWishlist } from "../wishlist/useRemoveProductFromWishlist";

import Preloader from "../../ui/PreLoader";

// Icons
import StarIcon from "../../icons/StarIcon";
import HeartOutlineIcon from "../../icons/HeartOutlineIcon";
import HeartIcon from "../../icons/HeartIcon";
import LoaderIcon from "../../icons/LoaderIcon";
import toast from "react-hot-toast";

export default function ProductList({ isHomePage = false }) {
  const { data, isPending } = useProducts();

  if (isPending) return <Preloader />;

  // If it will be Displayed in the Homepage -> Take First Few Items ONLY
  const products = isHomePage
    ? data.slice(0, +import.meta.env.VITE_HOME_PRODUCTS_COUNT)
    : data;

  return (
    <div className={`List ${isHomePage ? "" : "container-md"}`}>
      <h2>{isHomePage ? "FEATURED" : "ALL"} PRODUCTS</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isHomePage={isHomePage}
          />
        ))}
      </div>
    </div>
  );
}

const toastMessages = [
  "Please sign in to save items to your collection 👤",
  "We need to know it's you! Sign in to save items 🔐",
  "Let's get you signed in first to continue shopping 🛒",
  "Quick sign in required to add to your collection! ⚡",
];

function ProductItem({ product }) {
  const {
    id,
    images: [image],
    category: { name: category },
    brand: { name: brand },
    title,
    price,
    priceAfterDiscount,
    ratingsAverage,
    quantity,
  } = product;

  // Solid Heart if the Item is in the Wishlist
  const { wishlist: data, isPending: isLoadingWishlist } = useWishlist();
  const wishlist = data?.data; // Extracting Wishlist Data
  let isInWishlist = wishlist?.some((item) => item.id === id);

  // Mutations
  const { userToken } = useUser();
  const navigate = useNavigate();

  // Cart
  const { mutate: addToCart, isPending: isAddingToCart } =
    useAddProductToCart();

  // Wishlist
  const { mutate: addToWl, isPending: isAddingToWl } =
    useAddProductToWishlist();
  const { mutate: removeFromWl, isPending: isRemovingFromWl } =
    useRemoveProductFromWishlist();
  const isMutatingWl = isAddingToWl || isRemovingFromWl || isLoadingWishlist;

  const handleHeartClick = () => {
    isInWishlist
      ? removeFromWl({ token: userToken, productId: id })
      : addToWl({ token: userToken, productId: id });
  };

  const handleCartAddition = () => {
    // ONLY Add if User Token Exists
    if (userToken) {
      addToCart({ token: userToken, productId: id });
      return;
    }

    // ELse Redirect to Sign In Page
    const index = Math.floor(Math.random() * 4);
    toast.error(toastMessages.at(index));
    navigate("signin");
  };

  return (
    <div className="col">
      <div className="ProductItem card">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            width={660}
            height={900}
            loading="lazy"
            decoding="async"
          />
        </Link>

        <div className="body">
          <p className="title one-liner">{title}</p>

          <p className="category one-liner">
            {category} / {brand}
          </p>

          <div className="price-n-rating flex-between">
            <p className="price">
              {priceAfterDiscount && <span>{priceAfterDiscount} EGP</span>}
              {priceAfterDiscount ? (
                <del>{price} EGP</del>
              ) : (
                <span>{price} EGP</span>
              )}
            </p>

            <p className="rating text-n-icon">
              <StarIcon />
              <span>{ratingsAverage}</span>
            </p>
          </div>
        </div>

        <div className="operations flex-between">
          <button
            onClick={handleCartAddition}
            disabled={isAddingToCart}
            className="btn btn-primary">
            Add to Cart
          </button>

          {userToken && (
            <button
              onClick={handleHeartClick}
              disabled={isMutatingWl}
              className={`wishlist ${isInWishlist ? "active" : ""}`}>
              {isMutatingWl ? (
                <LoaderIcon />
              ) : (
                <>
                  <HeartIcon />
                  <HeartOutlineIcon />
                </>
              )}
            </button>
          )}
        </div>

        <span className={`quantity ${quantity <= 100 ? "little" : ""}`}>
          In Stock ({quantity})
        </span>
      </div>
    </div>
  );
}
