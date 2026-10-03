import { FileText, GraduationCap, MapPin, Target, Building2 } from 'lucide-react';
import { about, profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

const factIcons = { Education: GraduationCap, Institution: Building2, Focus: Target, Location: MapPin };

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-line bg-bg-2">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading index="01" eyebrow="About" title="About Me" id="about-title" className="mb-8!" />
          <div className="space-y-5 text-lg leading-relaxed text-muted" data-reveal>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8" data-reveal>
            <p className="eyebrow mb-3 text-faint!">Development interests</p>
            <ul className="flex flex-wrap gap-2">
              {about.interests.map((i) => (
                <li key={i} className="chip chip-accent">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:pt-24" data-reveal>
          <div className="card spot overflow-hidden p-7 sm:p-8">
            <h3 className="text-lg font-bold">More about me</h3>
            <dl className="mt-6 divide-y divide-line">
              {about.facts.map(({ label, value }) => {
                const Icon = factIcons[label];
                return (
                  <div key={label} className="flex items-center gap-4 py-4 first:pt-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-ink">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">{label}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn mt-4 w-full">
              <FileText size={18} aria-hidden="true" /> View CV
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
