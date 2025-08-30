import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSpecificProduct } from "./products.api";

// Mutations
import { useUser } from "../../context/UserContext";
import { useAddProductToCart } from "../cart/useAddProductToCart";
import { useWishlist } from "../wishlist/useWishlist";
import { useAddProductToWishlist } from "../wishlist/useAddProductToWishlist";
import { useRemoveProductFromWishlist } from "../wishlist/useRemoveProductFromWishlist";

// Pages & Custom Components
import Preloader from "../../ui/PreLoader";
import Carousel from "../../ui/Carousel";

// Icons
import LoaderIcon from "../../icons/LoaderIcon";
import HeartIcon from "../../icons/HeartIcon";
import HeartOutlineIcon from "../../icons/HeartOutlineIcon";
import StarIcon from "../../icons/StarIcon";

function ProductDetails() {
  const { productId } = useParams();

  const { data: product, isPending } = useQuery({
    queryKey: [`product_${productId}`],
    queryFn: () => getSpecificProduct(productId),

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,

    enabled: !!productId,
  });

  const {
    id,
    images,
    category,
    brand,
    title,
    price,
    priceAfterDiscount,
    ratingsAverage,
    quantity,
    description,
  } = product || {};

  // Solid Heart if the Item is in the Wishlist
  const { wishlist: data, isPending: isLoadingWishlist } = useWishlist();
  const wishlist = data?.data; // Extracting Wishlist Data
  let isInWishlist = wishlist?.some((item) => item.id === id);

  // Mutations
  const { userToken } = useUser();

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

  if (isPending) return <Preloader />;

  return (
    <div className="container-md">
      <div className="ProductItem details card">
        <figure>
          <Carousel initialSlide={0}>
            {images.map((img, i) => (
              <img
                src={img}
                alt={`${title} image ${i}`}
                key={i}
                width={660}
                height={900}
              />
            ))}
          </Carousel>
        </figure>

        <section>
          <div className="body">
            <p className="title">{title}</p>

            <p className="category">
              {category.name} / {brand.name}
            </p>

            <p className="description">{description}</p>

            <div className="bottom">
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
                onClick={() => addToCart({ token: userToken, productId: id })}
                disabled={isAddingToCart}
                className="btn btn-primary">
                Add to Cart
              </button>

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
            </div>
          </div>
        </section>

        <span className={`quantity ${quantity <= 100 ? "little" : ""}`}>
          In Stock ({quantity})
        </span>
      </div>
    </div>
  );
}

export default ProductDetails;
