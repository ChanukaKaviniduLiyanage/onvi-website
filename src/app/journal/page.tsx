import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
export const metadata: Metadata = { title: "The ONVI Journal | ONVI", description: "Style notes and everyday inspiration from ONVI." };
const stories = [
  { n: "01", tag: "STYLE NOTES", title: "One piece, three ways to wear it", text: "A few small styling shifts can take a familiar piece from workday to evening plans.", image: "/images/model-ivory-top.jpg" },
  { n: "02", tag: "THE PEOPLE", title: "Real style lives in the details", text: "A look at the personal touches that make an outfit feel like your own.", image: "/images/model-burgundy.jpg" },
  { n: "03", tag: "IN THE MOMENT", title: "Colour, confidence and a little spontaneity", text: "Meet the brighter side of everyday dressing with a piece that does not blend in.", image: "/images/model-orange-dress.jpg" },
  { n: "04", tag: "THE MAKING", title: "A closer look at the print", text: "The botanical lines that turn a simple silhouette into a conversation piece.", image: "/images/model-botanical-dress.jpg" }
];
export default function JournalPage(){return <main className="inner-page"><SiteHeader/><section className="page-hero journal-page-hero"><p className="eyebrow">Notes from the ONVI world</p><h1>Real people.<br/><em>Real days.</em></h1><p>Style ideas, little discoveries and the many ways a piece becomes yours.</p></section><section className="journal-list">{stories.map((s,i)=><article className={`journal-story ${i%2?"reverse":""}`} key={s.n}><Link className="journal-story-image" href="/collection"><Image src={s.image} alt={s.title} fill sizes="(max-width:700px) 100vw,50vw"/></Link><div className="journal-story-copy"><p className="eyebrow">{s.n} / {s.tag}</p><h2>{s.title}</h2><p>{s.text}</p><Link className="simple-link" href="/collection">Explore the looks ↗</Link></div></article>)}</section><section className="journal-cta"><p>Everyday pieces.<br/><em>Your own point of view.</em></p><Link className="solid-link" href="/collection">Find your next favourite <span>↗</span></Link></section><SiteFooter/></main>}
