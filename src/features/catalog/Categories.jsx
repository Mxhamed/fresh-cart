import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "./catalog.api";
import Preloader from "../../ui/PreLoader";

export default function Categories({ isHomePage = false }) {
  const { data: categories, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,

    staleTime: 24 * 60 * 60 * 1000, // 1 Day
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 3,
  });

  if (isPending) return <Preloader />;

  // If it will be Displayed in the Homepage -> Take First Few Items ONLY
  const categoriesList = isHomePage
    ? categories.slice(0, +import.meta.env.VITE_HOME_CATEGORIES_COUNT)
    : categories;

  return (
    <div className={`List ${isHomePage ? "" : "container-md"}`}>
      <h2>{isHomePage ? "FEATURED" : "ALL"} CATEGORIES</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {categoriesList?.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

function Category({ category: { name, image } }) {
  return (
    <div className="col">
      <div className="Category card" tabIndex={0}>
        <figure>
          <img src={image} alt={name} decoding="async" loading="lazy" />
        </figure>
        <figcaption>{name}</figcaption>
      </div>
    </div>
  );
}
