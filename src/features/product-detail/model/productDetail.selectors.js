import {
  DEFAULT_COLOR_OPTIONS,
  DEFAULT_SIZE_OPTIONS,
  DEFAULT_STOCK,
  EXCLUDED_BRAND_VALUES,
  FALLBACK_GALLERY_IMAGE,
  MAX_SIDEBAR_BRANDS,
  MAX_STOCK_PROGRESS,
  MIN_STOCK_PROGRESS,
  STOCK_PROGRESS_BASE,
} from "./productDetail.constants";

export const getSidebarBrands = (products = []) => {
  if (!Array.isArray(products) || !products.length) {
    return [];
  }

  const uniqueBrands = new Set();

  products.forEach((product) => {
    const brandName =
      typeof product?.brand === "string" ? product.brand.trim() : "";

    if (!brandName) {
      return;
    }

    if (EXCLUDED_BRAND_VALUES.has(brandName.toLowerCase())) {
      return;
    }

    uniqueBrands.add(brandName);
  });

  return Array.from(uniqueBrands).slice(0, MAX_SIDEBAR_BRANDS);
};

export const getProductGalleryImages = (product) => {
  if (!Array.isArray(product?.images) || !product.images.length) {
    return [{ src: FALLBACK_GALLERY_IMAGE, class: "front" }];
  }

  return product.images;
};

export const getProductColorOptions = (product) =>
  Array.isArray(product?.colors) && product.colors.length
    ? product.colors
    : DEFAULT_COLOR_OPTIONS;

export const getProductSizeOptions = (product) =>
  Array.isArray(product?.sizeoption) && product.sizeoption.length
    ? product.sizeoption
    : DEFAULT_SIZE_OPTIONS;

export const getProductStock = (product) => Number(product?.stock || DEFAULT_STOCK);
export const getProductPrice = (product) => Number(product?.price || 0);
export const getProductMrp = (product) => Number(product?.mrp || 0);

export const getProductStockProgress = (stock) =>
  Math.max(
    MIN_STOCK_PROGRESS,
    Math.min(
      MAX_STOCK_PROGRESS,
      Math.round((Number(stock || 0) / STOCK_PROGRESS_BASE) * 100),
    ),
  );
