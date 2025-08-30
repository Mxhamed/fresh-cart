import LoaderIcon from "../../icons/LoaderIcon";
import useBrands from "./useBrands";

function BrandsMarquee() {
  const { brands, isPending } = useBrands();

  const brandsList = brands?.slice(0, +import.meta.env.VITE_HOME_BRANDS_COUNT);

  return (
    <div
      className="marquee"
      style={{
        "--marquee-item-width": "140px",
        "--marquee-item-height": "100px",
        "--marquee-item-count": `${brandsList?.length}`,
        "--marquee-animation-duration": "48s",
      }}>
      {isPending ? (
        <LoaderIcon />
      ) : (
        <div className="list">
          {brandsList?.map((brand, i) => (
            <div key={brand._id} className="item" style={{ "--i": `${i + 1}` }}>
              <img src={brand.image} alt={brand.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrandsMarquee;
