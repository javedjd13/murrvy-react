import { CommonPath } from "@/constant";
import { FALLBACK_GALLERY_IMAGE } from "../model/productDetail.constants";

export const resolveProductImageSrc = (value) => {
  if (!value || typeof value !== "string") {
    return `${CommonPath}/${FALLBACK_GALLERY_IMAGE}`;
  }

  if (/^https?:\/\//i.test(value) || value.startsWith("/")) {
    return value;
  }

  return `${CommonPath}/${value}`;
};
