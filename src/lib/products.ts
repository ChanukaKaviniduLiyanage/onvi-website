export type ProductImage = {
  src: string;
  alt: string;
  label: string;
};

export const productCategories = ["Tops", "Dresses"] as const;
export type ProductCategory = (typeof productCategories)[number];

export const occasionCategories = ["Casual", "Party", "Corporate"] as const;
export type OccasionCategory = (typeof occasionCategories)[number];

export type Product = {
  slug: string;
  id: string;
  name: string;
  price: string;
  /** Primary image retained for cards, related items, and legacy references. */
  image: string;
  alt: string;
  /** Product gallery images. Add/reorder/remove entries here for each listing. */
  images: ProductImage[];
  /** The garment type used for the secondary catalog filter. */
  category: ProductCategory;
  /** A design can suit more than one occasion. */
  occasions: OccasionCategory[];
  description: string;
  details: string[];
  sizes: string[];
};

export const products: Product[] = [
  {
    slug: "textured-asymmetry-top", id: "01", name: "Textured Asymmetry", price: "LKR 4,850",
    image: "/images/model-burgundy-full.jpg", alt: "Model wearing an asymmetric burgundy top",
    images: [
      { src: "/images/model-burgundy-full.jpg", alt: "Textured Asymmetry top, full look", label: "Full look" },
      { src: "/images/model-burgundy-detail-1.jpg", alt: "Textured Asymmetry top, upper garment detail", label: "Garment detail" },
      { src: "/images/model-burgundy-detail-2.jpg", alt: "Textured Asymmetry top, fabric and hem detail", label: "Fit & hem" },
    ],
    category: "Tops", occasions: ["Casual", "Party"],
    description: "An expressive, textured top with an asymmetric hem—made to bring a little character to everyday dressing.",
    details: ["Asymmetric hemline", "Textured finish", "Style it with tailored trousers or relaxed denim"], sizes: ["XS", "S", "M", "L"]
  },
  {
    slug: "botanical-flow-dress", id: "02", name: "Botanical Flow Dress", price: "LKR 6,950",
    image: "/images/model-botanical-dress-full.jpg", alt: "Model wearing a white botanical print dress",
    images: [
      { src: "/images/model-botanical-dress-full.jpg", alt: "Botanical Flow Dress, full look", label: "Full look" },
      { src: "/images/model-botanical-dress-detail-1.jpg", alt: "Botanical Flow Dress, upper garment detail", label: "Garment detail" },
      { src: "/images/model-botanical-dress-detail-2.jpg", alt: "Botanical Flow Dress, botanical print and skirt detail", label: "Print detail" },
    ],
    category: "Dresses", occasions: ["Party"],
    description: "A fluid statement dress with a hand-drawn botanical feel, designed for days that turn into something memorable.",
    details: ["Botanical artwork", "Tie-shoulder detail", "A statement silhouette for gatherings and occasions"], sizes: ["XS", "S", "M", "L"]
  },
  {
    slug: "linen-asymmetry-top", id: "03", name: "Linen Asymmetry Top", price: "LKR 4,950",
    image: "/images/model-ivory-top-full.jpg", alt: "Model wearing an ivory asymmetric top",
    images: [
      { src: "/images/model-ivory-top-full.jpg", alt: "Linen Asymmetry Top, full look", label: "Full look" },
      { src: "/images/model-ivory-top-detail-1.jpg", alt: "Linen Asymmetry Top, upper garment detail", label: "Garment detail" },
      { src: "/images/model-ivory-top-detail-2.jpg", alt: "Linen Asymmetry Top, hem and fit detail", label: "Fit & hem" },
    ],
    category: "Tops", occasions: ["Casual", "Corporate"],
    description: "A soft neutral with a sculptural hem. An easy piece to build into a workday wardrobe or a relaxed weekend look.",
    details: ["Soft ivory tone", "Asymmetric front hem", "Pairs with black, earth tones and denim"], sizes: ["XS", "S", "M", "L"]
  },
  {
    slug: "waist-shirt-dress", id: "04", name: "The Waist Shirt Dress", price: "LKR 6,750",
    image: "/images/model-orange-dress-full.jpg", alt: "Model wearing a rust orange shirt dress",
    images: [
      { src: "/images/model-orange-dress-full.jpg", alt: "The Waist Shirt Dress, full look", label: "Full look" },
      { src: "/images/model-orange-dress-detail-1.jpg", alt: "The Waist Shirt Dress, upper garment detail", label: "Garment detail" },
      { src: "/images/model-orange-dress-detail-2.jpg", alt: "The Waist Shirt Dress, waist and skirt detail", label: "Fit & waist" },
    ],
    category: "Dresses", occasions: ["Casual", "Corporate", "Party"],
    description: "A confident shirt dress with a defined waist and an easy, wearable shape that moves from daytime plans to evenings out.",
    details: ["Button-front design", "Self-tie waist", "Wear with flats by day or statement accessories at night"], sizes: ["XS", "S", "M", "L"]
  }
];
