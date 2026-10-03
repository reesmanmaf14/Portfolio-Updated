import { Braces, Code2, Database, Monitor, Server, Sparkles, Wrench } from 'lucide-react';
import { skillGroups } from '../data/skills.js';
import SectionHeading from './SectionHeading.jsx';

const icons = { Braces, Code2, Database, Monitor, Server, Sparkles, Wrench };

// Bento layout on large screens (in the order of skillGroups).
const spans = ['lg:col-span-6', 'lg:col-span-6', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-7', 'md:col-span-2 lg:col-span-5'];

function SkillCard({ group, span }) {
  const Icon = icons[group.icon] ?? Code2;
  return (
    <article
      className={`card spot lift group flex flex-col p-6 sm:p-7 ${span} ${
        group.exploring ? 'border-dashed bg-transparent shadow-none' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="font-mono text-xs text-faint">
          {group.exploring ? 'learning' : `${group.items.length} ${group.items.length === 1 ? 'item' : 'items'}`}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-bold">{group.name}</h3>
      <p className="mt-1 text-sm text-muted">{group.blurb}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.name} technologies`}>
        {group.items.map((item) => (
          <li
            key={item}
            className={`chip hover:border-accent/50 hover:text-accent-ink hover:shadow-[0_0_18px_-6px_var(--accent)] ${
              group.exploring ? 'chip-accent' : ''
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          id="skills-title"
          title="Skills"
          lead="Technologies and concepts I work with."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12" data-stagger>
          {skillGroups.map((g, i) => (
            <SkillCard key={g.name} group={g} span={spans[i] ?? 'lg:col-span-4'} />
          ))}
        </div>
      </div>
    </section>
  );
}
