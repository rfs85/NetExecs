import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { teamMembers } from "@/data/team";
import { Github as GithubIcon, Twitter as TwitterIcon, Linkedin as LinkedinIcon } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Meet the Team | NetExec Documentation</title>
        <meta
          name="description"
          content="Meet the dedicated team behind NetExec, the powerful network penetration testing tool. Learn about the developers, researchers, and contributors who make this tool possible."
        />
        <meta
          property="og:title"
          content="Meet the NetExec Team | Security Researchers & Developers"
        />
        <meta
          property="og:description"
          content="Learn about the skilled professionals who develop and maintain NetExec, the powerful security assessment framework."
        />
        <link rel="canonical" href="https://netexec-docs.example.com/team" />
      </Helmet>

      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Meet Our Team
        </h1>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            The People Behind NetExec
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NetExec is maintained by a passionate team of cybersecurity
            professionals, researchers, and developers committed to creating
            powerful, ethical security testing tools.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Our diverse team brings together expertise from offensive security,
            network administration, software development, and technical writing
            to create a comprehensive toolkit for security professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-gray-600 flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-gray-300">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.twitterUrl && (
                    <a
                      href={member.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Join Our Community
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NetExec is an open-source project that thrives on community 
            contributions. We welcome security researchers, developers, 
            documentation writers, and testers to join our community.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Whether you want to contribute code, report bugs, improve 
            documentation, or suggest new features, there are many ways to 
            get involved with the project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/Pennyw0rth/NetExec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                  event: 'external_link',
                  category: 'Team',
                  action: 'GitHub',
                  label: 'Contribute on GitHub'
                });
              }}
            >
              <GithubIcon className="h-5 w-5 mr-2" />
              Contribute on GitHub
            </a>
            <a
              href="https://discord.gg/netexec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                  event: 'external_link',
                  category: 'Team',
                  action: 'Discord',
                  label: 'Join Discord Community'
                });
              }}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              Join Discord Community
            </a>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Acknowledgements
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NetExec builds upon the legacy of CrackMapExec and various open-source
            security tools. We'd like to thank:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>The original CrackMapExec developers for laying the foundation</li>
            <li>Security researchers who responsibly disclose the vulnerabilities that NetExec helps identify</li>
            <li>The vibrant community of contributors who continue to enhance the tool with new modules and improvements</li>
            <li>All the users who provide feedback, report bugs, and help make NetExec better with each release</li>
          </ul>
        </div>
      </section>
    </div>
  );
}