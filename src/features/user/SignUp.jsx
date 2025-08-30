import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "./user.api";

// Notifications & Feedback
import toast from "react-hot-toast";
import LoaderIcon from "../../icons/LoaderIcon";

// Icons
import FullNameIcon from "../../icons/form/FullNameIcon";
import PhoneIcon from "../../icons/form/PhoneIcon";
import EmailAtIcon from "../../icons/form/EmailAtIcon";
import PasswordIcon from "../../icons/form/PasswordIcon";
import EyeOutlineIcon from "../../icons/form/EyeOutlineIcon";
import EyeSolidIcon from "../../icons/form/EyeSolidIcon";
import RePasswordIcon from "../../icons/form/RePasswordIcon";

const toastMessages = [
  "Welcome aboard! Your account has been created successfully 🎉",
  "You're all set! Welcome to our community 🌟",
  "Account created! Let the adventures begin 🚀",
  "Registration complete! Ready to explore? 🎯",
];

// Full Name Validation
const fullNameValidation = {
  required: "Full name is required",
  minLength: {
    value: 2,
    message: "Full name must be at least 2 characters long",
  },
  maxLength: {
    value: 50,
    message: "Full name must not exceed 50 characters",
  },
  validate: {
    hasValidCharacters: (value) =>
      /^[a-zA-Z\s'-]+$/.test(value) ||
      "Full name can only contain letters, spaces, hyphens, and apostrophes",
    hasAtLeastTwoWords: (value) =>
      value.trim().split(/\s+/).length >= 2 ||
      "Please enter both first and last name",
    noExcessiveSpaces: (value) =>
      !/\s{2,}/.test(value) || "Please remove extra spaces",
    startsWithLetter: (value) =>
      /^[a-zA-Z]/.test(value) || "Full name must start with a letter",
  },
};

// (Egyptian) Phone Number Validation
const phoneValidation = {
  required: "Phone number is required",
  validate: {
    validEgyptianFormat: (value) => {
      // MUST be Exactly 11 Digits, NO Other Characters Allowed
      return (
        /^01[0125][0-9]{8}$/.test(value) ||
        "Phone number must be 11 digits starting with 010, 011, 012, or 015"
      );
    },

    onlyDigits: (value) => {
      return /^\d+$/.test(value) || "Phone number must contain only digits";
    },

    notAllSameDigit: (value) => {
      // Check if ALL Digits are the Same
      return (
        !/^(\d)\1+$/.test(value) || "Phone number cannot be all the same digit"
      );
    },
  },
};

// Email Validation
const emailValidation = {
  required: "Email is required",
  maxLength: {
    value: 254,
    message: "Email must not exceed 254 characters",
  },
  validate: {
    validFormat: (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
      "Please enter a valid email address",
    noConsecutiveDots: (value) =>
      !/\.{2,}/.test(value) || "Email cannot contain consecutive dots",
    validLocalPart: (value) => {
      const localPart = value.split("@")[0];
      return (
        (localPart && localPart.length <= 64) ||
        "Email local part must not exceed 64 characters"
      );
    },
    validDomain: (value) => {
      const parts = value.split("@");
      if (parts.length !== 2) return "Invalid email format";
      const domain = parts[1];
      return (
        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain) ||
        "Please enter a valid domain"
      );
    },
    noStartEndDot: (value) =>
      !/^\.|\.$|@\.|\.@/.test(value) ||
      "Email cannot start or end with a dot, or have dots around @",
  },
};

// Password Validation
const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  validate: {
    hasLowercase: (value) =>
      /[a-z]/.test(value) ||
      "Password must contain at least one lowercase letter",
    hasUppercase: (value) =>
      /[A-Z]/.test(value) ||
      "Password must contain at least one uppercase letter",
    hasNumber: (value) =>
      /\d/.test(value) || "Password must contain at least one number",
    hasSpecialChar: (value) =>
      /[@$!%*?&]/.test(value) ||
      "Password must contain at least one special character (@$!%*?&)",
  },
};

function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  // Focus First Input Field on Mount
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  // Confirm Password Validation
  const validateRePassword = (rePassword) => {
    // Skip Validation if Password Field has Errors
    if (errors.password) return true;

    const currentPassword = getValues("password");

    // Skip Validation if Password is Empty
    if (!currentPassword) return true;

    // ONLY Validate Match if Password is Valid
    return rePassword === currentPassword || "Passwords MUST Match";
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
  });
  const navigate = useNavigate();

  // Handle Submit Logic
  const onSubmit = async (formData) => {
    const res = await mutateAsync(formData);

    if (res) {
      navigate("/signin");
      reset();

      const index = Math.floor(Math.random() * 4);
      toast.success(toastMessages.at(index));
    }
  };

  return (
    <div className="SignUpIn container-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="input-group">
          <div className="group">
            <input
              type="text"
              id="name"
              {...register("name", fullNameValidation)}
              autoComplete="name"
              placeholder=""
            />
            <label htmlFor="name" className="text-n-icon">
              <FullNameIcon />
              <span>Full Name</span>
            </label>
          </div>
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="input-group">
          <div className="group">
            <input
              type="tel"
              id="phone"
              {...register("phone", phoneValidation)}
              autoComplete="tel"
              placeholder=""
            />
            <label htmlFor="phone" className="text-n-icon">
              <PhoneIcon />
              <span>Phone Number</span>
            </label>
          </div>
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div className="input-group">
          <div className="group">
            <input
              type="email"
              id="email"
              {...register("email", emailValidation)}
              autoComplete="email"
              placeholder=""
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
          <div className="group">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              {...register("password", passwordValidation)}
              autoComplete="new-password"
              placeholder=""
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

        {/* Confirm Password */}
        <div className="input-group">
          <div className="group">
            <input
              type="password"
              id="rePassword"
              {...register("rePassword", {
                required: "Please confirm your password",
                validate: validateRePassword,
              })}
              autoComplete="new-password"
              placeholder=""
            />
            <label htmlFor="rePassword" className="text-n-icon">
              <RePasswordIcon />
              <span>Confirm Password</span>
            </label>
          </div>
          {errors.rePassword && <p>{errors.rePassword.message}</p>}
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
          Already part of the FreshCart family?{" "}
          <Link to="/signin">Jump back in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
