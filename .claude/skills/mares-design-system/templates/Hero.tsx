/**
 * Hero (Service variant) — Mareš Design System
 *
 * The most common hero pattern: dark background, left column with H1 +
 * description + buttons, right column with orange-bordered stat blocks.
 *
 * Other documented variants (homepage / content / blog-listing / blog-article
 * / training) follow the same two-column flex pattern with different right-column
 * content. See references/components.md#hero for the full variant set.
 *
 * Buttons inside a hero follow the content flow on the left column — they are
 * NOT wrapped in `flex justify-end` (that is a card/form convention).
 */
import * as React from 'react';

interface Stat {
  value: string;
  label: string;
}

interface HeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  stats?: Stat[];
}

export function Hero({ title, description, actions, stats = [] }: HeroProps) {
  return (
    <div className="bg-zinc-900">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex flex-col gap-y-8 lg:flex-row lg:justify-between">
          <div className="max-w-xl">
            <h1 className="font-display font-bold text-white text-3xl md:text-4xl leading-tight">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 text-zinc-400 text-base">{description}</p>
            ) : null}
            {actions ? (
              <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
            ) : null}
          </div>
          {stats.length > 0 ? (
            <div className="flex flex-col gap-6 lg:pt-2">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-orange-500 pl-6">
                  <span className="font-body text-3xl font-bold text-white">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * Accent-word pattern inside the title:
 *
 *   <Hero
 *     title={<>DevOps services <span className="text-orange-500">tailored</span></>}
 *     description="I help companies build and manage modern infrastructure…"
 *     actions={
 *       <>
 *         <Button variant="white" size="small">Partnership</Button>
 *         <Button variant="white" size="small">Training</Button>
 *       </>
 *     }
 *     stats={[
 *       { value: '6+ years',   label: 'of DevOps and cloud experience' },
 *       { value: '20+ projects', label: 'completed across industries' },
 *     ]}
 *   />
 *
 * For the LIGHT homepage variant: change `bg-zinc-900` to `bg-white`,
 * H1 color to `text-zinc-900`, description to `text-zinc-600`,
 * and replace the stats column with an avatar block:
 *
 *   <div className="shrink-0 ml-6 lg:ml-0 -mb-16 -mr-6 overflow-hidden">
 *     <div className="w-48 h-72 sm:w-60 sm:h-88 lg:w-64 lg:h-96 bg-zinc-700" />
 *   </div>
 */
