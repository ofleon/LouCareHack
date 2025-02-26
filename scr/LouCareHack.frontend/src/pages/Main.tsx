import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, LogIn, Heart, Users } from "lucide-react";

const Main = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/index");
  };

  const handleGetHelp = () => {
    navigate("/request");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-gray-900">LouCare</span>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogin}
            className="flex items-center"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Finding Home in Louisville
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're dedicated to helping Louisville's unhoused residents find stable,
            supportive housing through innovative solutions and compassionate care.
          </p>

          {/* Main Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-xl mx-auto">
            <Button
              onClick={handleGetHelp}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg flex-1 flex items-center justify-center gap-2"
            >
              <Heart className="h-5 w-5" />
              Get Help Now
            </Button>

            <Button
              onClick={handleLogin}
              variant="outline"
              className="border-2 px-8 py-6 text-lg rounded-lg hover:bg-accent transition-colors flex-1 flex items-center justify-center gap-2"
            >
              <Users className="h-5 w-5" />
              Case Worker Login
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Home className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-bold">LouCare</span>
          </div>
          <p className="text-sm text-gray-600">
            Making housing accessible for everyone in Louisville.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            24/7 Support: (502) 555-0123 | support@loucare.org
          </p>
          <p className="mt-2 text-sm text-gray-500">
            © {new Date().getFullYear()} LouCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Main;
