export const ROUTE_SEGMENTS = Object.freeze({
  ABOUT: "about",
  SHOP: "shop",
  CONTACT: "contact",
  CHECKOUT: "checkout",
  PRODUCT: "product",
  CART: "page/cart",
  WISHLIST: "page/wishlist",
  LOGIN: "login",
  REGISTER: "register",
  USER_DASHBOARD: "user-dashboard",
  FORGOT_PASSWORD: "forgot-password",
  FAQ: "faq",
  ORDER_TRACKING: "order-tracking",
  ORDER_SUCCESS: "order-success",
  ERROR_404: "404",
});

export const ROUTE_PATHS = Object.freeze({
  HOME: "/",
  ABOUT: `/${ROUTE_SEGMENTS.ABOUT}`,
  SHOP: `/${ROUTE_SEGMENTS.SHOP}`,
  CONTACT: `/${ROUTE_SEGMENTS.CONTACT}`,
  CHECKOUT: `/${ROUTE_SEGMENTS.CHECKOUT}`,
  PRODUCT_DETAIL: `/${ROUTE_SEGMENTS.PRODUCT}/:productId`,
  CART: `/${ROUTE_SEGMENTS.CART}`,
  WISHLIST: `/${ROUTE_SEGMENTS.WISHLIST}`,
  LOGIN: `/${ROUTE_SEGMENTS.LOGIN}`,
  REGISTER: `/${ROUTE_SEGMENTS.REGISTER}`,
  USER_DASHBOARD: `/${ROUTE_SEGMENTS.USER_DASHBOARD}`,
  FORGOT_PASSWORD: `/${ROUTE_SEGMENTS.FORGOT_PASSWORD}`,
  FAQ: `/${ROUTE_SEGMENTS.FAQ}`,
  ORDER_TRACKING: `/${ROUTE_SEGMENTS.ORDER_TRACKING}`,
  ORDER_SUCCESS: `/${ROUTE_SEGMENTS.ORDER_SUCCESS}`,
  ERROR_404: `/${ROUTE_SEGMENTS.ERROR_404}`,
});

export const getProductDetailPath = (productId) =>
  `/${ROUTE_SEGMENTS.PRODUCT}/${productId}`;
