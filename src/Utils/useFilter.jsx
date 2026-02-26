import { useMemo } from "react";
import { useSelector } from "react-redux";

const normalizeProductColors = (productColors) => {
  if (!Array.isArray(productColors)) {
    return [];
  }

  return productColors
    .map((item) => (typeof item === "string" ? item : item?.color_name))
    .filter(Boolean);
};

const useFilter = (products = []) => {
  const { brand, color, category, price, sorting, discount } = useSelector(
    (state) => state.ProductFilter,
  );

  return useMemo(() => {
    const filteredProducts = (Array.isArray(products) ? products : []).filter(
      (product) => {
        const productType = product?.type || "";
        const productBrand = product?.brand || "";
        const productColors = normalizeProductColors(product?.colors);
        const productPrice = Number(product?.price || 0);
        const productDiscount = Number(product?.discount || 0);

        const filterBrand = brand.length ? brand.includes(productBrand) : true;
        const filterCategory = category.length
          ? category.includes(productType) || category.includes("All")
          : true;
        const filterColor = color.length
          ? color.some((item) => productColors.includes(item))
          : true;
        const priceMatch = Array.isArray(price)
          ? price[0] <= productPrice && price[1] >= productPrice
          : true;
        const filterDiscount = discount.length
          ? discount.some((value) => productDiscount >= Number(value))
          : true;

        return (
          filterBrand &&
          filterCategory &&
          filterColor &&
          priceMatch &&
          filterDiscount
        );
      },
    );

    return filteredProducts.sort((product1, product2) => {
      const firstPrice = Number(product1?.price || 0);
      const secondPrice = Number(product2?.price || 0);
      const firstName = product1?.name || "";
      const secondName = product2?.name || "";

      if (sorting === "Price, High To Low") {
        return secondPrice - firstPrice;
      }

      if (sorting === "Price, Low To High") {
        return firstPrice - secondPrice;
      }

      if (sorting === "Alphabetically A-Z") {
        return firstName.localeCompare(secondName);
      }

      if (sorting === "Alphabetically Z-A") {
        return secondName.localeCompare(firstName);
      }

      return 0;
    });
  }, [brand, category, color, discount, price, products, sorting]);
};

export default useFilter;
