import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import SecurityDisclaimer from '@/components/SecurityDisclaimer';
import FeatureCards from '@/components/FeatureCards';
import CommandGenerator from '@/components/CommandGenerator';
import ModulesDocumentation from '@/components/ModulesDocumentation';
import TutorialsSection from '@/components/TutorialsSection';
import ResourcesHub from '@/components/ResourcesHub';
import NessusAdBanner from '@/components/NessusAdBanner';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>NetExec - Network Security Testing Educational Platform</title>
        <meta 
          name="description" 
          content="Learn about NetExec (formerly CrackMapExec) - the powerful network penetration testing tool. Interactive command generator, modules documentation, and tutorials." 
        />
        <meta 
          name="keywords" 
          content="NetExec, CrackMapExec, penetration testing, cybersecurity, ethical hacking, network security"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <SecurityDisclaimer />
        <NessusAdBanner />
        <FeatureCards />
        <CommandGenerator />
        <ModulesDocumentation />
        <TutorialsSection />
        <ResourcesHub />
      </main>
    </>
  );
};

export default Home;
