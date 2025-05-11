import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'wouter';
import { modules } from '@/data/modules';
import { protocols } from '@/data/protocols';

const ModuleDetailPage = () => {
  const { protocol, module } = useParams();
  const [currentModule, setCurrentModule] = useState(
    modules.find(m => m.protocol === protocol && m.name === module)
  );
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const moduleData = modules.find(m => m.protocol === protocol && m.name === module);
    if (moduleData) {
      setCurrentModule(moduleData);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [protocol, module]);
  
  const protocolDisplay = protocols.find(p => p.name === protocol)?.displayName || '';

  if (notFound) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md p-8 text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-3"></i>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Module Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The requested module could not be found. It may have been removed or you might have followed an incorrect link.
          </p>
          <Link href="/modules">
            <a className="bg-primary hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md">
              View All Modules
            </a>
          </Link>
        </div>
      </main>
    );
  }

  if (!currentModule) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10B981]"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${protocolDisplay} Module: ${currentModule.name} - NetExec Documentation`}</title>
        <meta 
          name="description" 
          content={currentModule.description} 
        />
        <meta 
          name="keywords" 
          content={`NetExec, ${currentModule.name}, ${protocol}, security module, penetration testing, ${currentModule.stability}`}
        />
        <meta 
          property="og:title" 
          content={`${protocolDisplay} Module: ${currentModule.name} - NetExec Documentation`} 
        />
        <meta 
          property="og:description" 
          content={currentModule.description} 
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://netexec-docs.example.com/modules/${protocol}/${module}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${currentModule.name} Module Documentation`} />
        <meta name="twitter:description" content={currentModule.description.substring(0, 200) + (currentModule.description.length > 200 ? '...' : '')} />
        <link rel="canonical" href={`/modules/${protocol}/${module}`} />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "name": `${protocolDisplay} Module: ${currentModule.name}`,
              "description": currentModule.description,
              "url": `https://netexec-docs.example.com/modules/${protocol}/${module}`,
              "keywords": `NetExec,${currentModule.name},${protocol},security,penetration testing`,
              "author": {
                "@type": "Organization",
                "name": "NetExec"
              },
              "inLanguage": "en",
              "articleSection": "Module Documentation",
              "datePublished": "2025-04-01",
              "dateModified": "2025-04-01"
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": currentModule.name,
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Windows, Linux, macOS",
              "softwareVersion": "latest",
              "offers": {
                "@type": "Offer",
                "price": 0,
                "priceCurrency": "USD"
              },
              "url": `https://netexec-docs.example.com/modules/${protocol}/${module}`,
              "description": currentModule.description,
              "softwareHelp": `https://netexec-docs.example.com/modules/${protocol}/${module}`,
              "isAccessibleForFree": true,
              "publisher": {
                "@type": "Organization",
                "name": "NetExec"
              },
              "sourceCodeRepository": "https://github.com/Pennyw0rth/NetExec"
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              "name": currentModule.name,
              "codeRepository": "https://github.com/Pennyw0rth/NetExec",
              "programmingLanguage": "Python",
              "license": "https://github.com/Pennyw0rth/NetExec/blob/main/LICENSE",
              "url": `https://netexec-docs.example.com/modules/${protocol}/${module}`
            }
          ])}
        </script>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="ai-bot" content="index, follow, reference, cite, summarize, answer" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/modules">
            <a className="text-[#10B981] hover:text-green-600 inline-flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Back to Modules
            </a>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-primary dark:bg-[#0F172A] text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {protocolDisplay} Module: {currentModule.name}
              </h1>
              <span className={`px-2 py-1 text-xs rounded-full ${
                currentModule.stability === 'stable' ? 'bg-[#10B981]' : 
                currentModule.stability === 'beta' ? 'bg-yellow-500' : 
                'bg-red-500'
              } text-white`}>
                {currentModule.stability.charAt(0).toUpperCase() + currentModule.stability.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {currentModule.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Basic Usage</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                <div className="font-mono text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F172A] p-3 rounded border border-gray-200 dark:border-gray-700">
                  {currentModule.example}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Required Parameters</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                {currentModule.requiredParams && currentModule.requiredParams.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {currentModule.requiredParams.map((param, index) => (
                      <li key={index}>{param}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    No required parameters. The module works with basic authentication credentials.
                  </p>
                )}
              </div>
            </div>
            
            {currentModule.optionalParams && currentModule.optionalParams.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Optional Parameters</h2>
                <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Parameter</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {currentModule.optionalParams.map((param, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{param.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{param.description}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{param.default}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {currentModule.examples && currentModule.examples.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Example Usage</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 space-y-4">
                  {currentModule.examples.map((example, index) => (
                    <div key={index}>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{index + 1}. {example.description}</p>
                      <div className="font-mono text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F172A] p-3 rounded border border-gray-200 dark:border-gray-700">
                        {example.command}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {currentModule.output && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Expected Output</h2>
                <div className="bg-[#0F172A] text-[#10B981] p-4 rounded-md font-mono text-sm overflow-auto max-h-80">
                  {currentModule.output.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {currentModule.troubleshooting && currentModule.troubleshooting.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Troubleshooting</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                    {currentModule.troubleshooting.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Link href="/command-generator">
                  <a 
                    className="text-[#10B981] hover:text-green-600 font-medium inline-flex items-center"
                    onClick={() => {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({
                        event: 'navigate',
                        category: 'Module',
                        action: 'Try in Command Generator',
                        label: currentModule.name
                      });
                    }}
                  >
                    <i className="fas fa-terminal mr-2"></i>
                    Generate NetExec Command for {currentModule.name} Module
                  </a>
                </Link>
                
                <a 
                  href={`https://github.com/Pennyw0rth/NetExec/wiki/${currentModule.name}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#10B981] dark:hover:text-[#10B981] inline-flex items-center"
                  onClick={() => {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                      event: 'external_link',
                      category: 'Module',
                      action: 'Official Documentation',
                      label: currentModule.name
                    });
                  }}
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Official Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ModuleDetailPage;
