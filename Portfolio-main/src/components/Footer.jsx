import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile.js';
import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold">
            © {new Date().getFullYear()} {profile.name}
            <span className="text-accent">.</span>
          </p>
         
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <SocialLinks />
          <a href="#home" className="btn btn-sm ml-2">
            <ArrowUp size={16} className="btn-arrow" aria-hidden="true" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
