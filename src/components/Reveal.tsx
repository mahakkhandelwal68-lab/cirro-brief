"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let raf = 0;
    const show = () => {
      setVisible(true);
      cleanup();
    };
    // An observer alone misses elements that a fast scroll or an anchor jump
    // skips over between frames, leaving them invisible. Anything at or above
    // the lower edge of the viewport counts as reached.
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) show();
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    function cleanup() {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    }

    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return cleanup;
  }, []);

  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}
