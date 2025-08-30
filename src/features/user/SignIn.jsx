import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "./user.api";

// Notifications & Feedback
import toast from "react-hot-toast";
import LoaderIcon from "../../icons/LoaderIcon";

// Icons
import EmailAtIcon from "../../icons/form/EmailAtIcon";
import PasswordIcon from "../../icons/form/PasswordIcon";
import EyeOutlineIcon from "../../icons/form/EyeOutlineIcon";
import EyeSolidIcon from "../../icons/form/EyeSolidIcon";

const toastMessages = [
  "Welcome back! Great to see you again 👋",
  "Successfully signed in! Let's pick up where you left off 🎊",
  "You're in! Time to continue your journey ✨",
  "Login successful! We've missed you 💫",
];

const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email address",
  },
};

const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Invalid password",
  },
  validate: {
    validPassword: (value) => {
      // At least One Lowercase, Uppercase, Number, and Special Char
      const hasRequired =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);
      return hasRequired || "Invalid password";
    },
  },
};

function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  // Focus First Input Field on Mount
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  });
  const { login } = useUser();
  const navigate = useNavigate();

  // Handle Submit Logic
  const onSubmit = async (formData) => {
    const res = await mutateAsync(formData);

    // Guard Clause
    if (!res) return;
    login(res);

    navigate("/");
    reset();

    const index = Math.floor(Math.random() * 4);
    toast.success(toastMessages.at(index));
  };

  return (
    <div className="SignUpIn SignIn container-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="input-group">
          <div className="group">
            <input
              type="email"
              id="email"
              {...register("email", emailValidation)}
              autoComplete="email"
              placeholder=""
              defaultValue="mohtam@yahoo.com"
            />
            <label htmlFor="email" className="text-n-icon">
              <EmailAtIcon />
              <span>Email</span>
            </label>
          </div>
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="input-group">
          <div className="group pass">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              {...register("password", passwordValidation)}
              autoComplete="new-password"
              placeholder=""
              defaultValue="Moh@1234"
            />

            <label htmlFor="password" className="text-n-icon">
              <PasswordIcon />
              <span>Password</span>
            </label>

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsPasswordVisible((prev) => !prev);
              }}
              className={`eye ${isPasswordVisible ? "active" : ""}`}>
              <EyeOutlineIcon />
              <EyeSolidIcon />
            </button>
          </div>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button
          disabled={isSubmitting || isPending}
          className="text-n-icon btn btn-accent">
          {isSubmitting ? (
            <>
              <LoaderIcon />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>

        <p className="already">
          Fresh face around here?{" "}
          <Link to="/signup">Create your account now</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
