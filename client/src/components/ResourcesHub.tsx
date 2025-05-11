import { resources } from '@/data/resources';

const ResourcesHub = () => {
  const { officialResources, communityResources, relatedTools, terminology } = resources;

  return (
    <section id="resources" className="mb-12 pt-6">
      <h2 className="section-title">Resources Hub</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Official Resources */}
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary dark:bg-[#0F172A] p-4">
            <h3 className="text-xl font-bold text-white">Official Resources</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {officialResources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md"
                  >
                    <i className={`${resource.icon} text-xl text-gray-700 dark:text-gray-300 mt-1 mr-3`}></i>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{resource.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{resource.description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Community Resources */}
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary dark:bg-[#0F172A] p-4">
            <h3 className="text-xl font-bold text-white">Community Resources</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {communityResources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md"
                  >
                    <i className={`${resource.icon} text-xl text-gray-700 dark:text-gray-300 mt-1 mr-3`}></i>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{resource.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{resource.description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Related Tools */}
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary dark:bg-[#0F172A] p-4">
            <h3 className="text-xl font-bold text-white">Related Tools</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {relatedTools.map((tool, index) => (
                <li key={index}>
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md"
                    onClick={() => {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({
                        event: 'external_link',
                        category: 'Resource',
                        action: 'Click',
                        label: tool.name
                      });
                    }}
                  >
                    <i className="fas fa-tools text-xl text-gray-700 dark:text-gray-300 mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{tool.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Glossary */}
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="bg-primary dark:bg-[#0F172A] p-4">
            <h3 className="text-xl font-bold text-white">Security Terminology</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {terminology.map((term, index) => (
                <li key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md">
                  <h4 className="font-medium text-gray-800 dark:text-white">{term.term}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{term.definition}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHub;
