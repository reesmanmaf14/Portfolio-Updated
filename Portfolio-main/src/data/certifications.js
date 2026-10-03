// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// The original portfolio had no certificates listed, so the entry below is a
// PLACEHOLDER. Replace it with your real certificates and delete
// `placeholder: true`. Cards marked as placeholders show a "Placeholder" label.
//
// Fields:
//   title        Certificate name
//   issuer       Issuing organization
//   date         Completion date, free text (e.g. "March 2026")
//   skills       Related skills (array of strings)
//   image        Thumbnail/full image, e.g. asset('certs/my-cert.webp')
//                (put the file in public/assets/certs/). Opens in a modal.
//   file         Optional PDF/URL of the certificate. Opens in a new tab.
//   credentialUrl Optional verification link
// ─────────────────────────────────────────────────────────────────────────────
 //import { asset } from './profile.js';

export const certifications = [
  {
   
    title: 'AI Fluency: Framework and Foundations',
    issuer: 'Anthropic/ Claude Academy',
    date: 'Oct 2026',
    skills: ['AI Fluency', 'Generative AI', 'AI Literacy'],
    image: '/assets/claudeAi.png',
    file:'/assets/claude-ai.pdf',
    credentialUrl: 'https://academy.claude.com/verify/ea4f4a191b82c8c93b7009b6b298cc02',
  },

   {
    title: 'Claude Code 101',
    issuer: 'Anthropic / Claude Academy',
    date: 'Sep 2026',
    skills: ['Claude Code', 'AI-Assisted Development', 'Software Development'],
    image: '/assets/claude101.png',
    file: '/assets/claude-101.pdf',
    credentialUrl:
      'https://academy.claude.com/verify/51ac9257604fd53ebacc08fc6d1b7b08',
  },

   {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2026',
    skills: ['Cybersecurity', 'Threat Detection', 'Security Fundamentals'],
    image: '/assets/cyber.png',
    file: '/assets/cisco.pdf',
    credentialUrl: 'https://www.credly.com/badges/b10f23b6-c885-42e8-8513-bb5c2ed3a83b/public_url',
  },

  


  {
  title: 'Work Smarter with AI',
  issuer: 'Canva',
  date: 'Sep 2026',
  skills: ['Writing AI Prompting', 'Brainstorming', 'Project Management'],
  image: '/assets/canvadesign.png',
  file: '/assets/canva.pdf',
  credentialUrl: 'https://www.canva.com/design-school/certification-award/20c480e8-9583-47bc-b684-6bc336272374?referrer=course',
},

];
