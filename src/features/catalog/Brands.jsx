import Preloader from "../../ui/PreLoader";
import useBrands from "./useBrands";

export default function Brands() {
  const { brands, isPending } = useBrands();

  if (isPending) return <Preloader />;

  return (
    <div className="List container-md">
      <h2>ALL BRANDS</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {brands?.map((brand) => (
          <Brand key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function Brand({ brand: { name, image } }) {
  return (
    <div className="col">
      <div className="Brand card" tabIndex={0}>
        <figure>
          <img src={image} alt={name} decoding="async" loading="lazy" />
        </figure>
        <figcaption>{name}</figcaption>
      </div>
    </div>
  );
}
