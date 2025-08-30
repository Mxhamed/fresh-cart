import { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import UserCircleIcon from "../../icons/UserCircleIcon";
import ExitIcon from "../../icons/ExitIcon";

function UserDetails() {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const { name, email, logout } = useUser();
  const navigate = useNavigate();

  // Event Handlers
  const closeDropdown = useCallback(() => {
    setIsOpened(false);
  }, []);
  const toggleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);
  const handleSignOut = useCallback(() => {
    logout();
    navigate("/");
    closeDropdown();
  }, [logout, navigate, closeDropdown]);

  // Close Dropdown when Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpened, closeDropdown]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpened) return;

      if (event.key === "Escape") {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };

    if (isOpened) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpened, closeDropdown]);

  return (
    <div className="UserDetails">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        aria-label="Open user menu"
        aria-expanded={isOpened}
        aria-haspopup="true"
        type="button">
        <UserCircleIcon />
      </button>

      <div
        ref={dropdownRef}
        className={`UserDetailsMenu ${isOpened ? "active" : ""}`}
        role="menu"
        aria-label="User menu">
        <header role="banner">
          <p>{name}</p>
          <p className="one-liner">{email}</p>
        </header>

        <footer>
          <button
            onClick={handleSignOut}
            className="text-n-icon"
            role="menuitem"
            type="button">
            <span>Sign Out</span>
            <ExitIcon />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default UserDetails;
