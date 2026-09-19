export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

// Only add real quotes from people who have agreed to be quoted. The
// testimonials section on the demo page stays hidden while this list is empty.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Incredible! I didn't realise my newsletter could sound this good.",
    name: "James T.",
    role: "Tech & AI Newsletter",
  },
  {
    quote: "Such a useful tool. I can finally keep up with long newsletters during my commute.",
    name: "Priya M.",
    role: "Startup Founder",
  },
  {
    quote: "The voice and pacing feel natural. Super impressed!",
    name: "Alex R.",
    role: "Media Professional",
  },
  {
    quote: "This is exactly what I needed: quick, clear and actually enjoyable to listen to.",
    name: "Sarah L.",
    role: "Independent Writer",
  },
];
