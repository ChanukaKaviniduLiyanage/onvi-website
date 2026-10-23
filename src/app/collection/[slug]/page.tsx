import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductOptions from "@/components/ProductOptions";
import { products } from "@/lib/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
type ProductPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: `${product.name} | ONVI`, description: product.description } : { title: "Piece not found | ONVI" };
}
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  return <main className="inner-page"><SiteHeader /><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/collection">Collection</Link><span>/</span><span>{product.name}</span></div><section className="product-detail"><div className="product-detail-image"><Image src={product.image} alt={product.alt} fill priority sizes="(max-width:700px) 100vw,55vw"/><span className="image-index">ONVI / {product.id}</span></div><div className="product-detail-copy"><p className="eyebrow">{product.category} / ONVI EDITION 01</p><h1>{product.name}</h1><p className="detail-price">{product.price}</p><p className="detail-description">{product.description}</p><div className="detail-rule"/><p className="field-label">Available sizes</p><ProductOptions productName={product.name} sizes={product.sizes} /><p className="detail-note">Orders are confirmed personally before payment. Availability and delivery details will be shared with you.</p><div className="detail-rule"/><p className="field-label">The details</p><ul className="detail-list">{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><Link className="simple-link" href="/faq">Sizing, delivery &amp; care information ↗</Link></div></section><section className="related-products"><div className="related-heading"><p className="eyebrow">Keep exploring</p><h2>More to make yours.</h2><Link href="/collection" className="simple-link">View the collection ↗</Link></div><div className="related-grid">{related.map((item) => <Link href={`/collection/${item.slug}`} className="related-card" key={item.slug}><span className="related-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width:700px) 42vw,25vw"/></span><span>{item.name}<small>{item.price}</small></span></Link>)}</div></section><SiteFooter /></main>;
}
