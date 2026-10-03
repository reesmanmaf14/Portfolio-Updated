import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOTION = '(prefers-reduced-motion: no-preference)';

/**
 * Runs GSAP code only when the user hasn't asked for reduced motion.
 * Everything created inside is scoped to `scopeRef` and reverted on unmount,
 * so with reduced motion the content simply renders in place.
 */
export function useGsap(setup, scopeRef) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scopeRef?.current ?? undefined);
    mm.add(MOTION, setup);
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Declarative scroll animations driven by data attributes:
 *   data-reveal            fade + rise when scrolled into view
 *   data-stagger           children fade + rise one after another
 *   data-timeline          vertical line draws with scroll; contains
 *     data-tl-line           the line (scaleY 0 → 1, scrubbed)
 *     data-tl-node           node dots that pop in
 *     data-tl-item           cards that slide in
 */
export function scrollReveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 28,
      clearProps: 'transform',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  gsap.utils.toArray('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 26,
      clearProps: 'transform',
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  gsap.utils.toArray('[data-timeline]').forEach((tl) => {
    const line = tl.querySelector('[data-tl-line]');
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: tl, start: 'top 80%', end: 'bottom 65%', scrub: 0.6 },
        },
      );
    }
    tl.querySelectorAll('[data-tl-node]').forEach((node) => {
      gsap.from(node, {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(2.2)',
        scrollTrigger: { trigger: node, start: 'top 85%', once: true },
      });
    });
    tl.querySelectorAll('[data-tl-item]').forEach((item) => {
      gsap.from(item, {
        autoAlpha: 0,
        x: 24,
        clearProps: 'transform',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      });
    });
  });

  // Recalculate positions once fonts/images have settled.
  const refresh = () => ScrollTrigger.refresh();
  if (document.readyState === 'complete') requestAnimationFrame(refresh);
  else window.addEventListener('load', refresh, { once: true });
  return () => window.removeEventListener('load', refresh);
}

/** Hero entrance: staggered text, then portrait, then floating labels. */
export function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('[data-hero="eyebrow"]', { autoAlpha: 0, y: 16, duration: 0.6 })
    .from('[data-hero="word"]', { autoAlpha: 0, yPercent: 110, duration: 0.9, stagger: 0.08 }, '-=0.3')
    .from('[data-hero="text"]', { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.1 }, '-=0.55')
    .from('[data-hero="portrait"]', { autoAlpha: 0, scale: 0.94, y: 24, duration: 1.1 }, 0.25)
    .from('[data-hero="tag"]', { autoAlpha: 0, scale: 0.8, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, '-=0.6')
    .from('[data-hero="scroll"]', { autoAlpha: 0, duration: 0.6 }, '-=0.2');
  return () => tl.kill();
}

/** Subtle portrait parallax that follows the pointer (fine pointers only). */
export function portraitParallax(target) {
  if (!target || !window.matchMedia('(pointer: fine)').matches) return undefined;
  const xTo = gsap.quickTo(target, 'x', { duration: 0.8, ease: 'power3.out' });
  const yTo = gsap.quickTo(target, 'y', { duration: 0.8, ease: 'power3.out' });
  const onMove = (e) => {
    xTo((e.clientX / window.innerWidth - 0.5) * 14);
    yTo((e.clientY / window.innerHeight - 0.5) * 14);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}

/** Small 3D tilt for project media, applied via pointer events. */
export function tiltHandlers(maxDeg = 4) {
  const canTilt = () =>
    window.matchMedia('(pointer: fine)').matches && window.matchMedia(MOTION).matches;
  return {
    onPointerMove(e) {
      if (!canTilt()) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * maxDeg, rotateX: -py * maxDeg, duration: 0.6, ease: 'power3.out', transformPerspective: 1200 });
    },
    onPointerLeave(e) {
      gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
    },
  };
}
