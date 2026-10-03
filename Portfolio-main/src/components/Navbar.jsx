import { useEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'interests', label: 'Interests' },
];

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e0f12' : '#f6f6f3');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['home', ...ids, 'exploring', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = links.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection(ids);
  const menuBtn = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock scroll, Escape closes, focus moves into the panel.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    // Wait a frame so the panel is visible (focusable) before moving focus into it.
    const raf = requestAnimationFrame(() => panel.current?.querySelector('a')?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid
          ? 'border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="btn btn-sm sr-only focus:not-sr-only focus:absolute! focus:left-4 focus:top-3 focus:z-10"
      >
        Skip to content
      </a>
      <div className={`container-x flex items-center gap-3 transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
        <a href="#home" className="group mr-auto flex items-center gap-2.5 font-extrabold tracking-tight" aria-label="Reesman, back to top">
         
          <span className="text-lg">
            Reesman<span className="text-accent">.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative block rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-300 hover:text-ink ${
                    active === l.id ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="btn btn-primary btn-sm ml-2 hidden lg:inline-flex">
          Let’s Connect
        </a>
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          ref={menuBtn}
          type="button"
          className="icon-btn lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panel}
        inert={!open}
        className={`absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-bg duration-500 lg:hidden ${
          // visibility only animates on close, so the panel is focusable the moment it opens
          open
            ? 'visible translate-y-0 opacity-100 transition-[opacity,transform]'
            : 'invisible -translate-y-3 opacity-0 transition-[opacity,transform,visibility]'
        }`}
      >
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="divide-y divide-line">
            {[...links, { id: 'contact', label: 'Contact' }].map((l, i) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`flex items-baseline gap-4 py-4 text-2xl font-bold tracking-tight transition-colors ${
                    active === l.id ? 'text-accent-ink' : 'text-ink'
                  }`}
                >
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
