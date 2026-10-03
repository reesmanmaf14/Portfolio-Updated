import { Mail } from 'lucide-react';
import { profile } from '../data/profile.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';

export const socials = [
  { label: 'GitHub', href: profile.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
];

export const external = (href) =>
  href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' };

export default function SocialLinks({ className = '', ...props }) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`} aria-label="Social links" {...props}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a href={href} aria-label={label} className="icon-btn" {...external(href)}>
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
