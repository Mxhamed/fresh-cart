import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

import HamburgerMenuIcon from "../icons/HamburgerMenuIcon";
import CrossIcon from "../icons/CrossIcon";

function HamburgerMenu() {
  const { userToken } = useUser(); // Showing & Hiding -> Register & Sign In Links
  const timeoutRef = useRef(null); // For Cleaning Up

  // Opening / Closing the Aside
  const [isOpened, setIsOpened] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);
  const closeMenu = useCallback(() => {
    setIsOpened(false);
  }, []);

  // Handle Overlay Clicks with Event Delegation
  const asideRef = useRef(null);
  const handleOverlayClick = useCallback(
    (e) => {
      if (!asideRef.current?.contains(e.target)) {
        closeMenu();
      }
    },
    [closeMenu]
  );

  // Cleanup Timeout on Unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle Esc Key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpened) {
        closeMenu();
      }
    };

    if (isOpened) {
      document.addEventListener("keydown", handleEscape);
      // Prevent Body Scroll when Menu is Open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpened, closeMenu]);

  // Close Menu on Window Resize (with Debounce)
  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        // ONLY Close on larger Screens
        if (window.innerWidth > 752) {
          closeMenu();
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [closeMenu]);

  // Close Menu on Route Change (NavLinks Clicks)
  const location = useLocation();
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  return (
    <>
      <button
        className="HamburgerMenuBtn"
        onClick={toggleMenu}
        aria-controls="mobile-nav"
        aria-expanded={isOpened}
        aria-label="Toggle navigation menu">
        <HamburgerMenuIcon />
      </button>

      {createPortal(
        <div
          className={`AsideOverlay ${isOpened ? "active" : ""}`}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav">
          <aside
            ref={asideRef}
            className={`Aside ${isOpened ? "active" : ""}`}
            aria-label="Navigation menu">
            <header className="aside-header">
              <button
                className="HamburgerMenuBtn close-btn"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                type="button">
                <CrossIcon />
              </button>
            </header>

            <nav>
              <ul className="pages" id="mobile-nav" role="list">
                <li role="listitem">
                  <NavLink to="/" onClick={closeMenu}>
                    Home
                  </NavLink>
                </li>
                <li role="listitem">
                  <NavLink to="/products" onClick={closeMenu}>
                    Products
                  </NavLink>
                </li>
                <li role="listitem">
                  <NavLink to="/brands" onClick={closeMenu}>
                    Brands
                  </NavLink>
                </li>
                <li role="listitem">
                  <NavLink to="/categories" onClick={closeMenu}>
                    Categories
                  </NavLink>
                </li>
                {!userToken && (
                  <>
                    <li role="listitem">
                      <NavLink to="/signup" onClick={closeMenu}>
                        Register
                      </NavLink>
                    </li>
                    <li role="listitem">
                      <NavLink to="/signin" onClick={closeMenu}>
                        Sign In
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}

export default HamburgerMenu;
