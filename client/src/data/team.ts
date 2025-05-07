export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "RFS",
    role: "Lead Instructor & Content Creator",
    bio: "RFS is a seasoned cybersecurity professional with extensive experience in network security and penetration testing. As the lead instructor for our NetExec tutorial, RFS brings practical insights and in-depth knowledge to help you master this powerful tool.",
    image: "/team/rfs.jpg",
    githubUrl: "https://github.com/rfs-security",
    twitterUrl: "https://twitter.com/rfs-security",
    linkedinUrl: "https://linkedin.com/in/rfs-security"
  },
  {
    name: "Martian Defense Team",
    role: "Technical Advisors & Tutorial Contributors",
    bio: "The Martian Defense Team consists of elite cybersecurity professionals who contribute their expertise to ensure our NetExec tutorials are cutting-edge, accurate, and aligned with industry best practices.",
    image: "/team/martian-defense.jpg",
    githubUrl: "https://github.com/martian-defense",
    twitterUrl: "https://twitter.com/martian-defense"
  }
];