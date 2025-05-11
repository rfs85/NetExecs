import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { tutorials } from '@/data/tutorials';
import { modules } from '@/data/modules';
import { protocols } from '@/data/protocols';
import { resources } from '@/data/resources';
import { teamMembers } from '@/data/team';

const SitemapIndex = () => {
  // Group tutorials by level
  const tutorialLevels = ['beginner', 'intermediate', 'advanced'];
  const tutorialsByLevel = tutorialLevels.map(level => ({
    level,
    items: tutorials.filter(t => t.level === level)
  }));

  // Group modules by protocol
  const modulesByProtocol = protocols.map(protocol => ({
    protocol,
    items: modules.filter(m => m.protocol === protocol.name)
  }));

  return (
    <>
      <Helmet>
        <title>Sitemap & Content Index | NetExec Documentation</title>
        <meta name="description" content="Browse all NetExec content: tutorials, modules, resources, and team. Organized by category for easy discovery." />
        <link rel="canonical" href="/sitemap" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": "NetExec Sitemap & Content Index",
            "url": "https://netexec-docs.example.com/sitemap",
            "hasPart": [
              ...tutorials.map(t => ({
                "@type": "WebPage",
                "name": t.title,
                "url": `https://netexec-docs.example.com/tutorials/${t.slug}`
              })),
              ...modules.map(m => ({
                "@type": "WebPage",
                "name": m.name,
                "url": `https://netexec-docs.example.com/modules/${m.protocol}/${m.name}`
              })),
              ...resources.officialResources.map(r => ({
                "@type": "WebPage",
                "name": r.title,
                "url": r.url
              })),
              ...resources.communityResources.map(r => ({
                "@type": "WebPage",
                "name": r.title,
                "url": r.url
              })),
              ...resources.relatedTools.map(r => ({
                "@type": "WebPage",
                "name": r.name,
                "url": r.url
              })),
              {
                "@type": "WebPage",
                "name": "Team",
                "url": "https://netexec-docs.example.com/team"
              }
            ]
          })}
        </script>
      </Helmet>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Sitemap & Content Index</h1>

        {/* Tutorials */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">Tutorials</h2>
          {tutorialsByLevel.map(({ level, items }) => (
            <div key={level} className="mb-4">
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2 capitalize">{level} Tutorials</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {items.map(tutorial => (
                  <li key={tutorial.slug}>
                    <Link href={`/tutorials/${tutorial.slug}`}>
                      <a className="text-blue-700 dark:text-blue-400 hover:underline">{tutorial.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Modules */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">Modules</h2>
          {modulesByProtocol.map(({ protocol, items }) => (
            <div key={protocol.name} className="mb-4">
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">{protocol.displayName} Modules</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {items.map(module => (
                  <li key={module.name}>
                    <Link href={`/modules/${protocol.name}/${module.name}`}>
                      <a className="text-blue-700 dark:text-blue-400 hover:underline">{module.name} - {module.description}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Resources */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Official Resources</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {resources.officialResources.map(resource => (
                  <li key={resource.url}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">{resource.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Community Resources</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {resources.communityResources.map(resource => (
                  <li key={resource.url}>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">{resource.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">Related Tools</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                {resources.relatedTools.map(tool => (
                  <li key={tool.url}>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-400 hover:underline">{tool.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">Team</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {teamMembers.map(member => (
              <li key={member.name}>
                <Link href="/team">
                  <a className="text-blue-700 dark:text-blue-400 hover:underline">{member.name} - {member.role}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default SitemapIndex; 