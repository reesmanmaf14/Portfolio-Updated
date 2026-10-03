import { useEffect, useRef, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { certifications } from '../data/certifications.js';
import CertificateCard from './CertificateCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Certifications() {
  const [active, setActive] = useState(null);
  const dialog = useRef(null);

  // Native <dialog> gives focus trapping, Escape-to-close and a backdrop for free.
  useEffect(() => {
    const d = dialog.current;
    if (active && d && !d.open) d.showModal();
  }, [active]);

  const hasPlaceholders = certifications.some((c) => c.placeholder);

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Credentials"
          id="certifications-title"
          title="Certifications"
          lead="Courses and certificates that support my learning."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {certifications.map((c, i) => (
            <CertificateCard key={`${c.title}-${i}`} cert={c} onView={setActive} />
          ))}
        </div>

       
      </div>

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        aria-labelledby="cert-dialog-title"
        className="m-auto w-[min(960px,calc(100%-2rem))] max-h-[90dvh] overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink"
      >
        {active && (
          <div className="flex max-h-[90dvh] flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <h3 id="cert-dialog-title" className="truncate font-bold">
                  {active.title}
                </h3>
                <p className="truncate text-sm text-muted">
                  {active.issuer}
                  {active.date && ` · ${active.date}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {(active.file || active.image) && (
                  <a
                    href={active.file || active.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    aria-label="Open certificate in a new tab"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <button type="button" className="icon-btn" onClick={() => dialog.current.close()} aria-label="Close certificate preview">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-auto bg-bg p-4">
              <img src={active.image} alt={`${active.title} certificate`} className="mx-auto h-auto max-w-full rounded-lg" />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
