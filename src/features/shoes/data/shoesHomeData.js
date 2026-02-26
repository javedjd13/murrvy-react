import bannerOne from "@/assets/images/shoes/banner-1.png";
import bannerTwo from "@/assets/images/shoes/banner-2.png";
import bannerThree from "@/assets/images/shoes/banner-3.png";
import categoryOne from "@/assets/images/shoes/category/1.png";
import categoryTwo from "@/assets/images/shoes/category/2.png";
import categoryThree from "@/assets/images/shoes/category/3.png";
import categoryFour from "@/assets/images/shoes/category/4.png";
import categoryFive from "@/assets/images/shoes/category/5.png";
import categorySix from "@/assets/images/shoes/category/6.png";
import categorySeven from "@/assets/images/shoes/category/7.png";
import productOne from "@/assets/images/shoes/latest-product/1.jpg";
import productTwo from "@/assets/images/shoes/latest-product/2.jpg";
import productThree from "@/assets/images/shoes/latest-product/3.jpg";
import productFour from "@/assets/images/shoes/latest-product/4.jpg";
import productFive from "@/assets/images/shoes/latest-product/5.jpg";
import productSix from "@/assets/images/shoes/latest-product/6.jpg";
import productSeven from "@/assets/images/shoes/latest-product/7.jpg";
// import topBannerOne from "@/assets/images/shoes/poster-2/2.jpg";
// import topBannerTwo from "@/assets/images/shoes/poster-2/3.jpg";
import middleBannerLeft from "@/assets/images/shoes/poster/1.png";
import middleBannerRight from "@/assets/images/shoes/poster/2.png";

const createProduct = (id, name, price, mrp, ratingStars, image, isNew) => {
  return {
    id,
    type: "shoes",
    name,
    price,
    mrp,
    discount: Math.round(((mrp - price) / mrp) * 100),
    new: isNew,
    ratingStars,
    images: [{ src: image }],
  };
};

const products = [
  createProduct(1, "Nike Air Max", 120, 160, 4, productOne, true),
  createProduct(2, "Adidas Runner", 95, 130, 5, productTwo, true),
  createProduct(3, "Puma Street", 105, 140, 4, productThree, false),
  createProduct(4, "Reebok Velocity", 110, 150, 4, productFour, false),
  createProduct(5, "Sketchers Flex", 89, 120, 5, productFive, false),
  createProduct(6, "New Balance Sport", 99, 139, 4, productSix, false),
  createProduct(7, "Converse Urban", 92, 125, 4, productSeven, false),
];

export const mainSlider = [
  {
    type: "shoes",
    slides: [
      {
        title: "Sports Shoes",
        discount: 30,
        leftProduct: "MURRVY",
        bannerImage: bannerThree,
        gradient: "gradient-purple",
        leftTitle: "Air Zoom Prime",
        leftSubtitle: "Lightweight race-ready build",
        bottomPrice: 120,
        bottomMrp: 180,
        bottomDescription: "Breathable mesh running shoes",
      },
      {
        title: "Running Shoes",
        discount: 25,
        leftProduct: "MURRVY",
        bannerImage: bannerTwo,
        gradient: "gradient-blue",
        leftTitle: "Velocity Max",
        leftSubtitle: "Daily training essentials",
        bottomPrice: 95,
        bottomMrp: 140,
        bottomDescription: "Responsive cushioning and grip",
      },
      {
        title: "Casual Shoes",
        discount: 20,
        leftProduct: "MURRVY",
        bannerImage: bannerOne,
        gradient: "red-gradient",
        leftTitle: "City Comfort",
        leftSubtitle: "All-day walking comfort",
        bottomPrice: 85,
        bottomMrp: 120,
        bottomDescription: "Minimal design for everyday wear",
      },
    ],
  },
];

export const bannerData = [
  {
    subtype: "shoestopbanner",
    banners: [
      {
        // image: topBannerOne,
        image: "topBannerOne",
        topTitle: "New Collection",
        heading: "Branded Shoes",
        feature: "Lightweight and comfortable",
        price: 120,
        mrp: 180,
        class: false,
      },
      {
        // image: topBannerTwo,
        image: "topBannerTwo",
        topTitle: "Trending Now",
        heading: "Running Shoes",
        feature: "Best for daily running",
        price: 95,
        mrp: 140,
        class: true,
      },
    ],
  },
  {
    subtype: "shoesnewoffers",
    leftbanner: {
      image: middleBannerLeft,
      titleleft: "Limited",
      titleright: "Offer",
      headingtop: "Premium",
      headingbottom: "Sports Shoes",
      price: 150,
    },
    rightbanners: {
      image: middleBannerRight,
      heading: "Running Collection",
      price: 110,
      bottombanners: [
        {
          image: categoryOne,
          heading: "Casual Shoes",
          discount: 20,
        },
        {
          image: categoryTwo,
          heading: "Sneakers",
          discount: 30,
        },
      ],
    },
  },
];

export const dealBannerData = [
  {
    subtype: "shoesdeal",
    image: mainSlider[0]?.slides?.[1]?.bannerImage || bannerThree,
    title: "Special Offer",
    discount: "50% OFF",
    headingtop: "Deal Of The Day",
    headingbottom: "Running Shoes",
    price: 99,
    countdownEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const productData = products.slice(0, 6);
export const newArrivalData = products;

export const categoryBanner = [
  {
    type: "shoes",
    children: [
      {
        title: "Men Shoes",
        image: categoryFour,
        startingPrice: 80,
        endiginPrice: 200,
      },
      {
        title: "Women Shoes",
        image: categoryFive,
        startingPrice: 70,
        endiginPrice: 180,
      },
      {
        title: "Sports Shoes",
        image: categorySix,
        startingPrice: 90,
        endiginPrice: 220,
      },
      {
        title: "Casual Shoes",
        image: categorySeven,
        startingPrice: 60,
        endiginPrice: 150,
      },
      {
        title: "Training Shoes",
        image: categoryThree,
        startingPrice: 75,
        endiginPrice: 190,
      },
    ],
  },
];
