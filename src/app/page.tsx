"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { occasionCategories, products } from "@/lib/products";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const details = [
  { title: "Premium fabrics", text: "Chosen for how they feel, move and last.", image: "/images/model-burgundy.jpg" },
  { title: "Refined stitching", text: "Small details. A considered finish.", image: "/images/model-botanical-dress.jpg" },
  { title: "Signature tag", text: "Thoughtfully finished, from the first touch.", image: "/images/model-ivory-top.jpg" },
  { title: "Our packaging", text: "A quieter kind of unboxing.", image: "/images/model-orange-dress.jpg" },
];

const processScenes = [
  {
    title: "A smaller collection",
    text: "Each design comes in a limited edition, so we can avoid holding a large stock.",
    image: "/images/model-botanical-dress.jpg",
    alt: "Botanical ONVI dress from a limited edition",
    note: "A limited edition",
  },
  {
    title: "Made to order",
    text: "We make each piece in one of the standard sizes listed. Individual custom sizing isn’t offered.",
    image: "/images/model-orange-dress.jpg",
    alt: "Rust ONVI shirt dress made to order in a listed size",
    note: "Made in listed sizes",
  },
  {
    title: "Ask before you decide",
    text: "We’ll confirm availability and estimated delivery. A design may return if enough people ask for it.",
    image: "/images/model-ivory-top.jpg",
    alt: "Ivory ONVI top available to enquire about",
    note: "Available by enquiry",
  },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [activeLook, setActiveLook] = useState<"day" | "evening">("day");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const heroSlides = [
    {
      image: "/images/model-botanical-dress.jpg",
      alt: "ONVI botanical flow dress campaign",
      secondaryImage: "/images/model-ivory-top.jpg",
      secondaryAlt: "ONVI ivory asymmetry top campaign",
      thumbnail: "/images/model-burgundy.jpg",
      thumbnailAlt: "ONVI burgundy textured top",
      note: <>Same<br/>essence.<br/>Different<br/>you.</>,
    },
    {
      image: "/images/model-burgundy.jpg",
      alt: "ONVI burgundy textured top campaign",
      secondaryImage: "/images/model-orange-dress.jpg",
      secondaryAlt: "ONVI rust shirt dress campaign",
      thumbnail: "/images/model-botanical-dress.jpg",
      thumbnailAlt: "ONVI botanical flow dress",
      note: <>Made for<br/>your kind<br/>of day.</>,
    },
    {
      image: "/images/model-orange-dress.jpg",
      alt: "ONVI rust shirt dress campaign",
      secondaryImage: "/images/model-burgundy.jpg",
      secondaryAlt: "ONVI burgundy textured top campaign",
      thumbnail: "/images/model-orange-dress.jpg",
      thumbnailAlt: "ONVI rust shirt dress",
      note: <>A new mood.<br/>Still<br/>yourself.</>,
    },
    {
      image: "/images/model-ivory-top.jpg",
      alt: "ONVI ivory asymmetry top campaign",
      secondaryImage: "/images/model-botanical-dress.jpg",
      secondaryAlt: "ONVI botanical flow dress campaign",
      thumbnail: "/images/model-ivory-top.jpg",
      thumbnailAlt: "ONVI ivory asymmetry top",
      note: <>Your style.<br/>Your pace.<br/>Your story.</>,
    },
  ];
  const advanceHeroSlide = () => setActiveHeroSlide((current) => (current + 1) % heroSlides.length);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const storySection = root.current?.querySelector<HTMLElement>(".order-story");
    let refreshFrame = 0;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(".hero-copy > *", { y: 18 }, { y: 0, duration: .8, stagger: .1, ease: "power3.out", delay: .12, clearProps: "transform" });
      gsap.from(".hero-image-left", { scale: 1.035, opacity: .7, duration: 1.2, ease: "power2.out" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });

      if (storySection) {
        const steps = gsap.utils.toArray<HTMLElement>(".order-story-step", storySection);
        const frames = gsap.utils.toArray<HTMLElement>(".order-story-image-frame", storySection);
        const progress = gsap.utils.toArray<HTMLElement>(".order-story-progress-fill", storySection);
        if (steps.length === processScenes.length && frames.length === processScenes.length) {
          storySection.classList.add("is-scroll-story");
          gsap.set([...steps.slice(1), ...frames.slice(1)], { autoAlpha: 0, y: 18 });
          gsap.set(frames, { scale: 1.06 });
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          if (progress[0]) gsap.set(progress[0], { scaleX: 1 });

          const storyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: storySection,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * (processScenes.length - 1) * 1.65)}`,
              pin: true,
              scrub: .65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          for (let index = 1; index < processScenes.length; index += 1) {
            const transition = .85 + (index - 1) * 1.1;
            storyTimeline
              .to(steps[index - 1], { autoAlpha: 0, y: -16, duration: .34 }, transition)
              .to(steps[index], { autoAlpha: 1, y: 0, duration: .42 }, transition + .1)
              .to(frames[index - 1], { autoAlpha: 0, scale: 1.1, duration: .42 }, transition)
              .fromTo(frames[index], { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: .48 }, transition + .08)
              .to(progress[index], { scaleX: 1, duration: .55 }, transition + .08);
          }
          storyTimeline.to({}, { duration: .7 });
        }
      }
    }, root);
    refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { window.cancelAnimationFrame(refreshFrame); ctx.revert(); storySection?.classList.remove("is-scroll-story"); };
  }, []);

  const scrollTo = (id: string) => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(`#${id}`, true, "top top");
    else document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  };
  const submitNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return <main ref={root} className="site-shell">
    <SiteHeader overlay />

    <section className="hero" id="home" aria-label="ONVI campaign">
      <div className="hero-image hero-image-left" key={`hero-main-${activeHeroSlide}`}><Image src={heroSlides[activeHeroSlide].image} alt={heroSlides[activeHeroSlide].alt} fill priority sizes="(max-width:700px) 100vw,58vw" /></div>
      <div className="hero-image hero-image-right" key={`hero-secondary-${activeHeroSlide}`}><Image src={heroSlides[activeHeroSlide].secondaryImage} alt={heroSlides[activeHeroSlide].secondaryAlt} fill priority sizes="(max-width:700px) 100vw,30vw" /></div>
      <div className="hero-shade"></div>
      <div className="hero-copy"><p className="eyebrow hero-eyebrow">Thoughtful pieces for real days</p><h1>MADE<br/>TO BE<br/><span>SEEN.</span></h1><p className="hero-description">Distinctive designer wear, created for your everyday.</p><a className="pill-link" href="#collection"><span className="circle-arrow"><ArrowIcon /></span><span>Explore collection</span></a></div>
      <div className="hero-side-note">
        <button className="side-photo side-photo-button" key={`hero-thumb-${activeHeroSlide}`} type="button" aria-label={`Show next ONVI campaign look, ${activeHeroSlide === heroSlides.length - 1 ? "first look" : `look ${activeHeroSlide + 2}`}`} title="Show next look" onClick={advanceHeroSlide}><Image src={heroSlides[activeHeroSlide].thumbnail} alt="" fill sizes="70px"/></button>
        <button className="plus-circle" type="button" aria-label={`Show next ONVI campaign look, ${activeHeroSlide === heroSlides.length - 1 ? "first look" : `look ${activeHeroSlide + 2}`}`} title="Show next look" onClick={advanceHeroSlide}>+</button>
        <span className="side-index" aria-hidden="true">0{activeHeroSlide + 1}<i></i>0{heroSlides.length}</span>
        <p aria-live="polite">{heroSlides[activeHeroSlide].note}</p>
      </div>
    </section>

    <section className="order-story section-dark" id="process" aria-labelledby="process-title">
      <div className="order-story-visual">
        {processScenes.map((scene, index) => (
          <div className={`order-story-image-frame${index === 0 ? " is-active" : ""}`} key={scene.title}>
            <Image className="order-story-image" src={scene.image} alt={scene.alt} fill sizes="(max-width:700px) 100vw, 48vw" />
            <div className="order-story-image-note"><span>ONVI / FIELD NOTE 00{index + 1}</span><strong>{scene.note}</strong></div>
          </div>
        ))}
        <div className="order-story-image-shade" aria-hidden="true" />
      </div>
      <div className="order-story-content">
        <p className="section-number light">02 <span></span></p>
        <p className="eyebrow">A different way to make</p>
        <h2 id="process-title">Small editions.<br/><em>Made to order.</em></h2>
        <p className="order-story-lede">Here’s how an ONVI design becomes yours.</p>
        <div className="order-story-steps">
          {processScenes.map((scene, index) => (
            <article className={`order-story-step${index === 0 ? " is-active" : ""}`} key={scene.title}>
              <span>0{index + 1}</span><div><h3>{scene.title}</h3><p>{scene.text}</p></div>
            </article>
          ))}
        </div>
        <div className="order-story-progress" aria-hidden="true">
          {processScenes.map((scene, index) => <span key={scene.title}><i className="order-story-progress-fill" /></span>)}
        </div>
        <div className="order-story-actions">
          <Link className="pill-link" href="/collection"><span className="circle-arrow"><ArrowIcon /></span><span>Explore the collection</span></Link>
          <Link className="order-story-enquire" href="/contact">Ask us a question <span>↗</span></Link>
        </div>
      </div>
    </section>

    <section className="collection section-ivory" id="collection" aria-labelledby="home-collection-title">
      <div className="section-intro collection-intro" data-reveal>
        <p className="section-number">03 <span></span></p>
        <h2 id="home-collection-title">The<br/>collection</h2>
        <p className="intro-copy">Different pieces. Different moments. A collection designed for your everyday story.</p>
        <Link className="text-link" href="/collection"><span className="circle-arrow dark"><ArrowIcon/></span>View all</Link>
      </div>
      <div className="home-category-rail" aria-label="Shop the collection by category">
        {[{ name: "All Pieces", href: "/collection", product: products.find((p) => p.slug === "linen-asymmetry-top") ?? products[0] }, ...occasionCategories.map((occasion) => ({ name: occasion, href: `/collection?occasion=${encodeURIComponent(occasion)}`, product: products.find((p) => p.occasions.includes(occasion)) ?? products[0] }))].map((category, index) => (
          <Link className="home-category-card" href={category.href} key={category.name} data-reveal aria-label={`Explore ${category.name}`}>
            <Image src={category.product.image} alt={category.name === "All Pieces" ? "Explore all ONVI clothing pieces" : `${category.name} from the ONVI collection`} fill sizes="(max-width:700px) 43vw, (max-width:1000px) 23vw, 17vw" />
            <span className="home-category-shade" aria-hidden="true" />
            <span className="home-category-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="home-category-label">{category.name}<span className="home-category-arrow"><ArrowIcon /></span></span>
          </Link>
        ))}
      </div>
    </section>

    <section className="style-study section-dark" id="styles">
      <div className="style-intro" data-reveal><p className="section-number light">04 <span></span></p><h2>One piece.<br/>Many versions.</h2><p className="intro-copy">From quiet mornings to bold evenings. The same piece moves with you.</p><a className="text-link light-link" href="#collection"><span className="circle-arrow"><ArrowIcon/></span>Explore styles</a></div>
      <div className="look-stage" data-reveal>
        <button className={`look-card look-day ${activeLook === "day" ? "selected" : ""}`} onClick={() => setActiveLook("day")} aria-pressed={activeLook === "day"}><Image src="/images/model-ivory-top.jpg" alt="Ivory ONVI look for daytime" fill sizes="(max-width:700px) 45vw,23vw"/><span className="look-overlay"></span><span className="look-caption"><strong>Day</strong><small>Work &amp; meetings</small></span></button>
        <button className="look-switch" aria-label="Switch day and evening looks" onClick={() => setActiveLook(activeLook === "day" ? "evening" : "day")}><ArrowIcon/><ArrowIcon/></button>
        <button className={`look-card look-evening ${activeLook === "evening" ? "selected" : ""}`} onClick={() => setActiveLook("evening")} aria-pressed={activeLook === "evening"}><Image src="/images/model-orange-dress.jpg" alt="Rust ONVI look for evening" fill sizes="(max-width:700px) 45vw,23vw"/><span className="look-overlay"></span><span className="look-caption"><strong>Evening</strong><small>Dinners &amp; outings</small></span></button>
      </div>
      <div className="style-index"><button className={activeLook === "day" ? "active" : ""} onClick={() => setActiveLook("day")}><span>01</span> Day</button><button className={activeLook === "evening" ? "active" : ""} onClick={() => setActiveLook("evening")}><span>02</span> Evening</button><button onClick={() => scrollTo("journal")}><span>03</span> Weekend</button></div>
    </section>

    <section className="details-section section-ivory">
      <div className="section-intro details-intro" data-reveal><p className="section-number">05 <span></span></p><h2>Thoughtful<br/>details</h2><p className="intro-copy">Quality you can feel. Details that make it yours.</p><a className="text-link" href="#process"><span className="circle-arrow dark"><ArrowIcon/></span>See our process</a></div>
      <div className="details-rail">{details.map((d) => <article className="detail-card" key={d.title} data-reveal><div className="detail-image"><Image src={d.image} alt={d.title} fill sizes="(max-width:700px) 43vw,18vw"/></div><h3>{d.title}</h3><p>{d.text}</p></article>)}</div>
    </section>

    <section className="journal section-dark" id="journal">
      <div className="journal-copy" data-reveal><p className="section-number light">06 <span></span></p><h2>Real people.<br/>Real days.</h2><p className="intro-copy">A glimpse into the world of ONVI through real people, real moments, and their unique style.</p><Link className="pill-link journal-link" href="/journal"><span className="circle-arrow"><ArrowIcon/></span><span>Explore the journal</span></Link></div>
      <div className="journal-collage" data-reveal><div className="journal-photo journal-photo-one"><Image src="/images/model-burgundy.jpg" alt="ONVI in everyday life" fill sizes="(max-width:700px) 35vw,20vw"/></div><div className="journal-photo journal-photo-two"><Image src="/images/model-orange-dress.jpg" alt="ONVI style portrait" fill sizes="(max-width:700px) 35vw,20vw"/></div><div className="journal-photo journal-photo-three"><Image src="/images/model-ivory-top.jpg" alt="ONVI editorial portrait" fill sizes="(max-width:700px) 35vw,20vw"/></div><div className="journal-photo journal-photo-four"><Image src="/images/model-botanical-dress.jpg" alt="ONVI botanical dress" fill sizes="(max-width:700px) 35vw,20vw"/></div><p className="handwritten">Different<br/>looks.<br/>Same you.</p><div className="journal-pagination"><span>01</span><i></i><span>03</span></div></div>
    </section>

    <section className="manifesto manifesto-editorial" id="story" aria-label="ONVI brand story">
      <div className="manifesto-copy">
        <p>Clothes<br/>for<br/>real<br/>days</p>
        <span></span>
        <small>Thoughtfully made.<br/>Naturally you.</small>
      </div>

      <div className="manifesto-image" data-reveal>
        <div className="manifesto-arch-line" aria-hidden="true"></div>
        <Image className="manifesto-main-photo" src="/images/model-ivory-top.jpg" alt="ONVI ivory look in natural daylight" fill priority sizes="(max-width:700px) 100vw,52vw"/>
        <div className="manifesto-collage-photo" aria-hidden="true">
          <Image src="/images/model-botanical-dress.jpg" alt="" fill sizes="(max-width:700px) 28vw,17vw"/>
        </div>
        <div className="manifesto-collage-shadow" aria-hidden="true">
          <Image src="/images/model-burgundy.jpg" alt="" fill sizes="(max-width:700px) 24vw,12vw"/>
        </div>
        <div className="manifesto-mark" aria-label="ONVI field note 001">
          <span>FIELD NOTE / 001</span><strong>ONVI</strong><i></i><small>MADE TO BE SEEN</small>
        </div>
        <div className="manifesto-counter" aria-hidden="true"><span>08</span><i></i><span>01</span></div>
      </div>

      <div className="manifesto-end">
        <span className="manifesto-kicker">A point of view</span>
        <p>We believe<br/>in a brighter,<br/>kinder fashion<br/>future.</p>
        <Link className="text-link" href="/story"><span className="circle-arrow dark"><ArrowIcon/></span>Our story</Link>
      </div>
    </section>

    <section className="newsletter section-ivory" id="contact">
      <div className="newsletter-form-wrap"><p className="section-number">08 <span></span></p><p className="eyebrow">A little ONVI in your inbox</p><h2>Be part of our journey.</h2><p className="newsletter-copy">Get first looks at new collections, styling notes and early access to selected releases. No noise—only things worth seeing.</p>{subscribed ? <p className="success-message" role="status">You’re on the list. See you out there.</p> : <form className="newsletter-form" onSubmit={submitNewsletter}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" required/><button type="submit" aria-label="Subscribe"><ArrowIcon/></button></form>}<p className="newsletter-fineprint">By subscribing, you agree to receive occasional ONVI updates.</p></div>
      <div className="newsletter-visual"><div className="newsletter-swatches" aria-hidden="true"><span><Image src="/images/model-botanical-dress.jpg" alt="" fill sizes="100px"/></span><span><Image src="/images/model-burgundy.jpg" alt="" fill sizes="100px"/></span><span><Image src="/images/model-orange-dress.jpg" alt="" fill sizes="100px"/></span></div><p className="newsletter-note">Thoughtful pieces.<br/>Distinctive by nature.</p><div className="newsletter-mark" aria-label="ONVI field notes, made to be seen"><span className="mark-index">ONVI / 001</span><strong>MADE<br/>TO BE<br/>SEEN.</strong><span className="mark-rule"></span><small>FIELD NOTES<br/>CLOTHES FOR REAL DAYS</small></div></div>
    </section>

    <SiteFooter />
  </main>;
}
function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14M12 5.5l6.5 6.5-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="m15 15 4.3 4.3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
