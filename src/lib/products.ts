export type Product = {
  slug: string;
  id: string;
  name: string;
  price: string;
  image: string;
  alt: string;
  category: string;
  description: string;
  details: string[];
  sizes: string[];
};

export const products: Product[] = [
  {
    slug: "textured-asymmetry-top", id: "01", name: "Textured Asymmetry", price: "LKR 4,850",
    image: "/images/model-burgundy.jpg", alt: "Model wearing an asymmetric burgundy top", category: "Tops",
    description: "An expressive, textured top with an asymmetric hem—made to bring a little character to everyday dressing.",
    details: ["Asymmetric hemline", "Textured finish", "Style it with tailored trousers or relaxed denim"], sizes: ["XS", "S", "M", "L"]
  },
  {
    slug: "botanical-flow-dress", id: "02", name: "Botanical Flow Dress", price: "LKR 6,950",
    image: "/images/model-botanical-dress.jpg", alt: "Model wearing a white botanical print dress", category: "Dresses",
    description: "A fluid statement dress with a hand-drawn botanical feel, designed for days that turn into something memorable.",
    details: ["Botanical artwork", "Tie-shoulder detail", "A statement silhouette for gatherings and occasions"], sizes: ["XS", "S", "M", "L"]
  },
  {
    slug: "linen-asymmetry-top", id: "03", name: "Linen Asymmetry Top", price: "LKR 4,950",
    image: "/images/model-ivory-top.jpg", alt: "Model wearing an ivory asymmetric top", category: "Tops",
    description: "A soft neutral with a sculptural hem. An easy piece to build into a workday wardrobe or a relaxed weekend look.",
    details: ["Soft ivory tone", "Asymmetric front hem", "Pairs with black, earth tones and denim"], sizes: ["XS", "S", "M", "L"]
  },
  {
    slug: "waist-shirt-dress", id: "04", name: "The Waist Shirt Dress", price: "LKR 6,750",
    image: "/images/model-orange-dress.jpg", alt: "Model wearing a rust orange shirt dress", category: "Dresses",
    description: "A confident shirt dress with a defined waist and an easy, wearable shape that moves from daytime plans to evenings out.",
    details: ["Button-front design", "Self-tie waist", "Wear with flats by day or statement accessories at night"], sizes: ["XS", "S", "M", "L"]
  }
];
