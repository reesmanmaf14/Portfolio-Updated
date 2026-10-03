import { ArrowUpRight, Check } from 'lucide-react';
import { tiltHandlers } from '../animations/animations.js';
import { GithubIcon } from './BrandIcons.jsx';

const tilt = tiltHandlers(3);

export default function ProjectCard({ project, index, reverse = false }) {
  const { title, subtitle, desc, tech, features = [], type, image, github, live } = project;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="card spot group overflow-hidden p-3 hover:-translate-y-1.5 hover:border-accent/40 sm:p-4" data-reveal>
      <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Media: browser-frame mockup with zoom + tilt */}
        <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`} style={{ perspective: 1200 }}>
          <div
            {...tilt}
            className="overflow-hidden rounded-2xl border border-line bg-surface-2 will-change-transform"
          >
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="ml-3 truncate font-mono text-[0.7rem] text-faint">{title.toLowerCase().replace(/\s+/g, '-')}</span>
            </div>
            <div className="aspect-[16/9] overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={`Screenshot of ${title}`}
                  loading="lazy"
                  decoding="async"
                  width="1400"
                  height="788"
                  className="size-full object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
              ) : (
                <div className="grid size-full place-items-center text-sm text-faint">Screenshot placeholder</div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`px-3 pb-4 lg:col-span-5 lg:px-2 lg:py-6 ${reverse ? 'lg:order-1 lg:pl-6' : 'lg:pr-6'}`}>
          <div className="flex items-center gap-3 font-mono text-xs text-faint">
            <span className="text-accent-ink">{number}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span className="uppercase tracking-[0.12em]">{type}</span>
          </div>
          <h3 className="mt-4 text-3xl font-extrabold sm:text-[2.1rem]">{title}</h3>
          {subtitle && <p className="mt-1.5 font-semibold text-muted">{subtitle}</p>}
          <p className="mt-4 text-[0.97rem] leading-relaxed text-muted">{desc}</p>

          {features.length > 0 && (
            <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2" aria-label="Key features">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={15} className="mt-[3px] shrink-0 text-accent-ink" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {tech.map((t) => (
              <li key={t} className="chip px-2.5 py-1 font-mono text-[0.72rem] font-medium">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-sm" aria-label={`${title} source code on GitHub`}>
                <GithubIcon size={17} /> GitHub
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" aria-label={`${title} live demo`}>
                Live Demo <ArrowUpRight size={17} className="btn-arrow btn-arrow-diag" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
