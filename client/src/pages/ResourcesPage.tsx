import { Helmet } from 'react-helmet';
import ResourcesHub from '@/components/ResourcesHub';
import AdSenseAd from '@/components/AdSenseAd';

const ResourcesPage = () => {
  return (
    <>
      <Helmet>
        <title>NetExec Resources - Documentation, Community, and Related Tools</title>
        <meta 
          name="description" 
          content="Access a curated collection of NetExec resources including official documentation, community support, related security tools, and security terminology." 
        />
        <meta 
          name="keywords" 
          content="NetExec resources, CrackMapExec documentation, security tools, penetration testing resources, network security"
        />
        <link rel="canonical" href="https://www.netexec-tutorial.com/resources" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "NetExec Resources",
            "description": "Access a curated collection of NetExec resources including official documentation, community support, related security tools, and security terminology.",
            "url": "https://www.netexec-tutorial.com/resources",
            "inLanguage": "en"
          })}
        </script>
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          NetExec Resources
        </h1>
        
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Access a comprehensive collection of resources to enhance your understanding and usage of NetExec. 
            This page includes official documentation, community resources, related security tools, and helpful terminology 
            to support your security testing activities.
          </p>
          
          {/* AdSense Banner */}
          <div className="mt-6 pt-4">
            <AdSenseAd 
              format="horizontal" 
              slot="1234567890" 
              responsive={true} 
              className="mb-4 mt-8" 
            />
          </div>
        </div>
        
        <ResourcesHub />
        
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Contributing to NetExec
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            NetExec is an open-source project that thrives on community contributions. There are many ways to contribute:
          </p>
          
          <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Reporting bugs and issues on the GitHub repository</li>
            <li>Contributing code improvements and new features</li>
            <li>Writing documentation and tutorials</li>
            <li>Creating new modules to extend functionality</li>
            <li>Sharing your experiences and use cases with the community</li>
          </ul>
          
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Before contributing, make sure to read the official contribution guidelines in the GitHub repository.
          </p>
        </div>
      </main>
    </>
  );
};

export default ResourcesPage;
