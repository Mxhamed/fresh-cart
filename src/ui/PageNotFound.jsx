import { Link, useNavigate } from "react-router-dom";

// Icons
import Four0FourIcon from "../icons/Four0FourIcon";
import HomeIcon from "../icons/HomeIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

function PageNotFound({ error }) {
  const navigate = useNavigate();

  return (
    <div className="PageNotFound container-md">
      <header className="flex-between">
        <button
          className="text-n-icon btn btn-secondary"
          onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          <span>Go Back</span>
        </button>

        <Link to="/" className="text-n-icon btn btn-primary">
          <span>Go Home</span>
          <HomeIcon />
        </Link>
      </header>

      <div className="body">
        <Four0FourIcon />
        <h2>Something Went Wrong...</h2>
        <h3>
          {error ? error.message : "We can’t find the page you’re looking for."}
        </h3>
      </div>
    </div>
  );
}

export default PageNotFound;
