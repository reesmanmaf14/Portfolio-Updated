import { useRef } from 'react';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { heroIntro, portraitParallax, useGsap } from '../animations/animations.js';
import { heroTech, profile } from '../data/profile.js';
import { experience } from '../data/timeline.js';
import SocialLinks from './SocialLinks.jsx';

// Positions for the floating technology labels around the portrait.
const tagPos = [
  'left-[-6%] top-[8%]',
  'right-[-8%] top-[22%]',
  'left-[-10%] top-[52%]',
  'right-[-4%] bottom-[18%]',
  'left-[14%] bottom-[-4%]',
];

export default function Hero() {
  const scope = useRef(null);
  const portrait = useRef(null);
  const current = experience.find((e) => e.current);

  useGsap(() => {
    const killIntro = heroIntro();
    const killParallax = portraitParallax(portrait.current);
    return () => {
      killIntro();
      killParallax?.();
    };
  }, scope);

  return (
    <section id="home" ref={scope} className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-28 lg:pt-32">
      {/* Background: faint grid + soft accent glow */}
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }}
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Text column */}
        <div className="lg:col-span-7">
          <p data-hero="eyebrow" className="eyebrow mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{profile.role}</span>
            
          </p>

          <h1 className="text-[clamp(2.9rem,8.5vw,5.75rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            {['Hi,', 'I’m'].map((w) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span data-hero="word" className="inline-block">
                  {w}&nbsp;
                </span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-hero="word" className="inline-block bg-gradient-to-r from-ink via-ink to-accent bg-clip-text text-transparent">
                {profile.name}.
              </span>
            </span>
          </h1>

          <p data-hero="text" className="mt-7 max-w-xl text-xl font-medium leading-relaxed text-ink/90 sm:text-[1.35rem]">
            {profile.headline}
          </p>
          <p data-hero="text" className="mt-4 max-w-xl text-base text-muted sm:text-lg">
            {profile.intro}
          </p>

          <div data-hero="text" className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
            </a>
            <a href={profile.cv} download className="btn">
              <Download size={18} className="btn-arrow btn-arrow-down" aria-hidden="true" /> Download CV
            </a>
          </div>

          <SocialLinks data-hero="text" className="mt-8" />
        </div>

        {/* Portrait column */}
        <div className="order-first mx-auto w-full max-w-[15rem] sm:max-w-sm lg:order-none lg:col-span-5 lg:max-w-none lg:pl-8">
          <div data-hero="portrait" className="relative">
            <div ref={portrait} className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.5rem] border border-dashed border-line-strong opacity-70"
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-surface p-2 shadow-2xl shadow-black/30">
                <img
                  src={profile.image}
                  alt="Illustrated portrait representing a girl at a computer"
                  width="640"
                  height="640"
                  fetchPriority="high"
                  className="aspect-square w-full rounded-[1.6rem] object-cover"
                />
               
              </div>
            </div>

            {heroTech.map((t, i) => (
              <span
                key={t}
                data-hero="tag"
                className={`absolute ${tagPos[i]} hidden sm:block`}
              >
                <span
                  className="float block rounded-full border border-line-strong bg-surface/85 px-3.5 py-1.5 font-mono text-xs font-medium text-ink shadow-lg shadow-black/20 backdrop-blur-md"
                  style={{ animationDelay: `${i * -1.3}s` }}
                >
                  <span className="text-accent-ink">#</span>
                  {t}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#about"
        data-hero="scroll"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-ink md:flex"
        aria-label="Scroll to About section"
      >
        <span className="flex h-9 w-5.5 justify-center rounded-full border border-current pt-1.5">
          <span className="scroll-dot block size-1 rounded-full bg-current" />
        </span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
