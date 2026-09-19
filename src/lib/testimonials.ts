export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image?: string;
}

// Only add real quotes from people who have agreed to be quoted. The
// testimonials section on the demo page stays hidden while this list is empty.
export const TESTIMONIALS: Testimonial[] = [];
