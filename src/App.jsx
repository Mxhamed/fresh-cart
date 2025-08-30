import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout & Special Pages
import AppLayout from "./ui/AppLayout";
import RedirectRoute from "./ui/RedirectRoute";
import ProtectedRoute from "./ui/ProtectedRoute";
import Preloader from "./ui/PreLoader";
import PageNotFound from "./ui/PageNotFound";

// Bundling & Code Splitting
const HomePage = lazy(() => import("./ui/HomePage"));
const SignIn = lazy(() => import("./features/user/SignIn"));
const SignUp = lazy(() => import("./features/user/SignUp"));
const ProductList = lazy(() => import("./features/products/ProductList"));
const Product = lazy(() => import("./features/products/ProductDetails"));
const Wishlist = lazy(() => import("./features/wishlist/Wishlist"));
const Cart = lazy(() => import("./features/cart/Cart"));
const Categories = lazy(() => import("./features/catalog/Categories"));
const Brands = lazy(() => import("./features/catalog/Brands"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />

            {/* User Can't Access these Pages if ALREADY Signed In  */}
            <Route element={<RedirectRoute />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            {/* User Can't Access these Pages if NOT Signed In */}
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />

              <Route path="/categories" element={<Categories />} />
              <Route path="/brands" element={<Brands />} />

              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
