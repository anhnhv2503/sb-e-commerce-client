export const clothesSizes = [
  {
    id: 1,
    name: "XS",
  },
  {
    id: 2,
    name: "S",
  },
  {
    id: 3,
    name: "M",
  },
  {
    id: 4,
    name: "L",
  },
  {
    id: 5,
    name: "XL",
  },
  {
    id: 6,
    name: "XXL",
  },
  {
    id: 7,
    name: "3XL",
  },
];

export const shoeSizes = [
  {
    id: 101,
    name: "35",
  },
  {
    id: 102,
    name: "36",
  },
  {
    id: 103,
    name: "37",
  },
  {
    id: 104,
    name: "38",
  },
  {
    id: 105,
    name: "39",
  },
  {
    id: 106,
    name: "40",
  },
  {
    id: 107,
    name: "41",
  },
  {
    id: 108,
    name: "42",
  },
  {
    id: 109,
    name: "43",
  },
  {
    id: 110,
    name: "44",
  },
  {
    id: 111,
    name: "45",
  },
];

export const sizeCategories = [
  {
    id: "clothes",
    label: "Quần áo",
    sizes: clothesSizes,
  },
  {
    id: "shoes",
    label: "Giày dép",
    sizes: shoeSizes,
  },
];

// Helper to determine size category from product category name
export const getSizeTypeFromCategory = (categoryName = "") => {
  if (!categoryName) return "clothes";
  const normalized = categoryName.toLowerCase();
  if (
    normalized.includes("giày") ||
    normalized.includes("giay") ||
    normalized.includes("dép") ||
    normalized.includes("dep") ||
    normalized.includes("shoe") ||
    normalized.includes("sneaker") ||
    normalized.includes("footwear")
  ) {
    return "shoes";
  }
  return "clothes";
};

// Aliases for convenience
export const clothesSizeOptions = clothesSizes;
export const shoeSizeOptions = shoeSizes;

// Backward compatibility: combined list
export const sizeOptions = [...clothesSizes, ...shoeSizes];

export default {
  clothes: clothesSizes,
  shoes: shoeSizes,
};
