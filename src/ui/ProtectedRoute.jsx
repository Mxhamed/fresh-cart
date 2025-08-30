import { Navigate, Outlet } from "react-router-dom";
import { useVerifyToken } from "../features/user/useVerifyToken";
import Preloader from "./PreLoader";
import toast from "react-hot-toast";
import { useEffect } from "react";

const toastMessages = [
  "Your login session expired. Let's get you signed in again 🔒",
  "Please sign in to access this content 👤",
  "Session timeout! Let's get you re-authenticated ⏰",
  "We need to verify it's you first. Please sign in! 🔐",
];

function ProtectedRoute() {
  const { isValid, isPending } = useVerifyToken();

  useEffect(() => {
    if (!isPending && !isValid) {
      const index = Math.floor(Math.random() * 4);
      toast.error(toastMessages.at(index), {
        id: "invalidToken",
      });
    }
  }, [isValid, isPending]);

  // While Loading Show Preloader
  if (isPending) return <Preloader />;

  // If Token Does NOT Exist OR Token is Invalid -> Redirect to Sign In Page
  if (!isValid) return <Navigate to="/signin" replace />;

  // Else -> Grant Access to App
  return <Outlet />;
}

export default ProtectedRoute;
