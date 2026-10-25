import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CollectionCatalog from "@/components/CollectionCatalog";

export const metadata: Metadata = { title: "The Collection | ONVI", description: "Explore the ONVI collection of thoughtful everyday fashion." };

export default function CollectionPage() {
  return (
    <main className="inner-page">
      <SiteHeader />
      <section className="page-hero page-hero-collection">
        <p className="eyebrow">ONVI / Collection 01</p>
        <h1>Pieces for<br/><em>real days.</em></h1>
        <p>Browse by occasion and piece type. Each design is made to order in a small edition; ask us about availability and estimated delivery.</p>
      </section>
      <CollectionCatalog />
      <section className="page-quote">
        <p>“Thoughtful pieces.<br/>Distinctive by nature.”</p>
        <Link className="simple-link" href="/story">Discover our story ↗</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
