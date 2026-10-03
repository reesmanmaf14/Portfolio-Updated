import { asset } from './profile.js';

// Leave `live` as '' when there is no live demo: the button is hidden.
// To add a project (e.g. AI Future Lab), copy an entry and fill in real details.
export const projects = [
  {
    title: 'SpeechCare',
    subtitle: 'A Web-Based Application for Speech Therapy Clinics',
    desc: 'A web-based system designed to streamline speech therapy clinic operations, including appointment booking, therapist management, parent management, time-slot management, and session-related workflows.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'],
    features: [
      'Parent registration',
      'Secure login',
      'Role-based access',
      'Appointment booking',
      'Time-slot management',
      'Appointment status management',
    ],
    type: 'Web Application',
    image: asset('speechcare.webp'),
    github: 'https://github.com/reesmanmaf14/SpeechCare',
    live: '',
  },
  {
    title: 'Book Selling Application',
    subtitle: 'Desktop-Based Bookshop Management System',
    desc: 'A desktop-based bookshop management system designed to manage books, users, orders, billing, and order history through separate admin and user functionalities.',
    tech: ['C#', '.NET Framework', 'Windows Forms', 'Microsoft SQL Server'],
    features: [
      'User registration and login',
      'Role-based access',
      'Book category browsing',
      'Add, update, and manage books',
      'Book selection and ordering',
      'Bill generation',
      'Order history',
    ],
    type: 'Desktop Application',
    image: asset('book.webp'),
    github: 'https://github.com/reesmanmaf14/Book-Selling-App',
    live: '',
  },
  {
    title: 'AI Future Lab',
    subtitle: 'Interactive AI & Emerging Technology Experience',
    desc: 'An interactive web experience that explores artificial intelligence and emerging technologies through an immersive, animated interface designed to make complex AI concepts more engaging and accessible.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'AI-Assisted Development', 'Vercel'],
    features: [
    'Interactive AI concept exploration',
    'Animated futuristic user interface',
    'Machine learning visualizations',
    'Neural network concepts',
    'Computer vision concepts',
    'Generative AI exploration',
    'Responsive design',
    'Interactive visual elements',
    ],
    type: 'Interactive Web Application',
    image: asset('ai-future-lab.png'),
    github: 'https://github.com/reesmanmaf14/ai-future-lab',
    live:'https://ai-future-lab-five.vercel.app/',
  },
];
