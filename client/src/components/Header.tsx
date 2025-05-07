import { useState } from 'react';
import { useLocation } from 'wouter';
import { useTheme } from '@/hooks/useTheme';
import SearchDialog from './SearchDialog';

const Header = () => {
  const [location, navigate] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const isActive = (path: string) => {
    return location === path ? 'text-[#10B981] dark:text-[#10B981]' : '';
  };

  const handleNavigate = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <header className="bg-white dark:bg-[#1F2937] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-[#10B981] text-2xl">
            <i className="fas fa-terminal"></i>
          </div>
          <a href="/" onClick={handleNavigate('/')} className="text-xl md:text-2xl font-bold font-mono text-primary dark:text-white cursor-pointer">
            Net<span className="text-[#10B981]">Exec</span>
          </a>
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="/" onClick={handleNavigate('/')} className={`nav-link cursor-pointer ${isActive('/')}`}>
            Home
          </a>
          <a href="/command-generator" onClick={handleNavigate('/command-generator')} className={`nav-link cursor-pointer ${isActive('/command-generator')}`}>
            Command Generator
          </a>
          <a href="/modules" onClick={handleNavigate('/modules')} className={`nav-link cursor-pointer ${isActive('/modules')}`}>
            Modules
          </a>
          <a href="/tutorials" onClick={handleNavigate('/tutorials')} className={`nav-link cursor-pointer ${isActive('/tutorials')}`}>
            Tutorials
          </a>
          <a href="/resources" onClick={handleNavigate('/resources')} className={`nav-link cursor-pointer ${isActive('/resources')}`}>
            Resources
          </a>
          <a href="/team" onClick={handleNavigate('/team')} className={`nav-link cursor-pointer ${isActive('/team')}`}>
            Team
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="text-gray-600 dark:text-gray-300 hover:text-[#10B981] dark:hover:text-[#10B981]"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          <button 
            onClick={toggleTheme} 
            className="text-gray-600 dark:text-gray-300 hover:text-[#10B981] dark:hover:text-[#10B981]" 
            aria-label="Toggle theme"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button 
            className="md:hidden text-gray-600 dark:text-gray-300" 
            id="mobile-menu-button" 
            aria-label="Toggle mobile menu"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1F2937] border-t dark:border-gray-700">
          <div className="px-4 py-3 space-y-3">
            <a href="/" onClick={handleNavigate('/')} className={`block nav-link cursor-pointer ${isActive('/')}`}>
              Home
            </a>
            <a href="/command-generator" onClick={handleNavigate('/command-generator')} className={`block nav-link cursor-pointer ${isActive('/command-generator')}`}>
              Command Generator
            </a>
            <a href="/modules" onClick={handleNavigate('/modules')} className={`block nav-link cursor-pointer ${isActive('/modules')}`}>
              Modules
            </a>
            <a href="/tutorials" onClick={handleNavigate('/tutorials')} className={`block nav-link cursor-pointer ${isActive('/tutorials')}`}>
              Tutorials
            </a>
            <a href="/resources" onClick={handleNavigate('/resources')} className={`block nav-link cursor-pointer ${isActive('/resources')}`}>
              Resources
            </a>
            <a href="/team" onClick={handleNavigate('/team')} className={`block nav-link cursor-pointer ${isActive('/team')}`}>
              Team
            </a>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;