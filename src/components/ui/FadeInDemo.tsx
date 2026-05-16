import { useEffect, useRef } from 'react';

export default function FadeInDemo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id="fade-in-demo"
      className="opacity-0 bg-zinc-900 text-zinc-100 px-8 py-6 text-center font-heading text-sm"
    >
      <p className="font-semibold mb-1">This element fades in</p>
      <p className="text-zinc-400 text-xs">animation: fadeInUp 0.6s ease-out</p>
    </div>
  );
}
