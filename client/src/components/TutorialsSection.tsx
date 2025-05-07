import { useState } from 'react';
import { useLocation } from 'wouter';
import { tutorials } from '@/data/tutorials';

const TutorialsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [, navigate] = useLocation();
  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'SMB', 'LDAP'];
  
  const filteredTutorials = activeCategory === 'All' 
    ? tutorials
    : tutorials.filter(tutorial => 
        tutorial.level === activeCategory.toLowerCase() || 
        tutorial.tags.includes(activeCategory.toLowerCase())
      );

  const handleNavigate = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <section id="tutorials" className="mb-12 pt-6">
      <h2 className="section-title">Step-by-Step Tutorials</h2>
      
      {/* Tutorial Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            className={`${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            } px-3 py-1 rounded-md text-sm`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={tutorial.image} alt={tutorial.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`${
                  tutorial.level === 'beginner' ? 'bg-green-500' : 
                  tutorial.level === 'intermediate' ? 'bg-yellow-500' : 
                  'bg-red-500'
                } text-white text-xs px-2 py-1 rounded-full`}>
                  {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {tutorial.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{tutorial.readTime} min read</span>
                <a 
                  href={`/tutorials/${tutorial.slug}`} 
                  onClick={handleNavigate(`/tutorials/${tutorial.slug}`)} 
                  className="text-[#10B981] hover:text-green-600 font-medium cursor-pointer"
                >
                  Read tutorial
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show more link when on home page */}
      {filteredTutorials.length > 6 && (
        <div className="flex justify-center mt-8">
          <a 
            href="/tutorials" 
            onClick={handleNavigate('/tutorials')}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            View All Tutorials
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      )}
    </section>
  );
};

export default TutorialsSection;
