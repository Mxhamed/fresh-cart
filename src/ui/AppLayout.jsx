import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            top: 80,
          }}
          toastOptions={{
            // Default Options for ALL Toasts
            style: {
              minWidth: "initial",
              maxWidth: "240px",

              fontSize: ".875rem",
              color: "var(--subtle-black)",
              textShadow: "var(--shadow-text)",

              backgroundColor: "var(--color-white)",
              boxShadow: "var(--shadow-primary)",
              borderRadius: "10px",
            },

            // Default Options for Specific Types
            success: {
              duration: 3000,
              theme: {
                primary: "var(--color-success)",
                secondary: "var(--color-white)",
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: "var(--color-danger)",
                secondary: "var(--color-white)",
              },
            },
          }}
        />
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;
