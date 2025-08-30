import { useVerifyToken } from "../features/user/useVerifyToken";

import { Navigate, Outlet } from "react-router-dom";

import Preloader from "./PreLoader";
import toast from "react-hot-toast";
import { useEffect } from "react";

const toastMessages = [
  "No need to sign in - you're already here! 🎉",
  "You're already signed in! Ready to continue? 🚀",
  "Welcome back! But you're already logged in 😊",
  "All set! You're already authenticated ✅",
];

function RedirectRoute() {
  const { isValid, isPending } = useVerifyToken();

  useEffect(() => {
    if (isValid) {
      const index = Math.floor(Math.random() * 4);
      toast.error(toastMessages.at(index), {
        id: "alreadySignedIn",
      });
    }
  }, [isValid]);

  // While Loading Show Preloader
  if (isPending) return <Preloader />;

  // If Token is Valid AND Exists -> Deny Access
  if (isValid) return <Navigate to="/" replace />;

  // If Token Does NOT Exist OR Token is Invalid  -> Grant Access to Sign In/Sign Out
  return <Outlet />;
}

export default RedirectRoute;
