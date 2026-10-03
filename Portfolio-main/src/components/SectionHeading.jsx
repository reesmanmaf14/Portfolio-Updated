export default function SectionHeading({ index, eyebrow, title, lead, id, className = '' }) {
  return (
    <header className={`mb-12 max-w-2xl md:mb-16 ${className}`} data-reveal>
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="text-faint">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-4xl font-extrabold sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-5 text-lg text-muted">{lead}</p>}
    </header>
  );
}
