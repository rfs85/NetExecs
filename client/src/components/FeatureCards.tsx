import { Link } from 'wouter';

const FeatureCards = () => {
  const features = [
    {
      title: "Command Generator",
      description: "Create optimized NetExec commands with our interactive generator. Select protocols, modules, and parameters with real-time preview.",
      icon: "fa-terminal",
      link: "/command-generator"
    },
    {
      title: "Modules Documentation",
      description: "Comprehensive documentation for all NetExec modules. Learn about protocols, parameters, and example usage scenarios.",
      icon: "fa-book-open",
      link: "/modules"
    },
    {
      title: "Step-by-Step Tutorials",
      description: "From beginner to advanced - learn how to effectively use NetExec for various network security testing scenarios.",
      icon: "fa-graduation-cap",
      link: "/tutorials"
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="section-title">Explore the Platform</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="bg-primary dark:bg-[#0F172A] p-4 flex justify-center items-center">
              <i className={`fas ${feature.icon} text-4xl text-[#10B981]`}></i>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {feature.description}
              </p>
              <Link href={feature.link}>
                <a 
                  className="text-[#10B981] hover:text-green-600 font-medium inline-flex items-center"
                  onClick={() => {
                    (window as any).dataLayer = (window as any).dataLayer || [];
                    (window as any).dataLayer.push({
                      event: 'navigate',
                      category: 'Feature',
                      action: 'Try',
                      label: feature.title
                    });
                  }}
                >
                  Try it now
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
