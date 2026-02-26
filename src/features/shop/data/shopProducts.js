import { newArrivalData } from "@/features/shoes/data/shoesHomeData";

const SHOP_BRANDS = [
  "Zara",
  "Louis Solly",
  "Louis Philippe",
  "Fila",
  "Puma",
  "Flower Brand",
];

const SHOP_TYPES = ["Shoes"];

const SHOP_COLORS = [
  ["red", "blue"],
  ["black", "yellow"],
  ["green", "gray"],
  ["orange", "black"],
  ["pink", "purple"],
  ["teal", "white"],
];

const SHOP_SIZE_OPTIONS = ["60g"];

const DEFAULT_DESCRIPTION =
  "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.";

const PRODUCT_NAMES = [
  "Murrvy Metal Leaf Slow Fall Metal Jig | Slow Sinking",
  "Murrvy Flutter Metal Leaf Jig | Long Cast",
  "Murrvy Long Casting Spoon Leaf",
  "Murrvy Feather Assist Jig Head",
  "Murrvy Triple Hook Saltwater Bait",
  "Murrvy Fast Sink Shore Jig",
];

const imagePool = newArrivalData
  .map((item) => item?.images?.[0]?.src)
  .filter(Boolean);

const getImageSet = (index) => {
  if (!imagePool.length) {
    return [];
  }

  return [
    { class: "front", src: imagePool[index % imagePool.length] },
    { class: "back", src: imagePool[(index + 1) % imagePool.length] },
    { class: "side", src: imagePool[(index + 2) % imagePool.length] },
  ];
};

const buildShopProduct = (index) => {
  const baseProduct = newArrivalData[index % newArrivalData.length] || {};
  const price = 49 + (index % 3) * 6;
  const mrp = price + 10;
  const type = SHOP_TYPES[index % SHOP_TYPES.length];
  const name = PRODUCT_NAMES[index % PRODUCT_NAMES.length];

  return {
    ...baseProduct,
    id: index + 1,
    name: `${name} | ${30 + (index % 5) * 10} GM`,
    price,
    mrp,
    discount: Math.round(((mrp - price) / mrp) * 100),
    type,
    category: "Fishing equipment",
    brand: SHOP_BRANDS[index % SHOP_BRANDS.length],
    colors: [SHOP_COLORS[index % SHOP_COLORS.length][0]],
    size: "60g",
    sizeoption: SHOP_SIZE_OPTIONS,
    description: DEFAULT_DESCRIPTION,
    ratingStars: 4,
    stock: 10 + (index % 9),
    images: getImageSet(index),
  };
};

export const shopProducts = Array.from({ length: 24 }, (_, index) =>
  buildShopProduct(index),
);

export const getShopProductById = (productId) =>
  shopProducts.find((product) => product.id === Number(productId));

export const getRelatedProducts = (productId, limit = 8) =>
  shopProducts
    .filter((product) => product.id !== Number(productId))
    .slice(0, limit);
