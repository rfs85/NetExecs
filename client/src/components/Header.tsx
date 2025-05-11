import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useTheme } from '@/hooks/useTheme';
import SearchDialog from './SearchDialog';

const Header = () => {
  const [location] = useLocation();
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

  const trackNavigate = (label: string) => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'navigate',
      category: 'Navigation',
      action: 'Click',
      label
    });
  };

  return (
    <header className="bg-white dark:bg-[#1F2937] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-[#10B981] text-2xl">
            <i className="fas fa-terminal"></i>
          </div>
          <Link href="/">
            <a className="text-xl md:text-2xl font-bold font-mono text-primary dark:text-white cursor-pointer" onClick={() => trackNavigate('Home')}>
              Net<span className="text-[#10B981]">Exec</span>
            </a>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <a className={`nav-link cursor-pointer ${isActive('/')}`} onClick={() => trackNavigate('Home')}>NetExec Network Security Documentation Home</a>
          </Link>
          <Link href="/command-generator">
            <a className={`nav-link cursor-pointer ${isActive('/command-generator')}`} onClick={() => trackNavigate('Command Generator')}>NetExec Command Generator for Penetration Testing</a>
          </Link>
          <Link href="/modules">
            <a className={`nav-link cursor-pointer ${isActive('/modules')}`} onClick={() => trackNavigate('Modules')}>NetExec Modules Documentation</a>
          </Link>
          <Link href="/tutorials">
            <a className={`nav-link cursor-pointer ${isActive('/tutorials')}`} onClick={() => trackNavigate('Tutorials')}>NetExec Step-by-Step Tutorials</a>
          </Link>
          <Link href="/resources">
            <a className={`nav-link cursor-pointer ${isActive('/resources')}`} onClick={() => trackNavigate('Resources')}>NetExec Security Resources and Tools</a>
          </Link>
          <Link href="/team">
            <a className={`nav-link cursor-pointer ${isActive('/team')}`} onClick={() => trackNavigate('Team')}>Meet the NetExec Security Team</a>
          </Link>
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
            <Link href="/">
              <a className={`block nav-link cursor-pointer ${isActive('/')}`} onClick={() => trackNavigate('Home')}>NetExec Network Security Documentation Home</a>
            </Link>
            <Link href="/command-generator">
              <a className={`block nav-link cursor-pointer ${isActive('/command-generator')}`} onClick={() => trackNavigate('Command Generator')}>NetExec Command Generator for Penetration Testing</a>
            </Link>
            <Link href="/modules">
              <a className={`block nav-link cursor-pointer ${isActive('/modules')}`} onClick={() => trackNavigate('Modules')}>NetExec Modules Documentation</a>
            </Link>
            <Link href="/tutorials">
              <a className={`block nav-link cursor-pointer ${isActive('/tutorials')}`} onClick={() => trackNavigate('Tutorials')}>NetExec Step-by-Step Tutorials</a>
            </Link>
            <Link href="/resources">
              <a className={`block nav-link cursor-pointer ${isActive('/resources')}`} onClick={() => trackNavigate('Resources')}>NetExec Security Resources and Tools</a>
            </Link>
            <Link href="/team">
              <a className={`block nav-link cursor-pointer ${isActive('/team')}`} onClick={() => trackNavigate('Team')}>Meet the NetExec Security Team</a>
            </Link>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;