import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';
import { GithubIcon } from './BrandIcons.jsx';
import ProjectCard from './ProjectCard.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section border-y border-line bg-bg-2">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          id="projects-title"
          title="Projects"
          lead="A collection of projects showcasing my skills, creativity, and problem-solving."
        />

        <div className="space-y-8 md:space-y-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} reverse={i % 2 === 1} />
          ))}
        </div>

        <div
          className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:p-8"
          data-reveal
        >
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-xl border border-line bg-surface text-ink">
              <GithubIcon size={22} />
            </span>
            <div>
              <p className="font-bold">More on GitHub</p>
              <p className="text-sm text-muted">Browse all of my repositories.</p>
            </div>
          </div>
          <a href={profile.githubRepos} target="_blank" rel="noopener noreferrer" className="btn">
            View All Projects <ArrowUpRight size={18} className="btn-arrow btn-arrow-diag" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
