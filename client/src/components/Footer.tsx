import { useLocation, Link } from 'wouter';

const Footer = () => {
  const [, navigate] = useLocation();

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
    <footer className="bg-[#0F172A] dark:bg-[#0F172A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-[#10B981] text-2xl">
                <i className="fas fa-terminal"></i>
              </div>
              <h2 className="text-xl font-bold font-mono">
                Net<span className="text-[#10B981]">Exec</span>
              </h2>
            </div>
            <p className="text-gray-300 text-sm">
              Educational platform for security professionals to learn about network security testing with NetExec.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-300 hover:text-[#10B981] text-sm" onClick={() => trackNavigate('Home')}>NetExec Network Security Documentation Home</a></Link></li>
              <li><Link href="/command-generator"><a className="text-gray-300 hover:text-[#10B981] text-sm" onClick={() => trackNavigate('Command Generator')}>NetExec Command Generator for Penetration Testing</a></Link></li>
              <li><Link href="/modules"><a className="text-gray-300 hover:text-[#10B981] text-sm" onClick={() => trackNavigate('Modules')}>NetExec Modules Documentation</a></Link></li>
              <li><Link href="/tutorials"><a className="text-gray-300 hover:text-[#10B981] text-sm" onClick={() => trackNavigate('Tutorials')}>NetExec Step-by-Step Tutorials</a></Link></li>
              <li><Link href="/resources"><a className="text-gray-300 hover:text-[#10B981] text-sm" onClick={() => trackNavigate('Resources')}>NetExec Security Resources and Tools</a></Link></li>
              <li><Link href="/sitemap"><a className="text-gray-300 hover:text-[#10B981] text-sm">Sitemap & Content Index</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm">Ethical Use Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm">License Information</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/Pennyw0rth/NetExec" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#10B981] text-sm flex items-center"><i className="fab fa-github mr-2"></i> GitHub</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm flex items-center"><i className="fab fa-discord mr-2"></i> Discord</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm flex items-center"><i className="fab fa-twitter mr-2"></i> Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#10B981] text-sm flex items-center"><i className="fas fa-envelope mr-2"></i> Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} NetExec Educational Platform. For educational purposes only.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Pennyw0rth/NetExec" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#10B981]">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#10B981]">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#10B981]">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
