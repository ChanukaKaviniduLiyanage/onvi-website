"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ImageLens from "@/components/ImageLens";
import { occasionCategories, productCategories, products, type OccasionCategory, type ProductCategory } from "@/lib/products";

export default function CollectionCatalog() {
  const [activeOccasion, setActiveOccasion] = useState<OccasionCategory | "All">("All");
  const [activeType, setActiveType] = useState<ProductCategory | "All">("All");

  const updateFilters = (occasion: OccasionCategory | "All", type: ProductCategory | "All") => {
    setActiveOccasion(occasion);
    setActiveType(type);

    const params = new URLSearchParams(window.location.search);
    params.delete("occasion");
    params.delete("type");
    params.delete("category");
    if (occasion !== "All") params.set("occasion", occasion);
    if (type !== "All") params.set("type", type);
    const query = params.toString();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedOccasion = params.get("occasion");
    const requestedType = params.get("type") ?? params.get("category");

    if (occasionCategories.some((occasion) => occasion === requestedOccasion)) {
      setActiveOccasion(requestedOccasion as OccasionCategory);
    }
    if (productCategories.some((category) => category === requestedType)) {
      setActiveType(requestedType as ProductCategory);
    }
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      (activeOccasion === "All" || product.occasions.includes(activeOccasion)) &&
      (activeType === "All" || product.category === activeType)
    ),
    [activeOccasion, activeType]
  );
  const occasionCount = (occasion: OccasionCategory | "All") => products.filter((product) =>
    (occasion === "All" || product.occasions.includes(occasion)) &&
    (activeType === "All" || product.category === activeType)
  ).length;
  const typeCount = (type: ProductCategory | "All") => products.filter((product) =>
    (activeOccasion === "All" || product.occasions.includes(activeOccasion)) &&
    (type === "All" || product.category === type)
  ).length;
  const hasActiveFilters = activeOccasion !== "All" || activeType !== "All";

  return (
    <section className="catalogue" aria-label="ONVI collection listings">
      <div className="catalogue-heading">
        <p>{filteredProducts.length} of {products.length} considered pieces</p>
        <span>Small editions · enquiries welcome</span>
      </div>

      <div className="catalogue-filter-panel">
        <div className="catalogue-filter-row" role="group" aria-label="Filter by occasion">
          <span className="catalogue-filter-label">Occasion</span>
          <div className="catalogue-filters">
            {["All", ...occasionCategories].map((occasion) => {
              const value = occasion as OccasionCategory | "All";
              return (
                <button
                  key={occasion}
                  type="button"
                  className={`catalogue-filter${activeOccasion === value ? " is-active" : ""}`}
                  aria-pressed={activeOccasion === value}
                  onClick={() => updateFilters(value, activeType)}
                >
                  {occasion === "All" ? "Any" : occasion}
                  <span>{occasionCount(value)}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="catalogue-filter-row" role="group" aria-label="Filter by piece type">
          <span className="catalogue-filter-label">Piece type</span>
          <div className="catalogue-filters">
            {["All", ...productCategories].map((type) => {
              const value = type as ProductCategory | "All";
              return (
                <button
                  key={type}
                  type="button"
                  className={`catalogue-filter${activeType === value ? " is-active" : ""}`}
                  aria-pressed={activeType === value}
                  onClick={() => updateFilters(activeOccasion, value)}
                >
                  {type === "All" ? "Any" : type}
                  <span>{typeCount(value)}</span>
                </button>
              );
            })}
          </div>
        </div>
        {hasActiveFilters && (
          <button className="catalogue-clear" type="button" onClick={() => updateFilters("All", "All")}>
            Clear filters
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="catalogue-grid">
          {filteredProducts.map((product) => (
            <Link
              href={`/collection/${product.slug}`}
              className="catalogue-card"
              key={product.slug}
              aria-label={`View ${product.name} product details`}
            >
              <div className="catalogue-image">
                <ImageLens src={product.image} alt={product.alt} sizes="(max-width:700px) 46vw,25vw" enableTouchZoom={false} />
                <span className="catalogue-image-cta">View &amp; enquire ↗</span>
              </div>
              <div className="catalogue-meta">
                <div>
                  <p className="catalogue-category">{product.occasions.join(" · ")} / {product.category} / {product.id}</p>
                  <h2>{product.name}</h2>
                </div>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="catalogue-empty">
          <p>No pieces match both filters just now.</p>
          <button className="simple-link" type="button" onClick={() => updateFilters("All", "All")}>Show all pieces ↗</button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">Showing {filteredProducts.length} pieces.</p>
    </section>
  );
}
