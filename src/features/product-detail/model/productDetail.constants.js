import {
  CustomerServcies,
  daysfreepolicy,
  FreeReturns,
  Freeshipping65,
  PickupStore,
  SecuredPayment,
  Topservice,
  Wecards,
} from "@/constant";

export const PRODUCT_SERVICE_ITEMS = [
  {
    key: "customer",
    title: CustomerServcies,
    description: Topservice,
    icon: "customer",
  },
  {
    key: "pickup",
    title: PickupStore,
    description: Freeshipping65,
    icon: "shop",
  },
  {
    key: "payment",
    title: SecuredPayment,
    description: Wecards,
    icon: "secure-payment",
  },
  {
    key: "returns",
    title: FreeReturns,
    description: daysfreepolicy,
    icon: "return",
  },
];

export const FALLBACK_GALLERY_IMAGE = "fashion/product/front/1.jpg";
export const DEFAULT_COLOR_OPTIONS = ["black", "blue"];
export const DEFAULT_SIZE_OPTIONS = ["S", "M", "L", "XL"];
export const MAX_SIDEBAR_BRANDS = 6;
export const EXCLUDED_BRAND_VALUES = new Set(["none"]);

export const DEFAULT_STOCK = 10;
export const STOCK_PROGRESS_BASE = 20;
export const MIN_STOCK_PROGRESS = 10;
export const MAX_STOCK_PROGRESS = 100;

export const MIN_PURCHASE_QUANTITY = 1;
export const MAX_PURCHASE_QUANTITY = 15;
