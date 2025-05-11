import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'wouter';
import { tutorials } from '@/data/tutorials';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AdSenseAd from '@/components/AdSenseAd';

const TutorialDetailPage = () => {
  const { slug } = useParams();
  const [tutorial, setTutorial] = useState(
    tutorials.find(t => t.slug === slug)
  );
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const tutorialData = tutorials.find(t => t.slug === slug);
    if (tutorialData) {
      setTutorial(tutorialData);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [slug]);

  if (notFound) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md p-8 text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-3"></i>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Tutorial Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The requested tutorial could not be found. It may have been removed or you might have followed an incorrect link.
          </p>
          <Link href="/tutorials">
            <a className="bg-primary hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md">
              View All Tutorials
            </a>
          </Link>
        </div>
      </main>
    );
  }

  if (!tutorial) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10B981]"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${tutorial.title} - NetExec Tutorial`}</title>
        <meta 
          name="description" 
          content={tutorial.description} 
        />
        <meta 
          name="keywords" 
          content={`NetExec, tutorial, ${tutorial.tags.join(', ')}, ${tutorial.level}, security training`}
        />
        <link rel="canonical" href={`https://www.netexec-tutorial.com/tutorials/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": tutorial.title,
            "description": tutorial.description,
            "url": `https://www.netexec-tutorial.com/tutorials/${slug}`,
            "keywords": tutorial.tags.join(", "),
            "author": {
              "@type": "Organization",
              "name": "NetExec"
            },
            "inLanguage": "en",
            "educationalLevel": tutorial.level,
            "timeRequired": `PT${tutorial.readTime}M`,
            "image": tutorial.image
          })}
        </script>
      </Helmet>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/tutorials">
            <a className="text-[#10B981] hover:text-green-600 inline-flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Back to NetExec Tutorials and Guides
            </a>
          </Link>
        </div>
        
        <div className="bg-white dark:bg-[#1F2937] rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img 
              src={tutorial.image} 
              alt={tutorial.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 w-full">
                <div className="flex items-center mb-2">
                  <span className={`${
                    tutorial.level === 'beginner' ? 'bg-green-500' : 
                    tutorial.level === 'intermediate' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  } text-white text-xs px-2 py-1 rounded-full mr-2`}>
                    {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                  </span>
                  <span className="text-white text-sm">
                    {tutorial.readTime} min read
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {tutorial.title}
                </h1>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {tutorial.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* AdSense Banner before content */}
            <div className="mb-6">
              <AdSenseAd 
                format="horizontal" 
                slot="1234567890" 
                responsive={true} 
                className="py-4" 
              />
            </div>
            
            <div className="prose prose-sm sm:prose max-w-none dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-[#10B981] prose-code:text-[#10B981] dark:prose-code:text-[#10B981]">
              <ReactMarkdown
                components={{
                  code({className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        style={tomorrow as any}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {tutorial.content}
              </ReactMarkdown>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Ready to try it yourself?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/command-generator">
                  <a 
                    className="bg-[#10B981] hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md text-center"
                    onClick={() => {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({
                        event: 'navigate',
                        category: 'Tutorial',
                        action: 'Try Command Generator',
                        label: tutorial.title
                      });
                    }}
                  >
                    Generate NetExec Commands for Network Penetration Testing
                  </a>
                </Link>
                <Link href="/modules">
                  <a 
                    className="bg-transparent hover:bg-primary/10 text-primary dark:text-white border border-primary dark:border-white font-medium py-2 px-6 rounded-md text-center"
                    onClick={() => {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({
                        event: 'navigate',
                        category: 'Tutorial',
                        action: 'Explore Modules',
                        label: tutorial.title
                      });
                    }}
                  >
                    Explore All NetExec Modules and Protocols
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TutorialDetailPage;
