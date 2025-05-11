import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Toaster from "@/components/ui/toaster";
import { Helmet } from "react-helmet";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ModulesPage from "@/pages/ModulesPage";
import TutorialsPage from "@/pages/TutorialsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import ModuleDetailPage from "@/pages/ModuleDetailPage";
import TutorialDetailPage from "@/pages/TutorialDetailPage";
import CommandGeneratorPage from "@/pages/CommandGeneratorPage";
import TeamPage from "@/pages/TeamPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/command-generator" component={CommandGeneratorPage} />
          <Route path="/modules" component={ModulesPage} />
          <Route path="/modules/:protocol/:module" component={ModuleDetailPage} />
          <Route path="/tutorials" component={TutorialsPage} />
          <Route path="/tutorials/:slug" component={TutorialDetailPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/team" component={TeamPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          <title>NetExec Documentation - Complete Guide to Penetration Testing Tool</title>
          <meta name="description" content="Comprehensive documentation for NetExec - the powerful network security assessment tool. Learn commands, modules, and best practices for security testing." />
          <meta name="keywords" content="NetExec, penetration testing, security tools, network assessment, cybersecurity, ethical hacking" />
          <meta property="og:title" content="NetExec Documentation and Resources" />
          <meta property="og:description" content="Complete documentation for the NetExec penetration testing framework. Explore modules, tutorials and generate commands." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://netexec-docs.example.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="NetExec Documentation" />
          <meta name="twitter:description" content="Comprehensive guide to using NetExec for effective network security assessment and penetration testing." />
          <link rel="canonical" href="https://netexec-docs.example.com" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
