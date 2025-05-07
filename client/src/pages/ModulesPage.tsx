import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { protocols } from '@/data/protocols';
import { modules } from '@/data/modules';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import AdSenseAd from '@/components/AdSenseAd';

type SortKey = 'name' | 'stability';
type SortOrder = 'asc' | 'desc';

const ModulesPage = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('smb');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [stabilityFilters, setStabilityFilters] = useState<Record<string, boolean>>({
    stable: true,
    beta: true,
    experimental: true
  });
  const [showOnlyWithExamples, setShowOnlyWithExamples] = useState<boolean>(false);
  const [showOnlyWithOutput, setShowOnlyWithOutput] = useState<boolean>(false);
  
  const filteredModules = useMemo(() => {
    // First filter by protocol and search query
    const filtered = modules.filter(module => 
      module.protocol === selectedProtocol && 
      (searchQuery === '' || 
        module.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        module.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      stabilityFilters[module.stability] && // Filter by stability
      // Filter by examples if checked
      (!showOnlyWithExamples || (module.examples && module.examples.length > 0)) &&
      // Filter by output if checked
      (!showOnlyWithOutput || module.output)
    );
    
    // Then sort the filtered modules
    return [...filtered].sort((a, b) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortKey === 'stability') {
        // Custom stability order: stable > beta > experimental
        const stabilityOrder = { stable: 0, beta: 1, experimental: 2 };
        return sortOrder === 'asc'
          ? stabilityOrder[a.stability] - stabilityOrder[b.stability]
          : stabilityOrder[b.stability] - stabilityOrder[a.stability];
      }
      return 0;
    });
  }, [
    selectedProtocol, 
    searchQuery, 
    sortKey, 
    sortOrder, 
    stabilityFilters, 
    showOnlyWithExamples, 
    showOnlyWithOutput
  ]);

  return (
    <>
      <Helmet>
        <title>NetExec Modules Documentation - Protocol-specific Modules and Parameters</title>
        <meta 
          name="description" 
          content="Comprehensive documentation for all NetExec modules. Learn about protocols, parameters, and example usage scenarios for network security testing." 
        />
        <meta 
          name="keywords" 
          content="NetExec modules, CrackMapExec modules, network security, module documentation, penetration testing modules"
        />
        <link rel="canonical" href="https://www.netexec-tutorial.com/modules" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          NetExec Modules Documentation
        </h1>
        
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Explore the full range of NetExec modules organized by protocol. Each module includes detailed documentation on 
            parameters, usage examples, and expected output to help you utilize NetExec effectively in your security assessments.
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
        
        <div className="mb-6">
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Search modules..."
              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <i className="fas fa-search"></i>
            </div>
          </div>
          
          {/* Advanced Filtering & Sorting Controls */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-0">Filters & Sorting</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setStabilityFilters({
                      stable: true,
                      beta: true,
                      experimental: true
                    });
                    setShowOnlyWithExamples(false);
                    setShowOnlyWithOutput(false);
                    setSortKey('name');
                    setSortOrder('asc');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sorting Controls */}
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Sort By</label>
                <div className="flex gap-2">
                  <Select 
                    value={sortKey} 
                    onValueChange={(value) => setSortKey(value as SortKey)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Module Name</SelectItem>
                      <SelectItem value="stability">Stability</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  </Button>
                </div>
              </div>
              
              {/* Stability Filters */}
              <div>
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Stability</label>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={stabilityFilters.stable ? "default" : "outline"} 
                    className={`cursor-pointer ${stabilityFilters.stable ? 'bg-[#10B981]' : ''}`}
                    onClick={() => setStabilityFilters({...stabilityFilters, stable: !stabilityFilters.stable})}
                  >
                    Stable {stabilityFilters.stable ? '✓' : ''}
                  </Badge>
                  <Badge 
                    variant={stabilityFilters.beta ? "default" : "outline"} 
                    className={`cursor-pointer ${stabilityFilters.beta ? 'bg-yellow-500' : ''}`}
                    onClick={() => setStabilityFilters({...stabilityFilters, beta: !stabilityFilters.beta})}
                  >
                    Beta {stabilityFilters.beta ? '✓' : ''}
                  </Badge>
                  <Badge 
                    variant={stabilityFilters.experimental ? "default" : "outline"} 
                    className={`cursor-pointer ${stabilityFilters.experimental ? 'bg-red-500' : ''}`}
                    onClick={() => setStabilityFilters({...stabilityFilters, experimental: !stabilityFilters.experimental})}
                  >
                    Experimental {stabilityFilters.experimental ? '✓' : ''}
                  </Badge>
                </div>
              </div>
              
              {/* Feature Filters */}
              <div className="col-span-1 md:col-span-2">
                <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Features</label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="examples" 
                      checked={showOnlyWithExamples}
                      onCheckedChange={(checked) => setShowOnlyWithExamples(checked === true)}
                    />
                    <label
                      htmlFor="examples"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Has Examples
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="output" 
                      checked={showOnlyWithOutput}
                      onCheckedChange={(checked) => setShowOnlyWithOutput(checked === true)}
                    />
                    <label
                      htmlFor="output"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Has Output
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Found <span className="font-medium">{filteredModules.length}</span> module{filteredModules.length !== 1 ? 's' : ''} for {protocols.find(p => p.name === selectedProtocol)?.displayName || ''} protocol
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Protocol Selection Sidebar */}
          <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md p-4 h-fit">
            <h2 className="font-medium text-gray-800 dark:text-white mb-4">Protocols</h2>
            <ul className="space-y-3">
              {protocols.map(protocol => (
                <li key={protocol.name}>
                  <button 
                    className={`flex items-center w-full text-left px-2 py-1.5 rounded-md ${
                      selectedProtocol === protocol.name 
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedProtocol(protocol.name)}
                  >
                    <i className={`fas ${protocol.icon} mr-2 ${selectedProtocol === protocol.name ? 'text-[#10B981]' : ''}`}></i>
                    {protocol.displayName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Modules List */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-primary dark:bg-[#0F172A] text-white">
                <h2 className="text-xl font-bold">
                  {protocols.find(p => p.name === selectedProtocol)?.displayName || ''} Modules
                </h2>
                <p className="text-sm text-gray-200 mt-1">
                  {protocols.find(p => p.name === selectedProtocol)?.description || ''}
                </p>
              </div>
              
              {filteredModules.length > 0 ? (
                <div className="p-4">
                  <div className="space-y-4">
                    {filteredModules.map((module) => (
                      <div key={module.name} className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{module.name}</h3>
                          <div className="flex items-center gap-2">
                            {/* Feature badges */}
                            <div className="flex gap-1">
                              {module.examples && module.examples.length > 0 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                  {module.examples.length} Example{module.examples.length !== 1 ? 's' : ''}
                                </span>
                              )}
                              {module.output && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                                  Output
                                </span>
                              )}
                              {module.troubleshooting && module.troubleshooting.length > 0 && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                                  Help
                                </span>
                              )}
                            </div>
                            
                            {/* Stability badge */}
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              module.stability === 'stable' ? 'bg-[#10B981] text-white' : 
                              module.stability === 'beta' ? 'bg-yellow-500 text-white' : 
                              'bg-red-500 text-white'
                            }`}>
                              {module.stability.charAt(0).toUpperCase() + module.stability.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{module.description}</p>
                        
                        <div className="font-mono text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#0F172A] p-2 rounded border border-gray-200 dark:border-gray-700 mb-3">
                          {module.example}
                        </div>
                        
                        {/* Module parameters indicator */}
                        {module.parameters && module.parameters.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available parameters:</p>
                            <div className="flex flex-wrap gap-1">
                              {module.parameters.slice(0, 3).map((param, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {param.name}
                                </Badge>
                              ))}
                              {module.parameters.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{module.parameters.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <Link href={`/modules/${module.protocol}/${module.name}`}>
                            <a className="text-[#10B981] hover:text-green-600 font-medium inline-flex items-center">
                              View detailed documentation
                              <i className="fas fa-arrow-right ml-2"></i>
                            </a>
                          </Link>
                          
                          {/* Last updated placeholder - could be added to the schema later */}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Last updated: 2023-05-10
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <i className="fas fa-search text-4xl text-gray-400 mb-3"></i>
                  <p className="text-gray-600 dark:text-gray-300">No modules found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ModulesPage;
