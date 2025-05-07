import { useLocation } from 'wouter';

const HeroSection = () => {
  const [, navigate] = useLocation();

  const handleNavigate = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <section className="bg-gradient-to-r from-[#1E3A8A] to-[#0F172A] dark:from-[#0F172A] dark:to-[#1F2937] rounded-lg shadow-lg overflow-hidden mb-12">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Network Security Testing <span className="text-[#10B981]">Made Educational</span>
          </h1>
          <p className="text-gray-200 mb-6">
            Learn about NetExec (formerly CrackMapExec) - an open-source penetration testing tool that automates network exploitation and privilege escalation techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/command-generator" 
              onClick={handleNavigate('/command-generator')} 
              className="bg-[#10B981] hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md text-center"
            >
              Try Command Generator
            </a>
            <a 
              href="/modules" 
              onClick={handleNavigate('/modules')} 
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-2 px-6 rounded-md text-center"
            >
              Explore Modules
            </a>
          </div>
        </div>
        <div className="md:w-1/2 p-6 hidden md:block">
          <div className="terminal-window">
            <div className="terminal-dots">
              <div className="terminal-dot bg-red-500"></div>
              <div className="terminal-dot bg-yellow-500"></div>
              <div className="terminal-dot bg-green-500"></div>
            </div>
            <p className="mb-1">$ netexec smb 192.168.1.0/24</p>
            <p className="mb-1">SMB         192.168.1.5     445    WIN-DEV01        [*] Windows 10 Pro 21H2 (name:WIN-DEV01) (domain:WORKGROUP)</p>
            <p className="mb-1">SMB         192.168.1.5     445    WIN-DEV01        [+] WORKGROUP\Administrator:Password123! (Pwn3d!)</p>
            <p className="mb-1">SMB         192.168.1.10    445    DC01             [*] Windows Server 2019 (name:DC01) (domain:CORP)</p>
            <p>SMB         192.168.1.10    445    DC01             [+] Enumerated domain user list...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
