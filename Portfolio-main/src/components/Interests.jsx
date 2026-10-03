import { Brain, Code2, Database, Layers, Palette, ShieldCheck } from 'lucide-react';
import { interests } from '../data/interests.js';
import SectionHeading from './SectionHeading.jsx';

const icons = { Brain, Code2, Database, Layers, Palette, ShieldCheck };

export default function Interests() {
  return (
    <section id="interests" aria-labelledby="interests-title" className="section border-y border-line bg-bg-2">
      <div className="container-x">
        <SectionHeading
          index="07"
          eyebrow="Interests"
          id="interests-title"
          title="Areas of Interest"
          lead="Domains I enjoy exploring and want to keep growing in as a developer."
        />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {interests.map((it, i) => {
            const Icon = icons[it.icon] ?? Code2;
            return (
              <li key={it.title} className="spot group relative flex flex-col bg-surface p-7 transition-colors duration-500 hover:bg-surface-2 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl border border-line bg-surface-2 text-accent-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-faint transition-colors group-hover:text-accent-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold leading-snug">{it.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{it.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
