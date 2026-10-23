import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageLens from "@/components/ImageLens";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "The Collection | ONVI", description: "Explore the ONVI collection of thoughtful everyday fashion." };
export default function CollectionPage() {
  return <main className="inner-page"><SiteHeader /><section className="page-hero page-hero-collection"><p className="eyebrow">ONVI / Collection 01</p><h1>Pieces for<br/><em>real days.</em></h1><p>Considered silhouettes. Distinctive details. Clothes that make room for every version of you.</p></section><section className="catalogue"><div className="catalogue-heading"><p>{products.length} considered pieces</p><span>Designed to be worn your way</span></div><div className="catalogue-grid">{products.map((p) => <article className="catalogue-card" key={p.slug}><Link href={`/collection/${p.slug}`} className="catalogue-image"><ImageLens src={p.image} alt={p.alt} sizes="(max-width:700px) 46vw,25vw" /><span>View piece ↗</span></Link><div className="catalogue-meta"><div><p className="catalogue-category">{p.category} / {p.id}</p><h2><Link href={`/collection/${p.slug}`}>{p.name}</Link></h2></div><p>{p.price}</p></div></article>)}</div></section><section className="page-quote"><p>“Thoughtful pieces.<br/>Distinctive by nature.”</p><Link className="simple-link" href="/story">Discover our story ↗</Link></section><SiteFooter /></main>;
}
