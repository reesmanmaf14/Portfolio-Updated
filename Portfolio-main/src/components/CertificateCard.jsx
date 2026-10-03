import { Award, BadgeCheck, CalendarDays, Eye } from 'lucide-react';

/**
 * One certification. `onView` opens the image modal; when the cert only has a
 * `file` (e.g. a PDF) the button opens it in a new tab instead.
 */
export default function CertificateCard({ cert, onView }) {
  const { title, issuer, date, skills = [], image, file, credentialUrl, placeholder } = cert;
  const canView = Boolean(image || file);

  return (
    <article className="card spot lift group flex h-full flex-col overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface-2">
        {image ? (
          <img
            src={image}
            alt={`${title} certificate`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid-bg absolute inset-0 [mask-image:none]" aria-hidden="true" />
        )}
        {!image && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-2xl border border-line-strong bg-surface text-accent-ink shadow-lg transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
              <Award size={28} aria-hidden="true" />
            </span>
          </div>
        )}
        {placeholder && (
          <span className="absolute left-3 top-3 rounded-md border border-dashed border-err/60 bg-bg/80 px-2 py-0.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-err backdrop-blur">
            Placeholder
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start gap-3">
          <Award size={18} className="mt-1 shrink-0 text-accent-ink" aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-snug">{title}</h3>
            <p className="mt-1 text-sm font-semibold text-muted">{issuer}</p>
          </div>
        </div>
        {date && (
          <p className="mt-3 flex items-center gap-2 font-mono text-xs text-faint">
            <CalendarDays size={14} aria-hidden="true" /> {date}
          </p>
        )}
        {skills.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Related skills">
            {skills.map((s) => (
              <li key={s} className="chip px-2.5 py-1 text-[0.75rem]">
                {s}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {image ? (
            <button type="button" className="btn btn-sm flex-1" onClick={() => onView(cert)}>
              <Eye size={16} aria-hidden="true" /> View Certificate
            </button>
          ) : file ? (
            <a href={file} target="_blank" rel="noopener noreferrer" className="btn btn-sm flex-1">
              <Eye size={16} aria-hidden="true" /> View Certificate
            </a>
          ) : (
            <button type="button" className="btn btn-sm flex-1" disabled={!canView} title="Certificate not added yet">
              <Eye size={16} aria-hidden="true" /> View Certificate
            </button>
          )}
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              aria-label={`Verify ${title} credential`}
            >
              <BadgeCheck size={16} aria-hidden="true" /> Verify
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
