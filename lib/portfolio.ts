/**
 * Central, editable content for the portfolio.
 * Any link or value set to `null` is hidden from the site instead of rendering a dead control.
 */

export type Profile = {
  name: string
  role: string
  headline: string
  summary: string
  email: string | null
  githubUrl: string | null
  linkedinUrl: string | null
  /** Path to a file in /public (e.g. "/resume.pdf") or an absolute URL. */
  resumeUrl: string | null
}

export const profile: Profile = {
  name: 'Vikas Mathe',
  role: 'Full Stack Developer',
  headline: 'Building Modern Web Experiences.',
  summary:
    'I build web applications across frontend, backend, databases, and cloud technologies, with a focus on real-time systems and practical engineering.',
  email: "vikasmathe2604@gmail.com",
  githubUrl: 'https://github.com/Vikas92-dot',
  linkedinUrl: 'https://www.linkedin.com/in/vikas-mathe-53562a279',
  resumeUrl: null,
}

export const about = {
  paragraphs: [
    'I’m a full stack developer who works across the whole application — from the interface people interact with to the services, data stores, and infrastructure behind it.',
    'Most of my work has been on practical, real-time web applications: taking data from external sources, processing it reliably on the backend, and getting updates in front of users quickly. I like systems that are simple to reason about and easy for the next person to maintain.',
    'I enjoy working closely with teammates, take ownership of the work assigned to me, and follow it through from implementation to delivery.',
  ],
  highlights: [
    { title: 'Frontend & backend', body: 'Comfortable moving between React/Next.js interfaces and Node.js services.' },
    { title: 'Real-time systems', body: 'Event streaming with Kafka, fast state in Redis, and live updates over WebSockets.' },
    { title: 'Ownership', body: 'Takes assigned work from first commit through to delivery and support.' },
  ],
}

export type Tech = {
  name: string
  /** File in /public/icons. Omit to fall back to a generic icon. */
  icon?: string
  /** Monochrome icons are tinted to the current text color. */
  mono?: boolean
}

export type TechGroup = {
  title: string
  description: string
  items: Tech[]
}

export const techGroups: TechGroup[] = [
  {
    title: 'Frontend',
    description: 'Interfaces and user experience',
    items: [
      { name: 'HTML', icon: 'html5.svg' },
      { name: 'CSS', icon: 'css3.svg' },
      { name: 'JavaScript', icon: 'javascript.svg' },
      { name: 'React', icon: 'react.svg' },
      { name: 'Next.js', icon: 'nextdotjs.svg', mono: true },
    ],
  },
  {
    title: 'Backend',
    description: 'APIs and services',
    items: [
      { name: 'Node.js', icon: 'nodedotjs.svg' },
      { name: 'Express.js', icon: 'express.svg', mono: true },
    ],
  },
  {
    title: 'Databases',
    description: 'Persistent and relational data',
    items: [
      { name: 'MongoDB', icon: 'mongodb.svg' },
      { name: 'MySQL', icon: 'mysql.svg', mono: true },
    ],
  },
  {
    title: 'Cloud',
    description: 'AWS infrastructure',
    items: [
      { name: 'AWS EC2', icon: 'aws-amazon-ec2.svg' },
      { name: 'AWS S3', icon: 'aws-amazon-simple-storage-service.svg' },
      { name: 'AWS ECS', icon: 'aws-amazon-elastic-container-service.svg' },
      { name: 'AWS EKS', icon: 'aws-amazon-elastic-kubernetes-service.svg' },
    ],
  },
  {
    title: 'Real-time & messaging',
    description: 'Streaming, caching, and live delivery',
    items: [
      { name: 'Apache Kafka', icon: 'apache-kafka.svg', mono: true },
      { name: 'Redis', icon: 'redis.svg' },
      { name: 'WebSockets' },
    ],
  },
]

export const featuredProject = {
  eyebrow: 'Featured project',
  title: 'Real-Time Betting Application',
  summary: 'A real-time application that processes live match data and delivers market odds updates to users.',
  stack: ['Next.js', 'Node.js', 'Apache Kafka', 'Redis', 'MongoDB', 'WebSockets'],
  responsibilities: [
    'Worked on both the frontend and the backend.',
    'Processed live data received from a third-party application.',
    'Used Kafka topics to distribute incoming data to multiple consumers.',
    'Used Redis for frequently changing information such as market odds.',
    'Used MongoDB for persistent application data such as match details.',
    'Used WebSockets to deliver real-time odds updates to the frontend.',
    'Built the user interface with Next.js.',
  ],
}

export type Project = {
  title: string
  description: string
  stack: string[]
  githubUrl?: string | null
  liveUrl?: string | null
}

/** Add real projects here. The "More projects" section stays hidden while this list is empty. */
export const projects: Project[] = []

export type ExperienceEntry = {
  role: string
  company: string | null
  period: string | null
  summary: string
  /** Optional short badge shown under the summary. */
  highlight: string | null
  points: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Full Stack Developer',
    company: 'Zenqua Technologies pvt ltd',
    period: 'July 2025 - Present',
    summary: 'Around 1+ year of software development experience building web applications across the stack.',
    highlight: 'Mentored two junior developers',
    points: [
      'Worked on both frontend and backend for a real-time betting application.',
      'Processed live third-party data and distributed it through Kafka topics to multiple consumers.',
      'Stored frequently changing data in Redis and persistent data in MongoDB.',
      'Delivered real-time odds updates to a Next.js frontend over WebSockets.',
      'Helped coordinate project work with teammates.',
      'Supported and mentored two junior developers.',
    ],
  },
]
