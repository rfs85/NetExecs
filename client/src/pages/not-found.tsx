import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>404 - Page Not Found | NetExec Documentation</title>
        <meta name="description" content="The page you were looking for could not be found. Navigate back to the NetExec documentation homepage." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="/404" />
      </Helmet>
      
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            The page you were looking for could not be found.
          </p>
          
          <div className="mt-6">
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <span>← Back to NetExec Network Security Documentation Home</span>
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
