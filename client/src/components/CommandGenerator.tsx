import { useState, useEffect } from 'react';
import { useCommandGenerator } from '@/hooks/useCommandGenerator';
import { useToast } from '@/hooks/use-toast';
import { protocols } from '@/data/protocols';
import { modules } from '@/data/modules';

const CommandGenerator = () => {
  const { toast } = useToast();
  const { 
    selectedProtocol, 
    setSelectedProtocol,
    targetType, 
    setTargetType,
    targetValue, 
    setTargetValue,
    username, 
    setUsername,
    password, 
    setPassword,
    useHash, 
    setUseHash,
    selectedModule, 
    setSelectedModule,
    moduleParams, 
    setModuleParams,
    additionalOptions, 
    setAdditionalOptions,
    savedCommands,
    selectedSavedCommand,
    setSelectedSavedCommand,
    saveCommand,
    loadCommand,
    generateCommand,
    commandPreview
  } = useCommandGenerator();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commandPreview);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
      duration: 2000,
    });
  };

  const filteredModules = modules.filter(m => m.protocol === selectedProtocol);

  return (
    <section id="command-generator" className="mb-12 pt-6">
      <h2 className="section-title">Interactive Command Generator</h2>
      
      <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Parameter Selection Panel */}
          <div className="p-6 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Protocol</label>
              <div className="flex flex-wrap gap-2">
                {protocols.map((protocol) => (
                  <button
                    key={protocol.name}
                    className={`protocol-button ${selectedProtocol === protocol.name ? 'protocol-button-active' : 'protocol-button-inactive'}`}
                    onClick={() => setSelectedProtocol(protocol.name)}
                  >
                    {protocol.displayName}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Target Specification</label>
              <div className="flex space-x-2 mb-3">
                <button 
                  className={`protocol-button ${targetType === 'ip' ? 'protocol-button-active' : 'protocol-button-inactive'}`}
                  onClick={() => setTargetType('ip')}
                >
                  IP/CIDR
                </button>
                <button 
                  className={`protocol-button ${targetType === 'file' ? 'protocol-button-active' : 'protocol-button-inactive'}`}
                  onClick={() => setTargetType('file')}
                >
                  File
                </button>
                <button 
                  className={`protocol-button ${targetType === 'hostname' ? 'protocol-button-active' : 'protocol-button-inactive'}`}
                  onClick={() => setTargetType('hostname')}
                >
                  Hostname
                </button>
              </div>
              <input 
                type="text" 
                placeholder={targetType === 'ip' ? '192.168.1.0/24' : targetType === 'file' ? 'targets.txt' : 'hostname.domain.com'} 
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Authentication</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Username</label>
                  <input 
                    type="text" 
                    placeholder="Administrator" 
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Password/Hash</label>
                  <input 
                    type="text" 
                    placeholder={useHash ? "aad3b435b51404eeaad3b435b51404ee:58a478135a93ac3bf058a5ea0e8fdb71" : "Password123!"} 
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <input 
                  type="checkbox" 
                  id="use-hash" 
                  className="mr-2"
                  checked={useHash}
                  onChange={(e) => setUseHash(e.target.checked)}
                />
                <label htmlFor="use-hash" className="text-sm text-gray-600 dark:text-gray-400">Use NTLM hash instead of password</label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Module Selection</label>
              <select 
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
              >
                <option value="">No module (default enumeration)</option>
                {filteredModules.map((module) => (
                  <option key={module.name} value={module.name}>
                    {module.name} - {module.description}
                  </option>
                ))}
              </select>
              
              {/* Module-specific parameters (conditionally shown) */}
              {selectedModule && (
                <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Module Parameters ({selectedModule})
                  </h4>
                  <div className="space-y-3">
                    {modules.find(m => m.name === selectedModule)?.parameters.map((param, index) => (
                      <div key={index}>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`param-${param.name}`} 
                            className="mr-2"
                            checked={moduleParams[param.name] || false}
                            onChange={(e) => {
                              setModuleParams({
                                ...moduleParams,
                                [param.name]: e.target.checked
                              });
                            }}
                          />
                          <label htmlFor={`param-${param.name}`} className="text-sm text-gray-600 dark:text-gray-400">
                            {param.description}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">Additional Options</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="use-kerberos" 
                      className="mr-2"
                      checked={additionalOptions.useKerberos || false}
                      onChange={(e) => {
                        setAdditionalOptions({
                          ...additionalOptions,
                          useKerberos: e.target.checked
                        });
                      }}
                    />
                    <label htmlFor="use-kerberos" className="text-sm text-gray-600 dark:text-gray-400">Use Kerberos</label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="debug-mode" 
                      className="mr-2"
                      checked={additionalOptions.debugMode || false}
                      onChange={(e) => {
                        setAdditionalOptions({
                          ...additionalOptions,
                          debugMode: e.target.checked
                        });
                      }}
                    />
                    <label htmlFor="debug-mode" className="text-sm text-gray-600 dark:text-gray-400">Debug mode</label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="verbose" 
                      className="mr-2"
                      checked={additionalOptions.verbose || false}
                      onChange={(e) => {
                        setAdditionalOptions({
                          ...additionalOptions,
                          verbose: e.target.checked
                        });
                      }}
                    />
                    <label htmlFor="verbose" className="text-sm text-gray-600 dark:text-gray-400">Verbose output</label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="local-auth" 
                      className="mr-2"
                      checked={additionalOptions.localAuth || false}
                      onChange={(e) => {
                        setAdditionalOptions({
                          ...additionalOptions,
                          localAuth: e.target.checked
                        });
                      }}
                    />
                    <label htmlFor="local-auth" className="text-sm text-gray-600 dark:text-gray-400">Local authentication</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Command Preview Panel */}
          <div className="p-6 bg-gray-50 dark:bg-[#0F172A]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Command Preview</h3>
              <button 
                className="text-[#10B981] hover:text-green-600"
                onClick={copyToClipboard}
                aria-label="Copy to clipboard"
              >
                <i className="far fa-copy mr-1"></i> Copy
              </button>
            </div>
            
            <div className="bg-[#0F172A] text-[#10B981] p-4 rounded-md font-mono text-sm h-48 overflow-auto">
              <p className="whitespace-pre-wrap">{commandPreview}</p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <button 
                  className="w-full bg-[#10B981] hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center"
                  onClick={() => {
                    const name = prompt("Enter a name for this command:");
                    if (name) {
                      saveCommand(name);
                      toast({
                        title: "Command saved",
                        description: `Command "${name}" has been saved`,
                      });
                    }
                  }}
                >
                  <i className="far fa-save mr-2"></i> Save Command
                </button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saved Commands</h4>
                <select 
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                  value={selectedSavedCommand}
                  onChange={(e) => {
                    setSelectedSavedCommand(e.target.value);
                    if (e.target.value) {
                      loadCommand(e.target.value);
                    }
                  }}
                >
                  <option value="">Select a saved command</option>
                  {savedCommands.map((cmd, index) => (
                    <option key={index} value={cmd.name}>{cmd.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommandGenerator;
