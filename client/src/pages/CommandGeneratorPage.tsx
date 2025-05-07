import { Helmet } from 'react-helmet';
import CommandGenerator from '@/components/CommandGenerator';
import SecurityDisclaimer from '@/components/SecurityDisclaimer';

const CommandGeneratorPage = () => {
  return (
    <>
      <Helmet>
        <title>NetExec Command Generator - Create Optimized Security Commands</title>
        <meta 
          name="description" 
          content="Create optimized NetExec commands with our interactive generator. Select protocols, modules, and parameters with real-time preview and copy functionality." 
        />
        <meta 
          name="keywords" 
          content="NetExec command generator, CrackMapExec, command creation, security testing, penetration testing"
        />
        <link rel="canonical" href="/command-generator" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          NetExec Command Generator
        </h1>
        
        <SecurityDisclaimer />
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Create optimized NetExec commands by selecting your target, authentication method, and desired modules. 
            The interactive generator provides real-time previews and allows you to save your commands for future use.
          </p>
        </div>
        
        <CommandGenerator />
        
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Command Generator Tips
          </h2>
          
          <ul className="space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Select a protocol first to see protocol-specific modules and options</li>
            <li>For password fields, you can enter either plaintext passwords or NTLM hashes (when using the hash option)</li>
            <li>The command preview updates in real-time as you modify parameters</li>
            <li>Save frequently used commands with descriptive names for easy access</li>
            <li>For more complex command options, refer to the Modules Documentation section</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default CommandGeneratorPage;
