// Personal details, carried over from the original index.html.
const base = import.meta.env.BASE_URL;

export const asset = (path) => `${base}assets/${path}`;

export const profile = {
  name: 'Reesman',
  fullName: 'Mohamed Aboobacker Fathima Reesman',
  role: 'Software Engineering Student',
  headline: 'An aspiring software developer passionate about building useful, modern, and user-friendly software.',
  intro:
    'I’m currently pursuing an HNDIT in Software Engineering and building my skills through real-world projects, web development, and continuous learning.',
  location: 'Kalmunai, Sri Lanka',
  image: asset('profile.webp'),
  cv: asset('Reesman.pdf'),

  email: 'reesman1429@gmail.com',
  github: 'https://github.com/reesmanmaf14',
  githubRepos: 'https://github.com/reesmanmaf14?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/reesman14',
};

export const about = {
  paragraphs: [
    'I’m a Higher National Diploma in Information Technology student specializing in Software Engineering. I’m interested in software development in general, and especially in full-stack web development and building practical software that solves real problems.',
    'I’m also curious about AI and machine learning, and I enjoy picking up new technologies. Right now I’m learning by building projects and strengthening my fundamentals.',
  ],
  facts: [
    { label: 'Education', value: 'HNDIT – Software Engineering' },
    { label: 'Institution', value: 'SLIATE – ATI Sammanthurai' },
    { label: 'Focus', value: 'Software Development' },
    { label: 'Location', value: 'Kalmunai, Sri Lanka' },
  ],
  interests: ['Full-Stack Web Development', 'AI / ML', 'UI/UX'],
};

// Small labels that float around the hero portrait; taken from the skills list.
export const heroTech = ['AI/ML', 'Laravel','React','Full Stack'];
