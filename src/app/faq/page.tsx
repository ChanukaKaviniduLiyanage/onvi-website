import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
export const metadata: Metadata = { title: "FAQs | ONVI", description: "Answers about ONVI sizing, ordering, delivery and garment care." };
const faqs = [
  ["How do I place an order?", "Choose a piece and use the enquiry link on its product page. We’ll confirm availability, sizing and delivery details with you before payment."],
  ["Can I check whether a size is available?", "Yes. Send us the product name and your preferred size through the contact page. The sizes displayed are a guide; availability should be confirmed before an order is accepted."],
  ["How does payment work?", "The website is currently designed for enquiry-led ordering, not instant checkout. Please wait for ONVI to confirm the order and payment instructions before making a payment."],
  ["Where do you deliver?", "Delivery coverage, fees and estimated timelines should be confirmed with us when your order is discussed."],
  ["How should I care for my piece?", "Care instructions can vary by fabric and finish. Check the garment label and contact us if you need guidance for a specific design."],
  ["Can I return or exchange an item?", "Please confirm the current exchange policy with ONVI before ordering. The final policy should be published here before the store launches."],
];
export default function FAQPage(){return <main className="inner-page"><SiteHeader/><section className="faq-hero"><p className="eyebrow">The useful details</p><h1>A few things<br/><em>worth knowing.</em></h1><p>Clear answers before you make a piece your own.</p></section><section className="faq-list">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</section><section className="faq-contact"><p>Still wondering about something?</p><Link className="solid-link" href="/contact">Ask us directly <span>↗</span></Link></section><SiteFooter/></main>}
