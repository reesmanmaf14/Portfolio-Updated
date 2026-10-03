import SectionHeading from './SectionHeading.jsx';

/** Vertical timeline: the line draws with scroll, nodes pop in, cards slide in. */
export function Timeline({ items, Icon }) {
  return (
    <ol className="relative pl-12 sm:pl-14" data-timeline>
      <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-line sm:left-[23px]" />
      <span
        aria-hidden="true"
        data-tl-line
        className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-transparent sm:left-[23px]"
      />
      {items.map((item) => (
        <li key={item.title} className="relative pb-8 last:pb-0">
          <span
            data-tl-node
            aria-hidden="true"
            className="absolute -left-12 top-5 grid size-10 place-items-center rounded-xl border border-line-strong bg-surface text-accent-ink shadow-[0_0_0_6px_var(--bg)] sm:-left-14 sm:size-12"
          >
            <Icon size={18} />
          </span>
          <article data-tl-item className="card spot lift p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {item.date && <p className="font-mono text-xs text-accent-ink">{item.date}</p>}
              {item.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/30 bg-ok/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-ok">
                  <span className="pulse size-1.5 rounded-full bg-ok" aria-hidden="true" /> Current
                </span>
              )}
            </div>
            <h3 className="mt-3 text-xl font-bold leading-snug">{item.title}</h3>
            {item.org && <p className="mt-1 font-semibold text-muted">{item.org}</p>}
            {item.meta?.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {item.meta.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
            {item.desc && <p className="mt-4 leading-relaxed text-muted">{item.desc}</p>}
            {item.tags?.length > 0 && (
              <>
                <p className="mt-5 text-sm font-bold">{item.tagsLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <li key={t} className="chip chip-accent px-2.5 py-1 text-[0.75rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}

/** A section wrapping a heading + timeline (Education, Experience). */
export default function TimelineSection({ id, index, eyebrow, title, items, Icon }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-4">
      <SectionHeading index={index} eyebrow={eyebrow} title={title} id={`${id}-title`} className="mb-10!" />
      <Timeline items={items} Icon={Icon} />
    </section>
  );
}
