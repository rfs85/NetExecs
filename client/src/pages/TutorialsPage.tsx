import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { tutorials } from '@/data/tutorials';
import AdSenseAd from '@/components/AdSenseAd';

const TutorialsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 6;
  
  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'SMB', 'LDAP'];
  
  // Filter tutorials based on category and search query
  const filteredTutorials = tutorials.filter(tutorial => 
    (activeCategory === 'All' || 
     tutorial.level === activeCategory.toLowerCase() || 
     tutorial.tags.includes(activeCategory.toLowerCase())) &&
    (searchQuery === '' || 
     tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  
  // Paginate tutorials
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = filteredTutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);
  const totalPages = Math.ceil(filteredTutorials.length / tutorialsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>NetExec Tutorials - Step-by-Step Security Testing Guides</title>
        <meta 
          name="description" 
          content="From beginner to advanced - learn how to effectively use NetExec for various network security testing scenarios through our comprehensive tutorials." 
        />
        <meta 
          name="keywords" 
          content="NetExec tutorials, CrackMapExec guides, network security tutorials, penetration testing guides, ethical hacking"
        />
        <link rel="canonical" href="https://www.netexec-tutorial.com/tutorials" />
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          NetExec Tutorials
        </h1>
        
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Learn how to effectively use NetExec for security testing with our comprehensive tutorials. From basic installation to 
            advanced attack techniques, our step-by-step guides will help you master NetExec for authorized penetration testing scenarios.
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
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-1/3">
            <input 
              type="text"
              placeholder="Search tutorials..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <div className="md:w-2/3">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`${
                    activeCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  } px-3 py-1 rounded-md text-sm`}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1); // Reset to first page on category change
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tutorials Grid */}
        {currentTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTutorials.map((tutorial) => (
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tutorial.readTime} min read</span>
                    <Link href={`/tutorials/${tutorial.slug}`}>
                      <a 
                        className="text-[#10B981] hover:text-green-600 font-medium"
                        onClick={() => {
                          (window as any).dataLayer = (window as any).dataLayer || [];
                          (window as any).dataLayer.push({
                            event: 'read_tutorial',
                            category: 'Tutorial',
                            action: 'Read',
                            label: tutorial.title
                          });
                        }}
                      >Read tutorial</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md p-8 text-center mb-8">
            <i className="fas fa-book text-4xl text-gray-400 mb-3"></i>
            <p className="text-gray-600 dark:text-gray-300">No tutorials found matching your search criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        {filteredTutorials.length > tutorialsPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  paginate(Math.max(1, currentPage - 1));
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({
                    event: 'paginate',
                    category: 'Pagination',
                    action: 'Page Change',
                    label: `Page ${Math.max(1, currentPage - 1)}`
                  });
                }}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => {
                    paginate(number);
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                      event: 'paginate',
                      category: 'Pagination',
                      action: 'Page Change',
                      label: `Page ${number}`
                    });
                  }}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button 
                onClick={() => {
                  paginate(Math.min(totalPages, currentPage + 1));
                  (window as any).dataLayer = (window as any).dataLayer || [];
                  (window as any).dataLayer.push({
                    event: 'paginate',
                    category: 'Pagination',
                    action: 'Page Change',
                    label: `Page ${Math.min(totalPages, currentPage + 1)}`
                  });
                }}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </nav>
          </div>
        )}
      </main>
    </>
  );
};

export default TutorialsPage;
