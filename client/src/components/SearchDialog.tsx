
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { modules } from '@/data/modules';
import { tutorials } from '@/data/tutorials';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'module' | 'tutorial';
  category?: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  
  // Reset search query when dialog closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);
  
  // Search in modules and tutorials when the query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    const moduleResults = modules
      .filter(module => 
        module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map(module => ({
        title: module.name,
        description: module.description,
        url: `/modules/${module.protocol}/${module.name}`,
        type: 'module' as const,
        category: module.protocol.toUpperCase()
      }));
    
    const tutorialResults = tutorials
      .filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, 5)
      .map(tutorial => ({
        title: tutorial.title,
        description: tutorial.description,
        url: `/tutorials/${tutorial.slug}`,
        type: 'tutorial' as const
      }));
    
    setResults([...moduleResults, ...tutorialResults]);
  }, [searchQuery]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px]">
        <div className="p-2">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search modules, tutorials, and resources..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
          </div>
          
          <div className="max-h-[50vh] overflow-y-auto space-y-2">
            {results.length === 0 && searchQuery.trim() !== '' && (
              <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                No results found for "{searchQuery}"
              </div>
            )}
            
            {results.length > 0 && (
              <div className="space-y-3">
                {results.map((result, index) => (
                  <Link key={index} href={result.url} onClick={() => onOpenChange(false)}>
                    <a className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{result.title}</span>
                            {result.category && (
                              <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full">
                                {result.category}
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                              {result.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
