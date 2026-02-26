import { Suspense, lazy } from "react";
import MainLayout from "@/layouts/MainLayout";
import { ROUTE_PATHS, ROUTE_SEGMENTS } from "./routePaths";
import RouteFallback from "@/shared/ui/RouteFallback";
import RouteError from "@/shared/ui/RouteError";

const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ShopPage = lazy(() => import("@/pages/Shop"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const CartPage = lazy(() => import("@/pages/Cart"));
const WishlistPage = lazy(() => import("@/pages/WishList"));
const CheckoutPage = lazy(() => import("@/pages/Checkout"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));
const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPassword"));
const FaqPage = lazy(() => import("@/pages/Faq"));
const OrderTrackingPage = lazy(() => import("@/pages/OrderTracking"));
const OrderSuccessPage = lazy(() => import("@/pages/OrderSuccess"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));


const withSuspense = (pageComponent) => {
  const WrappedPage = pageComponent;

  return (
    <Suspense fallback={<RouteFallback />}>
      <WrappedPage />
    </Suspense>
  );
};

export const appRouteConfig = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: ROUTE_SEGMENTS.ABOUT,
        element: withSuspense(AboutPage),
      },
      {
        path: ROUTE_SEGMENTS.SHOP,
        element: withSuspense(ShopPage),
      },
      {
        path: ROUTE_PATHS.PRODUCT_DETAIL,
        element: withSuspense(ProductDetailPage),
      },
      {
        path: ROUTE_SEGMENTS.CONTACT,
        element: withSuspense(ContactPage),
      },
      {
        path: ROUTE_SEGMENTS.CART,
        element: withSuspense(CartPage),
      },
      {
        path: ROUTE_SEGMENTS.CHECKOUT,
        element: withSuspense(CheckoutPage),
      },
      {
        path: ROUTE_SEGMENTS.WISHLIST,
        element: withSuspense(WishlistPage),
      },
      {
        path: ROUTE_SEGMENTS.LOGIN,
        element: withSuspense(LoginPage),
      },
      {
        path: ROUTE_SEGMENTS.REGISTER,
        element: withSuspense(RegisterPage),
      },
      {
        path: ROUTE_SEGMENTS.FORGOT_PASSWORD,
        element: withSuspense(ForgotPasswordPage),
      },
      {
        path: ROUTE_SEGMENTS.FAQ,
        element: withSuspense(FaqPage),
      },
      {
        path: ROUTE_SEGMENTS.ORDER_TRACKING,
        element: withSuspense(OrderTrackingPage),
      },
      {
        path: ROUTE_SEGMENTS.ORDER_SUCCESS,
        element: withSuspense(OrderSuccessPage),
      },
      {
        path: ROUTE_SEGMENTS.ERROR_404,
        element: withSuspense(NotFoundPage),
      },
      { path: ROUTE_SEGMENTS.USER_DASHBOARD, element: withSuspense(DashboardPage) },
      {
        path: "*",
        element: withSuspense(NotFoundPage),
      },
    ],
  },
];


