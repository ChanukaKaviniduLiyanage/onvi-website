"use client";

import { useState } from "react";
import Link from "next/link";

type ProductOptionsProps = {
  productName: string;
  sizes: string[];
};

export default function ProductOptions({ productName, sizes }: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const enquiryHref = `/contact?product=${encodeURIComponent(productName)}${selectedSize ? `&size=${encodeURIComponent(selectedSize)}` : ""}`;

  return (
    <>
      <div className="size-list" role="group" aria-label={`Available sizes for ${productName}`}>
        {sizes.map((size) => (
          <button
            className={`size-option${selectedSize === size ? " is-selected" : ""}`}
            type="button"
            key={size}
            aria-pressed={selectedSize === size}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
      <p className="size-note">Choose a standard size. Ask us to confirm availability before ordering.</p>
      <Link className="solid-link product-enquiry-link" href={enquiryHref}>
        Ask about availability &amp; delivery <span>↗</span>
      </Link>
    </>
  );
}
