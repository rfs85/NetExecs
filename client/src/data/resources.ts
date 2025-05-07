export interface OfficialResource {
  title: string;
  description: string;
  url: string;
  icon: string;
}

export interface CommunityResource {
  title: string;
  description: string;
  url: string;
  icon: string;
}

export interface RelatedTool {
  name: string;
  description: string;
  url: string;
}

export interface Term {
  term: string;
  definition: string;
}

export interface Resources {
  officialResources: OfficialResource[];
  communityResources: CommunityResource[];
  relatedTools: RelatedTool[];
  terminology: Term[];
}

export const resources: Resources = {
  officialResources: [
    {
      title: "NetExec GitHub Repository",
      description: "Official code repository with installation instructions and documentation.",
      url: "https://github.com/Pennyw0rth/NetExec",
      icon: "fab fa-github"
    },
    {
      title: "NetExec Wiki",
      description: "Comprehensive documentation covering all aspects of the tool.",
      url: "https://github.com/Pennyw0rth/NetExec/wiki",
      icon: "fas fa-book"
    },
    {
      title: "Issue Tracker",
      description: "Report bugs or request features for NetExec.",
      url: "https://github.com/Pennyw0rth/NetExec/issues",
      icon: "fas fa-bug"
    },
    {
      title: "Contribution Guidelines",
      description: "Learn how to contribute to NetExec development.",
      url: "https://github.com/Pennyw0rth/NetExec/blob/main/CONTRIBUTING.md",
      icon: "fas fa-code-branch"
    }
  ],
  communityResources: [
    {
      title: "Discord Community",
      description: "Join the community of NetExec users and developers.",
      url: "https://discord.gg/9y7BdRJu5P",
      icon: "fab fa-discord"
    },
    {
      title: "Video Tutorials",
      description: "Curated list of NetExec video tutorials from security researchers.",
      url: "https://www.youtube.com/results?search_query=netexec+tutorial",
      icon: "fab fa-youtube"
    },
    {
      title: "Training Courses",
      description: "Recommended courses that feature NetExec in their curriculum.",
      url: "https://academy.tcm-sec.com/",
      icon: "fas fa-graduation-cap"
    },
    {
      title: "Blog Articles",
      description: "Technical articles and case studies featuring NetExec usage.",
      url: "https://medium.com/tag/netexec",
      icon: "fas fa-newspaper"
    }
  ],
  relatedTools: [
    {
      name: "Impacket",
      description: "Collection of Python classes for working with network protocols.",
      url: "https://github.com/SecureAuthCorp/impacket"
    },
    {
      name: "BloodHound",
      description: "Graphical Active Directory attack path discovery tool.",
      url: "https://github.com/BloodHoundAD/BloodHound"
    },
    {
      name: "Responder",
      description: "LLMNR, NBT-NS and MDNS poisoner for credential harvesting.",
      url: "https://github.com/lgandx/Responder"
    },
    {
      name: "Mimikatz",
      description: "Tool for extracting credentials from Windows memory.",
      url: "https://github.com/gentilkiwi/mimikatz"
    }
  ],
  terminology: [
    {
      term: "Pass-the-Hash (PtH)",
      definition: "An attack technique that uses captured NTLM password hashes for authentication without knowing the actual password."
    },
    {
      term: "Kerberoasting",
      definition: "An attack technique that targets service accounts in Active Directory by requesting service tickets and cracking them offline."
    },
    {
      term: "Lateral Movement",
      definition: "The process of moving through a network to access different systems after initial compromise."
    },
    {
      term: "Privilege Escalation",
      definition: "Techniques used to gain higher-level permissions on a system or network than initially granted."
    }
  ]
};
