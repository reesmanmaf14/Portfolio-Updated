import { useState } from 'react';
import { ArrowUpRight, FileText, Info, LoaderCircle, Mail, Send } from 'lucide-react';
import { profile } from '../data/profile.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';

/*
 * Contact form
 * ────────────
 * The original site POSTed to http://localhost:5000/api/contact, which only works
 * on your own machine. The endpoint now comes from VITE_CONTACT_API_URL
 * (see .env.example). Request body is unchanged: { name, email, subject, message }.
 * When it isn't configured, submitting opens the visitor's email app with the
 * message pre-filled, so the form never pretends to have sent anything.
 */
const API_URL = import.meta.env.VITE_CONTACT_API_URL?.trim() || '';

// Validation rules and messages carried over from the original site.
const rules = {
  name: (v) => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address, like name@example.com.',
  subject: (v) => v.trim().length >= 3 || 'Enter a subject (at least 3 characters).',
  message: (v) => v.trim().length >= 10 || 'Write a message of at least 10 characters.',
};

const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', full: true },
  { name: 'message', label: 'Message', textarea: true, full: true },
];

const empty = { name: '', email: '', subject: '', message: '' };

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: 'GitHub', value: 'github.com/reesmanmaf14', href: profile.github, Icon: GithubIcon, ext: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/reesman14', href: profile.linkedin, Icon: LinkedinIcon, ext: true },
  { label: 'CV', value: 'Download my CV (PDF)', href: profile.cv, Icon: FileText, download: true },
];

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const validate = (name, value) => {
    const r = rules[name](value);
    return r === true ? '' : r;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Like the original: re-check only fields already marked invalid.
    if (errors[name]) setErrors((er) => ({ ...er, [name]: validate(name, value) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = Object.fromEntries(Object.keys(rules).map((k) => [k, validate(k, values[k])]));
    setErrors(next);
    const firstBad = Object.keys(next).find((k) => next[k]);
    if (firstBad) {
      e.currentTarget.elements[firstBad].focus();
      setStatus({ type: 'error', text: 'Please fix the highlighted fields.' });
      return;
    }

    const data = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()]));

    if (!API_URL) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ type: 'info', text: 'Opening your email app with the message filled in…' });
      return;
    }

    setStatus({ type: 'sending', text: '' });
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message || 'Something went wrong.');
      setValues(empty);
      setErrors({});
      setStatus({ type: 'success', text: 'Your message has been sent successfully!' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Unable to send your message. Please try again later.' });
    }
  };

  const sending = status.type === 'sending';

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 size-[34rem] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }}
      />

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="text-faint">08</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Contact
          </p>
          <h2 id="contact-title" className="text-[clamp(2.6rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            Let’s  <span className="text-accent-ink">connect.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            I'm always interested in connecting with people, discussing technology, and exploring opportunities to build meaningful software solutions.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {channels.map(({ label, value, href, Icon, ext, download }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(download ? { download: true } : {})}
                  className="group flex items-center gap-4 py-4 transition-colors"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors group-hover:border-accent/50 group-hover:text-accent-ink">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">{label}</span>
                    <span className="block truncate font-semibold transition-colors group-hover:text-accent-ink">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-faint transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="card p-6 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((f) => {
                const id = `f-${f.name}`;
                const err = errors[f.name];
                const Tag = f.textarea ? 'textarea' : 'input';
                return (
                  <div key={f.name} className={`grid gap-2 ${f.full ? 'sm:col-span-2' : ''}`}>
                    <label htmlFor={id} className="text-sm font-semibold">
                      {f.label}
                    </label>
                    <Tag
                      id={id}
                      name={f.name}
                      type={f.textarea ? undefined : f.type || 'text'}
                      autoComplete={f.autoComplete}
                      required
                      value={values[f.name]}
                      onChange={onChange}
                      aria-invalid={err ? 'true' : 'false'}
                      aria-describedby={`${id}-e`}
                      className={`field ${f.textarea ? 'min-h-40 resize-y' : ''}`}
                    />
                    <span id={`${id}-e`} className="min-h-[1.25rem] text-sm font-semibold text-err">
                      {err}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={17} className="btn-arrow" aria-hidden="true" />
                  </>
                )}
              </button>
              <p
                role="status"
                className={`text-sm ${
                  status.type === 'error' ? 'text-err' : status.type === 'success' ? 'text-ok' : 'text-muted'
                }`}
              >
                {status.text}
              </p>
            </div>

            {!API_URL && (
              <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-line bg-surface-2 p-3.5 text-xs leading-relaxed text-muted">
                <Info size={15} className="mt-px shrink-0 text-accent-ink" aria-hidden="true" />
                This form opens your email app to send the message. You can also email me directly at{' '}
                {profile.email}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
