import { useState } from 'react';
import { Link } from 'wouter';
import { modules } from '@/data/modules';
import { protocols } from '@/data/protocols';

interface ModuleDocumentationProps {
  activeProtocol?: string;
  activeModule?: string;
}

const ModulesDocumentation: React.FC<ModuleDocumentationProps> = ({ 
  activeProtocol = 'smb',
  activeModule = 'shares'
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState(activeProtocol);
  const [selectedModule, setSelectedModule] = useState(activeModule);

  const filteredModules = modules.filter(module => module.protocol === selectedProtocol);
  const currentModule = modules.find(module => module.protocol === selectedProtocol && module.name === selectedModule);

  return (
    <section id="modules" className="mb-12 pt-6">
      <h2 className="section-title">Modules Documentation</h2>
      
      <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row">
          {/* Protocol Navigation Sidebar */}
          <div className="md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <div className="sticky top-24">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Protocols</h3>
              <ul className="space-y-3">
                {protocols.map(protocol => (
                  <li key={protocol.name}>
                    <Link href={`/protocols/${protocol.name}`}>
                      <a 
                        className={`flex items-center ${selectedProtocol === protocol.name ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-200 hover:text-primary font-medium'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProtocol(protocol.name);
                          if (filteredModules.length > 0) {
                            setSelectedModule(filteredModules[0].name);
                          }
                        }}
                      >
                        {selectedProtocol === protocol.name && (
                          <span className="w-1 h-6 bg-[#10B981] rounded-r-md mr-2"></span>
                        )}
                        <i className={`fas ${protocol.icon} mr-2 ${selectedProtocol === protocol.name ? 'text-[#10B981]' : ''}`}></i>
                        {protocol.displayName}
                      </a>
                    </Link>
                    {selectedProtocol === protocol.name && (
                      <ul className="ml-7 mt-2 space-y-1">
                        {filteredModules.map(module => (
                          <li key={module.name}>
                            <Link href={`/modules/${protocol.name}/${module.name}`}>
                              <a 
                                className={`text-sm ${selectedModule === module.name ? 'text-[#10B981]' : 'text-gray-700 dark:text-gray-300 hover:text-[#10B981]'}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedModule(module.name);
                                }}
                              >
                                {module.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Module Content Area */}
          {currentModule ? (
            <div className="md:w-3/4 p-6">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {selectedProtocol.toUpperCase()} Module: {currentModule.name}
                </h3>
                <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                  currentModule.stability === 'stable' ? 'bg-[#10B981]' : 
                  currentModule.stability === 'beta' ? 'bg-yellow-500' : 
                  'bg-red-500'
                } text-white`}>
                  {currentModule.stability.charAt(0).toUpperCase() + currentModule.stability.slice(1)}
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentModule.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Required Parameters</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                  {currentModule.requiredParams ? (
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                      {currentModule.requiredParams.map((param, index) => (
                        <li key={index}>{param}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 mb-2">No required parameters. The module works with basic authentication credentials.</p>
                  )}
                  <div className="font-mono text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0F172A] p-3 rounded border border-gray-200 dark:border-gray-700 mt-2">
                    {currentModule.example}
                  </div>
                </div>
              </div>
              
              {currentModule.optionalParams && currentModule.optionalParams.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Optional Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
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
                  <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Example Usage</h4>
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
                  <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Expected Output</h4>
                  <div className="bg-[#0F172A] text-[#10B981] p-4 rounded-md font-mono text-sm">
                    {currentModule.output.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
              
              {currentModule.troubleshooting && currentModule.troubleshooting.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Troubleshooting</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                      {currentModule.troubleshooting.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="md:w-3/4 p-6 flex justify-center items-center">
              <p className="text-gray-600 dark:text-gray-300">Select a module to view documentation</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModulesDocumentation;
