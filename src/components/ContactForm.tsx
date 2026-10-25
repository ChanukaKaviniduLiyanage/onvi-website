"use client";
import { useState } from "react";
export default function ContactForm({ product = "", size = "" }: { product?: string; size?: string }) {
  const [attempted, setAttempted] = useState(false);
  const initialMessage = product
    ? `I'm interested in ${product}${size ? ` in size ${size}` : ""}. Could you confirm current availability and whether this standard size is available? If I order today, what would the estimated delivery be?`
    : "";
  return <>
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setAttempted(true); }}>
      <label>Your name<input name="name" placeholder="Name" required/></label>
      <label>Email address<input type="email" name="email" placeholder="you@example.com" required/></label>
      <label>What are you enquiring about?<select name="topic" defaultValue={product ? "product" : "general"}><option value="general">General question</option><option value="product">A product or size</option><option value="order">An existing order</option><option value="delivery">Delivery information</option></select></label>
      <label>Message<textarea name="message" rows={5} defaultValue={initialMessage} placeholder="Name the piece and size, then ask about availability and estimated delivery." required/></label>
      <button className="solid-link" type="submit">Prepare enquiry <span>↗</span></button>
      {attempted ? <p className="form-note" role="status">Your details have not been sent. This form needs to be connected to ONVI’s email or CRM service before it can deliver messages.</p> : <p className="form-note">This preview form does not send messages yet. Connect it to your email provider before publishing.</p>}
    </form>
  </>;
}
